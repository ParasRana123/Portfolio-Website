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

      {/* Inner section */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center 
          rounded-lg px-7 text-sm font-medium gap-2 backdrop-blur-3xl
          ${
            isInverse
              ? "bg-white text-slate-900 border border-slate-300"
              : "bg-slate-950 text-white"
          }
        `}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;