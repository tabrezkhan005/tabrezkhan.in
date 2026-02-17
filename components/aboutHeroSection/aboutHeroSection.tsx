import React from "react";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { motion } from "framer-motion";
import { links } from "@/data/data";

export function AboutHeroSection() {
  return (
    <section className="section section__6 sixth relative h-screen w-full overflow-hidden darkGradient flex items-center justify-center px-paddingX text-white">
      <Bulge type="Light" />
      <Header color="Light" />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none text-white">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="anime w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center h-full pt-16 md:pt-20">
        {/* Left Column: Text */}
        <div className="flex flex-col justify-center gap-4 md:gap-6 z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="anime"
          >
             <p className="text-[10px] md:text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/40 mb-2 md:mb-4">
                  More About Me
             </p>
             <h1 className="text-3xl md:text-5xl md:text-7xl font-explora leading-tight mb-4 md:mb-8">
                  I'm Tabrez Khan, a <br/>
                  <span className="text-white font-explora font-bold text-4xl md:text-6xl md:text-8xl">
                      design engineer
                  </span>
             </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="anime space-y-4 md:space-y-8 text-sm md:text-lg font-turretRoad text-white/80 leading-relaxed max-w-xl"
          >
              <p>
                  I bridge the gap between <span className="text-white font-bold">design and engineering</span>, crafting digital products that are as functional as they are beautiful. My focus is on clarity, performance, and building systems that scale.
              </p>

              <p>
                  From <span className="text-white">high-performance web platforms</span> to specialized Shopify and mobile solutions, I believe every pixel should serve a purpose. I leverage <span className="text-white">AI-driven workflows</span> to ship faster and maintain uncompromising quality.
              </p>

              <div className="pt-4">
                <p className="text-2xl font-explora text-white italic">
                    "Building with intent, engineering with discipline."
                </p>
              </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="flex gap-4 md:gap-6 mt-4 md:mt-8"
          >
             {[
               { icon: "Linkedin", href: links.linkedin, label: "LinkedIn" },
               { icon: "Github", href: links.github, label: "GitHub" },
               { icon: "Twitter", href: links.twitter, label: "Twitter" }
             ].map((social) => (
               <a
                 key={social.label}
                 href={social.href}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group relative p-3 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
               >
                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {social.label}
                 </span>
                 {social.icon === "Linkedin" && (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                   </svg>
                 )}
                 {social.icon === "Github" && (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                   </svg>
                 )}
                 {social.icon === "Twitter" && (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                   </svg>
                 )}
               </a>
             ))}
          </motion.div>
        </div>

        {/* Right Column: Image Stack */}
        <div className="hidden md:flex justify-center items-center h-full relative z-10 scale-90 md:scale-100">
           <VerticalImageStack />
        </div>
      </div>
    </section>
  );
}
