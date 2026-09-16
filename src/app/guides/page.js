import { getPosts } from '../../lib/wordpress';
import GuidesClient from '../../views/Guides';
import { Suspense } from 'react';

export const revalidate = 300;

export const metadata = {
  // Was "CRM Guides | CRM Daily" - same doubled-title bug as /tools.
  // layout.js's title template ("%s | CRM Daily") appended the suffix
  // a second time.
  title: 'CRM Guides',
  description: 'Step-by-step CRM guides for RevOps, GTM, and sales teams.',
  // /guides?category=GTM Strategy and other filtered variants all share
  // this same static metadata, which SEMrush flagged as duplicate
  // content. This canonical tag points every variant back to the plain
  // /guides URL as the one real, indexable page.
  alternates: {
    canonical: 'https://www.crmdaily.co/guides',
  },
};

export default async function GuidesPage() {
  let articles = [];
  try {
    // Was hardcoded to 100 - same bug already fixed elsewhere.
    articles = await getPosts(1000);
  } catch (e) {
    articles = [];
  }
  return <Suspense fallback={null}><GuidesClient prefetchedArticles={articles} /></Suspense>;
}
