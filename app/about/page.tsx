"use client";

import React from "react";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Cursor } from "@/components/cursor";
import { AboutHeroSection } from "@/components/aboutHeroSection/aboutHeroSection";
import { FooterSection } from "@/components/footerSection/footerSection";
import "../index.css";
import "../header.css";

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <Cursor />
      <HeaderNavigation />

      {/*
        AboutHeroSection already contains a section tag with h-screen,
        Bulge, and Header. We just need to render it here.
      */}
      <div className="relative">
        <AboutHeroSection />
      </div>

      <FooterSection />
    </main>
  );
}
