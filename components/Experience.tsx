import React from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <div className="py-20 w-full relative overflow-hidden">
      {/* ⭐ Square Grid Background + Glow ⭐ */}
      <div
        className="absolute inset-0 z-0
        dark:bg-black-100 bg-white
        dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]"
      />

      {/* Glow Layer */}
      <div className="absolute inset-0 z-0 grid-glow pointer-events-none" />

      <style>{`
        /* Glowing grid effect */
        .grid-glow {
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 60%,
            transparent 100%
          );
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.9; }
          100% { opacity: 0.3; }
        }
      `}</style>

      <div className="relative z-10">
        <h1 className="heading">
          Awards <span className="text-purple">& Achievements</span>
        </h1>

        <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
          {workExperience.map((card) => (
            <Button
              key={card.id}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                <img
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  className="lg:w-32 md:w-20 w-16"
                />
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {card.title}
                  </h1>
                  <p className="text-start text-white-100 mt-3 font-semibold">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;