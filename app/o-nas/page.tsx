import type { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
  title: "O nás | EventFlow",
  description:
    "Spoznajte tím EventFlow — Šimon Haluska a Andrea Fačkovcová. Dve expertízy, jeden kompaktný tím.",
};

export default function ONasPage() {
  return <About />;
}
