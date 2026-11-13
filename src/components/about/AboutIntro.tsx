import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import type { AboutIntroContent } from "../../data/about";
import { ArcMark, Eyebrow, Words } from "./AboutParts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutIntroProps {
  content: AboutIntroContent;
  /** Call to action rendered by Astro (PeoButton), placed under the text. */
  cta?: ReactNode;
  /** Video trigger rendered by Astro (VideoModal), placed over the photo. */
  video?: ReactNode;
}

/* Where each tag sits before the scroll puts it in place: offset in px, tilt in degrees. */
const LOOSE_START = [
  { x: 30, y: -12, rotation: -7 },
  { x: 78, y: 6, rotation: 5 },
  { x: -2, y: 22, rotation: -4 },
];

/* Status colours of the tags (docs/DESIGN.md: complementary colours, status badges only). */
const STATUS_PENDING = "#F7931D";
const STATUS_DONE = "#00B5AD";

/**
 * Opening of the page "Conheça a Pilaris": why the company exists.
 * The title comes in word by word, the photo is uncovered and moves slower than the page, and the
 * loose tags over it line up as the visitor scrolls ("organizamos o que está solto").
 */
export default function AboutIntro({ content, cta, video }: AboutIntroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const title = q("[data-title]")[0];
      const words = q("[data-title] [data-word]");
      const frame = q("[data-frame]")[0];
      const chips = q("[data-chip]");

      /* Title: every word slides up from behind its mask */
      gsap.set(words, { yPercent: 118 });
      ScrollTrigger.create({
        trigger: title,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(words, {
            yPercent: 0,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.05,
          });
        },
      });

      /* Label, paragraphs and button fade up, in groups */
      gsap.set(q("[data-fade]"), { y: 28, autoAlpha: 0 });
      ScrollTrigger.batch(q("[data-fade]"), {
        start: "top 96%",
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

      /* Photo: uncovered from the bottom, then it moves slower than the page.
         The tags appear right after it. */
      gsap.set(frame, { clipPath: "inset(100% 0% 0% 0% round 24px)" });
      gsap.set(chips, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: frame,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(frame, {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.2,
            ease: "power3.inOut",
            clearProps: "clipPath",
          });
          gsap.to(chips, {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            delay: 0.7,
          });
        },
      });

      gsap.fromTo(
        q("[data-photo]"),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      /* Tags: loose at first; the scroll lines them up one by one and marks each as done */
      const organize = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top 75%",
          end: "top 22%",
          scrub: 0.8,
        },
      });

      chips.forEach((chip, index) => {
        const at = index * 0.6;
        const from = LOOSE_START[index % LOOSE_START.length];

        organize
          .fromTo(
            chip,
            from,
            { x: 0, y: 0, rotation: 0, duration: 1, ease: "power2.out" },
            at,
          )
          .fromTo(
            chip.querySelector("[data-chip-status]"),
            { backgroundColor: STATUS_PENDING },
            { backgroundColor: STATUS_DONE, duration: 0.3, ease: "none" },
            at + 0.75,
          )
          .fromTo(
            chip.querySelector("[data-chip-check]"),
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            at + 0.75,
          );
      });

      /* Brand arc behind the photo drifts with the scroll */
      gsap.fromTo(
        q("[data-arc]"),
        { yPercent: 14 },
        {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

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
      className="about-intro relative overflow-hidden bg-[#FAFDFD] pt-20 pb-16 sm:pt-24 lg:pt-32 lg:pb-24"
    >
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12 lg:gap-y-14">
          {/* Title */}
          <div className="lg:col-span-7">
            <div data-anim data-fade>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </div>

            <h2
              data-title
              data-anim
              className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#021A39] sm:text-5xl sm:leading-[1.06] lg:text-[58px] lg:leading-[1.05]"
            >
              <Words masked text={content.title.text} />
              {content.title.accent ? (
                <>
                  {" "}
                  <Words
                    masked
                    text={content.title.accent}
                    className="text-[#055ED3]"
                  />
                </>
              ) : null}
            </h2>
          </div>

          {/* Photo with the loose tags and the video trigger */}
          <div className="relative lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-16">
            {/* Brand arc: a discreet pattern behind the photo */}
            <div
              data-arc
              className="pointer-events-none absolute -right-[118px] -top-[92px] hidden lg:block"
              aria-hidden="true"
            >
              <ArcMark className="h-[430px] w-auto text-[#E9EBFF]" />
            </div>

            <div
              data-frame
              data-anim
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#E9EBFF] sm:aspect-[16/11] lg:aspect-[4/5]"
            >
              <img
                data-photo
                src={content.image.src}
                alt={content.image.alt}
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
              />
              {video}
            </div>

            <ul
              aria-hidden="true"
              className="absolute left-3 top-5 flex flex-col items-start gap-2.5 sm:left-5 sm:top-6 lg:-left-7 lg:top-10"
            >
              {content.loose.map((label) => (
                <li
                  key={label}
                  data-chip
                  data-anim
                  className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-[#021A39]/10 bg-[#FAFDFD] py-2 pl-2 pr-4 font-mono text-xs text-[#021A39] shadow-[0_8px_24px_rgba(2,26,57,0.14)]"
                >
                  <span
                    data-chip-status
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00B5AD] text-[#FAFDFD]"
                  >
                    <Check data-chip-check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 lg:col-start-2">
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                data-anim
                data-fade
                className={
                  index === 0
                    ? "text-xl leading-[1.5] tracking-[-0.01em] text-[#021A39] sm:text-[22px]"
                    : "mt-6 text-base leading-relaxed text-[#021A39]/75 sm:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}

            {cta ? (
              <div data-anim data-fade className="mt-9">
                {cta}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
