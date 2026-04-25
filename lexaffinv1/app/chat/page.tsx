"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send, Building2, FileText, ShieldCheck, GraduationCap,
  ArrowLeft, RefreshCw, Copy, Check, Landmark
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: Building2, text: "How to register a startup in India?", tag: "Formation" },
  { icon: FileText, text: "Draft a freelance services agreement", tag: "Contracts" },
  { icon: ShieldCheck, text: "GST compliance checklist for freelancers", tag: "Compliance" },
  { icon: GraduationCap, text: "Tax saving strategies under Section 80C", tag: "Tax" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (userText?: string) => {
    const text = (userText || input).trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  const copyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#0a0e1a" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 md:px-8 py-4 border-b flex-shrink-0"
        style={{ borderColor: "rgba(212,168,83,0.15)", background: "#0d1220" }}
      >
        <Link href="/" className="flex items-center gap-2 text-sm transition-colors hover:text-cream" style={{ color: "#7a6e5e" }}>
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <div className="flex items-center gap-2">
          <Landmark size={16} style={{ color: "#c49a3c" }} strokeWidth={1.5} />
          <span
            className="text-base tracking-[0.2em]"
            style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5b0" }}
          >
            LEXAFFIN
          </span>
        </div>

        <button
          onClick={() => setMessages([])}
          className="flex items-center gap-1.5 text-xs transition-colors hover:text-cream"
          style={{ color: "#7a6e5e" }}
        >
          <RefreshCw size={13} />
          <span className="hidden sm:inline">New chat</span>
        </button>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0">
        {messages.length === 0 ? (
          /* Empty state */
          <div className="max-w-2xl mx-auto pt-16 pb-8 px-4 animate-fade-up">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-medium mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5b0" }}
              >
                How can I help you today?
              </h2>
              <p className="text-sm font-light" style={{ color: "#7a6e5e" }}>
                Legal, tax, and compliance guidance for Indian businesses & startups
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTIONS.map(({ icon: Icon, text, tag }) => (
                <button
                  key={text}
                  onClick={() => handleSend(text)}
                  className="flex items-start gap-3 p-4 text-left border transition-all group hover:border-gold-300"
                  style={{
                    borderColor: "rgba(212,168,83,0.2)",
                    background: "rgba(212,168,83,0.03)",
                  }}
                >
                  <div
                    className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center border"
                    style={{ borderColor: "rgba(212,168,83,0.3)" }}
                  >
                    <Icon size={15} strokeWidth={1.5} style={{ color: "#c49a3c" }} />
                  </div>
                  <div>
                    <span className="text-xs tracking-wider uppercase mb-1 block" style={{ color: "#c49a3c" }}>
                      {tag}
                    </span>
                    <span className="text-sm font-light leading-snug" style={{ color: "#c8bfa8" }}>
                      {text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-xs mt-8" style={{ color: "#3a3228" }}>
              Not a substitute for licensed legal or CA advice. Consult a professional for critical decisions.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-6 space-y-6 px-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center border mt-1"
                    style={{ borderColor: "rgba(212,168,83,0.4)", background: "rgba(212,168,83,0.06)" }}
                  >
                    <Landmark size={14} style={{ color: "#c49a3c" }} strokeWidth={1.5} />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === "user" ? "order-1" : ""}`}>
                  {msg.role === "user" ? (
                    <div
                      className="px-4 py-3 text-sm font-light leading-relaxed"
                      style={{
                        background: "rgba(212,168,83,0.12)",
                        border: "1px solid rgba(212,168,83,0.25)",
                        color: "#e8d5b0",
                      }}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <div className="group relative">
                      <div className="prose-lexaffin text-sm">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      <button
                        onClick={() => copyMessage(msg.content, idx)}
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5"
                        style={{ color: "#5a5040" }}
                      >
                        {copied === idx ? <Check size={13} style={{ color: "#c49a3c" }} /> : <Copy size={13} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center border"
                  style={{ borderColor: "rgba(212,168,83,0.4)", background: "rgba(212,168,83,0.06)" }}
                >
                  <Landmark size={14} style={{ color: "#c49a3c" }} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="w-2 h-2 rounded-full dot-1" style={{ background: "#c49a3c" }} />
                  <span className="w-2 h-2 rounded-full dot-2" style={{ background: "#c49a3c" }} />
                  <span className="w-2 h-2 rounded-full dot-3" style={{ background: "#c49a3c" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div
        className="flex-shrink-0 border-t px-4 md:px-0 py-4"
        style={{ borderColor: "rgba(212,168,83,0.15)", background: "#0d1220" }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="flex items-end gap-3 border px-4 py-3 transition-all focus-within:border-gold-300"
            style={{
              borderColor: "rgba(212,168,83,0.25)",
              background: "rgba(212,168,83,0.04)",
            }}
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="Ask about company formation, GST, contracts, tax planning..."
              className="flex-1 bg-transparent resize-none outline-none text-sm font-light leading-relaxed placeholder:opacity-40"
              style={{
                color: "#e8d5b0",
                fontFamily: "'DM Sans', sans-serif",
                minHeight: "24px",
                maxHeight: "160px",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all disabled:opacity-30 hover:scale-110"
              style={{ color: "#c49a3c" }}
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-center text-xs mt-2" style={{ color: "#3a3228" }}>
            Lexaffin provides guidance, not legal advice. Consult a licensed professional for critical decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
