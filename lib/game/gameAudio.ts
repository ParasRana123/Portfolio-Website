/**
 * Procedural Web Audio Synthesizer for "Shoot to Discover" Game
 * Generates all sound effects dynamically via Web Audio API without requiring any audio files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const storedMute = localStorage.getItem("shoot_game_muted");
      this.muted = storedMute === "true";
    }
  }

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("shoot_game_muted", String(muted));
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.45, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Sound effect for firing weapons
   */
  public playShoot(type: "laser" | "plasma" | "railgun" | "shotgun" = "laser") {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;

    if (type === "laser") {
      // Crisp retro blaster laser
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === "plasma") {
      // Dual detuned pulse burst
      [580, 610].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.16);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 0.17);
      });
    } else if (type === "railgun") {
      // Heavy kinetic charge + high-energy zap
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(1400, now);
      osc1.frequency.exponentialRampToValueAtTime(60, now + 0.35);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(120, now);
      osc2.frequency.linearRampToValueAtTime(35, now + 0.4);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else if (type === "shotgun") {
      // Scatter shot: punchy noise burst + low tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.22);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.23);
    }
  }

  /**
   * Sound effect when a projectile hits an enemy or shield
   */
  public playHit(isShield = false, isCrit = false) {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (isCrit) {
      // High-pitched critical ping
      osc.type = "sine";
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.08);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    } else if (isShield) {
      // Metallic shield deflection
      osc.type = "triangle";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.07);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    } else {
      // Standard target hit thud
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Sound effect when an enemy explodes and is destroyed
   */
  public playExplosion(tier: "easy" | "medium" | "hard" | "boss" = "easy") {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const duration = tier === "boss" ? 0.7 : tier === "hard" ? 0.5 : tier === "medium" ? 0.35 : 0.22;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(tier === "boss" ? 180 : 260, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + duration);

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.linearRampToValueAtTime(20, now + duration);

    const initialGain = tier === "boss" ? 0.6 : tier === "hard" ? 0.5 : 0.35;
    gain.gain.setValueAtTime(initialGain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration);
    subOsc.stop(now + duration);
  }

  /**
   * Sound effect when discovering/unlocking new intelligence
   */
  public playIntelUnlock() {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    // Harmonious 4-note ascending futuristic chord (C5, E5, G5, B5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  }

  /**
   * Sound effect for wave start
   */
  public playWaveAlert() {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.linearRampToValueAtTime(660, now + 0.15);
    osc.frequency.linearRampToValueAtTime(440, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * Sound effect for game victory / all intel unlocked
   */
  public playVictoryFanfare() {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const chords = [
      [523.25, 659.25, 783.99], // C Major
      [587.33, 739.99, 880.0],  // D Major
      [659.25, 830.61, 987.77], // E Major
      [1046.5, 1318.5, 1567.98], // High C Major
    ];

    chords.forEach((chord, i) => {
      const chordStart = now + i * 0.18;
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, chordStart);

        gain.gain.setValueAtTime(0, chordStart);
        gain.gain.linearRampToValueAtTime(0.18, chordStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, chordStart + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(chordStart);
        osc.stop(chordStart + 0.52);
      });
    });
  }

  /**
   * Sound effect for switching weapons
   */
  public playWeaponSwitch() {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.07);
  }
}

export const gameAudio = new SoundEngine();
