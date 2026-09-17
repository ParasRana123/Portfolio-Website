"use client";

import { useEffect, useState } from "react";
import { IntelItem } from "@/data/gameData";
import { Sparkles, X, ChevronRight, CheckCircle2 } from "lucide-react";

interface IntelNotificationBannerProps {
  intel: IntelItem | null;
  onClose: () => void;
  onOpenCodex: () => void;
}

export default function IntelNotificationBanner({
  intel,
  onClose,
  onOpenCodex,
}: IntelNotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (intel) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [intel, onClose]);

  if (!intel) return null;

  return (
    <div
      className={`dp-game-intel-banner ${isVisible ? "is-visible" : ""}`}
      style={{ "--intel-glow": intel.color } as React.CSSProperties}
    >
      <div className="dp-game-intel-banner-icon-box">
        <Sparkles size={18} style={{ color: intel.color }} />
      </div>

      <div className="dp-game-intel-banner-body">
        <div className="dp-game-intel-banner-header">
          <span className="dp-game-intel-badge" style={{ color: intel.color, borderColor: intel.color }}>
            {intel.badge}
          </span>
          <span className="dp-game-intel-status">
            <CheckCircle2 size={12} className="inline mr-1" /> UNLOCKED
          </span>
        </div>

        <h4 className="dp-game-intel-title">{intel.title}</h4>
        <p className="dp-game-intel-value">{intel.value}</p>
      </div>

      <div className="dp-game-intel-banner-actions">
        <button
          type="button"
          className="dp-game-intel-btn-view"
          onClick={() => {
            setIsVisible(false);
            onOpenCodex();
          }}
        >
          <span>Codex</span>
          <ChevronRight size={13} />
        </button>

        <button
          type="button"
          className="dp-game-intel-btn-close"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 250);
          }}
          aria-label="Close intel banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
