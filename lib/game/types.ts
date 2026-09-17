import { IntelItem, Weapon, EnemyTier } from "@/data/gameData";

export interface Enemy {
  id: string;
  tier: EnemyTier;
  intel: IntelItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxHp: number;
  hp: number;
  shieldMaxHp: number;
  shieldHp: number;
  hasShield: boolean;
  rotation: number;
  rotationSpeed: number;
  pattern: "hover" | "zigzag" | "sine" | "orbit" | "boss";
  patternPhase: number;
  spawnTime: number;
  pulse: number;
  isHitTimer: number;
  isDestroyed: boolean;
  weakPointAngle?: number;
}

export interface Projectile {
  id: string;
  startX: number;
  startY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  damage: number;
  color: string;
  beamWidth: number;
  life: number;
  maxLife: number;
  isCrit: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  alpha: number;
  shape: "circle" | "spark" | "shard" | "ring";
  rotation?: number;
  vRot?: number;
}

export interface DamageNumber {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  life: number;
  isCrit: boolean;
}

export interface FloatingUnlock {
  id: string;
  x: number;
  y: number;
  intel: IntelItem;
  alpha: number;
  life: number;
}

export interface GameStats {
  score: number;
  combo: number;
  maxCombo: number;
  shotsFired: number;
  shotsHit: number;
  accuracy: number;
  targetsDestroyed: number;
  intelUnlockedCount: number;
  totalIntelCount: number;
}
