"use client";

import { GameStats } from "@/lib/game/types";
import {
  Trophy,
  Award,
  RotateCcw,
  Infinity as InfinityIcon,
  BookOpen,
  ExternalLink,
  Sparkles,
  Target,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface GameVictoryModalProps {
  isOpen: boolean;
  stats: GameStats;
  onOpenCodex: () => void;
  onRestart: () => void;
  onEndless: () => void;
  onClose: () => void;
}

export default function GameVictoryModal({
  isOpen,
  stats,
  onOpenCodex,
  onRestart,
  onEndless,
  onClose,
}: GameVictoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="dp-game-victory-overlay">
      <div className="dp-game-victory-modal" role="dialog" aria-label="Mission Victory Debriefing">
        {/* Header Icon & Title */}
        <div className="text-center">
          <div className="dp-game-victory-trophy-box">
            <Trophy size={36} className="text-amber-400 animate-bounce" />
          </div>

          <span className="dp-mono text-xs text-amber-400 font-bold uppercase tracking-widest block mt-2">
            MISSION ACCOMPLISHED // ARENA CLEARED
          </span>
          <h2 className="dp-game-victory-title">PARAS RANA DOSSIER DECRYPTED</h2>
          <p className="dp-game-victory-desc">
            You successfully destroyed all targets across all tiers and uncovered complete intelligence on Paras&apos;s background, skills, and flagship projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="dp-game-victory-stats-grid">
          <div className="dp-game-victory-stat-card">
            <span className="dp-mono text-[10px] text-slate-400 uppercase">FINAL SCORE</span>
            <span className="dp-game-victory-stat-val text-amber-300">
              {stats.score.toLocaleString()}
            </span>
          </div>

          <div className="dp-game-victory-stat-card">
            <span className="dp-mono text-[10px] text-slate-400 uppercase">ACCURACY</span>
            <span className="dp-game-victory-stat-val text-emerald-400">
              <Target size={14} className="inline mr-1" />
              {stats.accuracy}%
            </span>
          </div>

          <div className="dp-game-victory-stat-card">
            <span className="dp-mono text-[10px] text-slate-400 uppercase">MAX STREAK</span>
            <span className="dp-game-victory-stat-val text-rose-400">
              <Flame size={14} className="inline mr-1" />
              {stats.maxCombo}x
            </span>
          </div>

          <div className="dp-game-victory-stat-card">
            <span className="dp-mono text-[10px] text-slate-400 uppercase">INTEL CAPTURED</span>
            <span className="dp-game-victory-stat-val text-sky-400">
              <CheckCircle2 size={14} className="inline mr-1" />
              {stats.intelUnlockedCount} / {stats.totalIntelCount}
            </span>
          </div>
        </div>

        {/* Unlocked Tiers Checklist */}
        <div className="dp-game-victory-tiers-checklist">
          <div className="dp-game-victory-tier-item">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">🟢 Tier 1: Basic Information</span>
              <span className="text-[11px] text-slate-400">Name, IIIT Nagpur, B.Tech CSE (2027), Background</span>
            </div>
          </div>

          <div className="dp-game-victory-tier-item">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">🟡 Tier 2: Skills Arsenal</span>
              <span className="text-[11px] text-slate-400">C++, React, Node.js, PostgreSQL, ML, GenAI, WebSockets</span>
            </div>
          </div>

          <div className="dp-game-victory-tier-item">
            <CheckCircle2 size={16} className="text-rose-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">🔴 Tier 3: Projects &amp; CP Masterclass</span>
              <span className="text-[11px] text-slate-400">LeetCode Guardian 2210, Musor, SIH Defence, Resumes</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="dp-game-victory-actions">
          <button
            type="button"
            className="dp-game-btn dp-game-btn--primary"
            onClick={onOpenCodex}
          >
            <BookOpen size={16} />
            <span>Browse Intel Codex</span>
          </button>

          <a
            href="https://drive.google.com/file/d/1oHGxltfftvUB5vEWj_l3zU3wF3q9byDR/view"
            target="_blank"
            rel="noopener noreferrer"
            className="dp-game-btn dp-game-btn--resume"
          >
            <Sparkles size={16} className="text-amber-400" />
            <span>View SDE Resume</span>
            <ExternalLink size={13} />
          </a>

          <button
            type="button"
            className="dp-game-btn dp-game-btn--secondary"
            onClick={onEndless}
          >
            <InfinityIcon size={16} />
            <span>Endless Sandbox Mode</span>
          </button>

          <button
            type="button"
            className="dp-game-btn dp-game-btn--outline"
            onClick={onRestart}
          >
            <RotateCcw size={16} />
            <span>Replay Arena</span>
          </button>

          <button
            type="button"
            className="dp-game-btn dp-game-btn--ghost"
            onClick={onClose}
          >
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
