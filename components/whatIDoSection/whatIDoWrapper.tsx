"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatIDoCopy } from "@/data/sections";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, ScrollTrigger);
}

const easeOut = CustomEase.create("out", "M0,0 C0.11,0.49 0.24,0.845 0.41,0.93 0.57,1.01 0.77,1.01 1,1");
const easeElastic = "elastic.out(1, 0.6)";

export function WhatIDoWrapperMinimal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mainGridRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const problemsListRef = useRef<HTMLDivElement>(null);
  const problemsItemsRef = useRef<HTMLDivElement[]>([]);

  const solutionsListRef = useRef<HTMLDivElement>(null);
  const solutionsItemsRef = useRef<HTMLDivElement[]>([]);

  const hasAnimatedRef = useRef(false);
  const [activeSection, setActiveSection] = useState<'problems' | 'solutions' | null>(null);

  const { headline, description, problems, solutions } = whatIDoCopy;
  const words = headline.replace(/\s+/g, " ").trim().split(" ");

  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const headline = headlineRef.current;
        const wordEls = headlineWordsRef.current.filter(Boolean);
        const mainGrid = mainGridRef.current;
        const leftColumn = leftColumnRef.current;
        const rightColumn = rightColumnRef.current;
        const problemsList = problemsListRef.current;
        const problemsItems = problemsItemsRef.current.filter(Boolean);
        const solutionsList = solutionsListRef.current;
        const solutionsItems = solutionsItemsRef.current.filter(Boolean);

        if (prefersReducedMotion) {
          gsap.set(
            [
              headline, ...wordEls, mainGrid, leftColumn, rightColumn,
              problemsList, ...problemsItems, solutionsList, ...solutionsItems,
            ],
            { opacity: 1, y: 0, x: 0, scale: 1 }
          );
          return;
        }

        // Initial states
        gsap.set(wordEls, { opacity: 0, y: 120, rotateX: -30 });
        gsap.set([leftColumn, rightColumn], { opacity: 0, y: 80 });
        gsap.set(problemsItems, { opacity: 0, y: 40, x: -30 });
        gsap.set(solutionsItems, { opacity: 0, y: 40, x: 30 });

        const tl = gsap.timeline({ delay: 0.3 });

        // Headline reveal with stagger
        tl.to(
          wordEls,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.08,
            ease: easeOut,
          }
        );

        // Columns slide up
        tl.to(
          [leftColumn, rightColumn],
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: easeOut,
          },
          "-=0.8"
        );

        // Problems items cascade
        tl.to(
          problemsItems,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            stagger: 0.12,
            ease: easeOut,
          },
          "-=0.6"
        );

        // Solutions items cascade
        tl.to(
          solutionsItems,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            stagger: 0.12,
            ease: easeOut,
          },
          "-=0.8"
        );

        // Parallax on scroll
        if (problemsItems.length > 0) {
          problemsItems.forEach((item, i) => {
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
              y: i % 2 === 0 ? -30 : -50,
              ease: "none",
            });
          });
        }

        if (solutionsItems.length > 0) {
          solutionsItems.forEach((item, i) => {
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
              y: i % 2 === 0 ? -50 : -30,
              ease: "none",
            });
          });
        }
      },
      { threshold: 0.08, rootMargin: "0px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full max-w-[1800px] flex-col justify-center px-0 py-12 md:py-24 md:py-40"
      style={{ perspective: "2000px" }}
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-colorPrimary mix-blend-difference lg:block"
        aria-hidden="true"
      />

      {/* Headline */}
      <h2
        ref={headlineRef}
        className="font-birthstone mb-16 w-full text-center text-[clamp(2.5rem,8vw,8rem)] font-normal leading-[0.95] tracking-tighter text-colorDark md:mb-32 md:mb-48"
        style={{ transformStyle: "preserve-3d" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) headlineWordsRef.current[i] = el;
            }}
            className="mr-[0.2em] inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {word}
          </span>
        ))}
      </h2>

      {/* Main Grid */}
      <div
        ref={mainGridRef}
        className="grid w-full grid-cols-1 gap-12 px-4 md:px-0 lg:grid-cols-2 lg:gap-32"
      >
        {/* Left Column - Problems */}
        <div
          ref={leftColumnRef}
          className="relative"
          onMouseEnter={() => setActiveSection('problems')}
          onMouseLeave={() => setActiveSection(null)}
        >
          {/* Title */}
          <div className="mb-10 md:mb-16">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="text-7xl font-black tracking-tighter text-colorDark/10 md:text-8xl">
                01
              </span>
              <h3 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black uppercase leading-none tracking-tighter text-colorDark">
                {problems.title}
              </h3>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-colorDark to-transparent" />
          </div>

          {/* Items */}
          <div
            ref={problemsListRef}
            className="space-y-10"
          >
            {problems.items.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) problemsItemsRef.current[i] = el;
                }}
                className="group relative cursor-pointer"
              >
                {/* Hover line */}
                <div className="absolute -left-8 top-0 h-full w-[2px] scale-y-0 bg-colorDark transition-transform duration-500 group-hover:scale-y-100" />

                {/* Number */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-sm font-bold tracking-widest text-colorSecondaryDark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-[1px] flex-1 bg-colorSecondaryLight" />
                </div>

                {/* Text */}
                <p className="text-[clamp(1.125rem,1.8vw,1.5rem)] leading-[1.55] text-colorDark transition-colors duration-300 group-hover:text-colorDark/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Solutions */}
        <div
          ref={rightColumnRef}
          className="relative"
          onMouseEnter={() => setActiveSection('solutions')}
          onMouseLeave={() => setActiveSection(null)}
        >
          {/* Title */}
          <div className="mb-10 md:mb-16">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="text-7xl font-black tracking-tighter text-colorPrimary/20 md:text-8xl">
                02
              </span>
              <h3 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black uppercase leading-none tracking-tighter text-colorDark">
                {solutions.title}
              </h3>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-colorPrimary to-transparent" />
          </div>

          {/* Items */}
          <div
            ref={solutionsListRef}
            className="space-y-10"
          >
            {solutions.items.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) solutionsItemsRef.current[i] = el;
                }}
                className="group relative cursor-pointer"
              >
                {/* Hover line */}
                <div className="absolute -left-8 top-0 h-full w-[2px] scale-y-0 bg-colorPrimary transition-transform duration-500 group-hover:scale-y-100" />

                {/* Number */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-sm font-bold tracking-widest text-colorSecondaryDark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-[1px] flex-1 bg-colorSecondaryLight" />
                </div>

                {/* Text */}
                <p className="text-[clamp(1.125rem,1.8vw,1.5rem)] leading-[1.55] text-colorDark transition-colors duration-300 group-hover:text-colorDark/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-1000 ${
          activeSection === 'problems' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-colorDark/5 blur-3xl" />
      </div>

      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-1000 ${
          activeSection === 'solutions' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-colorPrimary/10 blur-3xl" />
      </div>
    </div>
  );
}
