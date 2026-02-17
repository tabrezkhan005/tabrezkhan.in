"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";

const projectsData = [
  {
    title: (
      <>
        YieldStone <br /> Page
      </>
    ),
    description: "Webflow Site",
    link: "#",
    imageLink: "/img/projects/1.avif",
  },
  {
    title: (
      <>
        Simple Font <br /> Replacer
      </>
    ),
    description: "Figma Plugin",
    link: "#",
    imageLink: "/img/projects/2.avif",
  },
  {
    title: (
      <>
        Andy PFP <br /> Generator
      </>
    ),
    description: "Next.js Site",
    link: "#",
    imageLink: "/img/projects/3.avif",
  },
  {
    title: (
      <>
        PonkeSol <br /> Page
      </>
    ),
    description: "Webflow Site",
    link: "#",
    imageLink: "/img/projects/4.avif",
  },

  {
    title: (
      <>
        AmanFX <br /> Portfolio
      </>
    ),
    description: "Webflow Site",
    link: "#",
    imageLink: "/img/projects/5.avif",
  },
  {
    title: (
      <>
        Therapist <br /> Website
      </>
    ),
    description: "UI Design",
    link: "#",
    imageLink: "/img/projects/6.avif",
  },
];
//test
export default function WorkPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderWork>
        <div id="fullpage">
          <div className="background">
            PROJECTS
            <br />
            PROJECTS
          </div>

          {projectsData?.map((item, index) => (
            <WorkSection
              key={index}
              item={item}
              index={index}
              length={projectsData?.length || 0}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </div>
      </FullpageProviderWork>
    </>
  );
}
