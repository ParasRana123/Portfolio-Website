"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press, autofocus, and manage scroll locking
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

      const videoEl = videoRef.current;

      // Attempt safe video playback
      if (videoEl) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {
          // Autoplay was prevented (e.g. browser policy), controls are available for user
        });
      }

      // Focus close button or modal container for immediate keyboard support
      const focusTimeout = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
        clearTimeout(focusTimeout);
        if (videoEl) {
          videoEl.pause();
        }
      };
    }
  }, [project, onClose]);

  if (!project || !mounted) return null;

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

  const displayTitle = project.title;
  const linkedinUrl =
    project.linkedin || "https://www.linkedin.com/in/paras-rana-696b7731b/";
  const youtubeUrl = project.youtube || project.video;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          style={{ fontFamily: '"Inter", sans-serif' }}
          className="relative m-auto my-auto w-full max-w-5xl xl:max-w-6xl max-h-[88vh] flex flex-col md:flex-row rounded-2xl sm:rounded-3xl border border-neutral-800 bg-[#0c0c0e] text-white shadow-2xl shadow-black overflow-hidden z-10 font-sans"
        >
          {/* Left Column: Video Player */}
          <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative min-h-[240px] sm:min-h-[320px] md:min-h-[500px] border-b md:border-b-0 md:border-r border-neutral-800/90 flex-shrink-0 self-stretch">
            <video
              ref={videoRef}
              src={project.video}
              controls
              playsInline
              loop
              autoPlay
              muted
              preload="auto"
              className="w-full h-full max-h-[280px] sm:max-h-[360px] md:max-h-[580px] object-contain bg-black"
            />
          </div>

          {/* Right Column: Scrollable Content */}
          <div className="flex-1 flex flex-col min-w-0 max-h-[48vh] md:max-h-[88vh] overflow-y-auto modal-scrollbar p-5 sm:p-7 md:p-8 bg-[#0e0e11]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800/80">
              <div className="min-w-0 flex-1">
                <h2
                  id="modal-project-title"
                  className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug uppercase"
                  style={{ fontFamily: '"Inter", sans-serif', textTransform: "uppercase" }}
                >
                  {displayTitle}
                </h2>
                {project.category && (
                  <p
                    className="text-[11px] sm:text-xs font-medium tracking-wider text-neutral-400 uppercase mt-0.5"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {project.category}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
              >
                <FiX size={19} />
              </button>
            </div>

            {/* Action Buttons Grid / Row */}
            <div className="pt-4 pb-5 space-y-2.5">
              {/* Row 1: GitHub & LinkedIn */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#232328] border border-neutral-700/70 text-white font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <AiOutlineGithub size={18} />
                    <span>GITHUB</span>
                  </a>
                )}

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#232328] border border-neutral-700/70 text-white font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaLinkedin size={16} />
                  <span>LINKEDIN</span>
                </a>
              </div>

              {/* Row 2: YouTube / Video Demo & Live Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#cc0812] text-white font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-red-950/40"
                  >
                    <AiFillYoutube size={20} />
                    <span>YOUTUBE</span>
                  </a>
                )}

                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#232328] border border-neutral-700/70 text-white font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FiExternalLink size={16} />
                    <span>LIVE WEBSITE</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Details Sections */}
            <div className="space-y-6 text-left">
              {/* Project Description */}
              <div>
                <h3
                  className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  PROJECT DESCRIPTION
                </h3>
                <p
                  className="text-sm sm:text-[14.5px] leading-relaxed text-neutral-300 font-normal"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {project.long_desc || project.description}
                </p>
              </div>

              {/* Technologies */}
              {techList.length > 0 && (
                <div>
                  <h3
                    className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2.5"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    TECHNOLOGIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#161619] border border-neutral-800 text-neutral-300 text-xs font-medium tracking-wide hover:border-neutral-700 transition-colors"
                        style={{ fontFamily: '"Inter", sans-serif' }}
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
                  <h3
                    className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2.5"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    KEY FEATURES
                  </h3>
                  <ul
                    className="space-y-2.5 text-sm leading-relaxed text-neutral-300 font-normal"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
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
          background: rgba(14, 14, 17, 0.6);
        }
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 75, 85, 0.5);
          border-radius: 4px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(115, 115, 125, 0.8);
        }
      `}</style>
    </AnimatePresence>,
    document.body
  );
}
