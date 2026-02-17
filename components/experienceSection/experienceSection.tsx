import React from "react";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Roboto Studio",
    role: "Frontend Engineer",
    date: "Jan 2025 - Present",
    location: "London Area, UK • Remote",
    description: "Architecting enterprise-scale digital experiences with Next.js and Headless CMS.",
    points: [
      "Built modular page builders with Sanity CMS for 6+ global production sites.",
      "Optimized Core Web Vitals resulting in 20% faster load times.",
      "Integrated TypeScript for robust, type-safe frontend architectures."
    ],
    tags: ["Next.js", "TypeScript", "Sanity", "Tailwind"]
  },
  {
    company: "Pixel Perfect Agency",
    role: "Design Engineer Intern",
    date: "Jun 2024 - Dec 2024",
    location: "Remote",
    description: "Bridging the gap between high-fidelity UI design and production-ready code.",
    points: [
      "Developed interactive prototypes using Framer Motion and GSAP.",
      "Collaborated with UI designers to implement pixel-perfect design systems.",
      "Streamlined frontend workflows by 15% using component-driven development."
    ],
    tags: ["Framer Motion", "GSAP", "React", "Figma"]
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    date: "2023 - 2024",
    location: "Global",
    description: "Delivering end-to-end digital solutions for startups and small businesses.",
    points: [
      "Launched 10+ custom Shopify and WordPress platforms.",
      "Designed and developed scalable backends using Node.js and Supabase.",
      "Consulted on UI/UX improvements that boosted conversion by 30%."
    ],
    tags: ["Shopify", "Node.js", "Supabase", "UX"]
  },
  {
    company: "Tech Mahindra",
    role: "UI/UX Intern",
    date: "Jan 2023 - May 2023",
    location: "Pune, India",
    description: "Focusing on user-centric design principles and accessibility standards.",
    points: [
      "Assisted in redesigning internal dashboard interfaces for better usability.",
      "Conducted user research and created detailed user journey maps.",
      "Prepared high-fidelity mockups and handoff documentation for developers."
    ],
    tags: ["UI Research", "Accessibility", "Adobe XD"]
  }
];

export function ExperienceSection() {
  return (
    <section className="section section__7 seventh relative h-screen w-full overflow-hidden bg-white flex items-center justify-center px-paddingX text-black">
      <Bulge type="Dark" />
      <Header color="Dark" />

      <div className="anime w-full max-w-5xl mx-auto h-full flex flex-col pt-24 pb-10 md:pt-32 md:pb-16">
          {/* Header */}
          <div className="mb-8 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-black/40 uppercase mb-2 md:mb-3">Professional Journey</p>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-explora text-black/90">
                    Experience That <br/>
                    <span className="text-black font-serif italic font-light">Brings Ideas to Life</span>
                </h2>
              </motion.div>
          </div>

          {/* Timeline - Scrollable */}
          <div className="lock-scroll relative grow overflow-y-auto pr-4 -mr-4 md:pr-8 md:-mr-8 no-scrollbar scroll-smooth">
              {/* Vertical Line */}
              <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[1px] bg-black/10" />

              <div className="space-y-10 md:space-y-20 relative">
                  {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-10 md:pl-16 group"
                      >
                          {/* Node */}
                          <div className="absolute left-[16px] md:left-[24px] top-2 md:top-3 w-3 h-3 md:w-4 md:h-4 rounded-full border border-black/20 bg-white group-hover:bg-black group-hover:scale-125 transition-all duration-300 z-10" />

                          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8">
                              {/* Date & Meta */}
                              <div className="space-y-1 md:space-y-2">
                                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-black/50 uppercase block">
                                      {exp.date}
                                  </span>
                                  <h3 className="text-lg md:text-xl font-bold text-black/90 group-hover:text-black transition-colors">
                                      {exp.company}
                                  </h3>
                                  <p className="text-xs md:text-sm text-black/60">{exp.location}</p>
                              </div>

                              {/* Description & Details */}
                              <div className="space-y-3 md:space-y-4">
                                  <div>
                                      <h4 className="text-base md:text-lg font-medium text-black/90 mb-1 md:mb-2">{exp.role}</h4>
                                      <p className="text-sm text-black/70 leading-relaxed italic">
                                          {exp.description}
                                      </p>
                                  </div>

                                  <ul className="space-y-3 md:space-y-4">
                                      {exp.points.map((point, i) => (
                                          <li key={i} className="flex gap-3 md:gap-4 text-black/60 items-start hover:text-black/90 transition-colors">
                                              <span className="mt-2 w-1 h-1 rounded-full bg-black/30 flex-shrink-0" />
                                              <span className="text-xs md:text-sm leading-relaxed">{point}</span>
                                          </li>
                                      ))}
                                  </ul>

                                  <div className="flex flex-wrap gap-2 pt-2">
                                      {exp.tags.map(tag => (
                                          <span key={tag} className="px-2 py-0.5 rounded-md border border-black/10 bg-black/[0.03] text-[10px] font-medium text-black/50 uppercase tracking-widest group-hover:text-black/80 transition-colors">
                                              {tag}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </div>
    </section>
  );
}
