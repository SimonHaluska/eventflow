import type { Metadata } from "next";
import Packages from "../components/Packages";
import Services from "../components/Services";

export const metadata: Metadata = {
  title: "Služby | EventFlow",
  description:
    "Súkromné oslavy, zvieracie eventy, teambuildingy a športové podujatia. Tri balíky služieb pre každý segment.",
};

export default function SluzbyPage() {
  return (
    <>
      <Services />
      <Packages />
    </>
  );
}
