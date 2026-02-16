"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, StopCircle, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatInterfaceProps {
  docContent: string;
  persona: string;
  personaTitle: string;
}

export function ChatInterface({
  docContent,
  persona,
  personaTitle,
}: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  // /possible to show stop button while streaming and allow stopping the response mid-way
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        docContent,
        persona,
      },
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages */}
      <ScrollArea className="flex-1 h-full w-full px-6 md:px-8">
        <div className="max-w-4xl mx-auto py-8 space-y-8 pb-32">
          {/* Welcome */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center border border-red-600/30">
              <Bot size={16} className="text-red-500" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-bold text-red-400">
                {personaTitle}
              </div>
              <div className="text-gray-300 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4">
                I'm ready! Ask me anything about your notes, and I'll answer in
                <span className="text-red-400 font-bold">
                  {" "}
                  {personaTitle}
                </span>{" "}
                style.
              </div>
            </div>
          </div>

          {/* Chat history */}
          {messages.map((m) => {
            const text = m.parts
              .filter((p) => p.type === "text")
              .map((p) => p.text)
              .join("");

            return (
              <div
                key={m.id}
                className={`flex gap-4 ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    m.role === "user"
                      ? "bg-white/10 border-white/20"
                      : "bg-red-600/20 border-red-600/30"
                  }`}
                >
                  {m.role === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} className="text-red-500" />
                  )}
                </div>

                <div
                  className={`max-w-[85%] space-y-2 ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="text-xs text-gray-500 font-mono uppercase">
                    {m.role === "user" ? "You" : personaTitle}
                  </div>

                  <div
                    className={`rounded-2xl p-4 text-sm md:text-base ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-[#0a0a0a] border border-white/10 rounded-tl-none"
                    }`}
                  >
                    {m.role === "user" ? (
                      <p>{text}</p>
                    ) : (
                      <MarkdownRenderer content={text} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading */}
          {isLoading && messages.at(-1)?.role === "user" && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center border border-red-600/30">
                <Bot size={16} className="text-red-500" />
              </div>
              <div className="space-y-2 w-full">
                <div className="text-sm font-bold text-red-400">
                  {personaTitle}
                </div>
                <div className="space-y-2 max-w-md">
                  <Skeleton className="h-4 w-full bg-white/10" />
                  <Skeleton className="h-4 w-[80%] bg-white/10" />
                </div>
              </div>
            </div>
          )}

          <div ref={scrollRef} className="h-1" />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-20">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim() || status !== "ready") return;
              sendMessage({ text: input });
              setInput("");
            }}
            className="relative flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== "ready"}
              placeholder={`Ask ${personaTitle} something...`}
              className="bg-black/60 border-white/10 focus-visible:ring-red-500/50 h-14 pl-6 pr-14 rounded-full backdrop-blur-xl shadow-2xl text-whit"
            />

            <div className="absolute right-2">
              {isLoading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={stop}
                  className="h-10 w-10 rounded-full text-red-500 hover:bg-red-500/20"
                >
                  <StopCircle size={18} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  className="h-10 w-10 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </Button>
              )}
            </div>
          </form>

          <p className="text-center text-xs text-gray-600 mt-3">
            Cortex can make mistakes. Verify important info.
          </p>
        </div>
      </div>
    </div>
  );
}
