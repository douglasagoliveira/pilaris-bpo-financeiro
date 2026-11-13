import { Fragment, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroHomeProps {
  /** Call-to-action rendered by Astro (PeoButton) and placed under the subtitle. */
  children?: ReactNode;
}

const HERO_TITLE_START = "Controle as finanças da sua empresa, ";
const HERO_TITLE_END = "e recupere a sua governança.";

/* Splits a string into per-char spans (the "text-anim" entrance animates each char).
   Chars are grouped per word so a line can only break between words, never inside one. */
const splitChars = (text: string, prefix: string) =>
  text
    .trim()
    .split(/\s+/)
    .map((word, w, words) => (
      <Fragment key={w}>
        <span className="inline-block whitespace-nowrap">
          {word.split("").map((c, i) => (
            <span key={i} className={`${prefix}-char inline-block`}>
              {c}
            </span>
          ))}
        </span>
        {w < words.length - 1 ? " " : null}
      </Fragment>
    ));

export default function HeroHome({ children }: HeroHomeProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = document.querySelectorAll(".hero-char");

      /* Peo "text-anim": chars slide in (x: 20, autoAlpha: 0, stagger 0.03,
         duration 1, delay 0.1, power2.out) when the title hits top 85% of viewport */
      gsap.set(chars, { x: 20, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            duration: 1,
            delay: 0.1,
            x: 0,
            autoAlpha: 1,
            stagger: 0.03,
            ease: "power2.out",
          });
        },
      });

      /* "wow fadeInUp" staggered entrances: badge, paragraph, button, proof block */
      gsap.fromTo(
        "[data-hero-up]",
        { y: 45, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.18,
          delay: 0.3,
        },
      );

      /* Floating boxes fade in after the image */
      gsap.fromTo(
        "[data-hero-box]",
        { y: 25, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.9,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero-section home-hero hero-1 relative z-[9] rounded-b-[20px] overflow-hidden min-h-screen flex flex-col justify-center text-white"
      style={{
        padding: "130px 0 60px",
        backgroundColor: "#0F172A",
        backgroundImage: "url('/images/hero-dashboard.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left-to-right gradient overlay: keeps the text readable while the image flows continuously on the right */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.92) 38%, rgba(15,23,42,0.72) 62%, rgba(15,23,42,0.30) 80%, rgba(15,23,42,0.06) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.80) 55%, rgba(15,23,42,0.55) 100%)",
        }}
      />
      {/* Decorative giant brand text (peo-text): right 0, top 20%, opacity 0.2, hidden < 1199px */}

      {/* Light blue glow at bottom center (light-bg): bottom 0, centered, behind content */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "min(1600px, 150%)",
          height: 440,
          background:
            "radial-gradient(ellipse 52% 100% at 50% 100%, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0.5) 38%, rgba(59,130,246,0.14) 62%, transparent 78%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN — hero-content */}
          <div className="hero-content relative">
            {/* Eyebrow: blue pill + uppercase text */}
            <p
              data-hero-up
              className="text-white/75 text-[13px] font-mono font-normal uppercase leading-none"
            >
              <span
                className="inline-block text-white rounded-[20px] h-[23px] leading-[23px] px-[10px] mr-[10px]"
                style={{ backgroundColor: "#3B82F6" }}
              >
                BPO Financeiro
              </span>
              Belo Horizonte, atendimento nacional
            </p>

            {/* Title with char-by-char Peo text-anim */}
            <h1
              ref={titleRef}
              aria-label={`${HERO_TITLE_START}${HERO_TITLE_END}`}
              className="text-anim text-white mt-[25px] font-medium text-[42px] sm:text-[54px] lg:text-[64px] xl:text-[72px] leading-[1.1] tracking-[-2px] max-w-[640px]"
            >
              {splitChars(HERO_TITLE_START, "hero")}{" "}
              <span>{splitChars(HERO_TITLE_END, "hero")}</span>
            </h1>

            {/* Subtitle */}
            <p
              data-hero-up
              className="text-white/75 text-[18px] leading-[150%] mt-[25px] max-w-[520px] font-normal"
            >
              Delegue a rotina operacional financeira com segurança e sem
              depender de um funcionário.
            </p>

            {/* theme-btn */}
            <div data-hero-up className="mt-[30px]">
              {children}
            </div>

            {/* Proof block (hero-info): conteúdo removido, espaço preservado */}
            <div
              data-hero-up
              className="hero-info mt-[40px] lg:mt-[60px] h-16"
              aria-hidden="true"
            />
          </div>

          {/* RIGHT COLUMN — floating glass boxes (the hero image is now the section background) */}
          <div className="hero-image relative lg:pl-4">
            {/* box-1: floating chip — top 46%, left 11%, float-bob-y (hidden < 1199px) */}
            <div className="hidden min-[1199px]:block absolute top-[46%] left-[11%] z-20">
              <div data-hero-box className="peo-bob-y">
                <div
                  className="flex items-center gap-3 rounded-xl px-5 py-4 border border-white/10 shadow-2xl"
                  style={{
                    background: "rgba(15,23,42,0.78)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: "rgba(59,130,246,0.28)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(59,130,246,0.45)",
                    }}
                  >
                    <BadgeCheck className="w-5 h-5" />
                  </span>
                  <div className="leading-tight">
                    <span className="block text-white font-bold text-[15px]">
                      Clareza
                    </span>
                    <span className="block text-white/70 text-xs mt-0.5">
                      Números em informação útil.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* box-2: floating card — right 0, bottom 110px, float-bob-x (hidden < 1199px) */}
            <div className="hidden min-[1199px]:block absolute right-0 bottom-[110px] z-20">
              <div data-hero-box className="peo-bob-x">
                <div
                  className="flex items-center gap-4 rounded-2xl px-6 py-5 border border-white/10 shadow-2xl"
                  style={{
                    background: "rgba(15,23,42,0.78)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: "rgba(59,130,246,0.28)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(59,130,246,0.45)",
                    }}
                    aria-hidden="true"
                  >
                    <Check className="w-5 h-5" strokeWidth={2.6} />
                  </span>
                  <div className="leading-tight">
                    <span className="block text-white font-bold text-[15px]">
                      Controle
                    </span>
                    <span className="block text-white/70 text-xs mt-0.5">
                      Rotina financeira acompanhada.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
