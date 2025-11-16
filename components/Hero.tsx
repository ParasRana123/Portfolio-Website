"use client";

import React from "react";
import {
  FaLocationArrow,
  FaArrowRight,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { MdOutlineMessage } from "react-icons/md";
import { FaLinkedin, FaCode } from "react-icons/fa";

/* ------------------------ MAGIC BUTTON ------------------------ */

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  variant = "primary",
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  variant?: "primary" | "inverse";
  otherClasses?: string;
}) => {
  const isInverse = variant === "inverse";

  return (
    <button
      className={`relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none ${otherClasses}`}
      onClick={handleClick}
    >
      {!isInverse && (
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
      )}

      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
            px-7 text-sm font-medium gap-2 backdrop-blur-3xl
            ${
              isInverse
                ? "bg-white text-black border border-slate-300"
                : "bg-slate-950 text-white"
            }`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

/* ------------------------ SPOTLIGHT ------------------------ */

const Spotlight = ({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

/* ------------------------ TEXT EFFECT ------------------------ */

const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const wordsArray = words.split(" ");

  return (
    <div className={`font-bold ${className}`}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <span
              key={word + idx}
              className={`${
                idx > 3 ? "text-purple-400" : "dark:text-white text-black"
              }`}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------ HERO SECTION ------------------------ */

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 8s linear infinite; }

        @keyframes ringPulse {
          0% { filter: drop-shadow(0 0 6px rgba(203,172,249,0.08)); opacity: 0.9; }
          50% { filter: drop-shadow(0 0 18px rgba(203,172,249,0.18)); opacity: 1; }
          100% { filter: drop-shadow(0 0 6px rgba(203,172,249,0.08)); opacity: 0.9; }
        }
        .ring-pulse { animation: ringPulse 3.2s ease-in-out infinite; }
      `}</style>

      {/* Spotlights */}
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />

      {/* Background */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03]
        bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center"
      >
        <div className="absolute pointer-events-none inset-0 dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-5xl lg:max-w-[70vw] flex flex-col md:flex-row items-center gap-12">
          {/* LEFT SECTION */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <TextGenerateEffect
              words="Paras Rana"
              className="text-center md:text-left text-[40px] md:text-5xl lg:text-6xl"
            />

            <h4 className="text-2xl md:text-3xl font-bold text-center md:text-left mt-6 mb-4 dark:text-white">
              Aspiring Software Engineer & Innovator
            </h4>

            <p className="text-center md:text-left text-sm md:text-base lg:text-lg dark:text-gray-300 text-gray-700 mb-6">
              I’m an enthusiastic student at IIIT Nagpur with a deep interest in
              software development, actively building full-stack applications
              and sharpening my problem-solving skills.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mt-3">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
                variant="primary"
              />

              <MagicButton
                title="Drop a Message"
                icon={<FaArrowRight />}
                position="right"
                variant="inverse"
              />
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-8">
              {[
                {
                  icon: <FaGithub />,
                  link: "https://github.com/ParasRana123",
                },
                {
                  icon: <SiLeetcode />,
                  link: "https://leetcode.com/u/paras579/",
                },
                {
                  icon: <FaCode />,
                  link: "https://codolio.com/profile/_theparas_",
                },
                {
                  icon: <FaLinkedin />,
                  link: "https://www.linkedin.com/in/paras-rana-696b7731b/",
                },
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/_theparas_/",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center
                  rounded-lg bg-transparent 
                  border border-slate-700 dark:border-slate-600
                  text-white/80 dark:text-white/70
                  hover:text-white hover:border-purple-400
                  hover:bg-purple-500/10 transition-all hover:scale-110 shadow-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — IMAGE */}
          <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[102%] h-[102%] rounded-full spin-slow ring-pulse flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ filter: "blur(8px)", opacity: 0.9 }}
                >
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#CBACF9" />
                      <stop offset="50%" stopColor="#7C83FF" />
                      <stop offset="100%" stopColor="#6EE7F7" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#g1)"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
              <img
                src="/paras.png"
                alt="Paras - Full Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
