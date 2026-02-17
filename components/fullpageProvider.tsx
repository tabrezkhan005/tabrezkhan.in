"use client";

import React, { useEffect, useRef } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

import SplitType from "split-type";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setActiveSlide } from "@/redux/states/fullpageSlice";
// import Lottie from "lottie-web";
// import fullpage from "@fullpage/react-fullpage";

const opts = {
  autoScrolling: true,
  scrollOverflow: false,
  verticalCentered: false,
  scrollHorizontally: false,
  // fixedElements: "#headerNavigation",
  navigation: false,
  navigationPosition: "left",
  scrollingSpeed: 1300,
  easingcss3: "cubic-bezier(.70,0,.30,1)",
  anchors: ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh"],
  licenseKey: "gplv3-license",
  normalScrollElements: ".lock-scroll", // Allow custom scrolling within elements with this class
  credits: {
    enabled: false,
  },
  responsiveWidth: 1024, // Disable fullpage snap on mobile/tablet for better UX aligned with CSS
  responsiveSlides: true,
};

const FullpageProvider = ({ children }: { children: React.ReactNode }) => {
  const textAnim__section2__down = useRef<gsap.core.Tween | null>(null);
  const work_heading = useRef<gsap.core.Tween | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const dispatch = useAppDispatch();

  const onLeave = (origin: any, destination?: any, direction?: any) => {
    dispatch(setActiveSlide([destination.anchor, direction]));

    // Critical: Ensure destination section is on top of origin section
    // during transition so its bulge animation is visible at the leading edge.
    gsap.set(`.${destination.anchor}`, { zIndex: 100, visibility: "visible" });
    gsap.set(`.${origin.anchor}`, { zIndex: 1 });

    // List of black/dark background sections to apply darkGradient to body for seamless transitions
    const darkSections = ["second", "fourth", "sixth", "eighth", "tenth"];
    if (darkSections.includes(destination.anchor)) {
      document.body.classList.add("darkGradient");
    } else {
      document.body.classList.remove("darkGradient");
    }

    if (destination.anchor == "fourth") {
      if (direction == "down") {
        textAnim__section2__down.current?.restart(true);
        work_heading.current?.restart(true);
      } else {
        textAnim__section2__down.current?.restart();
      }
      if (videoElement.current) {
        videoElement.current.currentTime = 1.6;
        videoElement.current.play().catch((e) => {
          // Ignore AbortError if playback was interrupted
          if (e.name !== "AbortError") console.error(e);
        });
      }
    }

    // Increased flex height for a more visible bulge reveal
    var flex = screen.width > 540 ? 25 : 10;

    if (direction == "down") {
      // Animate the TOP of the incoming page (rounded__div__down)
      gsap.set(`.${destination.anchor} .rounded__div__down`, { height: `${flex}vh` });

      gsap.to(`.${destination.anchor} .rounded__div__down`, {
        height: "0vh",
        duration: 1.4,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        `.${destination.anchor} .anime`,
        {
          y: "35vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      // Animate the BOTTOM of the incoming page (rounded__div__up)
      gsap.set(`.${destination.anchor} .rounded__div__up`, { height: `${flex}vh` });

      gsap.to(`.${destination.anchor} .rounded__div__up`, {
        height: "0vh",
        duration: 1.4,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        `.${destination.anchor} .anime`,
        {
          y: "-35vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.2,
          stagger: -0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  };
  const getRotation = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");
    const myTextElement = document.querySelector("#my-text");
    if (myTextElement) {
        const myText = new SplitType("#my-text", { types: "lines" });
        const myText2 = new SplitType("#my-text .line", {
          types: "lines",
          lineClass: "innnerLine",
        });

        textAnim__section2__down.current = gsap.from(
          "#my-text .line .innnerLine",
          {
            y: "200%",
            opacity: 0,
            skewX: -10,
            paused: true,
            duration: 1.5,
            delay: 0.25,
            stagger: 0.12,
            ease: CustomEase.create("custom", "M0,0,C0.5,0,0,1,1,1"),
          },
        );
    }

    work_heading.current = gsap.fromTo(
      ".work_heading",
      {
        rotate: 15,
        // opacity: 0,
        scaleY: 1.5,
      },
      {
        // opacity: 0,
        rotate: 0,
        scaleY: 1,
        opacity: 1,
        delay: 0.7,
        duration: 1.3,
        // scaleY: 1.5,
        // paused: true,
        // delay: 0.25,
        // stagger: 0.12,
        ease: CustomEase.create("custom", "M0,0,C0.5,0,0,1,1,1"),
      },
    );

    videoElement.current = document.querySelector("#video") as HTMLVideoElement;

    // console.log(gsap);
    // console.log(SplitType);
    // console.log(Lottie);
    // console.log(fullpage);
    return () => {
      // textAnim__section2__down.current?.kill();
    };
  }, []);

  return (
    <ReactFullpage
      {...opts}
      onLeave={onLeave}
      render={() => {
        return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
      }}
    />
  );
};

export default FullpageProvider;
