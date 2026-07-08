import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Kontakt | Haka",
  description:
    "Napíšte nám a ozveme sa do 24 hodín. Nezáväzná konzultácia je zadarmo.",
};

export default function KontaktPage() {
  return <Contact />;
}
