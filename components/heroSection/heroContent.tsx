"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { links } from "@/data/data";

gsap.registerPlugin(CustomEase);

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEase = CustomEase.create("heroEase", "M0,0 C0.22,1 0.36,1 1,1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });

      // Staggered letter animation for name
      tl.fromTo(
        nameLettersRef.current.filter(Boolean),
        { y: 120, opacity: 0, rotateX: -80 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: heroEase,
        }
      )
        // Decorative line
        .fromTo(
          decorRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.6"
        )
        // Role text
        .fromTo(
          roleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: heroEase },
          "-=0.5"
        )
        // Description
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 0.6, duration: 0.7, ease: heroEase },
          "-=0.4"
        )
        // CTA and status
        .fromTo(
          [ctaRef.current, statusRef.current],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: heroEase },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nameText = "Tabrez Khan";
  const nameLetters = nameText.split("");

  return (
    <main
      ref={containerRef}
      className="relative z-10 flex h-full w-full max-w-maxWidth grow flex-col justify-center px-paddingX"
      style={{ perspective: "1000px" }}
    >
      {/* Top status bar */}
      <div
        ref={statusRef}
        className="absolute left-paddingX top-[120px] flex items-center gap-3 opacity-0 md:top-[140px]"
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: "#c8f031" }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: "#c8f031" }}
          />
        </span>
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500">
          Available for projects
        </span>
      </div>

      {/* Main content */}
      <div className="anime flex flex-col gap-6">
        {/* Name - large typography with per-letter animation */}
        <h1
          className="font-heading text-[clamp(48px,10vw,140px)] font-bold leading-[0.9] tracking-tight text-neutral-100"
          style={{ transformStyle: "preserve-3d" }}
        >
          {nameLetters.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                nameLettersRef.current[i] = el;
              }}
              className="inline-block"
              style={{
                opacity: 0,
                display: letter === " " ? "inline" : "inline-block",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
          <span
            className="inline-block"
            style={{ color: "#c8f031" }}
          >
            .
          </span>
        </h1>

        {/* Decorative line */}
        <div
          ref={decorRef}
          className="h-[2px] w-24 md:w-40"
          style={{ backgroundColor: "#c8f031", transform: "scaleX(0)" }}
        />

        {/* Role */}
        <div
          ref={roleRef}
          className="flex items-center gap-4 opacity-0"
        >
          <span className="font-heading text-lg font-medium uppercase tracking-[0.15em] text-neutral-300 md:text-2xl">
            Developer
          </span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span className="font-heading text-lg font-medium uppercase tracking-[0.15em] text-neutral-300 md:text-2xl">
            Designer
          </span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span className="font-heading text-lg font-medium uppercase tracking-[0.15em] text-neutral-300 md:text-2xl">
            Creator
          </span>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-lg font-sans text-sm leading-relaxed text-neutral-500 opacity-0 md:text-base"
        >
          Crafting high-performance, pixel-perfect digital experiences
          with precision engineering and innovative design thinking.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-4 flex items-center gap-6 opacity-0">
          <a
            href={links.work}
            className="group flex items-center gap-3 rounded-full border border-neutral-700 px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-neutral-200 transition-all duration-300 hover:border-[#c8f031] hover:text-[#c8f031]"
          >
            View Work
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={links.email}
            className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-neutral-500 transition-colors duration-300 hover:text-neutral-200"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="anime absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          Scroll
        </span>
        <div className="h-12 w-[1px] overflow-hidden bg-neutral-800">
          <div
            className="h-full w-full animate-pulse"
            style={{
              backgroundColor: "#c8f031",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Side text decoration */}
      <div className="absolute bottom-8 right-paddingX hidden items-center gap-4 md:flex">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          Portfolio 2025
        </span>
        <div className="h-[1px] w-16 bg-neutral-800" />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  );
}
