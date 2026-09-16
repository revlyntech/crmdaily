import { getPosts } from '../../lib/wordpress';
import ToolsClient from '../../views/Tools';
import { Suspense } from 'react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  // Was "CRM Tool Reviews | CRM Daily" - layout.js's title template
  // ("%s | CRM Daily") appended " | CRM Daily" a second time, producing
  // "CRM Tool Reviews | CRM Daily | CRM Daily" in the actual rendered
  // <title>. The template only needs the short title here.
  title: 'CRM Tool Reviews',
  description: 'In-depth CRM tool reviews and comparisons for RevOps teams.',
  // /tools?category=Pipedrive, ?category=Zoho, etc. all render through
  // this same page.js and share this same static metadata object, so a
  // crawler sees several URLs with identical title/content - flagged as
  // duplicate content. The canonical tag tells search engines the real,
  // indexable version of all those filtered variants is the plain /tools
  // URL, so the filters stop being treated as separate duplicate pages.
  alternates: {
    canonical: 'https://www.crmdaily.co/tools',
  },
};

export default async function ToolsPage() {
  let articles = [];
  try {
    // Was hardcoded to 100 - same bug already fixed on the homepage and
    // /news. getPosts() now actually paginates through the full
    // WordPress archive, so this can safely ask for everything.
    articles = await getPosts(1000);
    console.log('SSR tools: fetched', articles.length, 'articles');
  } catch (e) {
    console.error('SSR tools error:', e.message);
    articles = [];
  }
  return <Suspense fallback={null}><ToolsClient prefetchedArticles={articles} /></Suspense>;
}
