"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function LargeNameFooter() {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const nameRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).toLowerCase(),
        time: now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Initial GSAP Animation
    if (nameRef.current && infoRef.current) {
      gsap.fromTo(
        nameRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 1 }
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full h-full min-h-screen flex flex-col items-center justify-between bg-white text-black overflow-hidden select-none px-4 py-8 md:px-6 md:py-12 md:py-16">

      {/* Date and Time at the TOP LEFT area */}
      <div
        ref={infoRef}
        className="self-start flex flex-col items-start justify-start gap-4 font-mono text-[10px] md:text-sm tracking-tighter lowercase border-l-2 md:border-l-[3px] border-black pl-6 z-20 mt-6 md:mt-10"
      >
        <div className="flex flex-col items-start">
          <span className="text-black/30 font-medium tracking-normal">currently in</span>
          <span className="font-bold">hyderabad, in</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-black/30 font-medium tracking-normal">local date</span>
          <span className="font-bold">{dateTime.date}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-black/30 font-medium tracking-normal">local time</span>
          <span className="font-bold">{dateTime.time} gmt +5:30</span>
        </div>
      </div>

      {/* Large Lowercase Name - Centered */}
      <div className="w-full flex items-end justify-center overflow-visible">
        <h1
          ref={nameRef}
          className="text-[12vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[16.5vw] font-bold leading-[0.9] tracking-[-0.05em] lowercase whitespace-nowrap pb-6 px-4 text-center"
        >
          tabrez khan.
        </h1>
      </div>

      {/* High-contrast Visual Accent */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black z-30" />
    </footer>
  );
}
