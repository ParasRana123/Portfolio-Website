"use client";

import { useState } from "react";
import {
  FaArrowUpRightFromSquare,
  FaGithub,
  FaArrowRightLong,
} from "react-icons/fa6";
import { X, ExternalLink, Github } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;

  fullDescription: string;
  features?: string[];
  technologies?: string[];
  demoVideo?: string;
  github?: string;
  liveLink?: string;
}

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  href?: string;
  onClick?: () => void;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}


// Sample projects data - replace with your actual @/data import
const projects = [
  {
    id: 1,
    title: "CollabDraw",
    des: "An interactive real-time whiteboard that lets teams sketch, brainstorm, and collaborate seamlessly together.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "prisma.png"],
    status: "Building",
    link: "https://example.com",
    // Modal data
    fullDescription:
      "An interactive whiteboard application built for real-time collaboration. It allows multiple users to sketch, write, and visualize ideas simultaneously.Changes sync instantly across all devices, ensuring smooth teamwork. Perfect for brainstorming, planning, teaching, or remote discussions.",
    features: [
      "Real-time multi-user collaboration with WebSockets for seamless shared editing.",
      "Interactive drawing tools including pencil, shapes, colors, fonts, eraser, undo/redo, and canvas resizing.",
      "Room-based collaboration allowing users to create or join rooms for shared whiteboard sessions.",
      "Optimized for speed and stability, ensuring smooth collaboration, minimal latency, and reliable performance even with multiple active users.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "TypeScript",
      "TailwindCSS",
      "Turborepo",
      "PostgreSQL",
      "Prisma ORM",
    ],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/ParasRana123/collabdraw",
    liveLink: "https://example.com",
  },
  {
    id: 2,
    title: "Musor",
    des: "A collaborative music platform enabling playlist sharing, friend interactions, and real-time group listening rooms.",
    img: "/p2.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/ws.png"],
    link: "https://example.com",
    status: "All Systems Operational",
    fullDescription:
      "A social music platform that lets users create playlists, save their favorite songs, and share them with friends.Users can connect with others, explore each other's playlists, and discover new music through social interactions.",
    features: [
      "Built personalized playlist management allowing users to save, organize, and access their favorite songs seamlessly.",
      "Implemented social features enabling users to add friends and explore each other’s playlists for shared music discovery.",
      "Developed synchronized listening rooms where multiple users can listen to music together in real time.",
      "Added collaborative room interactions with live chat and shared song recommendations for an engaging group experience.",
    ],
    technologies: [
      "React.js",
      "Express.js",
      "WebSockets",
      "TailwindCSS",
      "PostgresSQL",
    ],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/ParasRana123/musor",
    liveLink: "https://musor-ten.vercel.app/",
  },
  {
    id: 3,
    title: "Prompt2Site",
    des: "An AI-based website builder that converts user text prompts into full-stack web apps in under 5 seconds using the LLAMA model",
    img: "/boult.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/gemini.png"],
    link: "https://example.com",
    status: "All Systems Operational",
    fullDescription:
      "An AI-powered website builder that transforms simple text prompts into full-stack web apps in under 5 seconds using the LLAMA model.",
    features: [
      "Built an AI-based website builder that converts user text prompts into full-stack web apps in under 5 seconds using the LLAMA model.",
      "Parsed LLAMA’s XML output to auto-generate and organize complete project file structures and development steps.",
      "• Integrated Web Containers for live in-browser previews zero latency feedback, enabling instant rendering,session-based storage, and on-demand regeneration without external deployment.",
      "Reduced Frontend Development time by 80% for typical users, compared to manual setup and coding",
    ],
    technologies: [
      "React.js",
      "Express.js",
      "WebSockets",
      "TailwindCSS",
      "Google Gemini",
    ],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/ParasRana123/boult.new",
    liveLink: "https://example.com",
  },
  {
    id: 4,
    title: "Nova",
    des: "NOVA is a full-featured AI assistant offering voice control, productivity automation, smart calendar management, real-time translation, and image analysis.",
    img: "/nova.png",
    iconLists: ["/py.png", "/gemini.png"],
    link: "https://example.com",
    status: "All Systems Operational",
    fullDescription:
      "An AI-powered personal assistant with voice control, app management, system controls, Google Calendar integration, image analysis, real-time translation, chatbot, search capabilities, music control, and productivity automation. Experience hands-free digital interaction with natural language understanding and personalized assistance.",
    features: [
      "Voice-controlled interface with natural language processing.",
      "Smart calendar management with Google Calendar integration",
      "Real-time translation between multiple languages",
      "Image analysis and object recognition",
      "System controls for automation and productivity",
      "Music and media playback control",
      "Web search and information retrieval",
      "Personalized responses using machine learning",
    ],
    technologies: [
      "Python",
      "Google API",
      "Google calender API",
      "Google Map API",
      "pyttsx3",
      "Speech Recognition",
      "Google Gemini API",
    ],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/ParasRana123/NOVA",
    liveLink: "https://example.com",
  },
];

// PinContainer component placeholder
const PinContainer = ({ children, title, href, onClick }: PinContainerProps) => {
  return (
    <div className="relative group/pin cursor-pointer" onClick={onClick}>
      <div className="relative z-50 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.2] bg-slate-900/50 p-4 transition-all duration-500 hover:border-white/[0.4] hover:shadow-xl hover:shadow-purple-500/20">
        {children}
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Project Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-t-2xl bg-slate-800">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
            {project.title}
          </h2>

          {/* Links */}
          <div className="flex gap-4 mb-6">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
              >
                <ExternalLink className="w-4 h-4" />
                LIVE DEMO
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors text-white"
              >
                <Github className="w-4 h-4" />
                SOURCE CODE
              </a>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              PROJECT DESCRIPTION
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Features */}
          {project.features && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">
                KEY FEATURES
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Demo Video */}
          {project.demoVideo && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">
                DEMO VIDEO
              </h3>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800">
                <iframe
                  src={project.demoVideo}
                  title={`${project.title} Demo`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div id="projects" className="py-20 relative overflow-hidden">
      {/* ⭐ SQUARE GRID BACKGROUND (Same as Education Section) ⭐ */}
      <div
        className="absolute inset-0 z-0
        dark:bg-black-100 bg-white
        dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]"
      />

      {/* Optional blurred blobs for extra depth (same theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* ------------------------------------------------------------------ */}

      <h1 className="heading relative z-10">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10 relative z-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title="/ui.aceternity.com"
              href="https://twitter.com/mannupaaji"
              onClick={() => setSelectedProject(item)}
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <img
                  src={item.img}
                  alt={item.title}
                  className="
        z-10 absolute bottom-0 
        w-full 
        h-full 
        pointer-events-none
        object-cover
        rounded-3xl
      "
                />
              </div>

              {/* ⭐ TITLE + ICONS ⬇⬇⬇ */}
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <div className="flex items-center">
                  {/* GitHub link */}
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 flex items-center justify-center
          rounded-lg bg-transparent 
          border border-slate-800 dark:border-slate-800
          text-white/80 dark:text-white/70
          hover:text-white hover:border-white hover:bg-purple-500/30
          transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  >
                    <FaGithub />
                  </a>

                  {/* Live site link */}
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ms-2 w-8 h-8 flex items-center justify-center
          rounded-lg bg-transparent 
          border border-slate-800 dark:border-slate-800
          text-white/80 dark:text-white/70
          hover:text-white hover:border-white hover:bg-purple-500/30
          transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  >
                    <FaArrowUpRightFromSquare />
                  </a>
                </div>
              </div>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{ color: "#BEC1DD", margin: "1vh 0" }}
              >
                {item.des}
              </p>

              <p
                className="mt-4 w-full text-left tracking-wide text-sm lg:text-xl font-light line-clamp-2"
                style={{ color: "#BEC1DD" }}
              >
                Technologies
              </p>

              <div className="flex items-center justify-start mt-3 mb-3">
                <div className="flex items-center -ml-48">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-start"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon" className="p-2" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 w-full flex items-center justify-between">
                {/* STATUS BADGE */}
                <span
                  className={`
      inline-flex items-center gap-2
      px-3 py-1 
      rounded-full 
      text-xs font-medium tracking-wide
      border
      ${
        item.status === "All Systems Operational"
          ? "bg-green-600/20 text-green-400 border-green-500/30"
          : "bg-red-600/20 text-red-400 border-red-500/30"
      }
    `}
                >
                  {/* Dot */}
                  <span
                    className={`
        w-2 h-2 rounded-full
        ${
          item.status === "All Systems Operational"
            ? "bg-green-400"
            : "bg-red-400"
        }
      `}
                  ></span>
                  {item.status}
                </span>

                {/* VIEW DETAILS BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    setSelectedProject(item);
                  }}
                  className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-purple-300 transition-colors"
                >
                  View Details
                  <FaArrowRightLong className="w-3 h-3" />
                </button>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default RecentProjects;
