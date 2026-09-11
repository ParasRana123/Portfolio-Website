"use client";

import { useState, useRef, useEffect } from "react";
import { PARAGRAPHS } from "@/data/paragraphs";
import { Sparkles, ChevronDown, Code2, Brain, ExternalLink } from "lucide-react";

const SDE_RESUME_URL =
  "https://drive.google.com/file/d/1oHGxltfftvUB5vEWj_l3zU3wF3q9byDR/view";
const AIML_RESUME_URL =
  "https://drive.google.com/file/d/1PWYSdLrPIxbm9y_nHmuVRUWfwyJx_IVh/view";

export default function Introduction() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isResumeOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setIsResumeOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsResumeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isResumeOpen]);

  const handleOpenChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-paras-chat", {
          detail: {
            prompt: "Who is Paras Rana and what are his main areas of expertise?",
          },
        })
      );
    }
  };

  return (
    <div className="dp-intro">
      {PARAGRAPHS.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="dp-intro-actions">
        {/* Resume Dropdown */}
        <div className="dp-resume-dropdown-wrapper" ref={resumeRef}>
          <button
            type="button"
            className={`dp-intro-action dp-intro-action--primary dp-resume-trigger ${
              isResumeOpen ? "is-active" : ""
            }`}
            onClick={() => setIsResumeOpen((prev) => !prev)}
            aria-expanded={isResumeOpen}
            aria-haspopup="true"
            aria-label="View Resume options"
          >
            <span>View Resume</span>
            <ChevronDown
              size={13}
              className={`dp-resume-chevron ${isResumeOpen ? "is-open" : ""}`}
            />
          </button>

          {isResumeOpen && (
            <div className="dp-resume-dropdown" role="menu">
              <div className="dp-resume-dropdown-header">
                <span className="dp-mono">SELECT RESUME</span>
              </div>

              <a
                className="dp-resume-item"
                href={SDE_RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setIsResumeOpen(false)}
              >
                <div className="dp-resume-item-icon-box dp-resume-item-icon-box--sde">
                  <Code2 size={16} />
                </div>
                <div className="dp-resume-item-content">
                  <div className="dp-resume-item-title-row">
                    <span className="dp-resume-item-title">SDE Resume</span>
                    <ExternalLink size={12} className="dp-resume-item-ext" />
                  </div>
                  <span className="dp-resume-item-desc">
                    Full-Stack &amp; Backend Systems
                  </span>
                </div>
              </a>

              <a
                className="dp-resume-item"
                href={AIML_RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setIsResumeOpen(false)}
              >
                <div className="dp-resume-item-icon-box dp-resume-item-icon-box--aiml">
                  <Brain size={16} />
                </div>
                <div className="dp-resume-item-content">
                  <div className="dp-resume-item-title-row">
                    <span className="dp-resume-item-title">AI/ML Resume</span>
                    <ExternalLink size={12} className="dp-resume-item-ext" />
                  </div>
                  <span className="dp-resume-item-desc">
                    Machine Learning &amp; AI Systems
                  </span>
                </div>
              </a>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleOpenChat}
          className="dp-intro-action dp-intro-action--ai"
          title="Chat with Paras's AI assistant"
        >
          <Sparkles size={13} className="dp-sparkle-intro" />
          <span>Ask AI</span>
        </button>

        <a
          className="dp-intro-action dp-intro-action--contact"
          href="#contact"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
