export const dynamic = 'force-dynamic';
import ArticleClient from './ArticleClient';

export default async function ArticlePage({ params }) {
  return <ArticleClient initialArticle={null} slug={params.slug} />;
}
