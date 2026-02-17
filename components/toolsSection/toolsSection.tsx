"use client";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

// --- Custom Local Components specific to this Light Theme section ---

interface HelperBentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon?: React.ComponentType<{ className?: string }>
  description: string
  href: string
  cta: string
}

const LightBentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: HelperBentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl",
      // Light theme specific styles with cleaner shadow
      "bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
      className
    )}
    {...props}
  >
    {/* Background visual — fills the card */}
    <div className="absolute inset-0 z-0">{background}</div>

    {/* Bottom content area - Softer gradient for Light Theme */}
    {/* Reduced 'via' opacity to make it less harsh/foggy */}
    <div className="relative z-10 p-6 pt-20 bg-gradient-to-t from-white via-white/60 to-transparent">
      <div className="pointer-events-none flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-10">
        {Icon && <Icon className="h-8 w-8 origin-left transform-gpu text-black/60 transition-all duration-300 ease-in-out group-hover:scale-90 mb-2" />}
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          {name}
        </h3>
        <p className="max-w-lg text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Mobile CTA */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-6 left-6 flex w-full translate-y-0 transform-gpu flex-row items-center opacity-0 transition-all duration-300 group-hover:opacity-100 lg:hidden"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0 text-gray-900 font-semibold hover:text-black"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>

      {/* Desktop CTA — slides up on hover */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0 text-gray-900 font-semibold hover:text-black"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    {/* Hover overlay - Subtle darkening */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[0.01]" />
  </div>
)

// --- Data & Config ---

const tools = [
    { name: "Cursor", icon: "/svg_logo/cursor_dark.svg", dark: true },
    { name: "Notion", icon: "/svg_logo/notion.svg", dark: true },
    { name: "Figma", icon: "/svg_logo/figma-logo.svg", dark: false },
    { name: "Arc", icon: "/svg_logo/arc_browser.svg", dark: false },
];

const features = [
  {
    name: "Tools & Stack",
    description: "The software I use daily for design, development and productivity.",
    href: "#",
    cta: "View setup",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Subtle grid pattern - Lighter dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />

        {/* Tool icons row */}
        <div className="w-full -translate-y-8">
          <Marquee pauseOnHover className="[--duration:20s]">
            {[...tools, ...tools].map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
                  borderColor: "rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                // Use a proper white background for the icon container
                className="w-14 h-14 mx-3 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-3 cursor-pointer shadow-sm hover:bg-gray-50"
              >
                {/* Use invert instead of brightness-0 to maintain antialiasing and transparency better */}
                <img
                  src={t.icon}
                  alt={t.name}
                  className={cn("w-full h-full object-contain", t.dark && "invert")}
                />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </div>
    ),
  },
  {
    name: "Guestbook",
    description: "Leave a note — say hey, share a thought, or just wave.",
    href: "#",
    cta: "Sign it",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Floating cards with softer shadows/borders */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-3, -1, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-48 h-28 bg-white border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col gap-2 -translate-x-4 -translate-y-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30" />
              <div className="w-16 h-1.5 bg-gray-100 rounded-full" />
            </div>
            <div className="w-full h-1.5 bg-gray-50 rounded-full" />
            <div className="w-3/4 h-1.5 bg-gray-50 rounded-full" />
            <div className="w-1/2 h-1.5 bg-gray-50 rounded-full" />
          </motion.div>

          <motion.div
            animate={{ y: [3, -5, 3], rotate: [2, 4, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute w-48 h-28 bg-gray-50 border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col gap-2 translate-x-8 translate-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/30" />
              <div className="w-20 h-1.5 bg-gray-100 rounded-full" />
            </div>
            <div className="w-full h-1.5 bg-gray-200/50 rounded-full" />
            <div className="w-2/3 h-1.5 bg-gray-200/50 rounded-full" />
          </motion.div>

          <motion.div
            animate={{ y: [-2, 6, -2], rotate: [1, -1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute w-40 h-24 bg-white border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col gap-2 translate-x-16 -translate-y-16"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-500/30" />
              <div className="w-12 h-1.5 bg-gray-100 rounded-full" />
            </div>
            <div className="w-full h-1.5 bg-gray-50 rounded-full" />
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    name: "Let's Connect",
    description: "Got an idea or just want to say hi? I'm always up for a conversation.",
    href: "mailto:hello@tabrezkhan.in",
    cta: "Say hello",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Ambient glow - Softer warm glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/5 rounded-full blur-[60px]" />

        {/* Orbital rings - Dark but subtle rings */}
        <div className="relative w-40 h-40 -translate-y-4">
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800 border border-gray-200" />

          {/* Orbit 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-gray-900/[0.08]"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-600" />
          </motion.div>

          {/* Orbit 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-gray-900/[0.06]"
          >
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </motion.div>

          {/* Orbit 3 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-dashed border-gray-900/[0.06]"
          >
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-400" />
          </motion.div>
        </div>
      </div>
    ),
  },
];

export function ToolsSection() {
  return (
    <section className="section section__9 ninth relative h-screen w-full overflow-hidden bg-white flex items-center justify-center px-paddingX text-black">
      <Bulge type="Dark" />
      <Header color="Dark" />

      <div className="anime w-full max-w-7xl mx-auto h-full flex flex-col justify-center pt-16 md:pt-20 z-10 relative">

        {/* Title Block */}
        <div className="text-left mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-3 md:mb-5">Behind The Scenes</p>
            <h2 className="text-3xl md:text-5xl md:text-7xl lg:text-8xl text-gray-900 leading-[0.95]">
              <span className="font-sans font-bold tracking-tighter">The Creative</span>{" "}
              <span className="font-serif italic font-medium text-gray-800">Engine</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid w-full grid-cols-1 md:grid-cols-3 auto-rows-[16rem] md:auto-rows-[22rem] gap-3 md:gap-4">
          {features.map((feature, idx) => (
            <LightBentoCard
              key={idx}
              {...feature}
              className={cn(
                "rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50/80 transition-all duration-500 backdrop-blur-sm",
                feature.className
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
