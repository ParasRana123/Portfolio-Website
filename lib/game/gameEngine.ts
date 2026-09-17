import {
  Enemy,
  Projectile,
  Particle,
  DamageNumber,
  FloatingUnlock,
  GameStats,
} from "./types";
import {
  IntelItem,
  Weapon,
  GAME_WEAPONS,
  INTEL_ITEMS,
  EnemyTier,
} from "@/data/gameData";
import { gameAudio } from "./gameAudio";

export interface GameEngineCallbacks {
  onIntelUnlocked: (intel: IntelItem, isNew: boolean) => void;
  onWaveChange: (wave: number, waveName: string) => void;
  onStatsUpdate: (stats: GameStats) => void;
  onVictory: (stats: GameStats) => void;
  onScreenShake: (intensity: number) => void;
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private callbacks: GameEngineCallbacks;

  public width: number = 800;
  public height: number = 600;

  // Game Entities
  private enemies: Enemy[] = [];
  private projectiles: Projectile[] = [];
  private particles: Particle[] = [];
  private damageNumbers: DamageNumber[] = [];
  private floatingUnlocks: FloatingUnlock[] = [];

  // Weapon & Aim
  public currentWeapon: Weapon = GAME_WEAPONS[0];
  public aimX: number = 400;
  public aimY: number = 300;
  public isMouseDown: boolean = false;
  private lastFireTime: number = 0;
  private burstRemaining: number = 0;
  private burstIntervalId: NodeJS.Timeout | null = null;

  // Game Progression
  public currentWave: number = 1;
  public wavePhase: "intro" | "spawning" | "active" | "cleared" | "completed" = "intro";
  public score: number = 0;
  public combo: number = 0;
  public maxCombo: number = 0;
  private comboTimer: number = 0;
  private shotsFired: number = 0;
  private shotsHit: number = 0;
  private targetsDestroyed: number = 0;
  public unlockedIntelIds: Set<string> = new Set();
  public isEndless: boolean = false;

  // Animation & Loop
  private animFrameId: number | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  public screenShake: number = 0;
  private waveBannerTimer: number = 0;
  private waveBannerText: string = "";

  constructor(
    canvas: HTMLCanvasElement,
    callbacks: GameEngineCallbacks,
    initialUnlockedIds: string[] = []
  ) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2d context");
    this.ctx = context;
    this.callbacks = callbacks;
    this.unlockedIntelIds = new Set(initialUnlockedIds);

    this.resize();
  }

  public resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 800;
    this.height = rect.height || 600;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  public setWeapon(weapon: Weapon) {
    this.currentWeapon = weapon;
    gameAudio.playWeaponSwitch();
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.startWave(1);
    this.loop(this.lastTime);
  }

  public pause(paused: boolean) {
    this.isPaused = paused;
    if (!paused && this.isRunning) {
      this.lastTime = performance.now();
      this.loop(this.lastTime);
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.burstIntervalId) {
      clearInterval(this.burstIntervalId);
      this.burstIntervalId = null;
    }
  }

  public unlockAllForTesting() {
    INTEL_ITEMS.forEach((item) => {
      this.unlockedIntelIds.add(item.id);
    });
    this.emitStats();
  }

  // ==========================================
  // WAVE PROGRESSION & SPAWNING
  // ==========================================
  public startWave(waveNum: number) {
    this.currentWave = waveNum;
    this.wavePhase = "intro";
    this.waveBannerTimer = 180; // ~3 seconds at 60fps
    gameAudio.playWaveAlert();

    let waveTitle = "";
    if (waveNum === 1) {
      waveTitle = "WAVE 1: RECONNAISSANCE — BASIC INFO";
    } else if (waveNum === 2) {
      waveTitle = "WAVE 2: TECH ARSENAL — SKILLS & STACK";
    } else if (waveNum === 3) {
      waveTitle = "WAVE 3: ELITE TITANS — PROJECTS & ACHIEVEMENTS";
    } else {
      this.isEndless = true;
      waveTitle = `WAVE ${waveNum}: INFINITE SANDBOX ARENA`;
    }

    this.waveBannerText = waveTitle;
    this.callbacks.onWaveChange(waveNum, waveTitle);

    // Spawn enemies matching this wave tier
    this.spawnWaveEnemies(waveNum);
  }

  private spawnWaveEnemies(waveNum: number) {
    this.enemies = [];

    let candidateIntel: IntelItem[] = [];

    if (waveNum === 1) {
      // Tier 1 Easy: Basic Info
      candidateIntel = INTEL_ITEMS.filter((i) => i.tier === "easy");
    } else if (waveNum === 2) {
      // Tier 2 Medium: Skills
      candidateIntel = INTEL_ITEMS.filter((i) => i.tier === "medium");
    } else if (waveNum === 3) {
      // Tier 3 Hard/Boss: Projects & Achievements
      candidateIntel = INTEL_ITEMS.filter(
        (i) => i.tier === "hard" || i.tier === "boss"
      );
    } else {
      // Endless: Mix of all with preference for harder enemies
      candidateIntel = [...INTEL_ITEMS];
    }

    // Distribute positions cleanly across canvas
    const paddingX = Math.min(100, this.width * 0.12);
    const paddingY = Math.min(100, this.height * 0.15);
    const usableW = this.width - paddingX * 2;
    const usableH = this.height - paddingY * 2;

    const count = candidateIntel.length;
    const cols = count <= 5 ? count : Math.ceil(Math.sqrt(count * 1.5));
    const rows = Math.ceil(count / cols);

    candidateIntel.forEach((intel, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const cellW = usableW / (cols || 1);
      const cellH = usableH / (rows || 1);

      const baseX = paddingX + col * cellW + cellW * 0.5;
      const baseY = paddingY + row * cellH + cellH * 0.5;

      // Add gentle random offset
      const x = baseX + (Math.random() - 0.5) * (cellW * 0.4);
      const y = baseY + (Math.random() - 0.5) * (cellH * 0.4);

      this.enemies.push(this.createEnemy(intel, x, y, index));
    });
  }

  private createEnemy(
    intel: IntelItem,
    x: number,
    y: number,
    index: number
  ): Enemy {
    const tier = intel.tier;

    let radius = 28;
    let maxHp = 50;
    let hasShield = false;
    let shieldMaxHp = 0;
    let pattern: "hover" | "zigzag" | "sine" | "orbit" | "boss" = "hover";
    let vx = (Math.random() - 0.5) * 1.2;
    let vy = (Math.random() - 0.5) * 1.2;

    if (tier === "easy") {
      radius = 26;
      maxHp = 40;
      hasShield = false;
      pattern = index % 2 === 0 ? "hover" : "sine";
      vx = (Math.random() - 0.5) * 0.8;
      vy = (Math.random() - 0.5) * 0.8;
    } else if (tier === "medium") {
      radius = 34;
      maxHp = 70;
      hasShield = true;
      shieldMaxHp = 40;
      pattern = index % 2 === 0 ? "zigzag" : "orbit";
      vx = (Math.random() - 0.5) * 1.4;
      vy = (Math.random() - 0.5) * 1.4;
    } else if (tier === "hard") {
      radius = 42;
      maxHp = 120;
      hasShield = true;
      shieldMaxHp = 80;
      pattern = "zigzag";
      vx = (Math.random() - 0.5) * 1.8;
      vy = (Math.random() - 0.5) * 1.8;
    } else if (tier === "boss") {
      radius = 54;
      maxHp = 220;
      hasShield = true;
      shieldMaxHp = 120;
      pattern = "boss";
      vx = (Math.random() - 0.5) * 1.2;
      vy = (Math.random() - 0.5) * 1.2;
    }

    return {
      id: `enemy-${intel.id}-${Date.now()}-${index}`,
      tier,
      intel,
      x,
      y,
      vx,
      vy,
      radius,
      maxHp,
      hp: maxHp,
      hasShield,
      shieldMaxHp,
      shieldHp: shieldMaxHp,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      pattern,
      patternPhase: Math.random() * Math.PI * 2,
      spawnTime: performance.now(),
      pulse: 0,
      isHitTimer: 0,
      isDestroyed: false,
      weakPointAngle: Math.random() * Math.PI * 2,
    };
  }

  // ==========================================
  // SHOOTING & WEAPONS LOGIC
  // ==========================================
  public triggerShoot(targetX: number, targetY: number) {
    if (this.isPaused || !this.isRunning) return;

    const now = performance.now();
    if (now - this.lastFireTime < this.currentWeapon.fireRateMs) {
      return;
    }

    this.lastFireTime = now;
    this.aimX = targetX;
    this.aimY = targetY;

    if (this.currentWeapon.burstCount && this.currentWeapon.burstCount > 1) {
      // Burst fire (e.g. 3-round pulse or 5-round scatter)
      if (this.currentWeapon.soundType === "shotgun") {
        // Multi-pellet simultaneous shotgun blast
        for (let i = 0; i < (this.currentWeapon.burstCount || 5); i++) {
          const spreadAngle =
            (i - ((this.currentWeapon.burstCount || 5) - 1) / 2) *
            this.currentWeapon.spread;
          this.spawnProjectile(targetX, targetY, spreadAngle);
        }
        gameAudio.playShoot("shotgun");
        this.addScreenShake(3);
      } else {
        // Sequenced pulse burst
        let burstLeft = this.currentWeapon.burstCount;
        const fireOne = () => {
          if (burstLeft <= 0) return;
          const spreadOffset = (Math.random() - 0.5) * this.currentWeapon.spread;
          this.spawnProjectile(targetX, targetY, spreadOffset);
          gameAudio.playShoot(this.currentWeapon.soundType);
          this.addScreenShake(1.5);
          burstLeft--;
          if (burstLeft > 0) {
            setTimeout(fireOne, 60);
          }
        };
        fireOne();
      }
    } else {
      // Single shot
      this.spawnProjectile(targetX, targetY, 0);
      gameAudio.playShoot(this.currentWeapon.soundType);
      this.addScreenShake(
        this.currentWeapon.soundType === "railgun" ? 6 : 2
      );
    }

    this.shotsFired++;
    this.emitStats();
  }

  private spawnProjectile(
    targetX: number,
    targetY: number,
    angleOffset: number = 0
  ) {
    // Fire originating from bottom center (player cannon position)
    const originX = this.width * 0.5;
    const originY = this.height - 15;

    const dx = targetX - originX;
    const dy = targetY - originY;
    const baseAngle = Math.atan2(dy, dx);
    const finalAngle = baseAngle + angleOffset;

    const speed = this.currentWeapon.projectileSpeed;
    const vx = Math.cos(finalAngle) * speed;
    const vy = Math.sin(finalAngle) * speed;

    this.projectiles.push({
      id: `proj-${Date.now()}-${Math.random()}`,
      startX: originX,
      startY: originY,
      x: originX,
      y: originY,
      vx,
      vy,
      targetX,
      targetY,
      damage: this.currentWeapon.damage,
      color: this.currentWeapon.color,
      beamWidth: this.currentWeapon.beamWidth,
      life: 0,
      maxLife: 60,
      isCrit: false,
      trail: [],
    });

    // Muzzle flash particles at bottom
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        x: originX + (Math.random() - 0.5) * 10,
        y: originY - 10,
        vx: Math.cos(finalAngle + (Math.random() - 0.5) * 0.5) * (Math.random() * 4 + 2),
        vy: Math.sin(finalAngle + (Math.random() - 0.5) * 0.5) * (Math.random() * 4 + 2),
        color: this.currentWeapon.color,
        size: Math.random() * 3 + 2,
        life: 0,
        maxLife: 15,
        alpha: 1,
        shape: "spark",
      });
    }
  }

  public addScreenShake(intensity: number) {
    this.screenShake = Math.min(this.screenShake + intensity, 14);
    this.callbacks.onScreenShake(this.screenShake);
  }

  // ==========================================
  // UPDATE LOOP & PHYSICS
  // ==========================================
  private update(dt: number) {
    if (this.isPaused) return;

    // Handle auto-firing when mouse held down
    if (this.isMouseDown && this.currentWeapon.isAutomatic) {
      const now = performance.now();
      if (now - this.lastFireTime >= this.currentWeapon.fireRateMs) {
        this.triggerShoot(this.aimX, this.aimY);
      }
    }

    // Screen Shake decay
    if (this.screenShake > 0) {
      this.screenShake *= 0.88;
      if (this.screenShake < 0.2) this.screenShake = 0;
    }

    // Wave Banner timer
    if (this.waveBannerTimer > 0) {
      this.waveBannerTimer--;
    }

    // Combo timer decay
    if (this.combo > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.emitStats();
      }
    }

    // Update Projectiles & Check Collisions
    for (let pIdx = this.projectiles.length - 1; pIdx >= 0; pIdx--) {
      const p = this.projectiles[pIdx];
      p.life++;

      // Record trail
      p.trail.unshift({ x: p.x, y: p.y, alpha: 1 });
      if (p.trail.length > 5) p.trail.pop();
      p.trail.forEach((t) => (t.alpha *= 0.75));

      p.x += p.vx;
      p.y += p.vy;

      let projectileHit = false;

      // Check collision with enemies
      for (let eIdx = 0; eIdx < this.enemies.length; eIdx++) {
        const enemy = this.enemies[eIdx];
        if (enemy.isDestroyed) continue;

        const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
        if (dist <= enemy.radius + p.beamWidth) {
          // HIT CONFIRMED!
          projectileHit = true;
          this.shotsHit++;
          this.handleEnemyHit(enemy, p);
          break;
        }
      }

      // Remove projectile if offscreen or hit
      if (
        projectileHit ||
        p.x < -50 ||
        p.x > this.width + 50 ||
        p.y < -50 ||
        p.y > this.height + 50 ||
        p.life > p.maxLife
      ) {
        this.projectiles.splice(pIdx, 1);
      }
    }

    // Update Enemies
    for (let eIdx = this.enemies.length - 1; eIdx >= 0; eIdx--) {
      const e = this.enemies[eIdx];

      e.pulse += 0.05;
      e.rotation += e.rotationSpeed;
      if (e.isHitTimer > 0) e.isHitTimer--;

      // AI Movement Pattern
      if (e.pattern === "hover") {
        e.x += e.vx;
        e.y += e.vy + Math.sin(e.pulse * 0.8) * 0.3;
      } else if (e.pattern === "sine") {
        e.x += e.vx;
        e.y += Math.sin(e.pulse * 1.5 + e.patternPhase) * 1.2;
      } else if (e.pattern === "zigzag") {
        e.x += e.vx * 1.4;
        e.y += Math.cos(e.pulse * 2.2 + e.patternPhase) * 1.5;
      } else if (e.pattern === "orbit") {
        e.x += Math.cos(e.pulse * 1.2 + e.patternPhase) * 1.6;
        e.y += Math.sin(e.pulse * 1.2 + e.patternPhase) * 1.4;
      } else if (e.pattern === "boss") {
        e.x += e.vx * 0.8 + Math.cos(e.pulse * 0.6) * 0.8;
        e.y += e.vy * 0.8 + Math.sin(e.pulse * 0.8) * 0.6;
      }

      // Boundary Bounce
      const pad = e.radius + 10;
      if (e.x < pad) {
        e.x = pad;
        e.vx = Math.abs(e.vx);
      } else if (e.x > this.width - pad) {
        e.x = this.width - pad;
        e.vx = -Math.abs(e.vx);
      }

      if (e.y < pad + 30) {
        e.y = pad + 30;
        e.vy = Math.abs(e.vy);
      } else if (e.y > this.height - pad - 60) {
        e.y = this.height - pad - 60;
        e.vy = -Math.abs(e.vy);
      }

      // Check if Destroyed
      if (e.isDestroyed) {
        this.enemies.splice(eIdx, 1);
      }
    }

    // Check Wave Completion
    if (this.enemies.length === 0 && this.wavePhase !== "cleared") {
      this.wavePhase = "cleared";
      setTimeout(() => {
        if (this.currentWave < 3) {
          this.startWave(this.currentWave + 1);
        } else if (this.currentWave === 3) {
          // VICTORY! All 3 core waves completed!
          this.callbacks.onVictory(this.getStats());
          gameAudio.playVictoryFanfare();
        } else {
          // Endless next wave
          this.startWave(this.currentWave + 1);
        }
      }, 1200);
    }

    // Update Particles
    for (let pIdx = this.particles.length - 1; pIdx >= 0; pIdx--) {
      const part = this.particles[pIdx];
      part.life++;
      part.x += part.vx;
      part.y += part.vy;
      part.vx *= 0.96;
      part.vy *= 0.96;
      if (part.vRot && part.rotation !== undefined) {
        part.rotation += part.vRot;
      }
      part.alpha = 1 - part.life / part.maxLife;

      if (part.life >= part.maxLife) {
        this.particles.splice(pIdx, 1);
      }
    }

    // Update Damage Numbers
    for (let dIdx = this.damageNumbers.length - 1; dIdx >= 0; dIdx--) {
      const dn = this.damageNumbers[dIdx];
      dn.life++;
      dn.y -= 0.8;
      dn.alpha = 1 - dn.life / 35;
      if (dn.life >= 35) {
        this.damageNumbers.splice(dIdx, 1);
      }
    }

    // Update Floating Unlocks
    for (let fIdx = this.floatingUnlocks.length - 1; fIdx >= 0; fIdx--) {
      const fu = this.floatingUnlocks[fIdx];
      fu.life++;
      fu.y -= 0.6;
      fu.alpha = 1 - fu.life / 60;
      if (fu.life >= 60) {
        this.floatingUnlocks.splice(fIdx, 1);
      }
    }
  }

  // ==========================================
  // ENEMY HIT & DAMAGE RESOLUTION
  // ==========================================
  private handleEnemyHit(enemy: Enemy, projectile: Projectile) {
    enemy.isHitTimer = 6;
    let actualDamage = projectile.damage;

    // Check Weak Point / Critical Hit
    let isCrit = false;
    if (enemy.weakPointAngle !== undefined) {
      const hitAngle = Math.atan2(
        projectile.y - enemy.y,
        projectile.x - enemy.x
      );
      const angleDiff = Math.abs(
        ((hitAngle - enemy.weakPointAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      );
      if (angleDiff < 0.6) {
        isCrit = true;
        actualDamage *= 2.0;
        this.addScreenShake(4);
      }
    }

    let isShieldHit = false;

    // Shield Absorption
    if (enemy.hasShield && enemy.shieldHp > 0) {
      isShieldHit = true;
      enemy.shieldHp -= actualDamage;
      if (enemy.shieldHp <= 0) {
        // Shield break explosion!
        this.spawnShieldBreakSparks(enemy);
        enemy.hasShield = false;
      }
      gameAudio.playHit(true, isCrit);
    } else {
      // Hull Damage
      enemy.hp -= actualDamage;
      gameAudio.playHit(false, isCrit);
    }

    // Damage Number Popup
    this.damageNumbers.push({
      id: `dn-${Date.now()}-${Math.random()}`,
      x: enemy.x + (Math.random() - 0.5) * 15,
      y: enemy.y - enemy.radius - 8,
      text: isCrit ? `CRIT! -${Math.round(actualDamage)}` : `-${Math.round(actualDamage)}`,
      color: isCrit ? "#ef4444" : isShieldHit ? "#38bdf8" : "#facc15",
      alpha: 1,
      life: 0,
      isCrit,
    });

    // Hit Sparks
    for (let i = 0; i < (isCrit ? 12 : 5); i++) {
      const spd = Math.random() * 4 + 2;
      const ang = Math.random() * Math.PI * 2;
      this.particles.push({
        x: projectile.x,
        y: projectile.y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        color: isCrit ? "#ef4444" : isShieldHit ? "#38bdf8" : enemy.intel.color,
        size: Math.random() * 3 + 1,
        life: 0,
        maxLife: 20,
        alpha: 1,
        shape: "spark",
      });
    }

    // Check if Enemy Destroyed
    if (enemy.hp <= 0 && !enemy.isDestroyed) {
      enemy.isDestroyed = true;
      this.handleEnemyDestroyed(enemy);
    }

    // Update Combo & Score
    this.combo++;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    this.comboTimer = 2500; // 2.5s window
    const comboMultiplier = Math.min(1 + this.combo * 0.1, 4.0);
    this.score += Math.round(100 * comboMultiplier);
    this.emitStats();
  }

  private handleEnemyDestroyed(enemy: Enemy) {
    this.targetsDestroyed++;
    gameAudio.playExplosion(enemy.tier);

    // Screen Shake based on tier
    if (enemy.tier === "boss") this.addScreenShake(12);
    else if (enemy.tier === "hard") this.addScreenShake(8);
    else if (enemy.tier === "medium") this.addScreenShake(4);
    else this.addScreenShake(2);

    // Particle Explosion
    this.spawnExplosion(enemy);

    // Floating Intel Captured Tag
    this.floatingUnlocks.push({
      id: `fu-${Date.now()}`,
      x: enemy.x,
      y: enemy.y,
      intel: enemy.intel,
      alpha: 1,
      life: 0,
    });

    // Check if Intel is freshly unlocked
    const isNew = !this.unlockedIntelIds.has(enemy.intel.id);
    this.unlockedIntelIds.add(enemy.intel.id);

    // Play Intel unlocked sound & invoke callback
    gameAudio.playIntelUnlock();
    this.callbacks.onIntelUnlocked(enemy.intel, isNew);
    this.emitStats();
  }

  private spawnExplosion(enemy: Enemy) {
    const count = enemy.tier === "boss" ? 50 : enemy.tier === "hard" ? 35 : 20;

    // Shockwave Ring
    this.particles.push({
      x: enemy.x,
      y: enemy.y,
      vx: 0,
      vy: 0,
      color: enemy.intel.color,
      size: enemy.radius * 0.6,
      life: 0,
      maxLife: 25,
      alpha: 1,
      shape: "ring",
    });

    // High velocity debris shards & sparks
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * (enemy.tier === "boss" ? 8 : 5) + 1;
      this.particles.push({
        x: enemy.x,
        y: enemy.y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        color: i % 2 === 0 ? enemy.intel.color : "#ffffff",
        size: Math.random() * 4 + 2,
        life: 0,
        maxLife: Math.random() * 25 + 20,
        alpha: 1,
        shape: i % 3 === 0 ? "shard" : "circle",
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  private spawnShieldBreakSparks(enemy: Enemy) {
    for (let i = 0; i < 20; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 4 + 2;
      this.particles.push({
        x: enemy.x,
        y: enemy.y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        color: "#38bdf8",
        size: Math.random() * 3 + 2,
        life: 0,
        maxLife: 22,
        alpha: 1,
        shape: "spark",
      });
    }
  }

  // ==========================================
  // STATS EMISSION
  // ==========================================
  public getStats(): GameStats {
    const accuracy =
      this.shotsFired > 0
        ? Math.round((this.shotsHit / this.shotsFired) * 100)
        : 100;
    return {
      score: this.score,
      combo: this.combo,
      maxCombo: this.maxCombo,
      shotsFired: this.shotsFired,
      shotsHit: this.shotsHit,
      accuracy,
      targetsDestroyed: this.targetsDestroyed,
      intelUnlockedCount: this.unlockedIntelIds.size,
      totalIntelCount: INTEL_ITEMS.length,
    };
  }

  private emitStats() {
    this.callbacks.onStatsUpdate(this.getStats());
  }

  // ==========================================
  // RENDER CANVAS PIPELINE
  // ==========================================
  private render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();

    // Apply Screen Shake
    if (this.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(shakeX, shakeY);
    }

    // 1. Draw Sci-Fi Cyber Grid & Ambient Radar
    this.drawBackground(ctx);

    // 2. Draw Enemies
    this.enemies.forEach((enemy) => this.drawEnemy(ctx, enemy));

    // 3. Draw Projectiles
    this.drawProjectiles(ctx);

    // 4. Draw Particles
    this.drawParticles(ctx);

    // 5. Draw Floating Damage Numbers & Unlocks
    this.drawDamageNumbers(ctx);
    this.drawFloatingUnlocks(ctx);

    // 6. Draw Player Cannon & Laser Pointer
    this.drawPlayerAim(ctx);

    // 7. Draw Wave Alert Banner
    this.drawWaveBanner(ctx);

    ctx.restore();
  }

  private drawBackground(ctx: CanvasRenderingContext2D) {
    // Dark cyber gradient background
    const bgGrad = ctx.createRadialGradient(
      this.width * 0.5,
      this.height * 0.5,
      50,
      this.width * 0.5,
      this.height * 0.5,
      Math.max(this.width, this.height) * 0.8
    );
    bgGrad.addColorStop(0, "#0e131f");
    bgGrad.addColorStop(1, "#05070c");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Perspective Grid Lines
    ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
    ctx.lineWidth = 1;

    const gridSize = 40;
    for (let x = 0; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Ambient Radar Rings
    const centerX = this.width * 0.5;
    const centerY = this.height * 0.5;
    const time = performance.now() * 0.001;

    ctx.strokeStyle = "rgba(34, 197, 94, 0.04)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150 + Math.sin(time) * 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 280 + Math.cos(time) * 15, 0, Math.PI * 2);
    ctx.stroke();
  }

  private drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);

    const isHit = enemy.isHitTimer > 0;
    const glowColor = isHit ? "#ffffff" : enemy.intel.color;

    // Glowing Aura
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = isHit ? 25 : 12;

    // Draw Outer Brackets / Shield
    ctx.save();
    ctx.rotate(enemy.rotation);

    if (enemy.hasShield && enemy.shieldHp > 0) {
      // Rotating Energy Shield Arc
      ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, enemy.radius + 6, 0, Math.PI * 1.6);
      ctx.stroke();
    }

    // Main Target Body based on Tier
    if (enemy.tier === "easy") {
      // Scout Drone Sphere with Cross-Sight
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 2.5;
      ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
      ctx.beginPath();
      ctx.arc(0, 0, enemy.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner Core
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (enemy.tier === "medium") {
      // Armored Hexagon
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 3;
      ctx.fillStyle = "rgba(234, 179, 8, 0.18)";
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        const hx = Math.cos(ang) * enemy.radius;
        const hy = Math.sin(ang) * enemy.radius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Core Matrix
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Hard / Boss Titan Battleship Frame (Octagon + Wing Brackets)
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 3.5;
      ctx.fillStyle = "rgba(239, 68, 68, 0.22)";
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        const hx = Math.cos(ang) * enemy.radius;
        const hy = Math.sin(ang) * enemy.radius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Core Reactor
      ctx.fillStyle = isHit ? "#ffffff" : "#ef4444";
      ctx.beginPath();
      ctx.arc(0, 0, 11 + Math.sin(enemy.pulse * 2) * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Reset Shadow
    ctx.shadowBlur = 0;

    // Draw Intel Title / Badge
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(enemy.intel.badge, 0, -enemy.radius - 16);

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "11px sans-serif";
    ctx.fillText(enemy.intel.title, 0, enemy.radius + 18);

    // Health / Shield Bars
    const barW = enemy.radius * 2 + 10;
    const barH = 4;
    const barY = -enemy.radius - 8;

    // Background Bar
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(-barW * 0.5, barY, barW, barH);

    // Shield Bar (if active)
    if (enemy.hasShield && enemy.shieldMaxHp > 0) {
      const shieldPct = Math.max(0, enemy.shieldHp / enemy.shieldMaxHp);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(-barW * 0.5, barY - 4, barW * shieldPct, 3);
    }

    // Health Bar Fill
    const hpPct = Math.max(0, enemy.hp / enemy.maxHp);
    ctx.fillStyle =
      hpPct > 0.5 ? "#22c55e" : hpPct > 0.25 ? "#eab308" : "#ef4444";
    ctx.fillRect(-barW * 0.5, barY, barW * hpPct, barH);

    ctx.restore();
  }

  private drawProjectiles(ctx: CanvasRenderingContext2D) {
    this.projectiles.forEach((p) => {
      ctx.save();

      // Draw Laser Trail
      if (p.trail.length > 1) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.beamWidth;
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.stroke();
      }

      // Projectile Core Head
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.beamWidth * 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((part) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, part.alpha);

      if (part.shape === "ring") {
        ctx.strokeStyle = part.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size + part.life * 2.5, 0, Math.PI * 2);
        ctx.stroke();
      } else if (part.shape === "shard" && part.rotation !== undefined) {
        ctx.translate(part.x, part.y);
        ctx.rotate(part.rotation);
        ctx.fillStyle = part.color;
        ctx.fillRect(-part.size, -part.size * 0.4, part.size * 2, part.size * 0.8);
      } else {
        ctx.fillStyle = part.color;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  private drawDamageNumbers(ctx: CanvasRenderingContext2D) {
    this.damageNumbers.forEach((dn) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, dn.alpha);
      ctx.fillStyle = dn.color;
      ctx.font = dn.isCrit ? "bold 15px monospace" : "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = dn.color;
      ctx.shadowBlur = 8;
      ctx.fillText(dn.text, dn.x, dn.y);
      ctx.restore();
    });
  }

  private drawFloatingUnlocks(ctx: CanvasRenderingContext2D) {
    this.floatingUnlocks.forEach((fu) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, fu.alpha);
      ctx.fillStyle = fu.intel.color;
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = fu.intel.color;
      ctx.shadowBlur = 12;
      ctx.fillText(`★ INTEL UNLOCKED: ${fu.intel.title}`, fu.x, fu.y);
      ctx.restore();
    });
  }

  private drawPlayerAim(ctx: CanvasRenderingContext2D) {
    const originX = this.width * 0.5;
    const originY = this.height - 10;

    // Laser Targeting Guideline (faint)
    ctx.save();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(this.aimX, this.aimY);
    ctx.stroke();
    ctx.restore();

    // Turret Cannon Base
    ctx.save();
    ctx.translate(originX, originY);
    const angle = Math.atan2(this.aimY - originY, this.aimX - originX);
    ctx.rotate(angle);

    // Barrel
    ctx.fillStyle = this.currentWeapon.color;
    ctx.fillRect(0, -3, 24, 6);

    // Base Hub
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = this.currentWeapon.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    // Dynamic Crosshair at Aim Coordinates
    ctx.save();
    ctx.translate(this.aimX, this.aimY);
    ctx.strokeStyle = this.currentWeapon.color;
    ctx.lineWidth = 1.5;

    const crossSize = 10;
    const gap = 4;

    // Top
    ctx.beginPath();
    ctx.moveTo(0, -gap);
    ctx.lineTo(0, -gap - crossSize);
    ctx.stroke();

    // Bottom
    ctx.beginPath();
    ctx.moveTo(0, gap);
    ctx.lineTo(0, gap + crossSize);
    ctx.stroke();

    // Left
    ctx.beginPath();
    ctx.moveTo(-gap, 0);
    ctx.lineTo(-gap - crossSize, 0);
    ctx.stroke();

    // Right
    ctx.beginPath();
    ctx.moveTo(gap, 0);
    ctx.lineTo(gap + crossSize, 0);
    ctx.stroke();

    // Center Dot
    ctx.fillStyle = this.currentWeapon.color;
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private drawWaveBanner(ctx: CanvasRenderingContext2D) {
    if (this.waveBannerTimer <= 0) return;

    const alpha = Math.min(1, this.waveBannerTimer / 30);
    ctx.save();
    ctx.globalAlpha = alpha;

    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(0, this.height * 0.42, this.width, 60);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, this.height * 0.42, this.width, 60);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "center";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 12;
    ctx.fillText(this.waveBannerText, this.width * 0.5, this.height * 0.42 + 37);

    ctx.restore();
  }

  // ==========================================
  // MAIN ANIMATION LOOP
  // ==========================================
  private loop = (currentTime: number) => {
    if (!this.isRunning) return;

    const dt = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    this.animFrameId = requestAnimationFrame(this.loop);
  };
}
