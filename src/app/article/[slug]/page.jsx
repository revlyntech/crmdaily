import ArticleClient from './ArticleClient';
import { getPostBySlug, getPosts } from '../../../lib/wordpress';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const article = await getPostBySlug(slug);
    if (!article) return { title: 'Article | CRM Daily' };
    return {
      title: article.title + ' | CRM Daily',
      description: article.excerpt || 'CRM and GTM intelligence from CRM Daily.',
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: article.featuredImage ? [article.featuredImage] : [],
      },
    };
  } catch {
    return { title: 'Article | CRM Daily' };
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  let article = null;
  try {
    article = await getPostBySlug(slug);
  } catch (e) {
    article = null;
  }
  return <ArticleClient initialArticle={article} slug={slug} />;
}