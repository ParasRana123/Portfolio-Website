import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

export default function LinkedinIcon({
  size = 16,
  color = "currentColor",
}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="2.5" y="9" width="4" height="12.5" rx="0.5" />
      <circle cx="4.5" cy="4.2" r="2.3" />
      <path d="M10.2 9h3.9v2.3c.65-1.35 2.05-2.5 4.05-2.5 3.05 0 5.15 2 5.15 5.9v6.8h-4v-6.2c0-1.75-.65-2.95-2.2-2.95-1.2 0-1.9.82-2.2 1.6-.12.3-.15.7-.15 1.1v6.45h-4V9Z" />
    </svg>
  );
}