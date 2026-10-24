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
import ArchitectureStackView from "@/components/skills/ArchitectureStackView";
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
  FiGrid,
  FiGitMerge,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Tools() {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isMuted, setIsMuted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "pipeline">("grid");

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
    <div className="dp-inspiration-page">
      <div className="dp-inspiration-intro">
        <p className="dp-inspiration">
          A glimpse into the tools, technologies, and platforms that turn my
          ideas into things people can actually use.
          <br />
          From the first line of code to the final deployment, these are the
          tools I keep within reach.
        </p>
      </div>

      {/* View Mode & Controls Strip */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* View Mode Toggle */}
          <div className="inline-flex p-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] self-start sm:self-auto shadow-sm">
            <button
              onClick={() => {
                setViewMode("grid");
                playTabSwitchSound();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === "grid"
                  ? "bg-[var(--accent)] text-white font-semibold shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <FiGrid className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>

            <button
              onClick={() => {
                setViewMode("pipeline");
                playTabSwitchSound();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === "pipeline"
                  ? "bg-[var(--accent)] text-white font-semibold shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <FiGitMerge className="w-3.5 h-3.5" />
              <span>System Topology</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-[var(--muted)] hidden sm:inline-block">
            {viewMode === "grid" ? "Categorized skill nodes" : "End-to-end architecture pipeline"}
          </span>
        </div>

        {viewMode === "grid" && (
          <>
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
          </>
        )}
      </div>

      {/* Main Content Area */}
      {viewMode === "pipeline" ? (
        <ArchitectureStackView
          onSelectSkill={(skill) => {
            playSkillClickSound(1);
            setSelectedSkill(skill);
          }}
        />
      ) : filteredGroups.length === 0 ? (
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
