import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ListChecks, MessagesSquare } from "lucide-react";
import type { AboutCareContent, AboutFront } from "../../data/about";
import { Eyebrow } from "./AboutParts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutCareProps {
  content: AboutCareContent;
}

const ICONS: Record<AboutFront["key"], typeof ListChecks> = {
  execution: ListChecks,
  relationship: MessagesSquare,
};

/*
 * One pillar of the brand pattern per front (Manual de Marca 2026, graphic elements): the
 * shorter one on the first panel, the taller one on the second. Both drawings have the same
 * height, so side by side they keep the proportions of the pattern.
 */
const PILLARS = [
  {
    viewBox: "0 0 154.29 545.42",
    path: "M154.29 71.77V545.42H0V114.51C55.04 100.84 106.43 86.58 154.29 71.77Z",
  },
  {
    viewBox: "179.01 0 154.29 545.42",
    path: "M333.29 0V545.42H179.01V65.19C236.52 44.36 287.85 22.59 333.29 0Z",
  },
];

/**
 * "Como cuidamos de você": the two fronts of the company.
 * The two panels start apart and tilted; the scroll brings them together into one block
 * ("duas frentes, um só cuidado").
 */
export default function AboutCare({ content }: AboutCareProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        sideBySide: "(min-width: 640px)",
      },
      (context) => {
        const { motion, sideBySide } = context.conditions as { motion: boolean; sideBySide: boolean };
        if (!motion) return;

        const list = q("[data-fronts]")[0];
        const fronts = q("[data-front]");

        /* Label, title and subtitle fade up */
        gsap.set(q("[data-fade]"), { y: 28, autoAlpha: 0 });
        ScrollTrigger.batch(q("[data-fade]"), {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.12,
            });
          },
        });

        if (sideBySide) {
          /* Two columns: the panels close the gap and straighten as the block crosses the screen */
          const join = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: {
              trigger: list,
              start: "top 92%",
              end: "top 24%",
              scrub: 0.8,
            },
          });

          fronts.forEach((front, index) => {
            const side = index === 0 ? -1 : 1;
            const innerCorners =
              index === 0
                ? { borderTopRightRadius: 24, borderBottomRightRadius: 24 }
                : { borderTopLeftRadius: 24, borderBottomLeftRadius: 24 };
            const joinedCorners =
              index === 0
                ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
                : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 };

            join
              .fromTo(
                front,
                { xPercent: side * 11, y: side * -44, rotation: side * 6, ...innerCorners },
                { xPercent: 0, y: 0, rotation: 0, ...joinedCorners },
                0,
              )
              .fromTo(
                front.querySelector("[data-front-pillar]"),
                { yPercent: 38 },
                { yPercent: 0 },
                0.3,
              );
          });
        } else {
          /* One column: the panels are already joined and fade up one after the other */
          gsap.set(fronts, { y: 36, autoAlpha: 0 });
          ScrollTrigger.batch(fronts, {
            start: "top 88%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.15,
              });
            },
          });
        }
      },
    );

    /* From here on GSAP owns the animated pieces (see `data-anim` in src/styles/about.css) */
    root.dataset.ready = "true";

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-about-island
      className="overflow-hidden bg-[#FAFDFD] py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-x-10 gap-y-14 px-4 sm:px-6 lg:grid-cols-12">
        {/* Title */}
        <div className="lg:col-span-5">
          <div data-anim data-fade>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </div>

          <h2
            data-anim
            data-fade
            className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#021A39] sm:text-5xl sm:leading-[1.06] lg:text-[52px]"
          >
            {content.title.text}
            {content.title.accent ? (
              <>
                {" "}
                <span className="text-[#055ED3]">{content.title.accent}</span>
              </>
            ) : null}
          </h2>

          <p
            data-anim
            data-fade
            className="mt-6 max-w-[480px] text-base leading-relaxed text-[#021A39]/75 sm:text-lg"
          >
            {content.subtitle}
          </p>
        </div>

        {/* The two fronts */}
        <ul data-fronts className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-7">
          {content.fronts.map((front, index) => {
            const Icon = ICONS[front.key];
            const first = index === 0;
            const pillar = PILLARS[index % PILLARS.length];

            return (
              <li
                key={front.key}
                data-front
                data-anim
                className={`group relative flex flex-col overflow-hidden p-8 pb-36 text-[#FAFDFD] sm:pb-48 lg:p-10 lg:pb-52 ${
                  first
                    ? "rounded-t-3xl bg-[#021A39] sm:rounded-l-3xl sm:rounded-tr-none"
                    : "rounded-b-3xl bg-[#055ED3] sm:rounded-r-3xl sm:rounded-bl-none"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-sm ${first ? "text-[#99B7FC]" : "text-[#E9EBFF]"}`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFDFD]/10 transition-colors duration-300 group-hover:bg-[#FAFDFD] group-hover:text-[#021A39]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-10 text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#FAFDFD] lg:text-[30px]">
                  {front.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#FAFDFD]">{front.text}</p>

                {/* Brand pillar rising from the bottom edge, next to the other panel */}
                <svg
                  data-front-pillar
                  viewBox={pillar.viewBox}
                  aria-hidden="true"
                  focusable="false"
                  className={`pointer-events-none absolute top-[calc(100%-7rem)] w-28 transition-[translate] duration-500 ease-out group-hover:-translate-y-3 sm:top-[calc(100%-8.5rem)] sm:w-32 lg:top-[calc(100%-9.5rem)] lg:w-36 ${
                    first
                      ? "right-8 text-[#055ED3] sm:right-3"
                      : "right-8 text-[#021A39] sm:left-3 sm:right-auto"
                  }`}
                  fill="currentColor"
                >
                  <path d={pillar.path} />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
