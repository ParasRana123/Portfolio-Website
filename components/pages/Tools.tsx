"use client";

import { useState, useMemo } from "react";
import {
  SKILL_GROUPS,
  SKILL_DETAILS,
  getSkillDetail,
  SkillDetail,
  SkillItem,
} from "@/data/tools";
import SkillDetailModal from "@/components/skills/SkillDetailModal";
import {
  playSkillClickSound,
  playTabSwitchSound,
  toggleSkillAudio,
  isSkillAudioMuted,
} from "@/lib/soundEffects";
import {
  FiSearch,
  FiX,
  FiVolume2,
  FiVolumeX,
  FiCpu,
  FiLayers,
  FiAward,
  FiCode,
  FiZap,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Tools() {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isMuted, setIsMuted] = useState(false);

  const categories = useMemo(() => {
    return ["All", ...SKILL_GROUPS.map((g) => g.name)];
  }, []);

  const totalSkillsCount = useMemo(() => {
    return SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0);
  }, []);

  // Filter skills based on active category and search query
  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return SKILL_GROUPS.map((group) => {
      // If a specific category is selected, skip others
      if (activeCategory !== "All" && group.name !== activeCategory) {
        return null;
      }

      const matchingSkills = group.skills.filter((skill) => {
        if (!q) return true;
        const detail = getSkillDetail(skill.id || skill.name);
        const nameMatches = skill.name.toLowerCase().includes(q);
        const tagMatches = detail?.tagline.toLowerCase().includes(q);
        const highlightMatches = detail?.resumeHighlights.some((h) =>
          h.toLowerCase().includes(q)
        );
        const projectMatches = detail?.relatedProjects.some((p) =>
          p.title.toLowerCase().includes(q)
        );
        return nameMatches || tagMatches || highlightMatches || projectMatches;
      });

      if (matchingSkills.length === 0) return null;

      return {
        ...group,
        skills: matchingSkills,
      };
    }).filter(Boolean) as typeof SKILL_GROUPS;
  }, [searchQuery, activeCategory]);

  const handleSkillClick = (skillItem: SkillItem) => {
    const detail = getSkillDetail(skillItem.id || skillItem.name);
    if (detail) {
      playSkillClickSound(1);
      setSelectedSkill(detail);
    }
  };

  const handleAudioToggle = () => {
    const nextState = toggleSkillAudio();
    setIsMuted(nextState);
  };

  return (
    <div className="dp-inspiration-page pb-12">
      {/* Intro Header */}
      <div className="dp-inspiration-intro mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-mono font-bold">
              λ
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[var(--ink)] tracking-tight">
              Technical Stack & Intelligence Matrix
            </h1>
          </div>

          {/* Sound Toggle Pill */}
          <button
            onClick={handleAudioToggle}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--hairline)] hover:border-[var(--accent)] bg-[var(--surface)] text-[11px] font-mono text-[var(--muted)] hover:text-[var(--ink)] transition-colors shadow-sm"
            title={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
          >
            {isMuted ? (
              <>
                <FiVolumeX className="w-3.5 h-3.5 text-red-400" />
                <span>Audio Muted</span>
              </>
            ) : (
              <>
                <FiVolume2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>SFX Active</span>
              </>
            )}
          </button>
        </div>

        <p className="dp-inspiration text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          From low-level C++ SIMD vector search to distributed Go Raft consensus,
          AI multi-agent orchestration, and high-concurrency WebSockets — these
          are the battle-tested technologies I design, build, and deploy with.
        </p>

        {/* Interactive Guidance Banner */}
        <div className="mt-4 p-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 text-xs text-[var(--ink)] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span>
              Click any skill below to inspect architecture code blueprints,
              diagnostics, and real resume impact.
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
            <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--hairline)]">
              ⌨ Esc to close
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--hairline)] hidden sm:inline-block">
              ← → to cycle
            </span>
          </div>
        </div>
      </div>

      {/* Systems Radar / Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        <div className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-1">
            <span>TOTAL SKILLS</span>
            <FiLayers className="w-3.5 h-3.5 text-[var(--accent)]" />
          </div>
          <p className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[var(--ink)]">
            {totalSkillsCount}+ Tech
          </p>
        </div>

        <div className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-1">
            <span>LOW-LEVEL SYSTEMS</span>
            <FiCpu className="w-3.5 h-3.5 text-[var(--accent)]" />
          </div>
          <p className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[var(--ink)]">
            C++, SIMD, Raft
          </p>
        </div>

        <div className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-1">
            <span>AI & REALTIME</span>
            <FiZap className="w-3.5 h-3.5 text-[var(--accent)]" />
          </div>
          <p className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[var(--ink)]">
            Veqiro 6-Agent
          </p>
        </div>

        <div className="p-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-1">
            <span>ALGORITHMS</span>
            <FiAward className="w-3.5 h-3.5 text-[var(--accent)]" />
          </div>
          <p className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[var(--ink)]">
            Guardian 2202
          </p>
        </div>
      </div>

      {/* Controls Strip: Search & Filter Tabs */}
      <div className="space-y-3 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, projects, or concepts (e.g., C++, Raft, FastAPI, SIMD, Redis)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] text-sm text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  playTabSwitchSound();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-[var(--accent)] text-white border-[var(--accent)] font-semibold shadow-sm"
                    : "bg-[var(--surface)] border-[var(--hairline)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--muted)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredGroups.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-[var(--hairline)] rounded-2xl bg-[var(--surface)]/50">
          <p className="text-sm font-mono text-[var(--muted)] mb-3">
            No technologies found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="px-4 py-1.5 rounded-lg border border-[var(--hairline)] hover:border-[var(--accent)] text-xs font-mono text-[var(--ink)] bg-[var(--surface)] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="dp-skills-grid">
          {filteredGroups.map((group) => (
            <section className="dp-skill-group group" key={group.name}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="dp-skill-group-title !mb-0">{group.name}</h2>
                <span className="text-[11px] font-mono text-[var(--muted)]">
                  {group.skills.length} items
                </span>
              </div>

              <div className="dp-skill-tags">
                {group.skills.map((skill) => {
                  const detail = getSkillDetail(skill.id || skill.name);
                  const isHovered = selectedSkill?.name === skill.name;

                  return (
                    <button
                      type="button"
                      key={skill.name}
                      onClick={() => handleSkillClick(skill)}
                      className={`dp-skill-tag relative cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                        isHovered ? "border-[var(--accent)] bg-[var(--surface)]" : ""
                      }`}
                      data-skill={skill.name}
                      title={`Inspect ${skill.name} architecture & benchmarks`}
                    >
                      <img
                        src={skill.logo}
                        alt=""
                        className="dp-skill-logo pointer-events-none"
                      />
                      <span className="font-medium">{skill.name}</span>

                      {/* Micro pulse dot indicating interactivity */}
                      <span
                        className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity ml-0.5"
                        style={{
                          backgroundColor: detail?.brandColor || "var(--accent)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Interactive Modal Inspector */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectSkill={(nextSkill) => setSelectedSkill(nextSkill)}
      />
    </div>
  );
}
