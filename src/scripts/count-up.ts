/**
 * Numbers that count up from zero the first time they enter the viewport.
 *
 *   element:  `<span data-count-to="24">24</span>`
 *
 * The final number is already in the HTML: with scripts off, or when the visitor asks for reduced
 * motion, it simply stays there.
 */
declare global {
  interface Window {
    __pilarisCountUpReady?: boolean;
  }
}

const DURATION = 1400;

function countUp(element: HTMLElement) {
  const target = Number(element.dataset.countTo);
  if (!Number.isFinite(target)) return;

  const startedAt = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / DURATION);
    // Fast at first, slower near the final number
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  };

  element.textContent = '0';
  requestAnimationFrame(step);
}

if (!window.__pilarisCountUpReady) {
  window.__pilarisCountUpReady = true;

  const items = document.querySelectorAll<HTMLElement>('[data-count-to]');
  const animate = 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (animate && items.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          countUp(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      // Same threshold as the entrance of the blocks (src/scripts/reveal.ts)
      { rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((item) => observer.observe(item));
  }
}

export {};
