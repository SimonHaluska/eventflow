import type { Metadata } from "next";
import HowItWorks from "../components/HowItWorks";

export const metadata: Metadata = {
  title: "Ako to funguje | Momentum Events",
  description:
    "Šesť krokov od prvého kontaktu po úspešnú realizáciu eventu. Zistite, ako s nami prebieha spolupráca.",
};

export default function AkoToFunguiePage() {
  return <HowItWorks />;
}
