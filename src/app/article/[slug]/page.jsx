export const dynamic = 'force-dynamic';
import ArticleClient from './ArticleClient';

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  return <ArticleClient initialArticle={null} slug={slug} />;
}
