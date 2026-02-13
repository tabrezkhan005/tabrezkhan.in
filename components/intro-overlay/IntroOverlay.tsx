"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { gsap } from "gsap";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

/**
 * Fullscreen cinematic intro overlay.
 * Session-based skip: on first visit we run the timeline and set
 * sessionStorage[INTRO_SEEN_KEY] = "true". On subsequent navigations
 * in the same tab/session we read that key and skip the intro (return null,
 * call onComplete). Closing the tab clears sessionStorage so the next
 * visit gets the intro again.
 */
const INTRO_SEEN_KEY = "portfolio-intro-seen";
const BODY_LOCK_CLASS = "intro-overlay-active";

export function IntroOverlay({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
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
    const hi = hiRef.current;
    const name = nameRef.current;
    if (!overlay || !hi || !name) return;

    gsap.set(hi, { opacity: 0, scale: 0.92 });
    gsap.set(name, { opacity: 0, y: 24 });

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

      tl.to(hi, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power4.out",
      })
        .to(hi, { duration: 0.5 })
        .to(
          hi,
          {
            opacity: 0,
            y: -24,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        .to(
          name,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .to(name, { duration: 0.7 })
        .to(overlay, {
          opacity: 0,
          y: "-100vh",
          duration: 0.85,
          ease: "power4.in",
        });
    }, overlayRef);

    return () => {
      if (!completedRef.current) ctx.revert();
    };
  }, [shouldRender]);

  if (!shouldRender || isComplete) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950 ${plusJakarta.className}`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center gap-8 px-6 text-center">
        <p
          ref={hiRef}
          className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          HI!!!
        </p>
        <p
          ref={nameRef}
          className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          This is Tabrez Khan
        </p>
      </div>
    </div>
  );
}
