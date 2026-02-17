"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CRAFT_WORD = "Craft";
const ETHICS = [
  "Precision",
  "Performance",
  "Reliability",
  "Clean code",
  "Intent",
];
const ETHICS_DURATION = 3.2;
const LINE_DRAW_DURATION = 0.8;
const WORD_STAGGER = 0.06;
const WORD_CHAR_DURATION = 0.4;

export function HeroCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ethicsRef = useRef<HTMLParagraphElement>(null);
  const [ethicsIndex, setEthicsIndex] = useState(0);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const word = wordRef.current;
    const line = lineRef.current;
    const ethics = ethicsRef.current;
    if (!container || !word || !line || !ethics) return;

    const charEls = word.querySelectorAll<HTMLElement>(".hero-center-char");
    if (!charEls.length) return;

    gsap.set(charEls, { opacity: 0, y: 14 });
    gsap.set(line, { scaleX: 0, transformOrigin: "center" });
    gsap.set(ethics, { opacity: 0, y: 6 });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(charEls, {
      opacity: 1,
      y: 0,
      duration: WORD_CHAR_DURATION,
      stagger: WORD_STAGGER,
      ease: "power2.out",
    })
      .to(
        line,
        {
          scaleX: 1,
          duration: LINE_DRAW_DURATION,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .to(
        ethics,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.35"
      );

    masterTl.current = tl;
    return () => {
      tl.kill();
      masterTl.current = null;
    };
  }, []);

  useEffect(() => {
    const ethicsEl = ethicsRef.current;
    if (!ethicsEl) return;

    const nextIndex = (ethicsIndex + 1) % ETHICS.length;
    const timeout = setTimeout(() => {
      gsap.to(ethicsEl, {
        opacity: 0,
        y: -6,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setEthicsIndex(nextIndex);
          requestAnimationFrame(() => {
            gsap.set(ethicsEl, { y: 6 });
            gsap.to(ethicsEl, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        },
      });
    }, ETHICS_DURATION * 1000);

    return () => clearTimeout(timeout);
  }, [ethicsIndex]);

  const currentEthic = ETHICS[ethicsIndex];

  return (
    <div
      ref={containerRef}
      className="intro-reveal-tagline pointer-events-none z-10 mt-0 flex w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4 py-6 md:-mt-72 md:gap-6 md:px-6 md:py-8"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        ref={wordRef}
        className="font-birthstone inline-block text-[clamp(2.75rem,7vw+2rem,5.5rem)] leading-none tracking-[0.02em] text-colorLight [text-shadow:0_2px_12px_rgba(0,0,0,0.25)]"
      >
        {Array.from(CRAFT_WORD).map((char, i) => (
          <span
            key={i}
            className="hero-center-char inline-block whitespace-pre"
            style={{ willChange: "opacity, transform" }}
          >
            {char}
          </span>
        ))}
      </span>

      <div
        ref={lineRef}
        className="h-px w-20 bg-colorLight/60"
        aria-hidden
      />

      <p
        ref={ethicsRef}
        className="text-center font-medium tracking-[0.2em] text-colorLight/80 text-[clamp(0.7rem,1.2vw+0.4rem,0.85rem)] uppercase"
      >
        {currentEthic}
      </p>
    </div>
  );
}
