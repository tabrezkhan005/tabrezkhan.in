"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const INTRO_SEEN_KEY = "portfolio-intro-seen";
const BODY_LOCK_CLASS = "intro-overlay-active";

export function IntroOverlay({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const [shouldRender, setShouldRender] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem(INTRO_SEEN_KEY);
    if (seen === "true") {
      onComplete?.();
      return;
    }

    setShouldRender(true);
    document.body.classList.add(BODY_LOCK_CLASS);

    return () => {
      if (!completedRef.current) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    };
  }, [onComplete]);

  useEffect(() => {
    if (!shouldRender) return;

    const overlay = overlayRef.current;
    const line = lineRef.current;
    const hi = hiRef.current;
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const progress = progressRef.current;
    if (!overlay || !line || !hi || !name || !subtitle || !progress) return;

    gsap.set([hi, name, subtitle], { opacity: 0, y: 40 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          completedRef.current = true;
          sessionStorage.setItem(INTRO_SEEN_KEY, "true");
          document.body.classList.remove(BODY_LOCK_CLASS);
          setIsComplete(true);
          onComplete?.();
        },
      });

      // Progress bar loads first
      tl.to(progress, {
        scaleX: 1,
        duration: 1.8,
        ease: "power2.inOut",
      })
        // "Hi" text rises in with a smooth stagger
        .to(
          hi,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.4
        )
        // Decorative line expands
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
          },
          0.7
        )
        // "this is Tabrez Khan" rises in
        .to(
          name,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          1.0
        )
        // Subtitle fades in
        .to(
          subtitle,
          {
            opacity: 0.5,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          1.3
        )
        // Hold for a moment
        .to({}, { duration: 0.6 })
        // Exit: everything fades out and overlay slides up
        .to(
          [hi, name, subtitle, line, progress],
          {
            opacity: 0,
            y: -30,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.in",
          }
        )
        .to(overlay, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.inOut",
        }, "-=0.2");
    }, overlayRef);

    return () => {
      if (!completedRef.current) ctx.revert();
    };
  }, [shouldRender, onComplete]);

  if (!shouldRender || isComplete) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)", backgroundColor: "#0a0a0a" }}
      aria-hidden="true"
    >
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative flex flex-col items-center justify-center gap-4 px-6 text-center">
        {/* Progress bar */}
        <div className="mb-8 h-[1px] w-48 overflow-hidden bg-neutral-800">
          <div
            ref={progressRef}
            className="h-full w-full"
            style={{ backgroundColor: "#c8f031" }}
          />
        </div>

        {/* Hi text */}
        <span
          ref={hiRef}
          className="font-heading text-lg font-medium uppercase tracking-[0.3em] text-neutral-400"
        >
          Hi, welcome
        </span>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="my-2 h-[1px] w-32"
          style={{ backgroundColor: "#c8f031" }}
        />

        {/* Name */}
        <span
          ref={nameRef}
          className="font-heading text-5xl font-bold tracking-tight text-neutral-100 sm:text-6xl md:text-7xl"
        >
          {"this is Tabrez Khan"}
        </span>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-2 font-sans text-sm font-light uppercase tracking-[0.25em] text-neutral-500"
        >
          Developer / Designer / Creator
        </p>
      </div>
    </div>
  );
}
