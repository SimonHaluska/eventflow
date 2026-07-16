import Image from "next/image";

const NAVY = "#1A2F5E";
const GOLD = "#C9A961";

type Props = {
  title: string;
  titleHighlight: string;
};

export default function HeroStatic({ title, titleHighlight }: Props) {
  return (
    <section className="flex w-full justify-center bg-background px-6 py-12 sm:py-14">
      <div className="flex min-h-[220px] w-full max-w-4xl flex-col items-center justify-center gap-8 py-4 sm:min-h-[260px]">
        <Image
          src="/logo.png"
          alt="Momentum Events"
          width={543}
          height={460}
          className="h-auto w-[200px] sm:w-[280px]"
          priority
        />
        <h1 className="font-display max-w-4xl text-center text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]">
          <span style={{ color: NAVY }}>{title} </span>
          <span style={{ color: GOLD }}>{titleHighlight}</span>
        </h1>
      </div>
    </section>
  );
}
