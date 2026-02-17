"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");

export function HeroRoleText() {
  const this1Ref = useRef<HTMLSpanElement>(null);
  const this2Ref = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const t1 = this1Ref.current;
    const t2 = this2Ref.current;
    if (!t1 || !t2) return;

    gsap.set(t1, { y: "0%", opacity: 1 });
    gsap.set(t2, { y: "140%", opacity: 0 });

    const tl = gsap
      .timeline({ defaults: { ease: "none" }, repeat: -1 })
      .fromTo(
        t1,
        { y: "0%", opacity: 1 },
        { y: "-140%", opacity: 0, duration: 0.9, delay: 1.7, ease }
      )
      .fromTo(
        t2,
        { y: "140%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, ease },
        "-=0.9"
      )
      .fromTo(
        t2,
        { y: "0%", opacity: 1 },
        { y: "-140%", opacity: 0, duration: 0.9, delay: 1.7, ease }
      )
      .fromTo(
        t1,
        { y: "140%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, ease },
        "-=0.9"
      );

    timelineRef.current = tl;
    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  return (
    <h2 className="hero-footer-role-text intro-reveal-text pointer-events-none z-50 flex flex-col items-start gap-1">
      <div
        className="mb-2 h-7 w-7 bg-contain bg-no-repeat"
        style={{ backgroundImage: 'url(/svg/arrow2.svg)' }}
        aria-hidden="true"
      />
      <div className="free anime w-full text-left whitespace-nowrap">
        Freelance
      </div>
      <div className="animation__wrapper anime w-full text-left">
        <span ref={this1Ref} className="animate__this animate__this1 left-0">
          Webflow Developer<span className="yellow__it">.</span>
        </span>
        <span ref={this2Ref} className="animate__this animate__this2 left-0">
          Next.js Developer<span className="yellow__it">.</span>
        </span>
      </div>
    </h2>
  );
}
