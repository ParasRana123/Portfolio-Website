"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { IntelItem } from "@/data/gameData";
import {
  Sparkles,
  X,
  CheckCircle2,
  ExternalLink,
  Play,
  BookOpen,
  User,
  Building,
  GraduationCap,
  Calendar,
  Compass,
  Code,
  Layout,
  Server,
  Database,
  Brain,
  Radio,
  Trophy,
  Music,
  ShieldAlert,
  Video,
  FileText,
  Target,
  Zap,
} from "lucide-react";

interface IntelFullscreenModalProps {
  intel: IntelItem | null;
  queueCount?: number;
  onResume: () => void;
  onOpenCodex: () => void;
  autoResumeSeconds?: number;
}

// Icon mapper for dynamic intel item icons
function renderIntelIcon(iconName: string, color: string, size = 32) {
  const iconProps = { size, style: { color } };
  switch (iconName) {
    case "user":
      return <User {...iconProps} />;
    case "building":
      return <Building {...iconProps} />;
    case "graduation-cap":
      return <GraduationCap {...iconProps} />;
    case "calendar":
      return <Calendar {...iconProps} />;
    case "compass":
      return <Compass {...iconProps} />;
    case "code":
      return <Code {...iconProps} />;
    case "layout":
      return <Layout {...iconProps} />;
    case "server":
      return <Server {...iconProps} />;
    case "database":
      return <Database {...iconProps} />;
    case "brain":
      return <Brain {...iconProps} />;
    case "sparkles":
      return <Sparkles {...iconProps} />;
    case "radio":
      return <Radio {...iconProps} />;
    case "trophy":
      return <Trophy {...iconProps} />;
    case "music":
      return <Music {...iconProps} />;
    case "shield-alert":
      return <ShieldAlert {...iconProps} />;
    case "video":
      return <Video {...iconProps} />;
    case "file-text":
      return <FileText {...iconProps} />;
    default:
      return <Target {...iconProps} />;
  }
}

export default function IntelFullscreenModal({
  intel,
  queueCount = 0,
  onResume,
  onOpenCodex,
  autoResumeSeconds = 4.5,
}: IntelFullscreenModalProps) {
  const [timeLeft, setTimeLeft] = useState(autoResumeSeconds);
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const onResumeRef = useRef(onResume);
  onResumeRef.current = onResume;

  const handleManualResume = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onResumeRef.current();
    }, 200);
  }, []);

  // Reset timer on intel change
  useEffect(() => {
    if (!intel) return;
    setTimeLeft(autoResumeSeconds);
    setIsExiting(false);
  }, [intel, autoResumeSeconds]);

  // Countdown timer effect
  useEffect(() => {
    if (!intel || isHovered || isExiting) return;

    const intervalMs = 100;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - intervalMs / 1000;
        if (next <= 0) {
          clearInterval(timer);
          handleManualResume();
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intel, isHovered, isExiting, handleManualResume]);

  if (!intel) return null;

  const progressPercent = Math.max(
    0,
    Math.min(100, (timeLeft / autoResumeSeconds) * 100)
  );

  const rarityGlowMap: Record<string, string> = {
    Common: "rgba(34, 197, 94, 0.4)",
    Rare: "rgba(234, 179, 8, 0.4)",
    Epic: "rgba(239, 68, 68, 0.4)",
    Legendary: "rgba(168, 85, 247, 0.5)",
  };

  const rarityBgMap: Record<string, string> = {
    Common: "rgba(34, 197, 94, 0.15)",
    Rare: "rgba(234, 179, 8, 0.15)",
    Epic: "rgba(239, 68, 68, 0.15)",
    Legendary: "rgba(168, 85, 247, 0.18)",
  };

  return (
    <div
      className={`dp-game-intel-fullscreen-overlay ${
        isExiting ? "is-closing" : "is-active"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dp-intel-fullscreen-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--intel-glow": intel.color,
          "--intel-rarity-glow":
            rarityGlowMap[intel.rarity] || "rgba(56, 189, 248, 0.4)",
        } as React.CSSProperties
      }
    >
      {/* Background Cyber Grid & Vignette */}
      <div className="dp-game-intel-fs-backdrop" />

      {/* Main Fullscreen Tactical Dossier Card */}
      <div className="dp-game-intel-fs-card">
        {/* Corner Cyber Brackets */}
        <span className="dp-game-fs-corner dp-game-fs-corner--tl" />
        <span className="dp-game-fs-corner dp-game-fs-corner--tr" />
        <span className="dp-game-fs-corner dp-game-fs-corner--bl" />
        <span className="dp-game-fs-corner dp-game-fs-corner--br" />

        {/* Top Decryption Status Bar */}
        <div className="dp-game-intel-fs-header">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="dp-game-intel-fs-status-pill">
              <span className="dp-game-intel-fs-pulse-dot" />
              <CheckCircle2 size={13} className="text-emerald-400 inline mr-1" />
              TARGET DESTROYED // DOSSIER DECRYPTED
            </span>

            <span
              className="dp-game-intel-fs-rarity-pill"
              style={{
                color: intel.color,
                borderColor: intel.color,
                backgroundColor: rarityBgMap[intel.rarity] || "rgba(255, 255, 255, 0.05)",
              }}
            >
              {intel.rarity.toUpperCase()} INTEL
            </span>

            <span className="dp-game-intel-fs-badge-pill">
              {intel.badge}
            </span>

            {queueCount > 1 && (
              <span className="dp-game-intel-fs-queue-pill">
                +{queueCount - 1} MORE QUEUED
              </span>
            )}
          </div>

          <button
            type="button"
            className="dp-game-intel-fs-close-btn"
            onClick={handleManualResume}
            aria-label="Resume game"
            title="Resume Battle (Esc / Space)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="dp-game-intel-fs-body">
          {/* Hologram Icon & Classification Section */}
          <div className="dp-game-intel-fs-hero">
            <div
              className="dp-game-intel-fs-icon-hologram"
              style={{
                borderColor: intel.color,
                boxShadow: `0 0 30px ${intel.color}55, inset 0 0 20px ${intel.color}22`,
              }}
            >
              <div className="dp-game-intel-fs-icon-rings" />
              {renderIntelIcon(intel.icon, intel.color, 42)}
            </div>

            <div className="dp-game-intel-fs-hero-text">
              <div className="dp-game-intel-fs-category">
                CLASSIFIED ARCHIVE // {intel.category.toUpperCase()}
              </div>
              <h2 id="dp-intel-fullscreen-title" className="dp-game-intel-fs-title">
                {intel.title}
              </h2>
              <p className="dp-game-intel-fs-subtitle">{intel.subtitle}</p>
            </div>
          </div>

          {/* Primary Decrypted Intel Callout Box */}
          <div
            className="dp-game-intel-fs-value-card"
            style={{
              borderLeftColor: intel.color,
            }}
          >
            <div className="dp-game-intel-fs-value-header">
              <Zap size={14} style={{ color: intel.color }} />
              <span className="dp-mono text-[11px] font-bold uppercase tracking-wider text-slate-300">
                DECRYPTED INTELLIGENCE DATA
              </span>
            </div>
            <p className="dp-game-intel-fs-value-text">{intel.value}</p>
          </div>

          {/* Detailed Bullet Points Section */}
          {intel.details && intel.details.length > 0 && (
            <div className="dp-game-intel-fs-details-section">
              <h4 className="dp-game-intel-fs-details-heading">
                KEY SPECIFICATIONS &amp; CAPABILITIES:
              </h4>
              <ul className="dp-game-intel-fs-details-list">
                {intel.details.map((detail, idx) => (
                  <li key={idx} className="dp-game-intel-fs-detail-item">
                    <span
                      className="dp-game-intel-fs-bullet"
                      style={{ backgroundColor: intel.color }}
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actionable Profile & Code Links */}
          {intel.links && intel.links.length > 0 && (
            <div className="dp-game-intel-fs-links-group">
              <span className="dp-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                EXTERNAL VERIFICATION ARTIFACTS:
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {intel.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dp-game-intel-fs-link-btn"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer & Auto-Resume Countdown */}
        <div className="dp-game-intel-fs-footer">
          {/* Countdown Progress Track */}
          <div className="dp-game-intel-fs-countdown-wrapper">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="dp-game-hud-live-dot" />
                {isHovered ? (
                  <span className="text-amber-300">COUNTDOWN PAUSED (HOVER ACTIVE)</span>
                ) : (
                  <span>
                    AUTO-RESUMING COMBAT IN{" "}
                    <strong className="text-sky-300 font-bold">
                      {Math.max(0, timeLeft).toFixed(1)}s
                    </strong>
                  </span>
                )}
              </span>
              <span className="text-[11px] text-slate-500">
                [SPACE / ENTER] TO RESUME
              </span>
            </div>

            <div className="dp-game-intel-fs-progress-track">
              <div
                className="dp-game-intel-fs-progress-fill"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: intel.color,
                  boxShadow: `0 0 10px ${intel.color}`,
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="dp-game-intel-fs-actions">
            <button
              type="button"
              className="dp-game-btn dp-game-btn--primary dp-game-intel-fs-resume-btn"
              onClick={handleManualResume}
            >
              <Play size={16} />
              <span>Resume Battle</span>
              <kbd className="dp-game-kbd">SPACE</kbd>
            </button>

            <button
              type="button"
              className="dp-game-btn dp-game-btn--secondary"
              onClick={() => {
                setIsExiting(true);
                setTimeout(() => {
                  onResumeRef.current();
                  onOpenCodex();
                }, 150);
              }}
            >
              <BookOpen size={16} />
              <span>Open Full Codex</span>
              <kbd className="dp-game-kbd">C</kbd>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
