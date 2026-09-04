"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tools from "./pages/Tools";
import Ratings from "./pages/Ratings";
import Education from "./pages/Education";
import ChatbotWidget from "./chatbot/ChatbotWidget";

export default function Portfolio() {
  const [dark, setDark] = useState(false);

  const [active, setActive] = useState("Home");

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark
      ? "dark"
      : "light";
  }, [dark]);

  // Plays a soft, refined toggle click sound.
  const playToggleSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as any).webkitAudioContext;

      if (!AudioContextClass) return;

      // Reuse a single AudioContext across clicks instead of
      // creating a new one every time.
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;

      // Some browsers suspend the context until a user gesture;
      // resume it just in case.
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Master gain so we can shape the overall volume envelope
      // smoothly, avoiding any harsh clicks/pops at start/stop.
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.18, now + 0.005);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      masterGain.connect(ctx.destination);

      // A gentle low-pass filter softens the tone so it feels
      // more like a refined "tick" than an electronic beep.
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.value = 0.7;
      filter.connect(masterGain);

      // Two short sine tones layered a fifth apart give the
      // click a subtle, pleasant "coin-tap" character instead
      // of a flat single-frequency beep.
      const freqs = [880, 1320];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(
          freq * 0.85,
          now + 0.08
        );

        oscGain.gain.setValueAtTime(i === 0 ? 1 : 0.5, now);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(now);
        osc.stop(now + 0.09);
      });
    } catch (err) {
      // Fail silently if audio can't play for any reason.
      console.warn("Could not play toggle sound:", err);
    }
  };

  // Wraps setDark so the sound plays every time dark mode is
  // toggled, whether Navbar calls setDark(true/false) or
  // setDark(prev => !prev).
  const handleSetDark: typeof setDark = (value) => {
    playToggleSound();
    setDark(value);
  };

  const vars: CSSProperties & Record<`--${string}`, string> = dark
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
          setDark={handleSetDark}
          active={active}
          setActive={setActive}
        />

        {active === "Home" && <Home />}

        {active === "Projects" && <Projects />}

        {active === "Skills" && <Tools />}

        {active === "Education" && <Education />}

        {active === "Ratings" && <Ratings />}

        <hr className="dp-hr-dotted" />

        <Footer active={active} setActive={setActive} />
      </div>

      {/* Interactive AI Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
