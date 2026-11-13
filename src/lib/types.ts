export type JsonLdObject = Record<string, unknown>;

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Publication date (YYYY-MM-DD) of an article. */
  publishedTime?: string;
  noindex?: boolean;
  schemas?: JsonLdObject[];
}