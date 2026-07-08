import type { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
  title: "O nás | Momentum Events",
  description:
    "Spoznajte tím Momentum Events — Šimon Haluska a Andrea Fačkovcová. Dve expertízy, jeden kompaktný tím.",
};

export default function ONasPage() {
  return <About />;
}
