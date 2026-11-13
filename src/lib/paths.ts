/**
 * Public route of a page (`/contato`), whatever shape the build gives to `Astro.url`
 * (`/contato/`, `/contato.html`, `/blog/index.html`, `/index.html`).
 */
export function routePath(pathname: string): string {
  const route = pathname.replace(/(?:\/index)?\.html$/, '').replace(/\/+$/, '');
  return route === '' ? '/' : route;
}
