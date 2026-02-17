"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { howIWorkSteps } from "@/data/sections";
import gsap from "gsap";
import { useAppSelector } from "@/hooks/reduxHooks";

declare global {
  interface Window {
    fullpage_api: any;
  }
}

export function HowIWorkWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const lastActionRef = useRef<number>(0);
  const ACTION_COOLDOWN = 1000;
  const SECTION_COOLDOWN = 1800;
  const touchStartY = useRef<number | null>(null);

  const TOTAL_STEPS = howIWorkSteps?.length || 4;

  const handleNavigation = useCallback((direction: "next" | "prev") => {
    const now = Date.now();
    const isMovingSection = (direction === "next" && activeStep === TOTAL_STEPS - 1) ||
                           (direction === "prev" && activeStep === 0);

    const cooldown = isMovingSection ? SECTION_COOLDOWN : ACTION_COOLDOWN;

    if (now - lastActionRef.current < cooldown) return;

    if (direction === "next") {
      if (activeStep < TOTAL_STEPS - 1) {
        lastActionRef.current = now;
        animateStepChange(activeStep + 1);
      } else {
        lastActionRef.current = now;
        window.fullpage_api?.setAllowScrolling(false);
        window.fullpage_api?.moveSectionDown();
        setTimeout(() => window.fullpage_api?.setAllowScrolling(true), SECTION_COOLDOWN);
      }
    } else {
      if (activeStep > 0) {
        lastActionRef.current = now;
        animateStepChange(activeStep - 1);
      } else {
        lastActionRef.current = now;
        window.fullpage_api?.setAllowScrolling(false);
        window.fullpage_api?.moveSectionUp();
        setTimeout(() => window.fullpage_api?.setAllowScrolling(true), SECTION_COOLDOWN);
      }
    }
  }, [activeStep, TOTAL_STEPS]);

  const animateStepChange = (newStep: number) => {
    const tl = gsap.timeline({
      onComplete: () => setActiveStep(newStep)
    });

    // Out animation
    tl.to(".animate-out", {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    });

    tl.to(".video-container", {
      scale: 0.95,
      opacity: 0.5,
      duration: 0.4,
      ease: "power2.in"
    }, 0);
  };

  useEffect(() => {
    // In animation when activeStep actually changes
    const tl = gsap.timeline();

    gsap.set(".animate-out", { y: 20, opacity: 0 });
    gsap.set(".video-container", { scale: 1.05, opacity: 0, filter: "blur(10px)" });

    tl.to(".video-container", {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "expo.out"
    });

    tl.to(".animate-out", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.6");
  }, [activeStep]);

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      if (Math.abs(e.deltaY) < 40) return;
      handleNavigation(e.deltaY > 0 ? "next" : "prev");
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40) handleNavigation(diff > 0 ? "next" : "prev");
      touchStartY.current = null;
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNavigation]);

  const fullpageState = useAppSelector((state) => state.fullpageReducer.fifth);
  useEffect(() => {
    if (fullpageState.direction === "down") setActiveStep(0);
    else if (fullpageState.direction === "up") setActiveStep(TOTAL_STEPS - 1);
  }, [fullpageState.suscribe, TOTAL_STEPS]);

  return (
    <div ref={containerRef} className="lock-scroll relative h-screen w-full overflow-hidden bg-white px-6 md:px-20 flex flex-col justify-center">

      {/* Background Blueprint Lines -- Professional Touch */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left: Text Content - Professional & Clean */}
        <div className="md:col-span-5 flex flex-col gap-6 order-2 md:order-1">
          <div className="animate-out overflow-hidden flex items-center gap-4 group">
            <span className="h-px w-8 bg-neutral-900 transition-all group-hover:w-12" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-neutral-400">Process Step 0{activeStep + 1}</span>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="animate-out font-birthstone text-5xl text-neutral-300">
              {howIWorkSteps[activeStep]?.step}
            </h4>
            <h3 className="animate-out text-4xl md:text-7xl font-bold text-neutral-950 tracking-tight leading-none mb-4 uppercase italic font-turretRoad">
              {howIWorkSteps[activeStep]?.title}
            </h3>
          </div>

          <p className="animate-out text-lg md:text-xl text-neutral-500 font-light leading-relaxed max-w-md border-l-2 border-neutral-100 pl-6 py-2">
            {howIWorkSteps[activeStep]?.body}
          </p>

          <div className="animate-out flex items-center gap-2 mt-8">
            {howIWorkSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${i === activeStep ? 'w-12 bg-neutral-900' : 'w-2 bg-neutral-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Video Visual - The Professional "Window" */}
        <div className="md:col-span-7 order-1 md:order-2">
          <div className="video-container relative aspect-video bg-neutral-50 rounded-lg overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100">
            <video
              key={activeStep}
              src={`/video/0${activeStep + 1}.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-opacity duration-1000"
            />

            {/* Corner Decorative Elements */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/40" />
          </div>

          {/* Floating metadata indicator */}
          <div className="animate-out mt-6 flex justify-between items-end opacity-40">
            <div className="text-[10px] font-bold tracking-widest uppercase flex flex-col">
              <span className="text-neutral-900">Workflow Node</span>
              <span>45.0934 / 09.2341</span>
            </div>
            <div className="text-[10px] font-bold tracking-widest uppercase transition-all">
              {howIWorkSteps[activeStep]?.title} — SECT 2024
            </div>
          </div>
        </div>
      </div>

      {/* Meaningful Micro-interaction: Corner Indicators */}
      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-6 opacity-20">
         <div className="flex flex-col gap-1">
            <div className={`h-1 w-1 rounded-full bg-black transition-opacity ${activeStep === 0 ? 'opacity-100' : 'opacity-30'}`} />
            <div className={`h-1 w-1 rounded-full bg-black transition-opacity ${activeStep === 1 ? 'opacity-100' : 'opacity-30'}`} />
            <div className={`h-1 w-1 rounded-full bg-black transition-opacity ${activeStep === 2 ? 'opacity-100' : 'opacity-30'}`} />
            <div className={`h-1 w-1 rounded-full bg-black transition-opacity ${activeStep === 3 ? 'opacity-100' : 'opacity-30'}`} />
         </div>
         <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-black rotate-[-90deg] origin-left">Navigation Matrix</span>
      </div>

    </div>
  );
}
