import React from "react";
import { cn } from "@/lib/utils";

interface WhatIDoCardProps {
  title: string;
  items: string[];
  accent?: "primary" | "dark";
  className?: string;
  itemClassName?: string;
  titleRef?: React.RefObject<HTMLHeadingElement | null>;
  listRef?: React.RefObject<HTMLUListElement | null>;
}

export function WhatIDoCard({
  title,
  items,
  accent = "primary",
  className,
  itemClassName,
  titleRef,
  listRef,
}: WhatIDoCardProps) {
  const accentColor = accent === "primary" ? "text-colorPrimary" : "text-colorDark";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-colorSecondaryLight/40 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:border-colorPrimary/30 hover:shadow-md md:p-8",
        className
      )}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-colorPrimary" aria-hidden />
      <h3
        ref={titleRef}
        className={cn(
          "mb-5 text-sm font-semibold uppercase tracking-[0.2em]",
          accentColor
        )}
      >
        {title}
      </h3>
      <ul ref={listRef} className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-3 text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.6] text-colorDark",
              itemClassName
            )}
          >
            <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", accent === "primary" ? "bg-colorPrimary" : "bg-colorDark")} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
