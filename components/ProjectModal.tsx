"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/data/projectData";
import { AiOutlineGithub, AiFillYoutube } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: ProjectCard | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape key press and manage scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  // Parse technologies into individual items
  const techList = project.technologies
    ? project.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Parse key features bullet points
  const featureList = project.key_features
    ? project.key_features
        .split("\n")
        .map((f) => f.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean)
    : [];

  const displayTitle = project.shortTitle || project.title;
  const linkedinUrl =
    project.linkedin || "https://www.linkedin.com/in/paras-rana-696b7731b/";
  const youtubeUrl = project.youtube || project.video;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl xl:max-w-6xl max-h-[92vh] flex flex-col md:flex-row rounded-2xl sm:rounded-3xl border border-neutral-800/90 bg-[#0d0d0f] text-white shadow-2xl shadow-black/80 overflow-hidden z-10"
        >
          {/* Left Column: Video Player */}
          <div className="w-full md:w-[50%] lg:w-[48%] bg-black flex items-center justify-center relative min-h-[260px] sm:min-h-[340px] md:min-h-[540px] border-b md:border-b-0 md:border-r border-neutral-800/80 flex-shrink-0">
            <video
              ref={videoRef}
              src={project.video}
              controls
              playsInline
              loop
              autoPlay
              muted
              preload="auto"
              className="w-full h-full max-h-[320px] sm:max-h-[420px] md:max-h-[640px] object-contain bg-black"
            />
          </div>

          {/* Right Column: Scrollable Content */}
          <div className="flex-1 flex flex-col min-w-0 max-h-[58vh] md:max-h-[88vh] overflow-y-auto modal-scrollbar p-5 sm:p-7 md:p-8 bg-[#0f0f12]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800/80">
              <div className="min-w-0 flex-1">
                <h2
                  id="modal-project-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase font-sans"
                >
                  {displayTitle}
                </h2>
                {project.category && (
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase mt-1">
                    {project.category}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-5 pb-6 flex flex-wrap gap-2.5 sm:gap-3 items-center">
              {/* GitHub Button */}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white font-bold text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  <AiOutlineGithub size={18} />
                  <span>GITHUB</span>
                </a>
              )}

              {/* LinkedIn Button */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white font-bold text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <FaLinkedin size={16} />
                <span>LINKEDIN</span>
              </a>

              {/* Live Website Button */}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white font-bold text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  <FiExternalLink size={16} />
                  <span>LIVE WEBSITE</span>
                </a>
              )}

              {/* YouTube / Video Demo Button */}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff0000] hover:bg-[#e60000] text-white font-bold text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-red-950/40"
                >
                  <AiFillYoutube size={20} />
                  <span>YOUTUBE</span>
                </a>
              )}
            </div>

            {/* Project Details Sections */}
            <div className="space-y-6 text-left">
              {/* Project Description */}
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">
                  PROJECT DESCRIPTION
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-300 font-normal">
                  {project.long_desc || project.description}
                </p>
              </div>

              {/* Technologies */}
              {techList.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2.5">
                    TECHNOLOGIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900/95 border border-neutral-800 text-neutral-300 font-mono text-xs tracking-wide hover:border-neutral-700 transition-colors shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {featureList.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2.5">
                    KEY FEATURES
                  </h3>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-neutral-300">
                    {featureList.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* Custom scrollbar for modal content */
        .modal-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 15, 18, 0.6);
        }
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(80, 80, 90, 0.5);
          border-radius: 4px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 120, 130, 0.8);
        }
      `}</style>
    </AnimatePresence>
  );
}
