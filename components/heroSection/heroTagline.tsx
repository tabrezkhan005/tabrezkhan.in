"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TAGLINES = [
  "Building scalable digital products.",
  "Designing modern web experiences.",
  "Crafting performance-first interfaces.",
];

const HOLD_DURATION = 4;
const FADE_OUT_DURATION = 0.5;
const CHAR_STAGGER = 0.035;
const CHAR_DURATION = 0.32;

export function HeroTagline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tagline = TAGLINES[currentIndex];
  const characters = Array.from(tagline);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const charEls = line.querySelectorAll<HTMLElement>(".tagline-char");
    if (!charEls.length) return;

    gsap.set(charEls, {
      opacity: 0,
      y: 10,
      display: "inline-block",
    });

    const ctx = gsap.context(() => {
      gsap.to(charEls, {
        opacity: 1,
        y: 0,
        duration: CHAR_DURATION,
        stagger: CHAR_STAGGER,
        ease: "power2.out",
        overwrite: true,
      });
    }, container);

    timeoutRef.current = setTimeout(() => {
      gsap.to(container, {
        opacity: 0,
        duration: FADE_OUT_DURATION,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((i) => (i + 1) % TAGLINES.length);
          gsap.set(container, { opacity: 1 });
        },
      });
    }, HOLD_DURATION * 1000);

    return () => {
      ctx.revert();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="intro-reveal-tagline pointer-events-none z-10 -mt-52 flex w-full flex-1 items-center justify-center overflow-x-auto px-6 py-8 md:-mt-72"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        ref={lineRef}
        className="tagline-line font-birthstone inline-block whitespace-nowrap text-center text-[clamp(2.5rem,6vw+2rem,5rem)] leading-[1.35] tracking-[0.02em] text-colorLight/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
      >
        {characters.map((char, i) => (
          <span
            key={`${currentIndex}-${i}-${char}`}
            className="tagline-char inline-block whitespace-pre"
            style={{ willChange: "opacity, transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
}
