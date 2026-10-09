import { getPosts } from '../../lib/wordpress';
import NewsClient from '../../views/News';
import { Suspense } from 'react';

export const revalidate = 300;

export const metadata = {
  // layout.js adds " | CRM Daily" through its title template, so the title
  // here must not include it. It was rendering as
  // "CRM & GTM News | CRM Daily | CRM Daily".
  title: 'CRM & GTM News: Daily Updates for Revenue Teams',
  description: 'Daily CRM and GTM news covering HubSpot, Salesforce and Pipedrive updates, plus RevOps and sales technology analysis for revenue teams.',
  // /news?category=HubSpot and similar filter URLs render through this same
  // page, so Google was indexing each one as a separate duplicate result.
  // This points every variant at the one real URL.
  alternates: {
    canonical: 'https://www.crmdaily.co/news',
  },
};

export default async function NewsPage() {
  let articles = [];
  try { articles = await getPosts(1000); } catch (e) { articles = []; }
  return <Suspense fallback={null}><NewsClient prefetchedArticles={articles} /></Suspense>;
}
