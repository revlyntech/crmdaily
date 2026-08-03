const fs = require('fs');

// ── 1. Fix wordpress.js - increase cache TTL to 30 mins ──
let wp = fs.readFileSync('src/lib/wordpress.js', 'utf8');
wp = wp.replace(
  'TTL: 5 * 60 * 1000,',
  'TTL: 30 * 60 * 1000,'
);
// Also increase fetchWithTimeout to 15 seconds
wp = wp.replace(
  /setTimeout\(reject, \d+\)/,
  'setTimeout(reject, 15000)'
);
fs.writeFileSync('src/lib/wordpress.js', wp, 'utf8');
console.log('1. wordpress.js - cache TTL 30min, timeout 15s');

// ── 2. Fix usePosts.js - start with empty array, add null safety ──
let usePosts = fs.readFileSync('src/lib/usePosts.js', 'utf8');

// Make sure getPosts(0) returns empty without hitting API
usePosts = usePosts.replace(
  `export function usePosts(count = 20) {
  // Start with static articles so UI renders immediately
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts(count)
      .then(posts => {
        if (posts.length > 0) setArticles(posts);
      })
      .finally(() => setLoading(false));
  }, [count]);
  return { articles, loading };
}`,
  `export function usePosts(count = 20) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(count > 0);
  useEffect(() => {
    if (count === 0) { setLoading(false); return; }
    let cancelled = false;
    getPosts(count)
      .then(posts => {
        if (!cancelled && posts && posts.length > 0) setArticles(posts);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [count]);
  return { articles, loading };
}`
);

fs.writeFileSync('src/lib/usePosts.js', usePosts, 'utf8');
console.log('2. usePosts.js - skip fetch when count=0, cancel on unmount');

// ── 3. Fix Home.jsx null safety ──
let home = fs.readFileSync('src/views/Home.jsx', 'utf8');

// Fix topStories and gridArticles null safety
home = home.replace(
  'const featured = articles.find(a => a.featured) || articles[0];',
  'const featured = articles && articles.length > 0 ? (articles.find(a => a.featured) || articles[0]) : null;'
);
home = home.replace(
  'const topStories = articles.filter(a => a.id !== featured?.id).slice(0, 4);',
  'const topStories = articles && featured ? articles.filter(a => a.id !== featured.id).slice(0, 4) : [];'
);
home = home.replace(
  'const gridArticles = articles.filter(a => a.id !== featured?.id);',
  'const gridArticles = articles && featured ? articles.filter(a => a.id !== featured.id) : [];'
);

fs.writeFileSync('src/views/Home.jsx', home, 'utf8');
console.log('3. Home.jsx - null safety added');

// ── 4. Fix Sidebar null safety ──
let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');
sidebar = sidebar.replace(
  'const totalArticles = articles.length;',
  'const totalArticles = articles ? articles.length : 0;'
);
sidebar = sidebar.replace(
  'const uniqueCategories = [...new Set(articles.map(a => a.category))];',
  'const uniqueCategories = articles ? [...new Set(articles.map(a => a.category))] : [];'
);
sidebar = sidebar.replace(
  'const toolsCount = articles.filter(a => ["Tool Reviews","Tool Review","Tools","RevOps Intelligence","Sales Tech","AI in Sales","GTM Strategy"].includes(a.category)).length;',
  'const toolsCount = articles ? articles.filter(a => ["Tool Reviews","Tool Review","Tools","RevOps Intelligence","Sales Tech","AI in Sales","GTM Strategy"].includes(a.category)).length : 0;'
);
fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('4. Sidebar.jsx - null safety added');

console.log('\nAll done! Push to GitHub.');