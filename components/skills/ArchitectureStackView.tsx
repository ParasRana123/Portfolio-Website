"use client";

import { motion } from "framer-motion";
import { SkillDetail, getSkillDetail } from "@/data/tools";
import { playSkillClickSound } from "@/lib/soundEffects";
import {
  FiArrowDown,
  FiTerminal,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiCloud,
  FiShare2,
} from "react-icons/fi";

interface ArchitectureStackViewProps {
  onSelectSkill: (skill: SkillDetail) => void;
}

interface StackLayer {
  id: string;
  title: string;
  icon: React.ElementType;
  tagline: string;
  latencyBadge: string;
  accentColor: string;
  skillIds: string[];
  powersProjects: string[];
}

export default function ArchitectureStackView({
  onSelectSkill,
}: ArchitectureStackViewProps) {
  const layers: StackLayer[] = [
    {
      id: "client",
      title: "1. Client Experience & Reactive Edge",
      icon: FiGlobe,
      tagline: "Ultra-responsive client rendering, Web Audio synthesis & accessible UI",
      latencyBadge: "60 FPS / <100ms LCP",
      accentColor: "#61DAFB",
      skillIds: ["nextjs", "react", "typescript", "javascript", "html5", "css3"],
      powersProjects: ["Modern Portfolio", "Musor Collaborative UI", "Peer Chatapp"],
    },
    {
      id: "realtime",
      title: "2. Realtime Gateway & Wire Protocols",
      icon: FiShare2,
      tagline: "Bi-directional multiplexed streaming & compact binary serialization",
      latencyBadge: "<18ms sync / 7x wire speedup",
      accentColor: "#244c5a",
      skillIds: ["websockets", "grpc", "protobuf"],
      powersProjects: ["Musor Room Sync", "Omegle Signaling", "Vector RPC"],
    },
    {
      id: "ai_backend",
      title: "3. AI Workforce & Microservices Orchestration",
      icon: FiTerminal,
      tagline: "Asynchronous multi-agent execution graphs, tool dispatch & business context",
      latencyBadge: "142ms / 6 AI Agents",
      accentColor: "#009688",
      skillIds: ["fastapi", "langchain", "python", "nodejs", "express"],
      powersProjects: ["Veqiro AI Workforce", "Celeb Lookalike", "NOVA Voice Assistant"],
    },
    {
      id: "systems",
      title: "4. Low-Level Systems & Distributed Consensus",
      icon: FiCpu,
      tagline: "Hardware-accelerated AVX2 SIMD intrinsics & Raft state machine consensus",
      latencyBadge: "11.4µs / 0 Syscalls",
      accentColor: "#00599C",
      skillIds: ["cpp", "golang", "linux", "vectordb"],
      powersProjects: ["Vector DB from Scratch", "Raft Replicated KV Store", "User-Level Threading"],
    },
    {
      id: "storage",
      title: "5. In-Memory Caching & ACID Persistence",
      icon: FiDatabase,
      tagline: "Sub-millisecond key-value caching, normalized relational schemas & vector ANN",
      latencyBadge: "0.68ms Redis / ACID",
      accentColor: "#DC382D",
      skillIds: ["redis", "postgresql", "vectordb", "mongodb", "sql", "mysql"],
      powersProjects: ["Distributed Session Cache", "Defence Audit Logs", "Vector ANN Index"],
    },
    {
      id: "infrastructure",
      title: "6. Containerization, Cloud & CI/CD",
      icon: FiCloud,
      tagline: "Zero-downtime rolling updates, minimal Alpine containers & automated delivery",
      latencyBadge: "99.95% SLA / 65MB Images",
      accentColor: "#2496ED",
      skillIds: ["docker", "kubernetes", "aws", "gcp", "azure", "cicd", "github"],
      powersProjects: ["Kubernetes Rolling Deployments", "GitHub Actions CI/CD", "AWS CloudFront"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] text-xs text-[var(--muted)] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[var(--ink)] font-semibold">
            End-to-End System Topology
          </span>
          <span className="hidden sm:inline-block">
            — How Paras integrates low-level systems, AI agents, and client interfaces
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--accent)]">
          Click any node to inspect blueprint & live benchmark
        </span>
      </div>

      <div className="relative space-y-4">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;

          return (
            <div key={layer.id} className="relative">
              {/* Connector Pipe between layers */}
              {idx > 0 && (
                <div className="flex justify-center -my-2.5 relative z-0">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--hairline)] text-[10px] font-mono text-[var(--muted)]">
                    <FiArrowDown className="w-3 h-3 text-[var(--accent)] animate-bounce" />
                    <span>inter-layer pipe</span>
                  </div>
                </div>
              )}

              {/* Layer Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="relative z-10 p-4 sm:p-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm hover:border-[var(--accent)] transition-all"
                style={{
                  borderLeft: `4px solid ${layer.accentColor}`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${layer.accentColor} 15%, transparent)`,
                        color: layer.accentColor,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-['Space_Grotesk',sans-serif] text-[var(--ink)]">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-[var(--muted)] font-mono">
                        {layer.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto px-2.5 py-1 text-[11px] font-mono font-semibold rounded-full border border-[var(--hairline)] bg-[var(--bg)] text-[var(--accent)] shadow-sm">
                    ⚡ {layer.latencyBadge}
                  </span>
                </div>

                {/* Layer Skills Grid */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--hairline)]/60">
                  {layer.skillIds.map((skillId) => {
                    const skill = getSkillDetail(skillId);
                    if (!skill) return null;

                    return (
                      <button
                        type="button"
                        key={skill.id}
                        onClick={() => {
                          playSkillClickSound(1.05);
                          onSelectSkill(skill);
                        }}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--hairline)] bg-[var(--bg)] hover:border-[var(--accent)] hover:bg-[var(--surface)] text-xs font-mono text-[var(--ink)] transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                        title={`Inspect ${skill.name} blueprint`}
                      >
                        <img
                          src={skill.logo}
                          alt=""
                          className="w-3.5 h-3.5 object-contain group-hover:scale-110 transition-transform pointer-events-none"
                        />
                        <span className="font-medium">{skill.name}</span>
                        <span
                          className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: skill.brandColor }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Powers Projects Footer */}
                <div className="mt-3 pt-2 text-[11px] font-mono text-[var(--muted)] flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-[var(--ink)]">Powers:</span>
                  {layer.powersProjects.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--hairline)] text-[var(--muted)]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
