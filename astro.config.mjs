// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** Unicode range of the "latin" subset (covers Portuguese). */
const LATIN = /** @type {[string, ...string[]]} */ ([
  'U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304',
  'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215',
  'U+FEFF', 'U+FFFD'
]);

export default defineConfig({
  site: 'https://pilarisbpofinanceiro.com.br',
  output: 'static',
  trailingSlash: 'never',
  // One HTML file per page (/contato.html). The public address stays /contato: the web server
  // maps it to the file (see public/.htaccess), with no folder and no trailing-slash redirect.
  build: { format: 'file' },
  // Old aliases of the React router. On Apache the real 301 comes from public/.htaccess;
  // these entries keep the aliases working on any other static host.
  redirects: {
    '/sobre': '/conheca-a-pilaris',
    '/servicos': '/nossas-solucoes'
  },
  integrations: [react(), sitemap()],
  // Self-hosted fonts (src/assets/fonts). Same binaries the previous site received from
  // Google Fonts, so the typography is identical and the build needs no network access.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Public Sans',
      cssVariable: '--font-public-sans',
      // The fallback stack lives in src/styles/global.css (same stack as the previous site).
      fallbacks: [],
      optimizedFallbacks: false,
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/public-sans-latin-wght-normal.woff2'],
            weight: '300 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: LATIN
          }
        ]
      }
    },
    {
      provider: fontProviders.local(),
      name: 'DM Mono',
      cssVariable: '--font-dm-mono',
      fallbacks: [],
      optimizedFallbacks: false,
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/dm-mono-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
            unicodeRange: LATIN
          },
          {
            src: ['./src/assets/fonts/dm-mono-latin-500-normal.woff2'],
            weight: 500,
            style: 'normal',
            display: 'swap',
            unicodeRange: LATIN
          }
        ]
      }
    }
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
