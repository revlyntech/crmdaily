export const dynamic = 'force-dynamic';
import { getPostBySlug } from '../../../lib/wordpress';
import ArticleClient from './ArticleClient';

export default async function ArticlePage({ params }) {
  console.log('[ArticlePage] slug:', params.slug);
  let article = null;
  try {
    article = await getPostBySlug(params.slug);
    console.log('[ArticlePage] result:', JSON.stringify(article)?.slice(0, 200));
  } catch (err) {
    console.error('[ArticlePage] fetch error:', err.message);
  }

  return <ArticleClient initialArticle={article} slug={params.slug} />;
}
