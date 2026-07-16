"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeroBannerData } from "../../sanity/types";
import HeroLogoAnimation from "./HeroLogoAnimation";
import HeroStatic from "./HeroStatic";

type Props = {
  banners: HeroBannerData[];
  fallbackTitle: string;
  fallbackTitleHighlight: string;
  lang: string;
};

export default function HeroBanner({
  banners,
  fallbackTitle,
  fallbackTitleHighlight,
  lang,
}: Props) {
  const [index, setIndex] = useState(0);

  const activeBanners = banners;

  if (activeBanners.length === 0) {
    return (
      <HeroStatic
        title={fallbackTitle}
        titleHighlight={fallbackTitleHighlight}
      />
    );
  }

  const current = activeBanners[index % activeBanners.length];

  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % activeBanners.length);
    }, current.duration * 1000);

    return () => window.clearTimeout(timer);
  }, [index, activeBanners.length, current.duration]);

  if (current.type === "logoAnimation") {
    return (
      <HeroLogoAnimation
        title={current.heroTitle ?? fallbackTitle}
        titleHighlight={current.heroTitleHighlight ?? fallbackTitleHighlight}
      />
    );
  }

  if (current.type === "image" && current.imageUrl) {
    return (
      <HeroMediaBanner
        key={current._id}
        lang={lang}
        imageUrl={current.imageUrl}
        imageAlt={current.imageAlt ?? ""}
        overlayTitle={current.overlayTitle}
        ctaLabel={current.ctaLabel}
        ctaHref={current.ctaHref}
      />
    );
  }

  if (current.type === "video" && current.videoUrl) {
    return (
      <HeroVideoBanner
        key={current._id}
        lang={lang}
        videoUrl={current.videoUrl}
        ctaLabel={current.ctaLabel}
        ctaHref={current.ctaHref}
      />
    );
  }

  return (
    <HeroStatic
      title={fallbackTitle}
      titleHighlight={fallbackTitleHighlight}
    />
  );
}

function resolveHref(href: string | undefined, lang: string) {
  if (!href) return undefined;
  if (href.startsWith("http")) return href;
  if (href.startsWith(`/${lang}`)) return href;
  if (href.startsWith("/")) return `/${lang}${href}`;
  return `/${lang}/${href}`;
}

function HeroMediaBanner({
  imageUrl,
  imageAlt,
  overlayTitle,
  ctaLabel,
  ctaHref,
  lang,
}: {
  imageUrl: string;
  imageAlt: string;
  overlayTitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  lang: string;
}) {
  const href = resolveHref(ctaHref, lang);

  return (
    <section className="relative w-full overflow-hidden bg-charcoal">
      <div className="relative aspect-[16/9] w-full max-h-[min(85vh,900px)] sm:aspect-[2/1] lg:aspect-[21/9]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        {(overlayTitle || (ctaLabel && href)) && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-6 text-center sm:pb-10">
            {overlayTitle && (
              <h1 className="font-display max-w-3xl text-xl font-bold text-background sm:text-3xl lg:text-4xl">
                {overlayTitle}
              </h1>
            )}
            {ctaLabel && href && (
              <Link
                href={href}
                className="rounded-full border border-gold bg-background/90 px-8 py-3 text-sm font-medium tracking-wide text-foreground transition hover:bg-gold/20"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function HeroVideoBanner({
  videoUrl,
  ctaLabel,
  ctaHref,
  lang,
}: {
  videoUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
  lang: string;
}) {
  const href = resolveHref(ctaHref, lang);
  const isEmbed =
    videoUrl.includes("youtube.com") ||
    videoUrl.includes("youtu.be") ||
    videoUrl.includes("vimeo.com");

  return (
    <section className="relative w-full overflow-hidden bg-charcoal">
      <div className="relative aspect-[16/9] w-full max-h-[min(85vh,900px)] sm:aspect-[2/1] lg:aspect-[21/9]">
        {isEmbed ? (
          <iframe
            src={toEmbedUrl(videoUrl)}
            title="Hero video"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        {ctaLabel && href && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-6 sm:pb-10">
            <Link
              href={href}
              className="rounded-full border border-gold bg-background/90 px-8 py-3 text-sm font-medium tracking-wide text-foreground transition hover:bg-gold/20"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function toEmbedUrl(url: string) {
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}`;
  }
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}`;
  }
  if (url.includes("vimeo.com")) {
    const id = url.split("/").pop();
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1`;
  }
  return url;
}
