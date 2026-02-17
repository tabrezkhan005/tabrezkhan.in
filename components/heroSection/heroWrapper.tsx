import React from "react";
import { HeroButton } from "./heroButton";
import { HeroCenter } from "./heroCenter";
import { HeroMarquee } from "./heroMarquee";
import { HeroRoleText } from "./heroRoleText";

export function HeroWrapper() {
  return (
    <main className="section1__wrapper relative flex h-full max-w-maxWidth grow flex-col">
      <div className="myImage" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <HeroCenter />
      </div>
      <HeroButton className="intro-reveal-btn" />
      <HeroRoleText />
      <HeroMarquee />
    </main>
  );
}
