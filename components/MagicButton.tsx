import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  variant = "primary", // primary = dark, inverse = light
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
      className={`relative inline-flex h-12 w-full md:w-60 mt-5 
        overflow-hidden rounded-lg p-[1px] focus:outline-none 
        ${otherClasses}`}
      onClick={handleClick}
    >
      {/* Magic border spinner */}
      {!isInverse && (
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
        bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
      )}

      {/* Inner button */}
      <span
        className={`
          relative inline-flex h-full w-full cursor-pointer items-center justify-center
          rounded-lg px-7 text-sm font-medium gap-2 backdrop-blur-3xl
          group transition-all duration-300
          ${
            isInverse
              ? "bg-white text-slate-900 border border-slate-300"
              : "bg-slate-950 text-white"
          }
        `}
      >
        {/* Default (Visible before hover) */}
        <div className="flex items-center gap-2 transition-all duration-300 group-hover:opacity-0">
          {position === "left" && icon}
          {title}
          {position === "right" && icon}
        </div>

        {/* Hover Animation Content */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 
          opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          {/* Your image */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white">
            <img
              src="/paras.jpg"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Plus sign */}
          <span
            className={`text-xl font-bold ${
              isInverse ? "text-slate-900" : "text-white"
            }`}
          >
            +
          </span>

          {/* YOU logo circular */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">You</span>
          </div>

          {/* Title */}
          <span className={isInverse ? "text-slate-900" : "text-white"}>
            {title}
          </span>
        </div>
      </span>
    </button>
  );
};

export default MagicButton;