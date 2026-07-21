"use client";

import { useRef, useState } from "react";
import {
  PROJECTS_DATA,
  ProjectCard as ProjectCardType,
} from "@/data/projectData";

const GRADIENTS = [
  "linear-gradient(135deg, #f6b93b 0%, #e1650f 45%, #6c5ce7 100%)",
  "linear-gradient(135deg, #38ada9 0%, #3c6382 55%, #60a3bc 100%)",
  "linear-gradient(135deg, #eb5e9c 0%, #e15f41 50%, #f6b93b 100%)",
  "linear-gradient(135deg, #786fa6 0%, #574b90 50%, #303952 100%)",
  "linear-gradient(135deg, #f8b400 0%, #de5246 55%, #955ba5 100%)",
];

function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 5.5v13l11-6.5-11-6.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardType;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const gradient = GRADIENTS[index % GRADIENTS.length];

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  };

  return (
    <article className="dp-project-card">
      {/* Project Header */}
      <div className="dp-project-header">
        <div
          className="dp-project-avatar"
          style={{ background: gradient }}
        >
          {project.title.charAt(0)}
        </div>

        <div className="dp-project-heading">
          <span className="dp-project-title">
            {project.title}
          </span>

          <span className="dp-project-handle">
            personal project
          </span>
        </div>
      </div>

      {/* Project Description */}
      <p className="dp-project-description">
        {project.description}
      </p>

      {/* Project Video */}
      <div
        className="dp-project-media"
        style={{ background: gradient }}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={
          isPlaying
            ? `Pause ${project.title} video`
            : `Play ${project.title} video`
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePlay();
          }
        }}
      >
        <div className="dp-project-frame">
          <video
            ref={videoRef}
            src={project.video}
            className="dp-project-video"
            playsInline
            loop
            muted
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {!isPlaying && (
            <div className="dp-project-play-overlay">
              <span className="dp-project-play-button">
                <PlayIcon />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Website Link */}
      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="dp-project-link"
        >
          <span>Visit site</span>
          <span className="dp-project-link-arrow">↗</span>
        </a>
      )}

      <style jsx>{`
        .dp-project-card {
          break-inside: avoid;
          margin-bottom: 28px;
          padding: 26px;
          border-radius: 22px;
          border: 1px solid #e9e9e9;
          background: #ffffff;
          box-shadow:
            0 2px 5px rgba(0, 0, 0, 0.025),
            0 8px 24px rgba(0, 0, 0, 0.035);
          transition:
            box-shadow 0.25s ease,
            transform 0.25s ease,
            border-color 0.25s ease;
        }

        .dp-project-card:hover {
          box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.04),
            0 14px 34px rgba(0, 0, 0, 0.08);
          transform: translateY(-3px);
          border-color: #dddddd;
        }

        /* --------------------------------
           Header
        -------------------------------- */

        .dp-project-header {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 16px;
        }

        .dp-project-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.2),
            0 3px 8px rgba(0, 0, 0, 0.12);
        }

        .dp-project-heading {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          line-height: 1.3;
        }

        .dp-project-title {
          font-weight: 650;
          font-size: 16px;
          line-height: 1.35;
          color: #16181c;
          letter-spacing: -0.01em;
        }

        .dp-project-handle {
          margin-top: 3px;
          font-size: 12.5px;
          line-height: 1.3;
          color: #92969d;
        }

        /* --------------------------------
           Description
        -------------------------------- */

        .dp-project-description {
          font-size: 14px;
          line-height: 1.65;
          color: #555960;
          margin: 0 0 20px 0;
          letter-spacing: -0.005em;
        }

        /* --------------------------------
           Video
        -------------------------------- */

        .dp-project-media {
          border-radius: 18px;
          padding: 12px;
          cursor: pointer;
          outline: none;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .dp-project-media:hover {
          transform: scale(1.005);
        }

        .dp-project-media:focus-visible {
          box-shadow:
            0 0 0 3px rgba(29, 122, 224, 0.2);
        }

        .dp-project-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 13px;
          overflow: hidden;
          background: #0b0b0d;
          box-shadow:
            0 5px 14px rgba(0, 0, 0, 0.12),
            0 1px 3px rgba(0, 0, 0, 0.15);
        }

        .dp-project-video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #0b0b0d;
        }

        /* --------------------------------
           Play Button
        -------------------------------- */

        .dp-project-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.12);
          pointer-events: none;
          transition: background 0.2s ease;
        }

        .dp-project-media:hover .dp-project-play-overlay {
          background: rgba(0, 0, 0, 0.18);
        }

        .dp-project-play-button {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(45, 45, 45, 0.62);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
          backdrop-filter: blur(5px);
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .dp-project-media:hover .dp-project-play-button {
          transform: scale(1.08);
          background: rgba(30, 30, 30, 0.78);
        }

        /* --------------------------------
           Website Link
        -------------------------------- */

        .dp-project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 18px;
          padding: 7px 0;
          font-size: 13.5px;
          font-weight: 550;
          color: #1d7ae0;
          text-decoration: none;
          transition:
            color 0.2s ease,
            gap 0.2s ease;
        }

        .dp-project-link-arrow {
          font-size: 15px;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        .dp-project-link:hover {
          color: #125eb5;
          text-decoration: none;
          gap: 8px;
        }

        .dp-project-link:hover .dp-project-link-arrow {
          transform: translate(2px, -2px);
        }

        /* --------------------------------
           Tablet
        -------------------------------- */

        @media (max-width: 1024px) {
          .dp-project-card {
            padding: 22px;
          }

          .dp-project-media {
            padding: 10px;
          }
        }

        /* --------------------------------
           Mobile
        -------------------------------- */

        @media (max-width: 640px) {
          .dp-project-card {
            margin-bottom: 22px;
            padding: 20px;
            border-radius: 20px;
          }

          .dp-project-header {
            gap: 11px;
            margin-bottom: 14px;
          }

          .dp-project-avatar {
            width: 42px;
            height: 42px;
            font-size: 15px;
          }

          .dp-project-title {
            font-size: 15px;
          }

          .dp-project-description {
            font-size: 13.5px;
            line-height: 1.6;
            margin-bottom: 17px;
          }

          .dp-project-media {
            padding: 9px;
            border-radius: 15px;
          }

          .dp-project-frame {
            border-radius: 11px;
          }
        }
      `}</style>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="dp-projects-section">
      <div className="dp-projects-container">
        <p className="dp-where-line">
          Ideas are easy. Building them is the fun part.
          <br />
          A collection of things I've built, broken, rebuilt, and shipped.
        </p>

        <div className="dp-projects-grid">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .dp-projects-section {
          padding: 40px 20px;
        }

        .dp-projects-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .dp-where-line {
          margin: 0 0 34px 0;
          font-size: 16px;
          line-height: 1.65;
          color: #6b7078;
        }

        .dp-projects-grid {
          column-count: 2;
          column-gap: 28px;
        }

        @media (min-width: 1400px) {
          .dp-projects-grid {
            column-count: 3;
          }
        }

        @media (max-width: 780px) {
          .dp-projects-grid {
            column-count: 1;
          }
        }

        @media (max-width: 640px) {
          .dp-projects-section {
            padding: 32px 16px;
          }

          .dp-where-line {
            margin-bottom: 26px;
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}