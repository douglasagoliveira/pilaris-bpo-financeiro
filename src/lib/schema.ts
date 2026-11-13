import type { BlogPost } from '../data/blog';
import { site } from '../data/site';
import type { JsonLdObject } from './types';

/** Stable identifier of the company, referenced by the other schemas. */
const organizationId = `${site.url}/#organization`;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo-horizontal-dark.svg`,
  email: site.email,
  telephone: site.whatsappRaw,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belo Horizonte',
    addressRegion: 'MG',
    addressCountry: 'BR'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.whatsappRaw,
    email: site.email,
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'Portuguese'
  }
};

export const homeSchemas: JsonLdObject[] = [
  organization,
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: 'pt-BR',
    publisher: { '@id': organizationId }
  }
];

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function serviceSchema(name: string, description: string, url: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.name,
      url: site.url
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil'
    },
    url
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function contactPageSchema(url: string, name: string, description: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name,
    description,
    url,
    inLanguage: 'pt-BR',
    mainEntity: { '@id': organizationId }
  };
}

/** Page about the company ("Conheça a Pilaris"). */
export function aboutPageSchema(url: string, name: string, description: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name,
    description,
    url,
    inLanguage: 'pt-BR',
    mainEntity: { '@id': organizationId }
  };
}

/** Blog index: the list of published articles. */
export function blogSchema(posts: BlogPost[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog ${site.name}`,
    url: `${site.url}/blog`,
    inLanguage: 'pt-BR',
    publisher: { '@id': organizationId },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${site.url}/blog/${post.slug}`,
      datePublished: post.date
    }))
  };
}

export function blogPostingSchema(post: BlogPost): JsonLdObject {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'pt-BR',
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: new URL(site.defaultOgImage, site.url).href,
    author: { '@type': 'Organization', '@id': organizationId, name: site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/brand/logo-horizontal-dark.svg` }
    }
  };
}
