"use client";

import { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import WhereSection from "./WhereSection";
import WritingSection from "./WritingSection";

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("Home");

  const vars = dark
    ? {
        "--bg": "#16150F",
        "--surface": "#1F1D16",
        "--ink": "#ECE8DC",
        "--muted": "#948F7C",
        "--accent": "#E2794F",
        "--hairline": "#2B2820",
        "--cardbottom": "#0F0E0A",
      }
    : {
        "--bg": "#EEEBE1",
        "--surface": "#F8F6EF",
        "--ink": "#1A1913",
        "--muted": "#8B8779",
        "--accent": "#B6432A",
        "--hairline": "#D9D4C4",
        "--cardbottom": "#1A1913",
      };

  return (
    <div className="dp-root" style={vars}>
      <div className="dp-shell">
        <Header />
        <Navbar
          dark={dark}
          setDark={setDark}
          active={active}
          setActive={setActive}
        />

        <hr className="dp-hr" />

        <Introduction />

        <hr className="dp-hr" />

        <WhereSection />

        <hr className="dp-hr-dotted" />

        <WritingSection />

        <hr className="dp-hr-dotted" />

        <p className="dp-footer">
          © {new Date().getFullYear()} PARAS RANA
        </p>
      </div>
    </div>
  );
}