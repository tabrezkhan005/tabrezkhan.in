import React from "react";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { HeroPaperBackground } from "@/components/ui/hero-paper-background";

export function HeroSection() {
  return (
    <section className="section section__1 darkGradient first relative z-0 px-paddingX md:pl-[4vw] text-colorLight">
      <div className="absolute inset-0 z-0">
        <HeroPaperBackground className="h-full w-full" />
      </div>
      <div className="relative z-10 flex h-full min-h-full w-full flex-col">
        <Bulge type="Light" />
        <Header color="Light" className="intro-reveal-header" />
        <HeroWrapper />
      </div>
    </section>
  );
}
