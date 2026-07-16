"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAVY = "#1A2F5E";
const GOLD = "#C9A961";

const LOGO_FADE_AT = 4000;
const TAGLINE_IN_AT = 4500;
const TAGLINE_OUT_AT = 9000;
const CYCLE_RESTART_AT = 10000;

type Props = {
  title: string;
  titleHighlight: string;
};

export default function HeroLogoAnimation({ title, titleHighlight }: Props) {
  const reducedMotion = useReducedMotion();
  const [cycleKey, setCycleKey] = useState(0);
  const [fadeLogo, setFadeLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setShowTagline(true);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => resolve(), ms);
        timers.push(timer);
      });

    const runLoop = async () => {
      while (!cancelled) {
        setFadeLogo(false);
        setShowTagline(false);
        setCycleKey((key) => key + 1);

        await wait(100);
        if (cancelled) break;

        await wait(LOGO_FADE_AT);
        if (cancelled) break;
        setFadeLogo(true);

        await wait(TAGLINE_IN_AT - LOGO_FADE_AT);
        if (cancelled) break;
        setShowTagline(true);

        await wait(TAGLINE_OUT_AT - TAGLINE_IN_AT);
        if (cancelled) break;
        setShowTagline(false);

        await wait(CYCLE_RESTART_AT - TAGLINE_OUT_AT);
      }
    };

    void runLoop();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="flex w-full justify-center bg-background px-6 py-12 sm:py-14">
        <HeroTagline title={title} titleHighlight={titleHighlight} visible />
      </section>
    );
  }

  return (
    <section className="flex w-full justify-center bg-background px-6 py-12 sm:py-14">
      <div className="relative flex min-h-[220px] w-full max-w-4xl items-center justify-center py-4 sm:min-h-[260px]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 1, y: 0 }}
          animate={fadeLogo ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <LogoMark key={cycleKey} />
        </motion.div>

        <HeroTagline
          title={title}
          titleHighlight={titleHighlight}
          visible={showTagline}
        />
      </div>
    </section>
  );
}

function HeroTagline({
  title,
  titleHighlight,
  visible,
}: {
  title: string;
  titleHighlight: string;
  visible: boolean;
}) {
  return (
    <motion.h1
      className="font-display absolute inset-x-4 z-10 mx-auto max-w-4xl text-center text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      aria-live="polite"
    >
      <span style={{ color: NAVY }}>{title} </span>
      <span style={{ color: GOLD }}>{titleHighlight}</span>
    </motion.h1>
  );
}

function LogoMark() {
  return (
    <motion.div
      className="relative w-[200px] shrink-0 sm:w-[280px]"
      initial={{ clipPath: "circle(0% at 50% 36%)" }}
      animate={{ clipPath: "circle(70% at 50% 36%)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: [1, 1.03, 1],
          filter: [
            "drop-shadow(0 0 0 rgba(244, 162, 40, 0))",
            "drop-shadow(0 0 16px rgba(244, 162, 40, 0.42))",
            "drop-shadow(0 0 0 rgba(244, 162, 40, 0))",
          ],
        }}
        transition={{
          opacity: { delay: 0.9, duration: 0.9, ease: "easeInOut" },
          scale: { delay: 1.8, duration: 0.45, ease: "easeInOut", times: [0, 0.5, 1] },
          filter: { delay: 1.8, duration: 0.45, ease: "easeInOut", times: [0, 0.5, 1] },
        }}
      >
        <Image
          src="/logo.png"
          alt="Momentum Events"
          width={543}
          height={460}
          className="h-auto w-[200px] sm:w-[280px]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
