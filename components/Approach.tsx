"use client";

import React from "react";

// --------------------------------------
// ⭐ TECHNICAL SKILLS DATA
// --------------------------------------
const skills = [
  "JavaScript",
  "Python",
  "C/C++",
  "TypeScript",
  "React.js",
  "Next.js",
  "HTML/CSS",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "WebSockets",
  "WebRTC",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Prisma ORM",
  "Machine Learning",
  "Generative AI",
];

const Approach = () => {
  return (
    <section id="skills" className="w-full py-20 relative overflow-hidden">
      {/* ⭐ Square Grid Background ⭐ */}
      <div
        className="absolute inset-0 z-0
        dark:bg-black-100 bg-white
        dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]"
      />

      {/* Colored Blur Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16">
          Technical <span className="text-purple-400">Skills</span>
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative bg-transparent border border-slate-700/50 rounded-xl 
              p-6 transition-all duration-500
              hover:border-white backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10
              overflow-hidden flex items-center justify-center min-h-[120px]"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
              }}
            >
              {/* Continuous Shimmer Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-xl">
                <div
                  className="shimmer-strip absolute 
                  w-[200%] h-[200%] 
                  bg-white/15 blur-2xl rotate-12
                  opacity-0 group-hover:opacity-40 
                  animate-glassShimmer"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

              {/* Skill Text */}
              <span
                className="relative z-[2] text-center text-sm md:text-base font-medium text-white/80 
                group-hover:text-white group-hover:scale-110 transition-all duration-300"
              >
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glassShimmer {
          0% {
            transform: translate(-180%, -180%) rotate(25deg);
          }
          50% {
            transform: translate(0%, 0%) rotate(25deg);
          }
          100% {
            transform: translate(180%, 180%) rotate(25deg);
          }
        }

        .animate-glassShimmer {
          animation: glassShimmer 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Approach;