import { getPosts } from '../../lib/wordpress';
import NewsClient from '../../views/News';
import { Suspense } from 'react';

export const revalidate = 300;

export const metadata = {
  title: 'CRM & GTM News | CRM Daily',
  description: 'Daily CRM and GTM news - HubSpot, Salesforce, Pipedrive updates, RevOps intelligence and more.',
};

export default async function NewsPage() {
  let articles = [];
  try { articles = await getPosts(100); } catch (e) { articles = []; }
  return <Suspense fallback={null}><NewsClient prefetchedArticles={articles} /></Suspense>;
}