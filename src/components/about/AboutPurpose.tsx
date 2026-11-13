import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AboutPurposeContent } from "../../data/about";
import { Eyebrow, Words } from "./AboutParts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutPurposeProps {
  content: AboutPurposeContent;
  /** Call to action rendered by Astro (PeoButton), placed under the values. */
  children?: ReactNode;
}

const twoDigits = (value: number) => String(value).padStart(2, "0");

/**
 * Mission, vision and values: the centre of the page "Conheça a Pilaris".
 * The title lights up word by word with the scroll, the rules of mission and vision are drawn,
 * and the four values rise as pillars (the brand pattern). One value is highlighted at a time:
 * the scroll walks through them until the visitor points at one.
 */
export default function AboutPurpose({ content, children }: AboutPurposeProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  /* Once the visitor picks a value, the scroll stops moving the highlight */
  const pickedByVisitor = useRef(false);

  const pick = (index: number) => {
    pickedByVisitor.current = true;
    setActive(index);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 1024px)",
      },
      (context) => {
        const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;

        const title = q("[data-title]")[0];
        const list = q("[data-pillars]")[0];
        const pillars = q("[data-pillar]");
        const follow = (index: number) => {
          if (!pickedByVisitor.current) setActive(index);
        };

        /* Title: the words go from dim to full as the title crosses the screen */
        gsap.fromTo(
          q("[data-title] [data-word]"),
          { opacity: 0.4 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.14,
            scrollTrigger: {
              trigger: title,
              start: "top 82%",
              end: "top 34%",
              scrub: 0.6,
            },
          },
        );

        /* Label, subtitle, statements and button fade up, in groups */
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

        /* Rules above mission, vision and values: drawn from left to right */
        q("[data-rule]").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: rule,
                start: "top 92%",
                end: "top 52%",
                scrub: 0.6,
              },
            },
          );
        });

        if (wide) {
          /* One row: the pillars rise from the base line, one after the other */
          gsap.fromTo(
            pillars,
            { yPercent: 101 },
            {
              yPercent: 0,
              ease: "power2.out",
              stagger: 0.2,
              scrollTrigger: {
                trigger: list,
                start: "top 94%",
                end: "bottom 98%",
                scrub: 0.8,
              },
            },
          );
        } else {
          /* Stacked or two by two: each pillar fades up as it enters the screen */
          gsap.set(pillars, { y: 36, autoAlpha: 0 });
          ScrollTrigger.batch(pillars, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.12,
              });
            },
          });
        }

        /*
         * The highlight walks from the first value to the last, in order, in every layout.
         * One row: it starts once the whole row is in view. Stacked: it follows the reading line.
         */
        ScrollTrigger.create({
          trigger: list,
          start: wide ? "bottom 98%" : "top 62%",
          end: wide ? "bottom 62%" : "bottom 50%",
          onUpdate: (self) => {
            follow(Math.min(pillars.length - 1, Math.floor(self.progress * pillars.length)));
          },
        });
      },
    );

    /* From here on GSAP owns the animated pieces (see `data-anim` in src/styles/about.css) */
    root.dataset.ready = "true";

    return () => {
      mm.revert();
    };
  }, []);

  const statements = [content.mission, content.vision];

  return (
    <section
      ref={rootRef}
      data-about-island
      className="about-purpose relative bg-[#021A39] py-24 text-[#FAFDFD] lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Title on the left, subtitle on the right */}
        <div className="grid grid-cols-1 items-end gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div data-anim data-fade>
              <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>
            </div>

            <h2
              data-title
              className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#FAFDFD] sm:text-5xl sm:leading-[1.06] lg:text-[58px] lg:leading-[1.05]"
            >
              <Words text={content.title.text} />
              {content.title.accent ? (
                <>
                  {" "}
                  <Words text={content.title.accent} className="text-[#99B7FC]" />
                </>
              ) : null}
            </h2>
          </div>

          <p
            data-anim
            data-fade
            className="text-base leading-relaxed text-[#FAFDFD]/80 sm:text-lg lg:col-span-4 lg:pb-2"
          >
            {content.subtitle}
          </p>
        </div>

        {/* Mission and vision */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-24">
          {statements.map((statement, index) => (
            <div key={statement.label} className="relative pt-8">
              <span className="absolute inset-x-0 top-0 h-px bg-[#FAFDFD]/20" aria-hidden="true" />
              <span
                data-rule
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-[#055ED3]"
                aria-hidden="true"
              />

              <div data-anim data-fade>
                <h3 className="flex items-baseline gap-4 font-mono text-sm font-normal uppercase tracking-[0.14em] text-[#99B7FC]">
                  <span aria-hidden="true">{twoDigits(index + 1)}</span>
                  {statement.label}
                </h3>
                <p className="mt-6 text-2xl leading-[1.32] tracking-[-0.015em] text-[#FAFDFD] lg:text-[28px]">
                  {statement.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Values: four pillars rising from left to right */}
        <div className="relative mt-16 pt-8 lg:mt-24">
          <span className="absolute inset-x-0 top-0 h-px bg-[#FAFDFD]/20" aria-hidden="true" />
          <span
            data-rule
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-[#055ED3]"
            aria-hidden="true"
          />

          <div data-anim data-fade className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            <h3 className="flex items-baseline gap-4 font-mono text-sm font-normal uppercase tracking-[0.14em] text-[#99B7FC]">
              <span aria-hidden="true">{twoDigits(statements.length + 1)}</span>
              {content.values.label}
            </h3>
            <p className="text-2xl leading-[1.32] tracking-[-0.015em] text-[#FAFDFD] lg:text-[28px]">
              {content.values.lead}
            </p>
          </div>

          <ul
            data-pillars
            className="mt-10 grid grid-cols-1 gap-3 overflow-hidden sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:items-end lg:gap-5"
          >
            {content.values.items.map((value, index) => (
              <li
                key={value.name}
                data-pillar
                data-anim
                data-active={active === index}
                onMouseEnter={() => pick(index)}
                onClick={() => pick(index)}
                className="about-pillar group flex flex-col justify-between gap-10"
                style={{ "--about-pillar-index": index } as CSSProperties}
              >
                <span
                  className="font-mono text-sm text-[#99B7FC] transition-colors duration-300 group-data-[active=true]:text-[#FAFDFD]"
                  aria-hidden="true"
                >
                  {twoDigits(index + 1)}
                </span>

                <div>
                  <h4 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#FAFDFD] lg:text-[28px]">
                    {value.name}
                  </h4>
                  {/* The reserved height (a whole number of lines) keeps the names of a row on one line */}
                  <p className="mt-3 text-[15px] leading-6 text-[#FAFDFD]/80 transition-colors duration-300 group-data-[active=true]:text-[#FAFDFD] sm:min-h-[96px] md:min-h-[72px] lg:min-h-[144px] xl:min-h-[96px]">
                    {value.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {children ? (
          <div data-anim data-fade className="mt-12 lg:mt-14">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
