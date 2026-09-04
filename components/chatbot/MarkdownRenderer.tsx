"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Strip any accidental emojis or pictographs to ensure clean, professional presentation
  const cleanContent = (content || "")
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "")
    .replace(/[ \t]{2,}/g, " ");
  const lines = cleanContent.split("\n");

  const renderFormattedText = (text: string) => {
    // Process markdown links [text](url), bold **text**, and inline code `code`
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    // Regex matching [link](url), **bold**, `code`, or plain URLs
    const regex =
      /\[(.*?)\]\((https?:\/\/[^\s)]+)\)|(\*\*(.*?)\*\*)|(`([^`]+)`)|(https?:\/\/[^\s]+)/g;
    let match: RegExpExecArray | null;

    let keyCounter = 0;

    while ((match = regex.exec(text)) !== null) {
      // Push preceding plain text
      if (match.index > currentIndex) {
        elements.push(text.slice(currentIndex, match.index));
      }

      if (match[1] && match[2]) {
        // [label](url) link
        const label = match[1];
        const url = match[2];
        elements.push(
          <a
            key={`link-${keyCounter++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="dp-chat-link"
          >
            <span>{label}</span>
            <ExternalLink size={10} className="dp-chat-ext-icon" />
          </a>
        );
      } else if (match[3] && match[4]) {
        // **bold**
        elements.push(
          <strong key={`bold-${keyCounter++}`} className="dp-chat-bold">
            {match[4]}
          </strong>
        );
      } else if (match[5] && match[6]) {
        // `code`
        elements.push(
          <code key={`code-${keyCounter++}`} className="dp-chat-code">
            {match[6]}
          </code>
        );
      } else if (match[7]) {
        // Raw URL
        const rawUrl = match[7];
        elements.push(
          <a
            key={`rawlink-${keyCounter++}`}
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dp-chat-link"
          >
            <span>{rawUrl}</span>
            <ExternalLink size={10} className="dp-chat-ext-icon" />
          </a>
        );
      }

      currentIndex = regex.lastIndex;
    }

    // Push remaining plain text
    if (currentIndex < text.length) {
      elements.push(text.slice(currentIndex));
    }

    return elements;
  };

  return (
    <div className="dp-chat-content">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (trimmed === "") {
          return <div key={idx} className="dp-chat-spacer" />;
        }

        // Headings
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="dp-chat-h3">
              {renderFormattedText(trimmed.replace(/^###\s+/, ""))}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={idx} className="dp-chat-h2">
              {renderFormattedText(trimmed.replace(/^##\s+/, ""))}
            </h3>
          );
        }

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="dp-chat-bullet">
              <span className="dp-chat-bullet-dot">•</span>
              <span>
                {renderFormattedText(trimmed.replace(/^[-*]\s+/, ""))}
              </span>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="dp-chat-bullet">
              <span className="dp-chat-num">{numMatch[1]}.</span>
              <span>{renderFormattedText(numMatch[2])}</span>
            </div>
          );
        }

        // Regular paragraph line
        return (
          <p key={idx} className="dp-chat-p">
            {renderFormattedText(line)}
          </p>
        );
      })}
    </div>
  );
}
