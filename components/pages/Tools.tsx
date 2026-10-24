"use client";

import { useState } from "react";
import {
  SKILL_GROUPS,
  getSkillDetail,
  SkillDetail,
  SkillItem,
} from "@/data/tools";
import SkillDetailModal from "@/components/skills/SkillDetailModal";
import { playSkillClickSound } from "@/lib/soundEffects";

export default function Tools({ dark = false }: { dark?: boolean }) {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);

  const handleSkillClick = (skillItem: SkillItem) => {
    const detail = getSkillDetail(skillItem.id || skillItem.name);
    if (detail) {
      playSkillClickSound(1);
      setSelectedSkill(detail);
    }
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

      <div className="dp-skills-grid">
        {SKILL_GROUPS.map((group) => (
          <section className="dp-skill-group" key={group.name}>
            <h2 className="dp-skill-group-title">{group.name}</h2>
            <div className="dp-skill-tags">
              {group.skills.map((skill) => {
                const detail = getSkillDetail(skill.id || skill.name);
                const isSelected = selectedSkill?.name === skill.name;

                return (
                  <button
                    type="button"
                    key={skill.name}
                    onClick={() => handleSkillClick(skill)}
                    className={`dp-skill-tag relative cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--surface)]"
                        : ""
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
                      className="w-1.5 h-1.5 rounded-full opacity-60 hover:opacity-100 transition-opacity ml-0.5"
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

      {/* Interactive Modal Inspector */}
      <SkillDetailModal
        dark={dark}
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectSkill={(nextSkill) => setSelectedSkill(nextSkill)}
      />
    </div>
  );
}
