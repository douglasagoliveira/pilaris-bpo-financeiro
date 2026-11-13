/**
 * Entrance of static blocks.
 *
 *   element:  any element with `data-reveal`
 *   order:    `style="--reveal-order: 2"` delays the element by two steps (the stylesheet reads it)
 *   styles:   the hidden and the revealed state belong to the page that uses the script
 *             (src/styles/about.css for the page "Conheça a Pilaris")
 *
 * Each element receives the class `is-revealed` the first time it enters the viewport.
 * The class `reveal-on` on <html> tells the stylesheet that this script is running.
 */
declare global {
  interface Window {
    __pilarisRevealReady?: boolean;
  }
}

if (!window.__pilarisRevealReady) {
  window.__pilarisRevealReady = true;

  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const reveal = (item: Element) => item.classList.add('is-revealed');

  document.documentElement.classList.add('reveal-on');

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(reveal);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // An element counts as visible once it is 10% of the viewport height above the bottom edge
      { rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((item) => observer.observe(item));
  }
}

export {};
