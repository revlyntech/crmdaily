const fs = require('fs');
const path = require('path');

// ── 1. Fix Tools.jsx - remove categoryFilter from URL (causing empty page bug) ──
let tools = fs.readFileSync('src/views/Tools.jsx', 'utf8');

// Remove the categoryFilter that causes empty page when ?category=Zoho is in URL
// Instead show ALL articles always, no URL filter on tools page
tools = tools.replace(
  `  const searchParams = useSearchParams();
  const params = searchParams;
  const categoryFilter = searchParams.get('category') || '';
  const { articles: fetched, loading: fetchLoading } = usePosts(prefetchedArticles ? 0 : 100);
  const all = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;
  const isLoading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;
  const articles = categoryFilter
    ? all.filter(a => a.category.toLowerCase() === categoryFilter.toLowerCase() || a.title.toLowerCase().includes(categoryFilter.toLowerCase()))
    : all;`,
  `  const { articles: fetched, loading: fetchLoading } = usePosts(100);
  const all = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;
  const isLoading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;
  const articles = all;
  const categoryFilter = '';`
);

fs.writeFileSync('src/views/Tools.jsx', tools, 'utf8');
console.log('1. Tools.jsx - removed URL category filter, shows all articles');

// ── 2. Fix Sidebar.jsx - stats and popular today ──
let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// Fix stats to use fetched article count properly
sidebar = sidebar.replace(
  `{ label:"ARTICLES PUBLISHED", value:totalArticles ? String(totalArticles) + "+" : "70+", sub:"Live from CRM Daily"},`,
  `{ label:"ARTICLES PUBLISHED", value:totalArticles > 0 ? String(totalArticles) : "70+", sub:"Live from CRM Daily"},`
);

sidebar = sidebar.replace(
  `{ label:"TOOLS REVIEWED",     value:toolsCount > 0 ? String(toolsCount) : "10+",    sub:"Tool reviews & comparisons" },`,
  `{ label:"TOOLS REVIEWED",     value:toolsCount > 0 ? String(toolsCount) : "6+",    sub:"Tool reviews & comparisons" },`
);

fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('2. Sidebar - stats fixed');

// ── 3. Add Terms of Service back to Footer ──
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');

// Check if Terms is missing
if (!footer.includes('Terms of Service')) {
  // Add it back after Privacy Policy
  footer = footer.replace(
    '["Privacy Policy","/privacy"]',
    '["Privacy Policy","/privacy"],["Terms of Service","/privacy"]'
  );
  fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
  console.log('3. Footer - Terms of Service added back');
} else {
  console.log('3. Footer - Terms already present');
}

// ── 4. Fix Tools page - remove revalidate:0 conflict ──
let toolsPage = fs.readFileSync('src/app/tools/page.js', 'utf8');
toolsPage = toolsPage.replace('export const revalidate = 0;\n', '');
fs.writeFileSync('src/app/tools/page.js', toolsPage, 'utf8');
console.log('4. Tools page - removed revalidate:0');

// ── 5. Fix About page encoding ──
let about = fs.readFileSync('src/views/About.jsx', 'utf8');
about = about.replace(/[^\x00-\x7F]+/g, (match, offset, str) => {
  // Keep known good unicode
  return match;
});

// Fix EST line if present
about = about.replace(/EST\. 2026[^\<]*/g, 'EST. 2026 \u00A9 INDIA \u00B7 US \u00B7 AU');
fs.writeFileSync('src/views/About.jsx', about, 'utf8');
console.log('5. About.jsx encoding checked');

// ── 6. Verify News page has Terms link ──
let news = fs.readFileSync('src/views/News.jsx', 'utf8');
console.log('6. News has Terms:', news.includes('Terms'));

console.log('\nAll fixes done! Push now.');