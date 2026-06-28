export const dynamic = 'force-dynamic';
import { getPostBySlug, getPosts } from '../../../../src/lib/wordpress';
import ArticleClient from './ArticleClient';

// Generate all article pages at build time
export async function generateStaticParams() {
  try {
    const posts = await getPosts(100);
    return posts.map(post => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

// Generate per-article meta tags — this is the SEO magic
export async function generateMetadata({ params }) {
  try {
    const article = await getPostBySlug(params.slug);
    if (!article) return { title: 'Article Not Found | CRM Daily' };

    const image = article.featuredImage || 'https://www.crmdaily.co/og-image.png';
    const url = `https://www.crmdaily.co/article/${params.slug}`;

    return {
      title: `${article.title} | CRM Daily`,
      description: article.excerpt || 'Daily CRM & GTM intelligence from CRM Daily.',
      alternates: { canonical: url },
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url,
        type: 'article',
        publishedTime: article.datePublished,
        modifiedTime: article.dateModified,
        images: [{ url: image, width: 1200, height: 630, alt: article.title }],
        siteName: 'CRM Daily',
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [image],
      },
    };
  } catch {
    return { title: 'CRM Daily' };
  }
}

// Server component — renders on server for SEO
export default async function ArticlePage({ params }) {
  let article = null;
  try {
    article = await getPostBySlug(params.slug);
  } catch {
    // handled in client component
  }

  // NewsArticle JSON-LD schema
  const schema = article ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt || "",
    "image": [article.featuredImage || "https://www.crmdaily.co/og-image.png"],
    "datePublished": article.datePublished ? new Date(article.datePublished).toISOString() : new Date().toISOString(),
    "dateModified": article.dateModified ? new Date(article.dateModified).toISOString() : new Date().toISOString(),
    "author": { "@type": "Organization", "name": "CRM Daily", "url": "https://www.crmdaily.co" },
    "publisher": {
      "@type": "Organization",
      "name": "CRM Daily",
      "url": "https://www.crmdaily.co",
      "logo": { "@type": "ImageObject", "url": "https://www.crmdaily.co/favicon-192.png" }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.crmdaily.co/article/${params.slug}`
    },
    "articleSection": article.category,
    "url": `https://www.crmdaily.co/article/${params.slug}`
  } : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ArticleClient slug={params.slug} />
    </>
  );
}
