"use client";

import { Weapon, GAME_WEAPONS } from "@/data/gameData";
import { GameStats } from "@/lib/game/types";
import {
  Volume2,
  VolumeX,
  BookOpen,
  Pause,
  Play,
  X,
  Crosshair,
  Sparkles,
  Flame,
  Zap,
} from "lucide-react";

interface GameHUDProps {
  currentWave: number;
  waveName: string;
  stats: GameStats;
  currentWeapon: Weapon;
  isPaused: boolean;
  isMuted: boolean;
  onSelectWeapon: (weapon: Weapon) => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onOpenCodex: () => void;
  onCloseGame: () => void;
}

export default function GameHUD({
  currentWave,
  waveName,
  stats,
  currentWeapon,
  isPaused,
  isMuted,
  onSelectWeapon,
  onTogglePause,
  onToggleMute,
  onOpenCodex,
  onCloseGame,
}: GameHUDProps) {
  return (
    <div className="dp-game-hud-container">
      {/* TOP STATUS BAR */}
      <div className="dp-game-hud-top">
        {/* Left: Wave & Target Intel Tier Indicator */}
        <div className="dp-game-hud-block dp-game-hud-wave-block">
          <div className="flex items-center gap-2">
            <span className="dp-game-hud-live-dot" />
            <span className="dp-mono text-xs font-bold text-sky-400">
              COMBAT ARENA
            </span>
            <span className="dp-game-hud-wave-pill">
              WAVE {currentWave}
            </span>
          </div>
          <h2 className="dp-game-hud-wave-title truncate">{waveName}</h2>
        </div>

        {/* Center: Score & Combo Multiplier */}
        <div className="dp-game-hud-block dp-game-hud-score-block">
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <span className="dp-mono text-[10px] uppercase text-slate-400 block">SCORE</span>
              <span className="dp-game-hud-score-num">{stats.score.toLocaleString()}</span>
            </div>

            {stats.combo > 1 && (
              <div className="dp-game-hud-combo-badge animate-pulse">
                <Flame size={13} className="text-amber-400" />
                <span className="dp-mono text-xs font-bold text-amber-300">
                  {stats.combo}x STREAK
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-1 text-[11px] text-slate-400 font-mono">
            <span>ACC: <strong className="text-emerald-400">{stats.accuracy}%</strong></span>
            <span>HITS: <strong className="text-sky-300">{stats.shotsHit}</strong></span>
          </div>
        </div>

        {/* Right: Intel Counter & Quick Utility Actions */}
        <div className="dp-game-hud-block dp-game-hud-actions-block">
          <button
            type="button"
            className="dp-game-hud-btn dp-game-hud-btn--codex"
            onClick={onOpenCodex}
            title="Open Intel Codex (Key: C)"
          >
            <BookOpen size={15} />
            <span className="dp-mono text-xs font-semibold">
              INTEL: {stats.intelUnlockedCount}/{stats.totalIntelCount}
            </span>
            {stats.intelUnlockedCount > 0 && (
              <span className="dp-game-hud-codex-sparkle">
                <Sparkles size={11} className="text-amber-400" />
              </span>
            )}
          </button>

          <button
            type="button"
            className="dp-game-hud-btn dp-game-hud-btn--icon"
            onClick={onToggleMute}
            title={isMuted ? "Unmute Audio (Key: M)" : "Mute Audio (Key: M)"}
            aria-label="Toggle audio mute"
          >
            {isMuted ? <VolumeX size={16} className="text-rose-400" /> : <Volume2 size={16} className="text-emerald-400" />}
          </button>

          <button
            type="button"
            className="dp-game-hud-btn dp-game-hud-btn--icon"
            onClick={onTogglePause}
            title={isPaused ? "Resume Game (Esc)" : "Pause Game (Esc)"}
            aria-label="Toggle pause"
          >
            {isPaused ? <Play size={16} className="text-amber-400" /> : <Pause size={16} />}
          </button>

          <button
            type="button"
            className="dp-game-hud-btn dp-game-hud-btn--close"
            onClick={onCloseGame}
            title="Exit Shooting Range"
            aria-label="Exit Game"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* BOTTOM ARSENAL DOCK */}
      <div className="dp-game-hud-bottom">
        <div className="dp-game-hud-weapons-rack">
          {GAME_WEAPONS.map((w, idx) => {
            const isSelected = currentWeapon.id === w.id;

            return (
              <button
                key={w.id}
                type="button"
                className={`dp-game-hud-weapon-btn ${isSelected ? "is-selected" : ""}`}
                style={{ "--weapon-color": w.color } as React.CSSProperties}
                onClick={() => onSelectWeapon(w)}
                title={`${w.name}: ${w.description}`}
              >
                <div className="dp-game-hud-weapon-key">[{idx + 1}]</div>
                <div className="dp-game-hud-weapon-info">
                  <span className="dp-game-hud-weapon-name">{w.name}</span>
                  <span className="dp-game-hud-weapon-dmg">
                    <Zap size={10} className="inline mr-0.5" />
                    DMG: {w.damage}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tactical Controls Hint */}
        <div className="dp-game-hud-controls-hint">
          <span className="flex items-center gap-1.5">
            <Crosshair size={12} className="text-sky-400" />
            <strong className="text-slate-200">AIM:</strong> MOUSE / TOUCH
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-200">SHOOT:</strong> LEFT CLICK / TAP
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-200">WEAPONS:</strong> 1-4
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-200">CODEX:</strong> C
          </span>
        </div>
      </div>
    </div>
  );
}
