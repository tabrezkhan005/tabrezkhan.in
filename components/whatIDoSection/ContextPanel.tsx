"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PREVIEWS = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    content: (
      <div className="flex flex-col gap-3 font-mono text-[13px] text-black/70">
        <div className="rounded border border-black/20 px-3 py-2">
          <span className="text-black/50">&lt;</span>Header <span className="text-black/50">/&gt;</span>
        </div>
        <div className="ml-4 flex flex-col gap-2 border-l-2 border-black/15 pl-3">
          <div className="rounded border border-black/20 px-3 py-3">
            <span className="text-black/50">&lt;</span>Card <span className="text-black/50">/&gt;</span>
          </div>
          <div className="rounded border border-black/20 px-3 py-2">
            <span className="text-black/50">&lt;</span>Button <span className="text-black/50">/&gt;</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "backend",
    title: "Backend Systems",
    content: <BackendPreview />,
  },
  {
    id: "ai",
    title: "AI Integrations",
    content: <AIPreview />,
  },
  {
    id: "product",
    title: "Product Design",
    content: <ProductDesignPreview />,
  },
];

function BackendPreview() {
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const arrows = arrowRefs.current.filter(Boolean);
    if (!arrows.length) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    arrows.forEach((el, i) => {
      tl.to(
        el,
        { opacity: 0.65, y: 2, duration: 1.2, ease: "power2.inOut" },
        i * 0.15
      );
    });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-0 py-2">
      {["Client", "API", "Service", "Database"].map((label, i) => (
        <React.Fragment key={label}>
          <div className="rounded border border-black/25 px-4 py-2 text-[14px] font-medium text-black/80">
            {label}
          </div>
          {i < 3 && (
            <div
              ref={(el) => {
                if (el) arrowRefs.current[i] = el;
              }}
              className="flex items-center gap-1 py-0.5 opacity-50"
            >
              <span className="block h-px w-8 bg-black/30" aria-hidden />
              <span className="text-black/40" aria-hidden>↓</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function AIPreview() {
  const promptRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prompt = promptRef.current;
    const response = responseRef.current;
    if (!prompt || !response) return;

    gsap.set(response, { opacity: 0 });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(prompt, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
      .to(response, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.3);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 text-[14px]">
      <div ref={promptRef} className="rounded border border-black/25 bg-black/[0.03] px-3 py-2">
        <span className="font-medium text-black/60">User:</span> Summarize this data
      </div>
      <div ref={responseRef} className="rounded border border-black/15 px-3 py-2 text-black/70">
        <span className="font-medium text-black/60">AI:</span> Here&apos;s a clean insight…
      </div>
    </div>
  );
}

function ProductDesignPreview() {
  const wireRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wire = wireRef.current;
    const final = finalRef.current;
    if (!wire || !final) return;

    gsap.set(final, { opacity: 0, scale: 0.98 });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(wire, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(wire, { opacity: 0.3, duration: 0.25 }, "+=0.2")
      .fromTo(final, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.15");
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={wireRef} className="rounded border border-dashed border-black/30 p-3">
        <div className="mb-2 h-2 w-3/4 rounded-sm bg-black/10" />
        <div className="mb-2 h-2 w-1/2 rounded-sm bg-black/10" />
        <div className="h-8 w-full rounded-sm bg-black/10" />
      </div>
      <div
        ref={finalRef}
        className="absolute inset-0 rounded border border-black/20 bg-white p-3"
        aria-hidden
      >
        <div className="mb-2 h-2 w-full rounded-sm bg-black/20" />
        <div className="mb-2 h-2 w-2/3 rounded-sm bg-black/15" />
        <div className="h-8 w-full rounded-sm bg-black/25" />
      </div>
    </div>
  );
}

interface ContextPanelProps {
  activeIndex: number;
}

export function ContextPanel({ activeIndex }: ContextPanelProps) {
  const preview = PREVIEWS[activeIndex] ?? PREVIEWS[0];
  return (
    <div className="flex h-full min-h-[200px] flex-col">
      <p className="mb-4 text-[13px] font-medium uppercase tracking-wider text-black/50">
        {preview.title}
      </p>
      <div className="flex-1">{preview.content}</div>
    </div>
  );
}
