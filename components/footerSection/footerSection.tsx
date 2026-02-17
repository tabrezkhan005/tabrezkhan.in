import { LargeNameFooter } from "@/components/ui/large-name-footer";
import { Bulge } from "@/components/bulge";

export function FooterSection() {
  return (
    <section className="section section__11 eleventh bg-white flex flex-col items-center justify-center w-full h-screen text-black overflow-hidden">
      <Bulge type="Dark" />
      <LargeNameFooter />
    </section>
  );
}
