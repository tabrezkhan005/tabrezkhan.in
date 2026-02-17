"use client";

import React, { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { gsap } from "gsap";

const playwrite = localFont({
  src: "../../public/fonts/PlaywriteAT-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
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

  const [shouldRender, setShouldRender] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem(INTRO_SEEN_KEY);
    // Skip if seen before
    if (seen === "true") {
      setShouldRender(false);
      document.body.classList.add("intro-reveal");
      onComplete?.();
      return;
    }

    document.body.classList.add(BODY_LOCK_CLASS);
    document.body.setAttribute("data-intro", "active");

    return () => {
      if (!completedRef.current) {
        document.body.classList.remove(BODY_LOCK_CLASS);
        document.body.removeAttribute("data-intro");
        document.body.classList.remove("intro-reveal");
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
    gsap.set(name, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          completedRef.current = true;
          sessionStorage.setItem(INTRO_SEEN_KEY, "true");
          document.body.classList.remove(BODY_LOCK_CLASS);
          document.body.removeAttribute("data-intro");
          document.body.classList.remove("intro-reveal");
          setIsComplete(true);
          onComplete?.();
        },
      });

      // HI appears
      tl.to(hi, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power4.out",
      })
        // Hold HI
        .to(hi, { duration: 1 })
        // HI slowly dissolves (longer fade out)
        .to(hi, {
          opacity: 0,
          y: -20,
          duration: 1.2,
          ease: "power2.inOut",
        })
        // "This is Tabrez Khan" fades in, centred
        .to(name, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
        // Hold name
        .to(name, { duration: 1.2 })
        // Start main content staggered reveal and slowly fade overlay (name fades with it)
        .add(() => {
          document.body.classList.add("intro-reveal");
        })
        .to(overlay, {
          opacity: 0,
          duration: 2.2,
          ease: "power2.inOut",
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
      className={`fixed inset-0 z-[9999] bg-neutral-950 ${playwrite.className}`}
      aria-hidden="true"
    >
      {/* HI in exact centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          ref={hiRef}
          className="font-birthstone text-center text-7xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl"
          style={{ opacity: 0 }}
        >
          Hi
        </p>
      </div>
      {/* "This is Tabrez Khan" in exact centre, same size as HI */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <p
          ref={nameRef}
          className="whitespace-nowrap px-6 text-center font-extrabold tracking-tight text-white text-[clamp(1.2rem,4vw+1rem,5.5rem)]"
          style={{ opacity: 0 }}
        >
          This is Tabrez Khan.
        </p>
      </div>
    </div>
  );
}
