"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

interface PresetQuestion {
  text: string;
  label: string;
}

const PRESETS: PresetQuestion[] = [
  { text: "What is your tech stack?", label: "Tech Stack" },
  { text: "Are you looking for remote roles?", label: "Remote Status" },
  { text: "Tell me about your projects.", label: "Key Projects" }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the message area
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handlePresetClick = (text: string) => {
    sendMessage({ text });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER WIDGET */}
      <button
        id="chat-widget-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_15px_rgba(240,0,184,0.6)] border border-secondary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] cursor-pointer focus:outline-none"
        aria-label="Toggle Portfolio Assistant"
      >
        {isOpen ? (
          // Close Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Terminal/Chat Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
            />
          </svg>
        )}
      </button>

      {/* FLOATING CHAT PANEL */}
      {isOpen && (
        <div
          id="chat-widget-container"
          className="fixed bottom-24 right-5 z-50 flex flex-col w-96 h-[500px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-120px)] bg-muted/95 backdrop-blur-md border border-border shadow-[0_0_30px_rgba(10,4,28,0.8)] transition-all duration-300 font-mono sm:rounded-lg overflow-hidden
            max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:max-w-none max-sm:max-h-none max-sm:rounded-none"
          style={{
            clipPath: "polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)",
          }}
        >
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border select-none">
            <div className="flex items-center gap-2">
              {/* Pulsing Status Dot */}
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-success"></span>
              </span>
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-foreground">
                  YHS_AI_ASSISTANT
                </h3>
                <p className="text-[10px] text-secondary opacity-80 uppercase tracking-widest">
                  SYS_STATUS: ONLINE
                </p>
              </div>
            </div>

            {/* Header Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none p-1 cursor-pointer"
              aria-label="Close Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* MESSAGE AREA */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {messages.length === 0 ? (
              /* Empty state / Welcome Interface */
              <div className="flex flex-col h-full justify-between py-2 space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded border border-border bg-background/50">
                    <p className="text-xs leading-relaxed text-foreground">
                      <span className="text-primary font-bold">{">"} INITIALIZING SECURITY PROTOCOLS...</span>
                      <br />
                      <span className="text-secondary font-bold">{">"} CONNECTION ESTABLISHED.</span>
                      <br />
                      <br />
                      Welcome, user. I am the virtual avatar of Ye Htet San. You can ask me about his software development skills, specific project milestones, work style, or remote job preferences.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider">
                    Preset Inquiries:
                  </p>
                  <div className="flex flex-col gap-2">
                    {PRESETS.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => handlePresetClick(preset.text)}
                        className="w-full text-left text-xs px-3 py-2.5 rounded bg-background border border-border text-foreground hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-between group"
                      >
                        <span>{preset.label}</span>
                        <span className="text-secondary group-hover:text-primary transition-colors text-[10px] font-bold">
                          {`-->`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Message Logs */
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[9px] text-muted-foreground mb-1 uppercase tracking-widest px-1">
                    {message.role === "user" ? "Guest_User" : "YHS_AI"}
                  </span>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed break-words rounded shadow-md border
                      ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground border-primary/50 rounded-tr-none"
                          : "bg-background text-foreground border-border rounded-tl-none"
                      }`}
                  >
                    {message.parts && message.parts.length > 0 ? (
                      message.parts.map((part: any, index: number) => {
                        if (part.type === "text") {
                          return (
                            <span key={index} className="whitespace-pre-wrap">
                              {part.text}
                            </span>
                          );
                        }
                        if (part.type === "reasoning") {
                          return (
                            <span
                              key={index}
                              className="block text-[10px] text-muted-foreground italic border-l border-border pl-2 my-1"
                            >
                              {part.text}
                            </span>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <span className="whitespace-pre-wrap">{(message as any).content || ""}</span>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Fallback indicator while waiting for response */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-muted-foreground mb-1 uppercase tracking-widest px-1">
                  YHS_AI
                </span>
                <div className="flex items-center gap-2 bg-background border border-border rounded rounded-tl-none px-3.5 py-2.5 text-xs text-secondary font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span>Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM CONTAINER */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-background border-t border-border flex gap-2 items-center"
          >
            <div className="flex-1 relative flex items-center">
              {/* Command symbol at start */}
              <span className="absolute left-2.5 text-secondary text-xs select-none font-bold">
                {">"}
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about Ye Htet San..."
                className="w-full pl-6 pr-3 py-2 text-xs bg-muted/50 text-foreground border border-border rounded focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 placeholder-muted-foreground/60 transition-colors disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-3.5 py-2 rounded bg-primary text-primary-foreground border border-primary/50 text-xs font-bold uppercase tracking-wider hover:bg-primary/80 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-1 hover:shadow-[0_0_10px_rgba(240,0,184,0.5)]"
              aria-label="Submit Question"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
