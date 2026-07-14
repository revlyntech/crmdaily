const fs = require('fs');

// Fix Home.jsx
let c = fs.readFileSync('src/views/Home.jsx', 'utf8');

// Remove BOM character
c = c.replace(/^\uFEFF/, '');

// Remove duplicate 'use client' lines - keep only first
const lines = c.split('\n');
let foundUseClient = false;
const cleaned = lines.filter(l => {
  if (l.trim() === "'use client';" || l.trim() === "'use client'") {
    if (foundUseClient) return false;
    foundUseClient = true;
  }
  return true;
});
c = cleaned.join('\n');

// Fix component name to HomeClient so page.js import works
c = c.replace('export default function Home({ prefetchedArticles', 'export default function HomeClient({ prefetchedArticles');
c = c.replace('export default function Home()', 'export default function HomeClient()');

// Make sure articles doesn't fall back to stale staticArticles
c = c.replace(
  'const articles = wpArticles.length > 0 ? wpArticles : staticArticles;',
  'const articles = wpArticles;'
);
c = c.replace(
  'const articles = wpArticles.length > 0 ? wpArticles : [];',
  'const articles = wpArticles;'
);

fs.writeFileSync('src/views/Home.jsx', c, 'utf8');

// Verify
const result = c.split('\n');
console.log('Fixed! First 5 lines:');
result.slice(0, 5).forEach((l, i) => console.log(i+1 + ':', l));
console.log('\nComponent name check:', c.includes('HomeClient') ? 'HomeClient OK' : 'MISSING HomeClient');
console.log('Static articles check:', c.includes('staticArticles') ? 'WARNING: still uses staticArticles' : 'OK - no static fallback');
