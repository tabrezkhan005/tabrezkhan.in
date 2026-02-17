"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { featuredProjects } from "@/data/sections";
import { links } from "@/data/data";
import { gsap } from "gsap";
import AnimatedCardStack from "@/components/ui/animate-card-animation";
import { useAppSelector } from "@/hooks/reduxHooks";

// Declare FullPage API on window
declare global {
  interface Window {
    fullpage_api: any;
  }
}

export function SelectedWorkWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastActionRef = useRef<number>(0);
  const ACTION_COOLDOWN = 600;
  const SECTION_COOLDOWN = 1800;

  const fullpageState = useAppSelector((state) => state.fullpageReducer.third);

  // Sync active index when entering from top or bottom
  useEffect(() => {
    if (fullpageState.direction === "down") {
      setActiveIndex(0);
    } else if (fullpageState.direction === "up") {
      setActiveIndex(featuredProjects.length - 1);
    }
  }, [fullpageState.suscribe]);

  // Touch handling state
  const touchStartY = useRef<number | null>(null);

  const handleNavigation = useCallback((direction: "up" | "down") => {
    const now = Date.now();
    const isMovingSection = (direction === "down" && activeIndex === featuredProjects.length - 1) ||
                           (direction === "up" && activeIndex === 0);

    const cooldown = isMovingSection ? SECTION_COOLDOWN : ACTION_COOLDOWN;

    if (now - lastActionRef.current < cooldown) {
      return;
    }

    if (direction === "down") {
      if (activeIndex < featuredProjects.length - 1) {
        lastActionRef.current = now;
        setActiveIndex((prev) => prev + 1);
      } else {
        lastActionRef.current = now;
        window.fullpage_api?.setAllowScrolling(false);
        window.fullpage_api?.moveSectionDown();
        setTimeout(() => {
          window.fullpage_api?.setAllowScrolling(true);
        }, SECTION_COOLDOWN);
      }
    } else {
      if (activeIndex > 0) {
        lastActionRef.current = now;
        setActiveIndex((prev) => prev - 1);
      } else {
        lastActionRef.current = now;
        window.fullpage_api?.setAllowScrolling(false);
        window.fullpage_api?.moveSectionUp();
        setTimeout(() => {
          window.fullpage_api?.setAllowScrolling(true);
        }, SECTION_COOLDOWN);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      // Logic: Capture all wheel events here
      // We stop propagation to ensure FullPage doesn't get confused
      // as long as we are within the lock-scroll element.
      e.stopPropagation();

      const delta = e.deltaY;
      if (Math.abs(delta) < 40) return; // Threshold for intentional scroll

      if (delta > 0) {
        handleNavigation("down");
      } else {
        handleNavigation("up");
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      // Prevent scrolling the page while we are handling the project stack
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      // Swipe Up (Scroll Down)
      if (diff > 40) {
        handleNavigation("down");
      }
      // Swipe Down (Scroll Up)
      else if (diff < -40) {
        handleNavigation("up");
      }

      touchStartY.current = null;
    };

    // Add listeners with { passive: false } where needed
    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNavigation]);

  // Character stagger animation
  const headingText = "Curated Work";

  const handleHeadingEnter = () => {
    if (!headingRef.current) return;
    const spans = headingRef.current.children;

    gsap.killTweensOf(spans);
    gsap.to(spans, {
      y: -15,
      color: "#ffffff",
      textShadow: "0 0 20px rgba(255,255,255,0.9)",
      stagger: {
        each: 0.03,
        from: "center",
        yoyo: true,
        repeat: 1,
      },
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    // lock-scroll class allows us to handle events manually without FullPage hijacking immediately
    // We remove pinning logic because we are functionally pinning by not navigating away.
    <main
      ref={wrapperRef}
      className="lock-scroll relative flex h-full w-full flex-col justify-center overflow-hidden"
    >
      <div className="flex h-full w-full flex-col items-center justify-center py-10">
        <div className="relative z-30 mb-8 flex flex-col items-center pt-8">
          <h2
            ref={headingRef}
            onMouseEnter={handleHeadingEnter}
            className="cursor-default font-birthstone text-[clamp(4rem,8vw,7rem)] font-normal leading-none tracking-tight text-white transition-colors duration-500 md:text-[8rem]"
          >
            {headingText.split("").map((char, i) => (
              <span key={i} className="inline-block origin-center transition-transform will-change-transform text-white">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        <div className="z-20 w-full max-w-full grow">
          <AnimatedCardStack items={featuredProjects} activeIndex={activeIndex} />
        </div>

        <div className="relative z-30 mt-8 flex justify-center">
          <a
            href={links.work}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:pr-8"
          >
            View all work
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
