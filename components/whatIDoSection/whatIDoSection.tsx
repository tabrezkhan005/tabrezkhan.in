"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ContextPanel } from "./ContextPanel";
import { ServiceItem } from "./ServiceItem";
import { Bulge } from "../bulge";
import { Header } from "../header";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "React, Next.js, TypeScript, Tailwind — scalable, accessible interfaces.",
  },
  {
    number: "02",
    title: "Backend Systems",
    description:
      "Node.js, APIs, databases — architecture that grows with you.",
  },
  {
    number: "03",
    title: "AI Integrations",
    description:
      "Claude, GPT, custom models — intelligent features shipped fast.",
  },
  {
    number: "04",
    title: "Product Design",
    description:
      "UI/UX, prototyping, research — from concept to pixel-perfect build.",
  },
];

const DURATION_OUT = 0.3;
const DURATION_IN = 0.5;
const EASE = "power2.out";

export function WhatIDoExpertise() {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const isTransitioningRef = useRef(false);

  const setActiveWithTransition = useCallback((index: number) => {
    if (index === activeService) return;
    if (isTransitioningRef.current) return;
    const panel = panelRef.current;
    if (!panel) {
      setActiveService(index);
      return;
    }
    isTransitioningRef.current = true;
    gsap.to(panel, {
      opacity: 0,
      y: 20,
      duration: DURATION_OUT,
      ease: EASE,
      onComplete: () => {
        setActiveService(index);
        isTransitioningRef.current = false;
      },
    });
  }, [activeService]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.fromTo(
      panel,
      { opacity: 0, y: 20, scale: 1.02 },
      { opacity: 1, y: 0, scale: 1, duration: DURATION_IN, ease: EASE }
    );
  }, [activeService]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!section || items.length === 0) return;

    const getActiveIndex = (): number => {
      const vh = window.innerHeight;
      const center = vh * 0.4;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    const onScroll = () => {
      const index = getActiveIndex();
      if (index !== activeService) setActiveWithTransition(index);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: onScroll,
    });

    return () => {
      st.kill();
    };
  }, [activeService, setActiveWithTransition]);

  return (
    <section
      ref={sectionRef}
      className="section section__2 second what-i-do min-h-full w-full grid-cols-1 bg-white md:grid-cols-2 md:px-0"
      style={{ minHeight: "100vh", height: "100%" }}
    >
      <Bulge type="Dark" />
      <Header color="Dark" />

      <div className="anime left flex flex-col justify-center px-paddingX py-16 md:py-24">
        <h2 className="font-birthstone mb-6 text-left text-[clamp(2rem,5vw,3.5rem)] font-normal leading-tight text-black md:mb-8">
          What I Do
        </h2>
        <div
          className="mb-10 h-px w-24 bg-black md:mb-12"
          aria-hidden
        />
        <ul className="space-y-0">
          {ITEMS.map((item, index) => (
            <ServiceItem
              key={item.number}
              index={item.number}
              title={item.title}
              description={item.description}
              isActive={activeService === index}
              onMouseEnter={() => setActiveWithTransition(index)}
              itemRef={(el: HTMLLIElement | null) => {
                itemRefs.current[index] = el;
              }}
            />
          ))}
        </ul>
      </div>

      <div className="anime right relative flex flex-col justify-center bg-black/[0.02] px-paddingX py-16 md:py-24 md:pl-12">
        <div
          ref={panelRef}
          className="context-content min-h-[220px] rounded border border-black/10 bg-white/80 p-6 shadow-sm md:min-h-[260px] md:p-8"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <ContextPanel activeIndex={activeService} />
        </div>
      </div>
    </section>
  );
}

export { WhatIDoExpertise as WhatIDoSection };
