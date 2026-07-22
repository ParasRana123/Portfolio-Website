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
      {/* Header */}
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

      {/* Description */}
      <div className="dp-project-description">
        <p className="dp-project-description-text">
          {project.description}
        </p>
      </div>

      {/* Video */}
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

      {/* Footer */}
      <div className="dp-project-footer">
        {project.website ? (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="dp-project-link"
          >
            <span>Visit site</span>

            <span className="dp-project-link-arrow">
              ↗
            </span>
          </a>
        ) : (
          <span className="dp-project-link dp-project-link--placeholder">
            Visit site
          </span>
        )}
      </div>

      <style jsx>{`
        /* ========================================
           CARD
        ======================================== */

        .dp-project-card {
          display: flex;
          flex-direction: column;

          /*
            Fixed dimensions.

            Every project card will have exactly
            the same width and height on desktop.
          */

          width: 100%;
          max-width: 560px;
          height: 650px;

          padding: 28px;

          border-radius: 22px;
          border: 1px solid var(--hairline);

          background: var(--surface);

          box-shadow:
            0 2px 5px rgba(0, 0, 0, 0.025),
            0 8px 24px rgba(0, 0, 0, 0.035);

          transition:
            box-shadow 0.25s ease,
            transform 0.25s ease,
            border-color 0.25s ease;

          /*
            No scrolling.

            Content is allowed to naturally wrap.
          */

          overflow: hidden;

          min-width: 0;
        }

        .dp-project-card:hover {
          box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.04),
            0 14px 34px rgba(0, 0, 0, 0.08);

          transform: translateY(-3px);

          border-color: var(--accent);
        }

        /* ========================================
           HEADER
        ======================================== */

        .dp-project-header {
          display: flex;
          align-items: flex-start;

          gap: 13px;

          margin-bottom: 16px;

          min-width: 0;

          /*
            Header does not shrink.

            The title has enough room for
            maximum two lines.
          */

          flex-shrink: 0;
        }

        /* ========================================
           AVATAR
        ======================================== */

        .dp-project-avatar {
          width: 48px;
          height: 48px;

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
            inset 0 0 0 1px
              rgba(255, 255, 255, 0.2),
            0 3px 8px
              rgba(0, 0, 0, 0.12);
        }

        /* ========================================
           HEADING
        ======================================== */

        .dp-project-heading {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-width: 0;

          flex: 1;

          line-height: 1.3;

          /*
            Fixed height for the title area.

            This allows:
            - Short titles -> 1 line
            - Longer titles -> up to 2 lines

            Every card still has the same layout.
          */

          height: 48px;
        }

        /* ========================================
           TITLE
        ======================================== */

        .dp-project-title {
          display: -webkit-box;

          font-family: "Space Grotesk", sans-serif;

          font-weight: 600;

          font-size: 16px;

          line-height: 1.35;

          color: var(--ink);

          letter-spacing: -0.01em;

          /*
            Maximum 2 lines.

            No ellipsis.

            The title itself is never truncated
            with "..." or text-overflow.
          */

          white-space: normal;

          overflow: hidden;

          -webkit-box-orient: vertical;

          -webkit-line-clamp: 2;

          word-wrap: break-word;

          overflow-wrap: break-word;

          word-break: normal;
        }

        /* ========================================
           PROJECT TYPE
        ======================================== */

        .dp-project-handle {
          margin-top: 3px;

          font-family: "Inter", sans-serif;

          font-size: 12px;

          line-height: 1.3;

          color: var(--muted);

          display: block;

          flex-shrink: 0;
        }

        /* ========================================
           DESCRIPTION
        ======================================== */

        .dp-project-description {
          /*
            Fixed description area.

            This gives every card the same amount
            of vertical space before the video.

            No scrolling.
            No ellipsis.

            The full description is allowed to
            wrap naturally.
          */

          min-height: 112px;

          margin: 0 0 20px 0;

          flex-shrink: 0;

          overflow: visible;
        }

        .dp-project-description-text {
          margin: 0;

          font-family: "Inter", sans-serif;

          font-size: 14px;

          line-height: 1.6;

          color: var(--muted);

          letter-spacing: -0.005em;

          word-wrap: break-word;

          overflow-wrap: break-word;

          word-break: normal;
        }

        /* ========================================
           VIDEO MEDIA
        ======================================== */

        .dp-project-media {
          border-radius: 18px;

          padding: 12px;

          cursor: pointer;

          outline: none;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;

          /*
            Video takes the available space
            remaining inside the fixed card.
          */

          flex: 1;

          min-height: 0;

          display: flex;
        }

        .dp-project-media:hover {
          transform: scale(1.005);
        }

        .dp-project-media:focus-visible {
          box-shadow:
            0 0 0 3px
              rgba(29, 122, 224, 0.2);
        }

        /* ========================================
           VIDEO FRAME
        ======================================== */

        .dp-project-frame {
          position: relative;

          width: 100%;

          height: 100%;

          min-height: 0;

          border-radius: 13px;

          overflow: hidden;

          background: #0b0b0d;

          box-shadow:
            0 5px 14px
              rgba(0, 0, 0, 0.12),
            0 1px 3px
              rgba(0, 0, 0, 0.15);
        }

        .dp-project-video {
          display: block;

          width: 100%;

          height: 100%;

          object-fit: cover;

          background: #0b0b0d;
        }

        /* ========================================
           PLAY BUTTON
        ======================================== */

        .dp-project-play-overlay {
          position: absolute;

          inset: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          background:
            rgba(0, 0, 0, 0.12);

          pointer-events: none;

          transition:
            background 0.2s ease;
        }

        .dp-project-media:hover
          .dp-project-play-overlay {
          background:
            rgba(0, 0, 0, 0.18);
        }

        .dp-project-play-button {
          width: 54px;

          height: 54px;

          border-radius: 50%;

          background:
            rgba(45, 45, 45, 0.62);

          color: #ffffff;

          display: flex;

          align-items: center;

          justify-content: center;

          padding-left: 2px;

          backdrop-filter: blur(5px);

          box-shadow:
            0 4px 12px
              rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px
              rgba(255, 255, 255, 0.15);

          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .dp-project-media:hover
          .dp-project-play-button {
          transform: scale(1.08);

          background:
            rgba(30, 30, 30, 0.78);
        }

        /* ========================================
           FOOTER
        ======================================== */

        .dp-project-footer {
          margin-top: auto;

          padding-top: 16px;

          flex-shrink: 0;
        }

        .dp-project-link {
          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding: 7px 0;

          font-family: "Inter", sans-serif;

          font-size: 13.5px;

          font-weight: 550;

          color: var(--accent);

          text-decoration: none;

          transition:
            color 0.2s ease,
            gap 0.2s ease;

          max-width: 100%;
        }

        .dp-project-link--placeholder {
          visibility: hidden;
        }

        .dp-project-link-arrow {
          font-size: 15px;

          line-height: 1;

          transition:
            transform 0.2s ease;

          flex-shrink: 0;
        }

        .dp-project-link:hover {
          color: var(--accent);

          text-decoration: none;

          gap: 8px;
        }

        .dp-project-link:hover
          .dp-project-link-arrow {
          transform:
            translate(2px, -2px);
        }

        /* ========================================
           PROJECTS SECTION
        ======================================== */

        .dp-projects-section {
          padding: 32px 0 40px;
        }

        .dp-projects-container {
          width: 100%;

          max-width: 1200px;

          margin: 0 auto;
        }

        .dp-projects-intro {
          margin: 0 0 36px 0;

          font-family: "Inter", sans-serif;

          font-size: 15px;

          line-height: 1.7;

          color: var(--muted);
        }

        /* ========================================
           PROJECT GRID
        ======================================== */

        .dp-projects-grid {
          display: grid;

          /*
            Fixed card width.

            Cards will be at least 500px wide
            and will not become excessively wide.
          */

          grid-template-columns:
            repeat(2, minmax(500px, 560px));

          gap: 32px;

          align-items: stretch;

          justify-content: center;
        }

        /* ========================================
           LARGE DESKTOP
        ======================================== */

        @media (min-width: 1400px) {
          .dp-projects-container {
            max-width: 1200px;
          }

          .dp-projects-grid {
            grid-template-columns:
              repeat(2, 560px);

            gap: 32px;
          }
        }

        /* ========================================
           TABLET
        ======================================== */

        @media (max-width: 1100px) {
          .dp-projects-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 24px;
          }

          .dp-project-card {
            height: 640px;
          }
        }

        /* ========================================
           SMALL TABLET
        ======================================== */

        @media (max-width: 850px) {
          .dp-projects-grid {
            grid-template-columns: 1fr;

            max-width: 560px;

            margin: 0 auto;
          }

          .dp-project-card {
            width: 100%;

            max-width: 560px;

            height: 640px;
          }
        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 640px) {
          .dp-projects-section {
            padding: 28px 0 32px;
          }

          .dp-projects-container {
            width: 100%;
          }

          .dp-projects-grid {
            gap: 22px;

            width: 100%;

            max-width: 100%;
          }

          .dp-project-card {
            width: 100%;

            max-width: 100%;

            height: 590px;

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

          .dp-project-heading {
            height: 42px;
          }

          .dp-project-title {
            font-size: 15px;

            line-height: 1.35;
          }

          .dp-project-handle {
            font-size: 11.5px;
          }

          .dp-project-description {
            min-height: 100px;

            margin-bottom: 16px;
          }

          .dp-project-description-text {
            font-size: 13.5px;

            line-height: 1.55;
          }

          .dp-project-media {
            padding: 9px;

            border-radius: 15px;
          }

          .dp-project-frame {
            border-radius: 11px;
          }

          .dp-project-play-button {
            width: 48px;

            height: 48px;
          }
        }

        /* ========================================
           VERY SMALL MOBILE
        ======================================== */

        @media (max-width: 420px) {
          .dp-project-card {
            height: 570px;

            padding: 18px;
          }

          .dp-project-description {
            min-height: 94px;
          }

          .dp-project-description-text {
            font-size: 13px;
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
        <p className="dp-projects-intro">
          Ideas are easy. Building them is the fun part.
          <br />
          A collection of things I've built, broken, rebuilt,
          and shipped.
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
    </section>
  );
}