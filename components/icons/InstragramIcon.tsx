import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

export default function InstagramIcon({
  size = 16,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.3"
        cy="6.7"
        r="1.1"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}