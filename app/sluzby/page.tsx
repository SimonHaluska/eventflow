import type { Metadata } from "next";
import FAQ from "../components/FAQ";
import Packages from "../components/Packages";

export const metadata: Metadata = {
  title: "Cenník | Momentum Events",
  description:
    "Tri balíky služieb pre každý segment — súkromné oslavy, zvieracie eventy, teambuildingy a športové podujatia.",
};

export default function SluzbyPage() {
  return (
    <>
      <Packages />
      <FAQ />
    </>
  );
}
