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
        {suggestions.map((item) => (
          <button
            key={item.id}
            type="button"
            className="dp-chat-suggestion-chip"
            onClick={() => onSelect(item.prompt)}
            disabled={disabled}
            title={item.prompt}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
