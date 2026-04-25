"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, FileText, ShieldCheck, GraduationCap, Menu, X } from "lucide-react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: Building2,
      label: "Business Formation",
      desc: "LLC, LLP, Pvt Ltd setup with full compliance",
    },
    {
      icon: FileText,
      label: "Contract Drafting",
      desc: "Legally vetted contracts in minutes",
    },
    {
      icon: ShieldCheck,
      label: "Compliance Assistance",
      desc: "GST, TDS, ROC filings made simple",
    },
    {
      icon: GraduationCap,
      label: "Legal Guidance",
      desc: "Strategy-first, jurisdiction-aware advice",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0e1a" }}>
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b" style={{ borderColor: "rgba(212,168,83,0.15)" }}>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8">
            {["Product", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-light tracking-wide transition-colors hover:text-gold-300"
                style={{ color: "#c8bfa8" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Logo - centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span
            className="text-xl md:text-2xl tracking-[0.25em] font-light"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#e8d5b0",
              letterSpacing: "0.3em",
            }}
          >
            LEXAFFIN
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-light tracking-wide transition-colors hover:text-gold-300" style={{ color: "#c8bfa8" }}>
            Log in
          </a>
          <Link
            href="/chat"
            className="text-sm tracking-wide px-5 py-2 border transition-all gold-glow-btn"
            style={{
              borderColor: "rgba(212,168,83,0.6)",
              color: "#e8d5b0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cream"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "#e8d5b0" }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-b px-6 py-4 flex flex-col gap-4 z-40" style={{ background: "#0d1220", borderColor: "rgba(212,168,83,0.15)" }}>
          {["Product", "Pricing", "Resources", "Log in"].map((item) => (
            <a key={item} href="#" className="text-sm" style={{ color: "#c8bfa8" }}>{item}</a>
          ))}
          <Link href="/chat" className="text-sm border px-4 py-2 w-fit" style={{ borderColor: "rgba(212,168,83,0.6)", color: "#e8d5b0" }}>
            Get started
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
          <h1
            className="text-5xl md:text-7xl font-medium leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#e8d5b0",
              lineHeight: 1.1,
            }}
          >
            Build your startup
            <br />
            with zero legal hassle.
          </h1>

          <p className="text-base md:text-lg font-light max-w-xl mx-auto" style={{ color: "#a89878", lineHeight: 1.8 }}>
            AI-powered tools for business formation,
            <br />
            contracts, compliance, and more.
          </p>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-10 py-4 text-base font-medium tracking-wide transition-all gold-glow-btn group"
            style={{
              background: "#e8d5b0",
              color: "#0a0e1a",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Get started
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>

      {/* Gold Divider */}
      <div className="gold-divider mx-8 md:mx-24" />

      {/* Feature Icons */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {features.map(({ icon: Icon, label, desc }) => (
            <Link
              href="/chat"
              key={label}
              className="flex flex-col items-center text-center gap-4 group cursor-pointer"
            >
              <div
                className="w-16 h-16 flex items-center justify-center border transition-all group-hover:border-gold-300 group-hover:gold-glow"
                style={{
                  borderColor: "rgba(212,168,83,0.35)",
                  background: "rgba(212,168,83,0.04)",
                }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.25}
                  className="transition-colors group-hover:text-gold-200"
                  style={{ color: "#c49a3c" }}
                />
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.15em] font-medium uppercase mb-1"
                  style={{ color: "#e8d5b0" }}
                >
                  {label}
                </p>
                <p className="text-xs font-light leading-relaxed" style={{ color: "#7a6e5e" }}>
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-divider mx-8 md:mx-24" />

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: "#5a5040" }}>
          © 2026 Lexaffin. Not a substitute for licensed legal or financial advice.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a key={item} href="#" className="text-xs transition-colors hover:text-cream" style={{ color: "#5a5040" }}>
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
