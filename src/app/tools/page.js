import { getPosts } from '../../lib/wordpress';
import ToolsClient from '../../views/Tools';
import { Suspense } from 'react';

export const revalidate = 300;

export const metadata = {
  title: 'CRM Tool Reviews | CRM Daily',
  description: 'In-depth CRM tool reviews and comparisons for RevOps teams.',
};

export default async function ToolsPage() {
  let articles = [];
  try { articles = await getPosts(100); } catch (e) { articles = []; }
  return <Suspense fallback={null}><ToolsClient prefetchedArticles={articles} /></Suspense>;
}