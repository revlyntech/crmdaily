import { getPosts } from '../../lib/wordpress';
import NewsClient from '../../views/News';
import { Suspense } from 'react';

export const revalidate = 300;

const BASE = 'https://www.crmdaily.co/news';

export async function generateMetadata({ searchParams }) {
  const sp = (await searchParams) || {};
  const page = Math.max(1, parseInt(sp.page, 10) || 1);
  const filtered = Boolean(sp.category);
  const paged = !filtered && page > 1;
  return {
    // layout.js adds " | CRM Daily" to the title.
    title: paged ? `CRM & GTM News, Page ${page}` : 'CRM & GTM News: Daily Updates for Revenue Teams',
    description: paged
      ? `Page ${page} of daily CRM and GTM news from CRM Daily: older articles on HubSpot, Salesforce, Pipedrive and RevOps.`
      : 'Daily CRM and GTM news covering HubSpot, Salesforce and Pipedrive updates, plus RevOps and sales technology analysis for revenue teams.',
    // Category filters point at /news. Numbered pages point at themselves, so
    // Google follows them to the older articles instead of ignoring them.
    alternates: { canonical: paged ? `${BASE}?page=${page}` : BASE },
  };
}

export default async function NewsPage() {
  let articles = [];
  try { articles = await getPosts(1000); } catch (e) { articles = []; }
  return <Suspense fallback={null}><NewsClient prefetchedArticles={articles} /></Suspense>;
}
