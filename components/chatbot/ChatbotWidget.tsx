"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  GripHorizontal,
} from "lucide-react";
import { ChatMessage, ChatSuggestion } from "@/lib/chatbot/types";
import { STARTER_SUGGESTIONS } from "@/lib/chatbot/context";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ChatSuggestions } from "./ChatSuggestions";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi there! 👋 I'm **Paras AI**, your interactive assistant for Paras Rana's portfolio.\n\nAsk me anything about Paras's **projects**, **backend & system design expertise**, **competitive programming ratings (LeetCode Guardian 2210)**, **resume**, or **contact info**!",
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ChatSuggestion[]>(STARTER_SUGGESTIONS);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Dragging state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sendMessageRef = useRef<(prompt?: string) => void>(() => {});

  // Play subtle feedback sound
  const playBeep = (freq = 900, duration = 0.05) => {
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggle = () => {
    playBeep(isOpen ? 600 : 1000, 0.06);
    setIsOpen((prev) => !prev);
  };

  const handleClearChat = () => {
    playBeep(450, 0.06);
    setMessages([INITIAL_MESSAGE]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Ignore interactive elements so clicking them doesn't drag the modal
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("textarea") ||
      target.closest("input") ||
      target.closest(".dp-chat-suggestion-chip") ||
      target.closest(".dp-chat-copy-btn") ||
      target.closest(".dp-chat-body")
    ) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;
    setPosition({
      x: dragStartRef.current.initialX + deltaX,
      y: dragStartRef.current.initialY + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    playBeep(1100, 0.04);

    const userMessage: ChatMessage = { role: "user", content: query };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Try streaming request
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          stream: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      if (res.body) {
        // Prepare empty assistant message for streaming chunks
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = {
                ...updated[lastIdx],
                content: accumulatedText,
              };
            }
            return updated;
          });
        }
      } else {
        // Fallback for non-streaming response
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || "No response received." },
        ]);
      }
    } catch (err: any) {
      console.error("Chat request error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Oops, I encountered a brief issue connecting to the engine. Please try again or reach out directly to Paras at **parasrana579@gmail.com**!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  });

  // Fetch starter suggestions from API & listen for external open trigger
  useEffect(() => {
    fetch("/api/chat/suggestions")
      .then((res) => res.json())
      .then((data) => {
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
        }
      })
      .catch(() => {
        // Fallback to default starter suggestions
      });

    const handleExternalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        setTimeout(() => {
          sendMessageRef.current?.(customEvent.detail.prompt);
        }, 100);
      }
    };

    window.addEventListener("open-paras-chat", handleExternalOpen);
    return () => {
      window.removeEventListener("open-paras-chat", handleExternalOpen);
    };
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opening widget
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="dp-chat-fab-wrapper">
        <button
          type="button"
          className={`dp-chat-fab ${isOpen ? "is-open" : ""}`}
          onClick={handleToggle}
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
          title={isOpen ? "Close AI Assistant" : "Ask Paras AI"}
        >
          {isOpen ? (
            <X size={20} className="dp-chat-fab-icon" />
          ) : (
            <div className="dp-chat-fab-content">
              <div className="dp-chat-fab-avatar-wrap">
                <img
                  src="/tools/paras.jpg"
                  alt="Paras AI"
                  className="dp-chat-fab-avatar"
                />
                <span className="dp-chat-fab-pulse" />
              </div>
              <span className="dp-chat-fab-text">Ask AI</span>
              <Sparkles size={14} className="dp-chat-fab-sparkle" />
            </div>
          )}
        </button>
      </div>

      {/* Draggable Chatbot Window */}
      {isOpen && (
        <div
          className={`dp-chat-modal ${isDragging ? "is-dragging" : ""}`}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            transition: isDragging ? "none" : undefined,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="dialog"
          aria-label="Paras AI Chatbot"
        >
          {/* Header & Drag Area */}
          <div className="dp-chat-header">
            <div className="dp-chat-header-info">
              <div className="dp-chat-header-avatar-wrap">
                <img
                  src="/tools/paras.jpg"
                  alt="Paras AI"
                  className="dp-chat-header-avatar"
                />
                <span className="dp-chat-online-dot" />
              </div>
              <div>
                <div className="dp-chat-title-row">
                  <h3 className="dp-chat-title">Paras AI</h3>
                  <span className="dp-chat-badge">Verified KB</span>
                </div>
                <p className="dp-chat-subtitle">
                  Ask about projects, skills &amp; experience
                </p>
              </div>
            </div>

            <div className="dp-chat-header-actions">
              <span className="dp-chat-drag-hint" title="Drag to move chatbox anywhere">
                <GripHorizontal size={15} />
              </span>
              <button
                type="button"
                className="dp-chat-icon-btn"
                onClick={handleClearChat}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                className="dp-chat-icon-btn"
                onClick={handleToggle}
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <ChevronDown size={17} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="dp-chat-body">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={index}
                  className={`dp-chat-message-row ${
                    isUser ? "is-user" : "is-assistant"
                  }`}
                >
                  {!isUser && (
                    <img
                      src="/tools/paras.jpg"
                      alt="Avatar"
                      className="dp-chat-bubble-avatar"
                    />
                  )}

                  <div className="dp-chat-bubble-container">
                    <div
                      className={`dp-chat-bubble ${
                        isUser ? "dp-chat-bubble-user" : "dp-chat-bubble-ai"
                      }`}
                    >
                      {msg.content ? (
                        <MarkdownRenderer content={msg.content} />
                      ) : (
                        <div className="dp-chat-typing-dots">
                          <span />
                          <span />
                          <span />
                        </div>
                      )}
                    </div>

                    {!isUser && msg.content && (
                      <div className="dp-chat-bubble-footer">
                        <button
                          type="button"
                          className="dp-chat-copy-btn"
                          onClick={() => handleCopy(msg.content, index)}
                          title="Copy response"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={11} className="text-emerald-500" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Thinking / Loading indicator before first chunk */}
            {isLoading &&
              messages[messages.length - 1]?.role === "user" && (
                <div className="dp-chat-message-row is-assistant">
                  <img
                    src="/tools/paras.jpg"
                    alt="Avatar"
                    className="dp-chat-bubble-avatar"
                  />
                  <div className="dp-chat-bubble dp-chat-bubble-ai">
                    <div className="dp-chat-typing-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter / Quick Suggestion Chips */}
          <ChatSuggestions
            suggestions={suggestions}
            onSelect={(prompt) => sendMessage(prompt)}
            disabled={isLoading}
          />

          {/* Input Footer */}
          <div className="dp-chat-footer">
            <div className="dp-chat-input-wrapper">
              <textarea
                ref={textareaRef}
                className="dp-chat-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, CP stats, resume..."
                rows={1}
                disabled={isLoading}
              />
              <button
                type="button"
                className="dp-chat-send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
            <div className="dp-chat-disclaimer">
              <span>Press <b>Enter ↵</b> to send • <b>Shift+Enter</b> for newline</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
