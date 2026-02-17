"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CURSOR_FOLLOW_DURATION = 0.12;
const CURSOR_EASE = "power2.out";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "left", {
      duration: CURSOR_FOLLOW_DURATION,
      ease: CURSOR_EASE,
    });
    const yTo = gsap.quickTo(el, "top", {
      duration: CURSOR_FOLLOW_DURATION,
      ease: CURSOR_EASE,
    });

    function handleMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    document.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden
      style={{ willChange: "left, top" }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-arrow"
      >
        <path
          d="M5 3l12 9.5-6.5 1.5L11 21l-2-7.5L5 3z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
