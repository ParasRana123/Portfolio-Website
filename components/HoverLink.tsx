"use client";

import React from "react";
import { BadgeCheck, PenLine } from "lucide-react";
import InstagramIcon from "./icons/InstragramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

const AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces";

export function LinkText({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="dp-link">{children}</span>;
}

type Platform = "Instagram" | "LinkedIn" | "Medium";

interface HoverInfo {
  icon: React.ComponentType<{
    size?: number;
    color?: string;
  }>;
  iconBg: string;
  label: string;
  tagline: string;
  name: string;
  handle: string;
}

const HOVER_INFO: Record<Platform, HoverInfo> = {
  Instagram: {
    icon: InstagramIcon,
    iconBg: "#E1306C",
    label: "Instagram",
    tagline:
      "Half-finished builds and whatever I'm currently obsessing over.",
    name: "Paras Rana",
    handle: "@paras.codes",
  },

  LinkedIn: {
    icon: LinkedinIcon,
    iconBg: "#0A66C2",
    label: "LinkedIn",
    tagline:
      "The professional version of me — internships, projects, milestones.",
    name: "Paras Rana",
    handle: "Computer Science, IIIT Nagpur",
  },

  Medium: {
    icon: PenLine,
    iconBg: "#242424",
    label: "Medium",
    tagline:
      "Long-form notes on DSA, AI/ML, and lessons from building things.",
    name: "Paras Rana",
    handle: "@parasrana",
  },
};

interface HoverLinkProps {
  platform: Platform;
}

export default function HoverLink({
  platform,
}: HoverLinkProps) {
  const info = HOVER_INFO[platform];
  const Icon = info.icon;

  return (
    <span className="dp-hover-wrap">
      <span className="dp-link dp-hover-target">
        {info.label}
      </span>

      <span className="dp-hovercard">
        <span className="dp-hovercard-inner">
          <span className="dp-hovercard-top">
            <span
              className="dp-hovercard-icon-box"
              style={{ background: info.iconBg }}
            >
              <Icon size={15} color="#fff" />
            </span>

            <span className="dp-hovercard-top-text">
              <strong>{info.label}</strong>
              <span>{info.tagline}</span>
            </span>
          </span>

          <span className="dp-hovercard-bottom">
            <img
              className="dp-hovercard-avatar"
              src={AVATAR}
              alt={info.name}
            />

            <span className="dp-hovercard-bottom-text">
              <strong>
                {info.name}{" "}
                <BadgeCheck
                  size={12}
                  style={{
                    verticalAlign: "-2px",
                    color: "var(--accent)",
                  }}
                />
              </strong>

              <span>{info.handle}</span>
            </span>
          </span>
        </span>

        <span className="dp-hovercard-arrow" />
      </span>
    </span>
  );
}