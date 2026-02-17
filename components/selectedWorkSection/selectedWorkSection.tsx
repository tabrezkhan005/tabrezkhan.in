import React from "react";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { SelectedWorkWrapper } from "./selectedWorkWrapper";

export function SelectedWorkSection() {
  return (
    <section className="section section__3 third darkGradient flex items-center justify-center overflow-hidden px-paddingX py-paddingY">
      <Bulge type="Light" />
      <Header color="Light" />
      <SelectedWorkWrapper />
    </section>
  );
}
