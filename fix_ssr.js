const fs = require('fs');
const path = require('path');

// New server-side news page
const newsPage = `import { Suspense } from 'react';
import { getPosts } from '../../lib/wordpress';
import News from '../../views/News';

export const revalidate = 300; // revalidate every 5 minutes

export const metadata = {
  title: 'CRM & GTM News | CRM Daily',
  description: 'Daily CRM and GTM news — HubSpot, Salesforce, Pipedrive updates, RevOps intelligence and more.',
};

export default async function NewsPage() {
  let articles = [];
  try {
    articles = await getPosts(100);
  } catch (e) {
    articles = [];
  }
  return (
    <Suspense fallback={null}>
      <News prefetchedArticles={articles} />
    </Suspense>
  );
}
`;

// New server-side guides page
const guidesPage = `import { Suspense } from 'react';
import { getPosts } from '../../lib/wordpress';
import Guides from '../../views/Guides';

export const revalidate = 300;

export const metadata = {
  title: 'CRM Guides | CRM Daily',
  description: 'Step-by-step CRM guides for RevOps, GTM, and sales teams. Learn HubSpot, Salesforce, pipeline management and more.',
};

export default async function GuidesPage() {
  let articles = [];
  try {
    articles = await getPosts(100);
  } catch (e) {
    articles = [];
  }
  return (
    <Suspense fallback={null}>
      <Guides prefetchedArticles={articles} />
    </Suspense>
  );
}
`;

// New server-side tools page
const toolsPage = `import { Suspense } from 'react';
import { getPosts } from '../../lib/wordpress';
import Tools from '../../views/Tools';

export const revalidate = 300;

export const metadata = {
  title: 'CRM Tool Reviews | CRM Daily',
  description: 'In-depth CRM tool reviews and comparisons. HubSpot vs Salesforce, Pipedrive, Monday CRM and more for RevOps teams.',
};

export default async function ToolsPage() {
  let articles = [];
  try {
    articles = await getPosts(100);
  } catch (e) {
    articles = [];
  }
  return (
    <Suspense fallback={null}>
      <Tools prefetchedArticles={articles} />
    </Suspense>
  );
}
`;

fs.writeFileSync(path.join('src','app','news','page.js'), newsPage, 'utf8');
fs.writeFileSync(path.join('src','app','guides','page.js'), guidesPage, 'utf8');
fs.writeFileSync(path.join('src','app','tools','page.js'), toolsPage, 'utf8');

console.log('Page files updated!');
console.log('Now updating views to accept prefetchedArticles prop...');

// Read and update News.jsx to accept prefetchedArticles
let newsView = fs.readFileSync(path.join('src','views','News.jsx'), 'utf8');
// Replace the component signature and usePosts call
newsView = newsView.replace(
  "export default function News() {",
  "export default function News({ prefetchedArticles = null }) {"
);
newsView = newsView.replace(
  "const { articles: all, loading } = usePosts(100);",
  "const { articles: fetched, loading } = usePosts(prefetchedArticles ? 0 : 100);\n  const all = prefetchedArticles || fetched;\n  const isLoading = prefetchedArticles ? false : loading;"
);
newsView = newsView.replace(/\bloading\b/g, (match, offset) => {
  // Only replace standalone 'loading' not inside strings or other words
  return 'isLoading';
});
// Fix double replacement
newsView = newsView.replace("const isLoading = prefetchedArticles ? false : isLoading;", "const isLoading = prefetchedArticles ? false : loading;");
fs.writeFileSync(path.join('src','views','News.jsx'), newsView, 'utf8');

// Read and update Guides.jsx
let guidesView = fs.readFileSync(path.join('src','views','Guides.jsx'), 'utf8');
guidesView = guidesView.replace(
  /export default function Guides\(\)/,
  "export default function Guides({ prefetchedArticles = null })"
);
guidesView = guidesView.replace(
  "const { articles: all, loading } = usePosts(100);",
  "const { articles: fetched, loading } = usePosts(prefetchedArticles ? 0 : 100);\n  const all = prefetchedArticles || fetched;\n  const isLoading = prefetchedArticles ? false : loading;"
);
guidesView = guidesView.replace(/\bloading\b/g, 'isLoading');
guidesView = guidesView.replace("const isLoading = prefetchedArticles ? false : isLoading;", "const isLoading = prefetchedArticles ? false : loading;");
fs.writeFileSync(path.join('src','views','Guides.jsx'), guidesView, 'utf8');

// Read and update Tools.jsx
let toolsView = fs.readFileSync(path.join('src','views','Tools.jsx'), 'utf8');
toolsView = toolsView.replace(
  /export default function Tools\(\)/,
  "export default function Tools({ prefetchedArticles = null })"
);
toolsView = toolsView.replace(
  "const { articles: all, loading } = usePosts(100);",
  "const { articles: fetched, loading } = usePosts(prefetchedArticles ? 0 : 100);\n  const all = prefetchedArticles || fetched;\n  const isLoading = prefetchedArticles ? false : loading;"
);
toolsView = toolsView.replace(/\bloading\b/g, 'isLoading');
toolsView = toolsView.replace("const isLoading = prefetchedArticles ? false : isLoading;", "const isLoading = prefetchedArticles ? false : loading;");
fs.writeFileSync(path.join('src','views','Tools.jsx'), toolsView, 'utf8');

console.log('Views updated with prefetchedArticles prop!');
console.log('Done! Now run: git add . && git commit -m "feat: SSR for news/guides/tools pages" && git push origin main');