import { getPosts } from '../../lib/wordpress';
import ToolsClient from '../../views/Tools';
import { Suspense } from 'react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'CRM Tool Reviews | CRM Daily',
  description: 'In-depth CRM tool reviews and comparisons for RevOps teams.',
};

export default async function ToolsPage() {
  let articles = [];
  try {
    articles = await getPosts(100);
    console.log('SSR tools: fetched', articles.length, 'articles');
  } catch (e) {
    console.error('SSR tools error:', e.message);
    articles = [];
  }
  return <Suspense fallback={null}><ToolsClient prefetchedArticles={articles} /></Suspense>;
}
