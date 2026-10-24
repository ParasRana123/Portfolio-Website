"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiTerminal,
  FiCode,
  FiFileText,
  FiCheck,
  FiCopy,
  FiPlay,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import { SkillDetail, getSkillDetail, SKILL_DETAILS } from "@/data/tools";
import {
  playCloseSound,
  playTabSwitchSound,
  playBenchmarkStartSound,
  playBenchmarkCompleteSound,
  playSkillClickSound,
} from "@/lib/soundEffects";

interface SkillDetailModalProps {
  skill: SkillDetail | null;
  onClose: () => void;
  onSelectSkill: (skill: SkillDetail) => void;
  dark?: boolean;
}

export default function SkillDetailModal({
  skill,
  onClose,
  onSelectSkill,
  dark = false,
}: SkillDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"resume" | "code" | "benchmark">("resume");
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [hasRunBenchmark, setHasRunBenchmark] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const allSkillsList = Object.values(SKILL_DETAILS);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset tab and benchmark state when skill changes
  useEffect(() => {
    if (skill) {
      setActiveTab("resume");
      setIsCopied(false);
      setIsSimulating(false);
      setHasRunBenchmark(false);
      setSimulationProgress(0);
      setSimulatedLogs(skill.benchmark.logs.slice(0, 2));
    }
  }, [skill]);

  const navigateSkill = useCallback(
    (direction: number) => {
      if (!skill) return;
      const currentIndex = allSkillsList.findIndex((s) => s.id === skill.id);
      if (currentIndex === -1) return;
      const nextIndex =
        (currentIndex + direction + allSkillsList.length) % allSkillsList.length;
      playSkillClickSound(direction > 0 ? 1.05 : 0.95);
      onSelectSkill(allSkillsList[nextIndex]);
    },
    [skill, allSkillsList, onSelectSkill]
  );

  // Handle keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playCloseSound();
        onClose();
      } else if (e.key === "ArrowRight") {
        navigateSkill(1);
      } else if (e.key === "ArrowLeft") {
        navigateSkill(-1);
      }
    };

    if (skill) {
      window.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [skill, onClose, navigateSkill]);

  const handleCopyCode = () => {
    if (!skill) return;
    navigator.clipboard.writeText(skill.architectureSnippet.code);
    setIsCopied(true);
    playTabSwitchSound();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const runBenchmarkSimulation = () => {
    if (!skill || isSimulating) return;

    playBenchmarkStartSound();
    setIsSimulating(true);
    setSimulationProgress(0);
    setSimulatedLogs([]);
    setHasRunBenchmark(true);

    const fullLogs = skill.benchmark.logs;
    const totalSteps = fullLogs.length;

    fullLogs.forEach((log, index) => {
      setTimeout(() => {
        setSimulatedLogs((prev) => [...prev, log]);
        setSimulationProgress(Math.round(((index + 1) / totalSteps) * 100));

        if (index === totalSteps - 1) {
          setIsSimulating(false);
          playBenchmarkCompleteSound();
        }
      }, (index + 1) * 380);
    });
  };

  if (!skill || !mounted) return null;

  const currentSkillIndex = allSkillsList.findIndex((s) => s.id === skill.id);

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => {
            playCloseSound();
            onClose();
          }}
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="relative w-full max-w-2xl bg-[var(--surface)] border border-[var(--hairline)] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
          style={{
            boxShadow: `0 24px 60px -15px rgba(0,0,0,0.4), 0 0 30px ${skill.accentGlow}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Decorative Cyber Rim */}
          <div
            className="h-1.5 w-full transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.brandColor}, var(--accent), transparent)`,
            }}
          />

          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[var(--hairline)] bg-[var(--surface)]/95 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {/* Animated Glow Logo Container */}
              <div
                className="relative flex items-center justify-center w-14 h-14 rounded-xl border border-[var(--hairline)] bg-[var(--bg)] shadow-inner flex-shrink-0 group"
                style={{
                  boxShadow: `0 0 20px ${skill.accentGlow}`,
                }}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--surface)] animate-pulse"
                  style={{ backgroundColor: skill.brandColor }}
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2
                    id="skill-modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] font-['Space_Grotesk',sans-serif]"
                  >
                    {skill.name}
                  </h2>

                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full border border-[var(--hairline)] bg-[var(--bg)] text-[var(--muted)]">
                    {skill.category}
                  </span>

                  <span
                    className="px-2.5 py-0.5 text-[10.5px] font-mono font-medium rounded-full"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${skill.brandColor} 18%, transparent)`,
                      color: skill.brandColor,
                      border: `1px solid color-mix(in srgb, ${skill.brandColor} 40%, transparent)`,
                    }}
                  >
                    {skill.proficiencyTier}
                  </span>
                </div>

                <p className="text-xs text-[var(--muted)] font-mono truncate">
                  ⚡ {skill.experienceContext}
                </p>
              </div>
            </div>

            {/* Controls (Prev, Next, Close) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => navigateSkill(-1)}
                className="p-1.5 rounded-lg border border-[var(--hairline)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--bg)] transition-colors"
                title="Previous skill (Left Arrow)"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateSkill(1)}
                className="p-1.5 rounded-lg border border-[var(--hairline)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--bg)] transition-colors"
                title="Next skill (Right Arrow)"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playCloseSound();
                  onClose();
                }}
                className="p-1.5 rounded-lg border border-[var(--hairline)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--bg)] transition-colors ml-1"
                aria-label="Close skill modal"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tagline Strip */}
          <div className="px-5 py-2.5 bg-[var(--bg)]/60 border-b border-[var(--hairline)] text-xs text-[var(--ink)]/90 font-sans flex items-center justify-between">
            <span>{skill.tagline}</span>
            <span className="text-[10px] font-mono text-[var(--muted)] hidden sm:inline-block">
              {currentSkillIndex + 1} of {allSkillsList.length}
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center px-5 border-b border-[var(--hairline)] bg-[var(--surface)] gap-2 pt-2">
            <button
              onClick={() => {
                setActiveTab("resume");
                playTabSwitchSound();
              }}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium font-mono border-b-2 transition-all ${
                activeTab === "resume"
                  ? "border-[var(--accent)] text-[var(--ink)] font-bold"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <FiFileText className="w-3.5 h-3.5 text-[var(--accent)]" />
              Resume Impact & Projects
            </button>

            <button
              onClick={() => {
                setActiveTab("code");
                playTabSwitchSound();
              }}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium font-mono border-b-2 transition-all ${
                activeTab === "code"
                  ? "border-[var(--accent)] text-[var(--ink)] font-bold"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <FiCode className="w-3.5 h-3.5 text-[var(--accent)]" />
              Architecture Blueprint
            </button>

            <button
              onClick={() => {
                setActiveTab("benchmark");
                playTabSwitchSound();
              }}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium font-mono border-b-2 transition-all ${
                activeTab === "benchmark"
                  ? "border-[var(--accent)] text-[var(--ink)] font-bold"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <FiTerminal className="w-3.5 h-3.5 text-[var(--accent)]" />
              Live Diagnostic
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {/* Tab 1: Resume Highlights */}
            {activeTab === "resume" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5 flex items-center gap-2">
                    <FiLayers className="w-3.5 h-3.5 text-[var(--accent)]" />
                    How Paras Leverages {skill.name} in Real Systems
                  </h3>
                  <ul className="space-y-2">
                    {skill.resumeHighlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink)]/90 leading-relaxed p-2.5 rounded-lg bg-[var(--bg)]/50 border border-[var(--hairline)]"
                      >
                        <span className="text-[var(--accent)] font-bold mt-0.5">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Projects */}
                {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FiExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
                      Related Projects & Deployments
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {skill.relatedProjects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--hairline)] bg-[var(--bg)]"
                        >
                          <div>
                            <p className="text-xs font-semibold text-[var(--ink)]">
                              {proj.title}
                            </p>
                            <p className="text-[11px] font-mono text-[var(--muted)]">
                              {proj.role}
                            </p>
                          </div>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                            >
                              <FiExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 2: Architecture Blueprint */}
            {activeTab === "code" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-xs font-mono font-medium text-[var(--muted)] ml-1">
                      {skill.architectureSnippet.filename}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border border-[var(--hairline)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--bg)] transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl border border-[var(--hairline)] bg-[#0d1117] p-4 overflow-x-auto shadow-inner text-emerald-400 font-mono text-xs leading-relaxed max-h-80">
                  <pre className="text-slate-200">
                    <code>{skill.architectureSnippet.code}</code>
                  </pre>
                </div>

                <div className="p-3 rounded-lg border border-[var(--hairline)] bg-[var(--bg)]/60 text-xs text-[var(--muted)]">
                  <strong className="text-[var(--ink)]">Engineering Rationale: </strong>
                  {skill.architectureSnippet.explanation}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Live Benchmark & Diagnostic Simulation */}
            {activeTab === "benchmark" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Metric Summary Card */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-[var(--hairline)] bg-[var(--bg)]">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[var(--muted)] block">
                      Target Metric
                    </span>
                    <span className="text-lg sm:text-xl font-bold font-['Space_Grotesk',sans-serif] text-[var(--accent)]">
                      {skill.benchmark.metric}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-[var(--muted)] block">
                      Benchmark Profile
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--ink)]">
                      {skill.benchmark.label}
                    </span>
                  </div>
                </div>

                {/* Interactive Terminal */}
                <div className="rounded-xl border border-emerald-950/60 bg-[#070b10] p-4 font-mono text-xs shadow-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                      <FiCpu className="w-3.5 h-3.5 animate-pulse" />
                      <span>PARAS_SYS_DIAGNOSTIC_v2.4</span>
                    </div>

                    <button
                      onClick={runBenchmarkSimulation}
                      disabled={isSimulating}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs rounded font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulating...</span>
                        </>
                      ) : (
                        <>
                          <FiPlay className="w-3.5 h-3.5" />
                          <span>{hasRunBenchmark ? "Re-Run Diagnostic" : "Run Live Diagnostic"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Command input prompt */}
                  <div className="text-slate-400 text-xs flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-slate-300">{skill.benchmark.command}</span>
                  </div>

                  {/* Progress Bar */}
                  {isSimulating && (
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-emerald-400 h-full"
                        style={{ width: `${simulationProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )}

                  {/* Terminal Log Stream */}
                  <div className="space-y-1.5 min-h-[110px] text-[11.5px] leading-relaxed pt-1">
                    {simulatedLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500 flex-shrink-0">
                          [{idx < 10 ? `0${idx}` : idx}]
                        </span>
                        <span className="text-emerald-300/90">{log}</span>
                      </div>
                    ))}
                    {!isSimulating && hasRunBenchmark && (
                      <div className="pt-2 text-emerald-400 font-bold flex items-center gap-2">
                        <FiCheck className="w-4 h-4" />
                        <span>VERIFIED: Diagnostic finished successfully (Exit Code 0).</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer: Connected Skills Quick Explorer */}
          {skill.relatedSkills && skill.relatedSkills.length > 0 && (
            <div className="p-4 bg-[var(--surface)] border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[var(--muted)] text-[11px]">
                Connected in Stack:
              </span>

              <div className="flex flex-wrap gap-1.5">
                {skill.relatedSkills.map((relId) => {
                  const relSkill = getSkillDetail(relId);
                  if (!relSkill) return null;
                  return (
                    <button
                      key={relId}
                      onClick={() => {
                        playSkillClickSound(1.1);
                        onSelectSkill(relSkill);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--hairline)] hover:border-[var(--accent)] bg-[var(--bg)] text-[11px] font-mono text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      <img
                        src={relSkill.logo}
                        alt=""
                        className="w-3 h-3 object-contain"
                      />
                      <span>{relSkill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
