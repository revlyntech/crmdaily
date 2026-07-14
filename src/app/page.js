import { getPosts } from '../lib/wordpress';
import HomeClient from '../views/Home';
import { Suspense } from 'react';


export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'CRM Daily — Your Daily CRM & GTM Intelligence',
  description: 'Daily CRM and GTM news, guides, and tool reviews. HubSpot, Salesforce, Pipedrive, RevOps intelligence and more.',
};

export default async function HomePage() {
  let articles = [];
  try {
    articles = await getPosts(100);
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
