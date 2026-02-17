import React, { useRef, useLayoutEffect } from "react";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { HowIWorkWrapper } from "./howIWorkWrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HowIWorkSection() {
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 1 }, // Changed from 0 to 1 to ensure visibility
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="section section__5 fifth relative bg-slate-50"
    >
      <Bulge type="Dark" />
      <Header color="Dark" />
      <HowIWorkWrapper />
    </section>
  );
}
