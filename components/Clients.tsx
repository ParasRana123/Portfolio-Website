"use client";

import React from "react";
import { GraduationCap } from "lucide-react";

// Education data
const educationData = [
  {
    id: 1,
    duration: "Sept 2023 - June 2027",
    institution: "IIIT Nagpur",
    degree: "B.Tech in Computer Science and Engineering",
    cgpa: "Current CGPA: 7.50",
    coursework:
      "Data Structures and Algorithms, Web Development, Computer Programming, Operating Systems and OOPS",
  },
  {
    id: 2,
    duration: "April 2022 - May 2023",
    institution: "CBSE Board",
    degree: "Senior Secondary School (12th Grade)",
    cgpa: "Percentage: 90%",
    coursework: "Physics, Chemistry, Mathematics, English, Python",
  },
];

interface EducationItem {
  id: number;
  duration: string;
  institution: string;
  degree: string;
  cgpa: string;
  coursework: string;
}

interface EducationCardProps {
  edu: EducationItem;
  index: number;
}


const EducationCard = ({ edu, index }: EducationCardProps) => {
  return (
    <div className="group flex gap-6 md:gap-8 items-start relative">
      {/* Timeline line and branch */}
      <div className="relative flex flex-col items-center flex-shrink-0 h-full">
        {/* Vertical line */}
        <div className="w-px h-64 bg-white" />

        {/* Branch point */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2
    w-6 h-6 rounded-full bg-white
    border-[6px] border-yellow
    shadow-[0_0_20px_rgba(255,255,255,0.6)]
    transition-all duration-300 ease-out
    group-hover:scale-150 group-hover:shadow-[0_0_35px_rgba(255,255,255,0.9)]"
          style={{ zIndex: 40 }}
        />

        {/* Horizontal branch line */}
        <div
          className="absolute top-[34px] left-1/2 
            w-6 md:w-8 h-[2px] bg-white"
        />
      </div>

      {/* Education Card */}
      <div
        className="
        group relative bg-transparent border border-slate-700/50 rounded-2xl 
        p-5 md:p-6 transition-all duration-500 flex-1
        hover:border-white backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10
        overflow-hidden
      "
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
        }}
      >
        {/* Continuous Shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-2xl">
          <div
            className="
              shimmer-strip absolute 
              w-[200%] h-[200%] 
              bg-white/15 blur-2xl rotate-12
              opacity-0 group-hover:opacity-40 
              animate-glassShimmer
            "
          ></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

        {/* Content */}
        <div className="relative z-[2]">
          <div className="flex items-start gap-4 md:gap-5 mb-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div
                className="w-12 h-12 md:w-14 md:h-14 bg-slate-800/50 rounded-xl 
                flex items-center justify-center border border-slate-700/50 
                transition-colors group-hover:border-white"
              >
                <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-400 mb-1.5">
                {edu.duration}
              </p>
              <h3
                className="text-xl md:text-2xl font-bold text-white mb-2 
                group-hover:text-purple-300 transition-colors"
              >
                {edu.institution}
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-1.5">
                {edu.degree}
              </p>
              <p className="text-xs md:text-sm text-purple-400 font-medium">
                {edu.cgpa}
              </p>
            </div>
          </div>

          {/* Coursework */}
          <div className="pt-3 border-t border-slate-700/30">
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              <span className="text-gray-500 font-medium">Coursework: </span>
              {edu.coursework}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* ⭐ Square Grid Background Added Here ⭐ */}
      <div
        className="absolute inset-0 z-0
        dark:bg-black-100 bg-white
        dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]"
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glassShimmer {
          0% { transform: translate(-180%, -180%) rotate(25deg); }
          50% { transform: translate(0%, 0%) rotate(25deg); }
          100% { transform: translate(180%, 180%) rotate(25deg); }
        }

        .animate-glassShimmer {
          animation: glassShimmer 1.5s linear infinite;
        }
      `}</style>

      {/* Blurred Color Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Education
          </h2>
        </div>

        <div className="relative pl-6 md:pl-8">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;