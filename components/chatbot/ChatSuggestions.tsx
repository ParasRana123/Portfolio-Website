"use client";

import React from "react";
import { ChatSuggestion } from "@/lib/chatbot/types";

interface ChatSuggestionsProps {
  suggestions: ChatSuggestion[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function ChatSuggestions({
  suggestions,
  onSelect,
  disabled = false,
}: ChatSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="dp-chat-suggestions">
      <div className="dp-chat-suggestions-track">
        {suggestions.map((item) => {
          const cleanLabel = (item.label || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").trim();
          return (
            <button
              key={item.id}
              type="button"
              className="dp-chat-suggestion-chip"
              onClick={() => onSelect(item.prompt)}
              disabled={disabled}
              title={item.prompt}
            >
              <span>{cleanLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
