"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/data/data";

// Calendar utilities
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];

export function ContactSection() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"book" | "message">("book");
  const [copied, setCopied] = useState(false);

  const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth]);

  const EMAIL = "tabrezkhangnt@gmail.com";

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isWeekend = (dayIndex: number) => dayIndex === 0 || dayIndex === 6;

  const selectedDayName = selectedDate
    ? new Date(currentYear, currentMonth, selectedDate).toLocaleDateString("en-US", { weekday: "short" })
    : null;

  // Center-expand animation — opens outward from the middle
  const expandVariants = {
    closed: {
      scaleX: 0,
      scaleY: 0.95,
      opacity: 0,
    },
    open: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: {
        scaleX: { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.8 },
        scaleY: { type: "spring" as const, stiffness: 100, damping: 20, delay: 0.05 },
        opacity: { duration: 0.25, ease: "easeOut" as const },
      },
    },
    exit: {
      scaleX: 0,
      scaleY: 0.95,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as const },
    },
  };

  return (
    <section className="section section__10 tenth relative min-h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center px-paddingX text-white">
      <Bulge type="Light" />
      <Header color="Light" />

      <div className="anime w-full max-w-4xl mx-auto h-full flex flex-col justify-center pt-16 md:pt-20 z-10 relative">

        {/* Title Block */}
        <div className="text-center mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-white/30 uppercase mb-3 md:mb-5">Contact</p>
            <h2 className="text-2xl md:text-4xl md:text-6xl lg:text-7xl font-explora text-white leading-[0.95]">
              Got a vision?{" "}
              <span className="font-serif italic font-light text-white/70">Let&apos;s build it.</span>
            </h2>
          </motion.div>

          {/* Copyable Email */}
          <motion.button
            onClick={copyEmail}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="group inline-flex items-center gap-2 md:gap-2.5 mt-4 md:mt-6 text-xs md:text-sm text-white/50 hover:text-white transition-colors cursor-pointer relative"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="font-mono tracking-wide">{EMAIL}</span>

            {/* Copy icon */}
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-emerald-400 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-xs font-medium">Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white/20 group-hover:text-white/50 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-5 mt-5"
          >
            {[
              { href: links.linkedin, label: "LinkedIn", icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              )},
              { href: links.github, label: "GitHub", icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              )},
              { href: links.twitter, label: "X / Twitter", icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              )},
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="text-white/30 hover:text-white transition-colors duration-200"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-1 mb-4 md:mb-6"
        >
          <button
            onClick={() => setActiveTab("book")}
            className={`px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 md:gap-2.5 ${
              activeTab === "book"
                ? "bg-white/[0.08] text-white border border-white/[0.12]"
                : "text-white/30 hover:text-white/60 border border-transparent"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Book a Call
          </button>
          <button
            onClick={() => setActiveTab("message")}
            className={`px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 md:gap-2.5 ${
              activeTab === "message"
                ? "bg-white/[0.08] text-white border border-white/[0.12]"
                : "text-white/30 hover:text-white/60 border border-transparent"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Send Message
          </button>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "book" ? (
            <motion.div
              key="book"
              variants={expandVariants}
              initial="closed"
              animate="open"
              exit="exit"
              style={{ originX: 0.5, originY: 0.5 }}
              className="w-full border border-white/[0.08] rounded-xl md:rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col min-h-[400px] md:min-h-[520px]"
              >
                <div className="flex flex-col lg:flex-row flex-1">

                  {/* Left Panel — Meeting Info */}
                  <div className="lg:w-64 p-4 md:p-6 lg:p-7 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col gap-4 md:gap-6">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center text-white text-sm font-bold tracking-wide">
                      TK
                    </div>

                    <div>
                      <p className="text-white/50 text-sm mb-1">Tabrez Khan</p>
                      <h3 className="text-white font-semibold text-xl leading-tight">30 Min Meeting</h3>
                    </div>

                    <div className="flex flex-col gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Requires confirmation
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        30 minutes
                      </div>
                      <div className="flex items-center gap-3">
                        <img src="/svg_logo/gmeet.svg" alt="Google Meet" className="w-5 h-5 flex-shrink-0" />
                        Google Meet
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        Asia/Kolkata
                      </div>
                    </div>
                  </div>

                  {/* Center — Calendar */}
                  <div className="flex-1 p-6 lg:p-8">
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-white text-lg font-semibold">
                        {MONTHS[currentMonth]} <span className="text-white/40 font-normal">{currentYear}</span>
                      </h4>
                      <div className="flex items-center gap-1">
                        <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                      </div>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-3">
                      {DAYS.map(d => (
                        <div key={d} className="text-center text-[11px] font-semibold text-white/25 uppercase tracking-wider py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dayOfWeek = (firstDay + i) % 7;
                        const past = isPast(day);
                        const weekend = isWeekend(dayOfWeek);
                        const selected = selectedDate === day;
                        const todayDay = isToday(day);

                        return (
                          <button
                            key={day}
                            disabled={past || weekend}
                            onClick={() => setSelectedDate(day)}
                            className={`
                              aspect-square rounded-lg text-sm font-medium transition-all duration-200 relative
                              flex items-center justify-center
                              ${past || weekend
                                ? "text-white/[0.08] cursor-not-allowed"
                                : selected
                                  ? "bg-white text-black font-semibold"
                                  : todayDay
                                    ? "bg-white/[0.08] text-white ring-1 ring-white/20 hover:bg-white/15"
                                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                              }
                            `}
                          >
                            {day}
                            {todayDay && !selected && (
                              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Panel — Time Slots */}
                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="border-t lg:border-t-0 lg:border-l border-white/[0.08] overflow-hidden"
                      >
                        <div className="p-6 lg:p-8 lg:w-52">
                          <div className="flex items-center justify-between mb-5">
                            <h4 className="text-white font-semibold text-base">
                              {selectedDayName}{" "}
                              <span className="text-white/50 font-normal">{selectedDate}</span>
                            </h4>
                            <div className="flex gap-1 text-[10px] text-white/40">
                              <span className="px-2 py-0.5 rounded bg-white/[0.06] text-white/50">12h</span>
                              <span className="px-2 py-0.5 rounded text-white/20">24h</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 lock-scroll custom-scrollbar">
                            {TIME_SLOTS.map((slot) => (
                              <a
                                key={slot}
                                href={links.bookMeeting}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-4 text-sm text-white/50 rounded-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] hover:text-white transition-all duration-200 text-center font-medium"
                              >
                                {slot}
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              variants={expandVariants}
              initial="closed"
              animate="open"
              exit="exit"
              style={{ originX: 0.5, originY: 0.5 }}
              className="w-full border border-white/[0.08] rounded-xl md:rounded-2xl bg-white/[0.03] backdrop-blur-sm p-5 md:p-8 lg:p-10 flex flex-col justify-center min-h-[400px] md:min-h-[520px]"
              >
                <form className="max-w-2xl mx-auto flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project, idea, or just say hey..."
                      className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>
                  <button
                    type="button"
                    className="self-start px-8 py-3.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-all duration-300"
                  >
                    Send Message →
                  </button>
                </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
