"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Phase = "idle" | "enter" | "exit" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("splash-seen")) {
      setPhase("done");
      return;
    }

    setPhase("enter");
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem("splash-seen", "1");
      setPhase("done");
      document.body.style.overflow = "";
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || phase === "done" || phase === "idle") return null;

  return createPortal(
    <div
      className={`splash-screen ${phase === "exit" ? "splash-screen--exit" : ""}`}
      aria-hidden="true"
    >
      <div className="splash-ripples">
        <span className="splash-ripple splash-ripple--1" />
        <span className="splash-ripple splash-ripple--2" />
        <span className="splash-ripple splash-ripple--3" />
      </div>

      <div className="splash-logo-wrap">
        <Image
          src="/logo.png"
          alt="Momentum Events"
          width={180}
          height={180}
          priority
          className="splash-logo"
        />
      </div>

      <div className="splash-wave" />
    </div>,
    document.body
  );
}
