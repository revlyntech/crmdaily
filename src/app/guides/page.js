import { getPosts } from '../../lib/wordpress';
import GuidesClient from '../../views/Guides';
import { Suspense } from 'react';

export const revalidate = 300;

export const metadata = {
  title: 'CRM Guides | CRM Daily',
  description: 'Step-by-step CRM guides for RevOps, GTM, and sales teams.',
};

export default async function GuidesPage() {
  let articles = [];
  try { articles = await getPosts(100); } catch (e) { articles = []; }
  return <Suspense fallback={null}><GuidesClient prefetchedArticles={articles} /></Suspense>;
}