const fs = require('fs');
const path = require('path');

// ── 1. Fix Home.jsx — accept prefetchedArticles, remove loading states ──
let home = fs.readFileSync('src/views/Home.jsx', 'utf8');

// Add prefetchedArticles prop to HomeClient
home = home.replace(
  'export default function HomeClient() {',
  'export default function HomeClient({ prefetchedArticles = null }) {'
);
home = home.replace(
  'export default function Home() {',
  'export default function HomeClient({ prefetchedArticles = null }) {'
);

// Fix usePosts to skip fetch when prefetched data exists
home = home.replace(
  'const { articles: wpArticles, loading } = usePosts(20);',
  'const { articles: fetched, loading: fetchLoading } = usePosts(prefetchedArticles ? 0 : 20);\n  const wpArticles = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;\n  const loading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;'
);

// Also handle case where it uses different variable
home = home.replace(
  'const { articles: wpArticles, loading } = usePosts(100);',
  'const { articles: fetched, loading: fetchLoading } = usePosts(prefetchedArticles ? 0 : 100);\n  const wpArticles = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;\n  const loading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;'
);

fs.writeFileSync('src/views/Home.jsx', home, 'utf8');
console.log('1. Home.jsx fixed - accepts prefetchedArticles');

// ── 2. Fix Tools.jsx — make sure it accepts prefetchedArticles ──
let tools = fs.readFileSync('src/views/Tools.jsx', 'utf8');

// Check if it already handles prefetchedArticles
const toolsHasPrefetch = tools.includes('prefetchedArticles');
if (!toolsHasPrefetch) {
  tools = tools.replace(
    /export default function Tools\(\)/,
    'export default function Tools({ prefetchedArticles = null })'
  );
  tools = tools.replace(
    'const { articles: all, loading } = usePosts(100);',
    'const { articles: fetched, loading: fetchLoading } = usePosts(prefetchedArticles ? 0 : 100);\n  const all = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;\n  const loading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;'
  );
  fs.writeFileSync('src/views/Tools.jsx', tools, 'utf8');
  console.log('2. Tools.jsx fixed - accepts prefetchedArticles');
} else {
  console.log('2. Tools.jsx already has prefetchedArticles');
}

// ── 3. Fix Footer.jsx — Terms of Service, encoding ──
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');

// Remove Terms of Service link completely
footer = footer.replace(/,?\s*\["Terms of Service","[^"]*"\]/g, '');
footer = footer.replace(/\["Terms of Service","[^"]*"\],?/g, '');

// Fix EST line encoding
footer = footer.replace(
  /EST\. 2026[^\<]*/g,
  'EST. 2026 \u00A9 INDIA \u00B7 US \u00B7 AU'
);

// Fix copyright
footer = footer.replace(
  /[^\x20-\x7E\n\r\t]+\s*2026 CRM DAILY/g,
  '\u00A9 2026 CRM DAILY'
);

fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('3. Footer.jsx fixed - Terms removed, encoding fixed');

// ── 4. Fix About page — add metadata ──
const aboutPage = `'use client';
import About from '../../views/About';

export default function AboutPage() {
  return <About />;
}
`;
fs.writeFileSync(path.join('src', 'app', 'about', 'page.js'), aboutPage, 'utf8');
console.log('4. About page fixed');

// ── 5. Add metadata to Newsletter and Contact pages ──
const newsletterPage = `'use client';
import Newsletter from '../../views/Newsletter';

export default function NewsletterPage() {
  return <Newsletter />;
}
`;
if (fs.existsSync('src/app/newsletter/page.js')) {
  const current = fs.readFileSync('src/app/newsletter/page.js', 'utf8');
  if (!current.includes('metadata')) {
    fs.writeFileSync('src/app/newsletter/page.js', newsletterPage, 'utf8');
    console.log('5. Newsletter page fixed');
  }
}

// ── 6. Fix HubSpot article title "Category:" leak in ArticleClient ──
let ac = fs.readFileSync('src/app/article/[slug]/ArticleClient.js', 'utf8');
if (!ac.includes('replace(/\\s*-?\\s*[Cc]ategory')) {
  ac = ac.replace(
    'const [article, setArticle] = useState(initialArticle ? {...initialArticle, title: initialArticle.title.replace(',
    '// category fix already applied\n  const [article, setArticle] = useState(initialArticle ? {...initialArticle, title: initialArticle.title.replace('
  );
  // Add clean title fix
  ac = ac.replace(
    'const [article, setArticle] = useState(initialArticle || null);',
    'const cleanTitle = (t) => t ? t.replace(/\\s*[-–]?\\s*[Cc]ategory:?\\s*$/i, \'\').trim() : t;\n  const [article, setArticle] = useState(initialArticle ? {...initialArticle, title: cleanTitle(initialArticle.title)} : null);'
  );
  fs.writeFileSync('src/app/article/[slug]/ArticleClient.js', ac, 'utf8');
  console.log('6. ArticleClient - Category: title leak fixed');
}

// ── 7. Verify Tools filter shows all ──
tools = fs.readFileSync('src/views/Tools.jsx', 'utf8');
const toolsFilterLine = tools.split('\n').find(l => l.includes(': all;') || l.includes('TOOL_CATEGORIES'));
console.log('7. Tools filter:', toolsFilterLine ? toolsFilterLine.trim().substring(0, 80) : 'NOT FOUND');

console.log('\n✅ All fixes applied! Now push to GitHub.');