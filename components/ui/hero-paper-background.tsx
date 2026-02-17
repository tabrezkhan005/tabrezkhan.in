"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const HeroPaperBackgroundCanvas = dynamic(
  () => import("./hero-paper-background-canvas").then((m) => m.HeroPaperBackgroundCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className={cn("absolute inset-0 bg-[#0e0d0c]")}
        aria-hidden
      />
    ),
  }
);

interface HeroPaperBackgroundProps {
  className?: string;
}

export function HeroPaperBackground({ className }: HeroPaperBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 h-full w-full overflow-hidden", className)}
      aria-hidden
    >
      <HeroPaperBackgroundCanvas />
    </div>
  );
}
