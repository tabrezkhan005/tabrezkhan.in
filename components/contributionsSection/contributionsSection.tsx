import React, { useState, useEffect } from "react";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { motion, AnimatePresence } from "framer-motion";

export function ContributionsSection() {
  const [data, setData] = useState<{
    contributions: Array<{date: number, level: number}>,
    stats: {
      repositories: number,
      hoursWorked: number,
      linesOfCode: string,
      totalContributions: number,
      githubUsername: string
    }
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/contributions");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      }
    };
    fetchData();
  }, []);

  const getColor = (level: number) => {
    switch(level) {
        case 1: return "bg-white/10";
        case 2: return "bg-white/30";
        case 3: return "bg-white/60";
        case 4: return "bg-white/90";
        default: return "bg-white/[0.02]";
    }
  };

  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

  return (
    <section className="section section__8 eighth relative h-screen w-full overflow-hidden darkGradient flex items-center justify-center px-paddingX text-white">
      <Bulge type="Light" />
      <Header color="Light" />

      <div className="anime w-full max-w-7xl mx-auto h-full flex flex-col justify-center pt-20 md:pt-24 z-10">
        <AnimatePresence mode="wait">
          {!data ? (
             <motion.div
               key="loading"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex items-center justify-center h-full"
             >
                <div className="text-white/20 font-explora text-4xl animate-pulse">Loading Metrics...</div>
             </motion.div>
          ) : (
             <motion.div
               key="content"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
               className="w-full h-full flex flex-col justify-center"
             >
                {/* Title */}
                <div className="text-left mb-6 md:mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] text-white/30 uppercase mb-2 md:mb-4">Engineering Metrics</p>
                      <h2 className="text-3xl md:text-5xl lg:text-8xl font-explora text-white/90 leading-none">
                          Code & <span className="text-white font-serif italic font-light">Contributions</span>
                      </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                    {/* Left Box */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="lg:col-span-3 bg-black border border-white/5 rounded-none p-5 md:p-10 relative overflow-hidden group flex flex-col justify-between"
                    >
                        {/* Background Scan Effect */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                          <motion.div
                            animate={{ y: ["0%", "100%"] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="w-full h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6 md:mb-12">
                              <div className="flex items-center gap-3 md:gap-4">
                                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-base md:text-xl tracking-tight text-white/90">@{data.stats.githubUsername}</h3>
                                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Contribution Graph</p>
                                  </div>
                              </div>
                              <div className="md:ml-auto text-left md:text-right">
                                  <span className="block text-2xl md:text-3xl font-light tracking-tighter text-white/90">
                                     {data.stats.totalContributions}
                                  </span>
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">LAST YEAR TOTAL</span>
                              </div>
                          </div>

                          {/* Months Row */}
                          <div className="hidden md:flex justify-between mb-4 px-1 text-[10px] font-medium text-white/20 uppercase tracking-widest">
                              {months.map(m => <span key={m}>{m}</span>)}
                          </div>

                          {/* The Graph Visual */}
                          <div className="overflow-x-auto -mx-2 px-2 pb-2">
                            <div className="flex flex-wrap gap-[3px] md:gap-1.5 justify-between min-w-[500px] md:min-w-0 w-full">
                              {data.contributions.map((c, i) => (
                                  <motion.div
                                      key={i}
                                      initial={{ opacity: 0 }}
                                      whileInView={{ opacity: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: i * 0.001 }}
                                      className={`w-[8px] h-[8px] md:w-[11px] md:h-[11px] rounded-none ${getColor(c.level)} transition-all duration-300 hover:bg-white`}
                                  />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] relative z-10 gap-2">
                            <span>{data.stats.totalContributions} contributions in the last year</span>
                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                                <span>Less</span>
                                <div className="flex gap-1.5">
                                    {[0, 1, 2, 3, 4].map(l => (
                                        <div key={l} className={`w-2.5 h-2.5 rounded-none ${getColor(l)}`}></div>
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Cards */}
                    <div className="flex flex-row lg:flex-col gap-3 md:gap-4 h-full overflow-x-auto lg:overflow-x-visible">
                        {[
                          { label: "Repositories", value: data.stats.repositories },
                          { label: "Deep Work", value: data.stats.hoursWorked },
                          { label: "Code Scale", value: data.stats.linesOfCode }
                        ].map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                            className="bg-black border border-white/5 rounded-none p-5 md:p-8 flex flex-col justify-center relative overflow-hidden group grow min-h-[100px] md:min-h-[140px] min-w-[140px] lg:min-w-0"
                          >
                              {/* Technical Sweep Micro-interaction */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear" />

                              <div className="flex justify-between items-start mb-4 relative z-10">
                                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">{stat.label}</span>
                                <div className="w-1.5 h-1.5 rounded-none bg-white/10 group-hover:bg-white group-hover:rotate-45 transition-all duration-500" />
                              </div>
                              <span className="text-3xl md:text-5xl font-light tracking-tighter text-white/90 relative z-10">
                                 {stat.value}
                              </span>
                          </motion.div>
                        ))}
                    </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
