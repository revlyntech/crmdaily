const fs = require('fs');

// ── 1. Add getTotalPostsCount to wordpress.js ──
let wp = fs.readFileSync('src/lib/wordpress.js', 'utf8');

// Add a function to get total count only (lightweight query)
const countFunction = `
export async function getTotalPostsCount() {
  try {
    const query = '{ posts(first: 1000, where: { status: PUBLISH }) { pageInfo { total } } }';
    const res = await fetch(
      typeof window === 'undefined' ? 'https://cms.crmdaily.co/graphql' : 'https://www.crmdaily.co/api/graphql',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }), cache: 'no-store' }
    );
    const data = await res.json();
    return data?.data?.posts?.pageInfo?.total || 0;
  } catch {
    return 0;
  }
}
`;

// Add before the last export
wp = wp + countFunction;
fs.writeFileSync('src/lib/wordpress.js', wp, 'utf8');
console.log('1. Added getTotalPostsCount to wordpress.js');

// ── 2. Fix Sidebar to use real count ──
let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// Add getTotalPostsCount import
sidebar = sidebar.replace(
  "import { usePosts } from \"../lib/usePosts\";",
  "import { usePosts } from \"../lib/usePosts\";\nimport { getTotalPostsCount } from \"../lib/wordpress\";"
);

// Add useEffect to fetch real count
sidebar = sidebar.replace(
  "const { articles, loading } = usePosts(1000);",
  `const { articles, loading } = usePosts(100);
  const [realTotal, setRealTotal] = React.useState(0);
  React.useEffect(() => {
    getTotalPostsCount().then(count => { if(count > 0) setRealTotal(count); });
  }, []);`
);

// Add React import
sidebar = sidebar.replace(
  "'use client';",
  "'use client';\nimport React from 'react';"
);

// Fix totalArticles to use realTotal
sidebar = sidebar.replace(
  "const totalArticles = articles ? articles.length : 0;",
  "const totalArticles = realTotal > 0 ? realTotal : (articles ? articles.length : 0);"
);

// Fix stats display
sidebar = sidebar.replace(
  '{ label:"ARTICLES PUBLISHED", value:totalArticles > 0 ? totalArticles+"+" : "...", sub:"Live from CRM Daily"},',
  '{ label:"ARTICLES PUBLISHED", value:totalArticles > 0 ? String(totalArticles) : "...", sub:"Live from CRM Daily"},'
);

fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('2. Sidebar uses real total count from WordPress');
console.log('Done! Push to GitHub.');