"use client";

import { Moon, Sun } from "lucide-react";
import React from "react";
import { NAV_ITEMS } from "@/data/navItems";

export interface NavbarProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({
  dark,
  setDark,
  active,
  setActive,
}: NavbarProps) {
  return (
    <nav className="dp-nav">
      <div className="dp-nav-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            className={`dp-nav-btn ${
              active === item ? "is-active" : ""
            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        className="dp-toggle"
        onClick={() => setDark((d) => !d)}
      >
        {dark ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </nav>
  );
}