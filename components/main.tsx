import React from "react";
import { HeroSection } from "@/components/heroSection/heroSection";
import { WhatIDoSection } from "@/components/whatIDoSection/whatIDoSection";
import { SelectedWorkSection } from "@/components/selectedWorkSection/selectedWorkSection";
import { AboutSection } from "@/components/aboutSection/aboutSection";
import { HowIWorkSection } from "@/components/howIWorkSection/howIWorkSection";
import { AboutHeroSection } from "@/components/aboutHeroSection/aboutHeroSection";
import { ExperienceSection } from "@/components/experienceSection/experienceSection";
import { ContributionsSection } from "@/components/contributionsSection/contributionsSection";
import { ToolsSection } from "@/components/toolsSection/toolsSection";
import { ContactSection } from "@/components/contactSection/contactSection";
import { FooterSection } from "@/components/footerSection/footerSection";

export function Main() {
  return (
    <>
      <HeroSection />
      <WhatIDoSection />
      <SelectedWorkSection />
      <AboutSection />
      <HowIWorkSection />
      <AboutHeroSection />
      <ExperienceSection />
      <ContributionsSection />
      <ToolsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
