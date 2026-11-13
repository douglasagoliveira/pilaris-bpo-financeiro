import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { blogPosts } from '../data/blog';
import { site } from '../data/site';

/** RSS feed of the blog, generated at build time from `src/data/blog.ts`. */
export function GET(context: APIContext) {
  return rss({
    title: `${site.name} — Blog`,
    description:
      'Artigos práticos sobre BPO financeiro, gestão fiscal, projeções de fluxo de caixa e inteligência para tomadas de decisão.',
    site: context.site ?? site.url,
    trailingSlash: false,
    customData: '<language>pt-BR</language>',
    items: [...blogPosts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((post) => ({
        title: post.title,
        description: post.description,
        // Noon UTC keeps the calendar day stable in any time zone
        pubDate: new Date(`${post.date}T12:00:00Z`),
        categories: [post.category],
        link: `/blog/${post.slug}`
      }))
  });
}
