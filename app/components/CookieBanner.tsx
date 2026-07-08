"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = {
  dict: Dictionary["cookie"];
  lang: string;
};

export default function CookieBanner({ dict, lang }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/30 bg-background/95 px-6 py-5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          {dict.text}{" "}
          <Link
            href={`/${lang}/ochrana-udajov`}
            className="text-foreground underline underline-offset-4 transition hover:text-gold-dark"
          >
            {dict.privacyLink}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            type="button"
            className="rounded-full border border-gold/40 px-5 py-2 text-sm text-muted transition hover:border-gold hover:text-foreground"
          >
            {dict.decline}
          </button>
          <button
            onClick={accept}
            type="button"
            className="rounded-full border border-gold bg-transparent px-5 py-2 text-sm font-medium transition hover:border-gold-dark hover:bg-gold/20"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
