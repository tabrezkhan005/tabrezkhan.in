"use client";

import React from "react";

interface ServiceItemProps {
  index: string;
  title: string;
  description: string;
  isActive: boolean;
  onMouseEnter: () => void;
  itemRef?: (el: HTMLLIElement | null) => void;
}

export function ServiceItem({
  index,
  title,
  description,
  isActive,
  onMouseEnter,
  itemRef,
}: ServiceItemProps) {
  return (
    <li
      ref={itemRef}
      onMouseEnter={onMouseEnter}
      className="group relative border-b border-black/10 py-5 first:pt-0 last:border-b-0 md:py-6"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
        <span
          className="inline-block text-xl font-semibold tabular-nums tracking-tight text-black md:w-12 md:text-2xl"
          aria-hidden
        >
          {index}
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] leading-tight font-semibold tracking-tight text-black md:text-[20px]">
            {title}
          </h3>
          <p className="text-[12px] leading-relaxed text-black/60 md:text-[15px]">
            {description}
          </p>
        </div>
      </div>
      {isActive && (
        <div
          className="absolute -left-4 top-5 bottom-5 w-[2px] bg-black/25 md:top-6 md:bottom-6"
          aria-hidden
        />
      )}
    </li>
  );
}
