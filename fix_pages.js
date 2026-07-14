const fs = require('fs');
const path = require('path');

// ── 1. Fix src/app/page.js — make it a server component ──
const homePage = `import { getPosts } from '../lib/wordpress';
import HomeClient from '../views/Home';
import { Suspense } from 'react';

export const revalidate = 0;
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
`;
fs.writeFileSync(path.join('src', 'app', 'page.js'), homePage, 'utf8');
console.log('Fixed: src/app/page.js');

// ── 2. Fix src/app/about/page.js — make it a server component ──
const aboutPage = `import About from '../../views/About';

export const revalidate = 3600;

export const metadata = {
  title: 'About CRM Daily | CRM & GTM Intelligence',
  description: 'CRM Daily is your daily source of CRM, GTM and RevOps intelligence. No vendor bias. No commissions. Just expert reporting.',
};

export default function AboutPage() {
  return <About />;
}
`;
fs.writeFileSync(path.join('src', 'app', 'about', 'page.js'), aboutPage, 'utf8');
console.log('Fixed: src/app/about/page.js');

// ── 3. Fix src/app/tools/page.js — add force-dynamic ──
const toolsPage = `import { getPosts } from '../../lib/wordpress';
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
`;
fs.writeFileSync(path.join('src', 'app', 'tools', 'page.js'), toolsPage, 'utf8');
console.log('Fixed: src/app/tools/page.js');

// ── 4. Fix Home.jsx — accept prefetchedArticles prop ──
let home = fs.readFileSync(path.join('src', 'views', 'Home.jsx'), 'utf8');

// Add 'use client' if not there
if (!home.startsWith("'use client'")) {
  home = "'use client';\n" + home;
}

// Update component signature to accept prefetchedArticles
home = home.replace(
  "export default function Home() {",
  "export default function Home({ prefetchedArticles = null }) {"
);

// Update usePosts to skip fetch when prefetched data exists
home = home.replace(
  "const { articles: wpArticles, loading } = usePosts(20);",
  "const { articles: fetched, loading } = usePosts(prefetchedArticles ? 0 : 20);\n  const wpArticles = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;"
);

// Remove staticArticles fallback - use fresh data or empty
home = home.replace(
  "const articles = wpArticles.length > 0 ? wpArticles : staticArticles;",
  "const articles = wpArticles.length > 0 ? wpArticles : [];"
);

fs.writeFileSync(path.join('src', 'views', 'Home.jsx'), home, 'utf8');
console.log('Fixed: src/views/Home.jsx - accepts prefetchedArticles');

// ── 5. Fix Footer in About and Tools views ──
// The footer encoding issues on /about and /tools are from the shared Footer component
// Let's check Footer.jsx EST line
let footer = fs.readFileSync(path.join('src', 'components', 'Footer.jsx'), 'utf8');
const footerLines = footer.split('\n');
footerLines.forEach((l, i) => {
  if (l.includes('EST') || l.includes('INDIA') || l.includes('Terms') || l.includes('RESERVED')) {
    console.log('Footer line ' + (i+1) + ':', l.trim().substring(0, 100));
  }
});

console.log('\nAll page fixes applied!');
console.log('Now run: git add . && git commit -m "fix: SSR homepage/tools/about, fresh articles, remove stale fallback" && git push origin main --force');