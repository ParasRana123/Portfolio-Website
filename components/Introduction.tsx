"use client";

import { PARAGRAPHS } from "@/data/paragraphs";
import { Sparkles } from "lucide-react";

export default function Introduction() {
  const handleOpenChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-paras-chat", {
          detail: {
            prompt: "Who is Paras Rana and what are his main areas of expertise?",
          },
        })
      );
    }
  };

  return (
    <div className="dp-intro">
      {PARAGRAPHS.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="dp-intro-actions">
        <a
          className="dp-intro-action dp-intro-action--primary"
          href="https://drive.google.com/file/d/1oHGxltfftvUB5vEWj_l3zU3wF3q9byDR/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          View resume
        </a>

        <button
          type="button"
          onClick={handleOpenChat}
          className="dp-intro-action dp-intro-action--ai"
          title="Chat with Paras's AI assistant"
        >
          <Sparkles size={13} className="dp-sparkle-intro" />
          <span>Ask AI</span>
        </button>

        <a className="dp-intro-action" href="#contact">
          Get in touch
        </a>
      </div>
    </div>
  );
}
