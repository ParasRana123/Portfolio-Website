"use client";

import { useState } from "react";
import { INTEL_ITEMS, IntelCategory, IntelItem } from "@/data/gameData";
import {
  X,
  Lock,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Code2,
  FolderGit2,
} from "lucide-react";

interface GameCodexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedIds: string[];
}

export default function GameCodexDrawer({
  isOpen,
  onClose,
  unlockedIds,
}: GameCodexDrawerProps) {
  const [selectedTab, setSelectedTab] = useState<"all" | IntelCategory>("all");
  const [activeItem, setActiveItem] = useState<IntelItem | null>(null);

  if (!isOpen) return null;

  const unlockedSet = new Set(unlockedIds);
  const totalItems = INTEL_ITEMS.length;
  const unlockedCount = INTEL_ITEMS.filter((i) => unlockedSet.has(i.id)).length;
  const progressPct = Math.round((unlockedCount / totalItems) * 100);

  const filteredItems = INTEL_ITEMS.filter((item) => {
    if (selectedTab === "all") return true;
    return item.category === selectedTab;
  });

  return (
    <div className="dp-game-codex-overlay" onClick={onClose}>
      <div
        className="dp-game-codex-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Portfolio Intel Codex"
      >
        {/* Header */}
        <div className="dp-game-codex-header">
          <div className="dp-game-codex-header-title-box">
            <BookOpen size={20} className="text-sky-400" />
            <div>
              <h3 className="dp-game-codex-title">PARAS RANA // INTEL CODEX</h3>
              <p className="dp-game-codex-subtitle">
                Classified Personnel Dossier &amp; Technical Capabilities
              </p>
            </div>
          </div>

          <button
            type="button"
            className="dp-game-codex-close"
            onClick={onClose}
            aria-label="Close codex"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="dp-game-codex-progress-box">
          <div className="dp-game-codex-progress-labels">
            <span className="dp-mono text-xs text-sky-400">
              DECRYPTION STATUS: {unlockedCount} / {totalItems} ITEMS UNLOCKED
            </span>
            <span className="dp-mono text-xs font-semibold text-emerald-400">
              {progressPct}% COMPLETE
            </span>
          </div>
          <div className="dp-game-codex-progress-track">
            <div
              className="dp-game-codex-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="dp-game-codex-tabs">
          <button
            type="button"
            className={`dp-game-codex-tab ${selectedTab === "all" ? "is-active" : ""}`}
            onClick={() => setSelectedTab("all")}
          >
            <Layers size={14} />
            <span>All Intel ({totalItems})</span>
          </button>
          <button
            type="button"
            className={`dp-game-codex-tab ${selectedTab === "basic" ? "is-active" : ""}`}
            onClick={() => setSelectedTab("basic")}
          >
            <Sparkles size={14} className="text-emerald-400" />
            <span>Basic Info</span>
          </button>
          <button
            type="button"
            className={`dp-game-codex-tab ${selectedTab === "skills" ? "is-active" : ""}`}
            onClick={() => setSelectedTab("skills")}
          >
            <Code2 size={14} className="text-yellow-400" />
            <span>Skills &amp; Tech</span>
          </button>
          <button
            type="button"
            className={`dp-game-codex-tab ${selectedTab === "projects" ? "is-active" : ""}`}
            onClick={() => setSelectedTab("projects")}
          >
            <FolderGit2 size={14} className="text-rose-400" />
            <span>Projects</span>
          </button>
          <button
            type="button"
            className={`dp-game-codex-tab ${selectedTab === "achievements" ? "is-active" : ""}`}
            onClick={() => setSelectedTab("achievements")}
          >
            <Award size={14} className="text-amber-400" />
            <span>Achievements</span>
          </button>
        </div>

        {/* Intel Grid */}
        <div className="dp-game-codex-grid">
          {filteredItems.map((item) => {
            const isUnlocked = unlockedSet.has(item.id);

            return (
              <div
                key={item.id}
                className={`dp-game-codex-card ${isUnlocked ? "is-unlocked" : "is-locked"}`}
                style={{ "--card-accent": item.color } as React.CSSProperties}
                onClick={() => isUnlocked && setActiveItem(item)}
              >
                <div className="dp-game-codex-card-header">
                  <span
                    className="dp-game-codex-card-badge"
                    style={{
                      color: isUnlocked ? item.color : "rgba(255, 255, 255, 0.4)",
                      borderColor: isUnlocked ? item.color : "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {item.badge}
                  </span>

                  <span className="dp-game-codex-card-status">
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                        <CheckCircle2 size={12} /> UNLOCKED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400/70 text-xs font-mono">
                        <Lock size={12} /> ENCRYPTED
                      </span>
                    )}
                  </span>
                </div>

                <h4 className="dp-game-codex-card-title">
                  {isUnlocked ? item.title : "CLASSIFIED INTEL"}
                </h4>

                <p className="dp-game-codex-card-val">
                  {isUnlocked ? item.value : `Shoot ${item.tier.toUpperCase()} targets in arena to decrypt.`}
                </p>

                {isUnlocked && item.details && (
                  <ul className="dp-game-codex-card-details">
                    {item.details.slice(0, 2).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}

                {isUnlocked && item.links && item.links.length > 0 && (
                  <div className="dp-game-codex-card-links" onClick={(e) => e.stopPropagation()}>
                    {item.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dp-game-codex-link-btn"
                      >
                        <span>{link.label}</span>
                        <ExternalLink size={11} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Detail Popover if item clicked */}
        {activeItem && (
          <div className="dp-game-codex-item-modal-overlay" onClick={() => setActiveItem(null)}>
            <div
              className="dp-game-codex-item-modal"
              onClick={(e) => e.stopPropagation()}
              style={{ "--modal-glow": activeItem.color } as React.CSSProperties}
            >
              <div className="dp-game-codex-item-modal-head">
                <span className="dp-game-intel-badge" style={{ color: activeItem.color, borderColor: activeItem.color }}>
                  {`${activeItem.badge} // ${activeItem.rarity.toUpperCase()}`}
                </span>
                <button
                  type="button"
                  className="dp-game-codex-close"
                  onClick={() => setActiveItem(null)}
                >
                  <X size={16} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mt-2">{activeItem.title}</h3>
              <p className="text-sm text-sky-300 font-mono mt-0.5">{activeItem.subtitle}</p>

              <div className="dp-game-codex-item-modal-value-box">
                <p className="text-base font-semibold text-white">{activeItem.value}</p>
              </div>

              {activeItem.details && (
                <div className="mt-3">
                  <h5 className="text-xs font-mono uppercase text-slate-400 mb-1.5">Intelligence Specifications</h5>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {activeItem.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">›</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeItem.links && activeItem.links.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap gap-2">
                  {activeItem.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dp-game-codex-link-btn dp-game-codex-link-btn--primary"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
