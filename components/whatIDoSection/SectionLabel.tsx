import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel = React.forwardRef<HTMLSpanElement, SectionLabelProps>(
  function SectionLabel({ children, className }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-block text-xs font-semibold uppercase tracking-[0.3em] text-colorSecondaryDark transition-colors duration-300",
          "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-colorPrimary after:opacity-0 after:transition-opacity after:duration-300",
          "hover:text-colorDark hover:after:opacity-100",
          className
        )}
      >
        {children}
      </span>
    );
  }
);
