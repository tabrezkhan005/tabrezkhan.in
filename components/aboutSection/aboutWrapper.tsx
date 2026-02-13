import React, { useEffect, useState } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { links } from "@/data/data";

import "swiper/css";
import { isDesktop } from "@/lib/utils";

export function AboutWrapper() {
  const [text, setText] = useState({
    main: "Selected Work",
    para: `I build high-end, pixel-perfect web experiences with clean architecture and meticulous attention to detail. From concept to deployment, every project is crafted for performance and impact.`,
  });
  useEffect(() => {
    if (!isDesktop()) {
      setText({
        main: "Recent Work",
        para: `Crafting high-end web experiences with attention to detail, performance, and modern design principles.`,
      });
    }
  }, []);

  return (
    <main className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      <div className="anime relative flex flex-col gap-[1em] md:flex-row-reverse md:gap-[2em]">
        <p
          id="my-text"
          className="text-left leading-[1.4] text-colorSecondaryDark md:w-[100%]"
        >
          {text.para}
        </p>
        <Magentic
          href={links.work}
          scrambleParams={{
            text: "View all Work",
          }}
          onMouseEnter={() => {
            if (isDesktop()) {
              gsap.to("body", {
                "--colorLight": "#0a0a0a",
                "--colorDark": "#f0f0f0",
                "--colorSecondaryDark": "#8a8a8a",
                "--colorSecondaryLight": "#404040",
                "--colorSecondaryHalfLight": "#141414",
                "--colorSecondaryHalfDark": "#f2f2f2",
                "--colorWhite": "#000",
              });
            }
          }}
          onMouseLeave={() => {
            if (isDesktop()) {
              gsap.to("body", {
                "--colorLight": "#f0f0f0",
                "--colorDark": "#0a0a0a",
                "--colorSecondaryDark": "#404040",
                "--colorSecondaryLight": "#8a8a8a",
                "--colorSecondaryHalfLight": "#f2f2f2",
                "--colorSecondaryHalfDark": "#141414",
                "--colorWhite": "#fafafa",
              });
            }
          }}
          className="mask group h-full items-center justify-center rounded-2xl bg-colorDark p-3 md:relative md:min-h-full md:w-[33%] md:rounded-full"
        >
          <p className="shapka !flex text-[0.9em] text-colorLight md:text-[0.7em]">
            <span className="scrambleText whitespace-nowrap">
              View all Work
            </span>
            <svg
              className="ml-4 w-[0.7em] -rotate-45 text-colorLight"
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>arrow-up-right</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="2.5"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-1019.000000, -279.000000)"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <g
                    id="arrow-up-right"
                    transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"
                  >
                    <polyline
                      id="Path"
                      points="2.76923077 0 12 0 12 9.23076923"
                    ></polyline>
                    <line x1="12" y1="0" x2="0" y2="12" id="Path"></line>
                  </g>
                </g>
              </g>
            </svg>
          </p>
        </Magentic>
      </div>

      <div className="customBorder anime mx-auto my-[1.5em] h-[2px] w-[calc(100%_-_20px)] self-start rounded-full bg-colorSecondaryLight opacity-30"></div>

      <a
        href={links.work}
        className="anime relative flex h-[260px] w-full items-center justify-center md:h-[380px]"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="anime">
            <h2 className="work_heading mask font-heading">{text.main}</h2>
          </div>
        </div>
        <div className="section3__video overflow-hidden rounded-3xl bg-black md:rounded-[3rem]">
          <video
            className=""
            id="video"
            playsInline
            autoPlay
            muted
            loop
            src="/video/transcode.mp4"
          ></video>
        </div>
      </a>
    </main>
  );
}
