export const dynamic = 'force-dynamic';
import { getPostBySlug } from '../../../src/lib/wordpress';
import ArticleClient from './ArticleClient';

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

export default async function ArticlePage({ params }) {
  let article = null;
  try {
    article = await getPostBySlug(params.slug);
  } catch {
    // ArticleClient handles null article with a 404 UI
  }

  return <ArticleClient initialArticle={article} slug={params.slug} />;
}