import { getPosts } from '../lib/wordpress';
import HomeClient from '../views/Home';
import { Suspense } from 'react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'CRM Daily: CRM, GTM and RevOps News, Guides and Tool Reviews',
  description: 'CRM Daily is a free daily publication about CRM, GTM and RevOps, powered by Revlyn. News, guides, tool reviews, a CRM glossary and guides for 24 industries.',
  alternates: { canonical: 'https://www.crmdaily.co' },
};

export default async function HomePage() {
  let articles = [];
  try {
   
    articles = await getPosts(1000);
    console.log('SSR homepage: fetched', articles.length, 'articles');
  } catch (e) {
    console.error('SSR homepage error:', e.message);
    articles = [];
  }
  return (
    <Suspense fallback={null}>
      <HomeClient prefetchedArticles={articles} />
    </Suspense>
  );
}