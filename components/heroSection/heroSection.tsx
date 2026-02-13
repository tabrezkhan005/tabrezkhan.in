import React, { useRef } from "react";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { HeroContent } from "@/components/heroSection/heroContent";
import { WebGLBackground } from "@/components/heroSection/webglBackground";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <section
      ref={sectionRef}
      className="section section__1 first relative z-0 overflow-hidden text-colorLight"
      style={{ background: "#0a0a0a" }}
    >
      <Bulge type="Light" />
      <WebGLBackground />
      <Header color="Light" />
      <HeroContent />
    </section>
  );
}
