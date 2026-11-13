import { Fragment, type ReactNode } from "react";

/*
 * Small pieces shared by the sections of the page "Conheça a Pilaris".
 * They have no state: the Astro sections render them to plain HTML and the islands reuse them.
 */

interface MarkProps {
  className?: string;
}

/**
 * The two rising pillars of the brand pattern (Manual de Marca 2026, graphic elements).
 * Vector traced from the manual; the colour comes from `currentColor`.
 */
export function PillarsMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 333.3 545.4"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M154.29 71.77V545.42H0V114.51C55.04 100.84 106.43 86.58 154.29 71.77Z" />
      <path d="M333.29 0V545.42H179.01V65.19C236.52 44.36 287.85 22.59 333.29 0Z" />
    </svg>
  );
}

/** The crescent arc of the brand pattern (same source as `PillarsMark`). */
export function ArcMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 297.1 344.3"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M124.68 30.58L124.95 30.67C130.84 32.62 136.61 34.62 142.25 36.66C169.6 46.57 193.97 57.57 214.83 69.44C266.94 99.12 297.14 134.35 297.14 172.11C297.14 224.99 237.92 272.89 142.25 307.56C136.61 309.61 130.84 311.6 124.95 313.55L124.68 313.65C92.38 324.33 56.43 333.57 17.57 341.11C11.87 342.22 6.1 343.29 0.27 344.32V313.55C6.16 311.6 11.93 309.61 17.57 307.56C61.82 291.53 98.27 272.66 124.68 251.78L124.95 251.56C131.32 246.51 137.09 241.34 142.25 236.07C161.81 216.07 172.46 194.54 172.46 172.11C172.46 168.37 172.17 164.65 171.58 160.96C168.66 142.54 158.55 124.82 142.25 108.15C137.09 102.88 131.32 97.71 124.95 92.66L124.68 92.44C98.27 71.56 61.82 52.7 17.57 36.66C12.27 34.74 6.47 32.86 0.27 31.01L0 30.93V0L0.27 0.04C6.35 1.04 12.14 2.06 17.57 3.11C56.43 10.65 92.38 19.9 124.68 30.58Z" />
    </svg>
  );
}

interface EyebrowProps {
  children: ReactNode;
  /** `dark` for sections with the dark blue background. */
  tone?: "light" | "dark";
  className?: string;
}

/** Label above a section title: brand mark + monospaced uppercase text. */
export function Eyebrow({ children, tone = "light", className = "" }: EyebrowProps) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 font-mono text-xs font-normal uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-[#99B7FC]" : "text-[#055ED3]"
      } ${className}`}
    >
      <PillarsMark className="h-3.5 w-auto shrink-0" />
      <span>{children}</span>
    </p>
  );
}

interface WordsProps {
  text: string;
  /** Classes of every word (colour, for instance). */
  className?: string;
  /** `true` wraps each word in a clipping mask, for entrances that slide the word up. */
  masked?: boolean;
}

/**
 * Splits a sentence into one element per word (`data-word`) so an island can animate them.
 * The words stay separated by regular spaces: the sentence reads and wraps as plain text.
 */
export function Words({ text, className = "", masked = false }: WordsProps) {
  const words = text.trim().split(/\s+/);

  return words.map((word, index) => (
    <Fragment key={index}>
      {masked ? (
        <span className="about-word-mask">
          <span data-word className={`about-word ${className}`}>
            {word}
          </span>
        </span>
      ) : (
        <span data-word className={className}>
          {word}
        </span>
      )}
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
