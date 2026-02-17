"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Card = {
  title: string;
  description: string;
  imageLink: string;
  link: string;
};

// Animation variants for the cards
const cardVariants = {
  enter: (direction: number) => ({
    scale: 0.9,
    y: 50,
    opacity: 0,
    zIndex: 1,
  }),
  center: {
    scale: 1,
    y: 0,
    opacity: 1,
    zIndex: 2,
    transition: {
      duration: 0.3,
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
  exit: (direction: number) => ({
    scale: 1.05,
    opacity: 0,
    y: -100,
    zIndex: 1,
    transition: {
      duration: 0.3,
    },
  }),
  inactive: {
    scale: 0.95,
    y: 20,
    opacity: 0.6,
    zIndex: 1,
    transition: {
      duration: 0.5,
    },
  }
};

interface CardStackProps {
  items: Card[];
  activeIndex: number;
}

export default function AnimatedCardStack({ items, activeIndex }: CardStackProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-[40vh] w-[92vw] max-w-[1200px] md:h-[60vh]">
        <AnimatePresence initial={false}>
          {items.map((item, index) => ({ ...item, originalIndex: index }))
            .filter((item) => item.originalIndex >= activeIndex && item.originalIndex <= activeIndex + 1)
            .map((item) => {
              const index = item.originalIndex;
              const isActive = index === activeIndex;
              const isNext = index === activeIndex + 1;

              return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial={isActive ? "center" : "enter"} // If next, use enter
                animate={isActive ? "center" : isNext ? "inactive" : "enter"}
                exit="exit"
                custom={index}
                className={`absolute inset-0 mx-auto overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl ${
                  isActive ? "z-20 cursor-pointer" : "z-10 pointer-events-none"
                }`}
                style={{
                  transformOrigin: "bottom center",
                }}
                onClick={() => {
                   if (isActive && item.link && item.link !== "#") {
                     window.open(item.link, "_blank");
                   }
                }}
              >
                {/* Image Container */}
                <div className="relative h-full w-full">
                  <Image
                    src={item.imageLink}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    priority={isActive}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                  {/* Text Content - Wide & Big */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-3xl transform transition-all duration-500">
                      <h3 className="mb-2 text-2xl font-bold text-white md:text-5xl lg:text-6xl text-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-white/80 md:text-xl font-light">
                        {item.description}
                      </p>

                      {isActive && (
                        <div className="mt-6 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-colorSecondaryLight">
                          <span>View Project</span>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
