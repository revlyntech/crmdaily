const fs = require('fs');

// ── 1. Sidebar.jsx ── Remove Popular Today and Live Stats sections entirely
let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// Remove the Popular Today section completely
sidebar = sidebar.replace(/<\/\*\s*Popular Today\s*\*\/\s*\}[\s\S]*?(?=<\/\*|$)/, '');

// Get line count for diagnosis
console.log('Sidebar lines:', sidebar.split('\n').length);
fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('Sidebar - checked');

// ── 2. Footer.jsx ── Fix EST line, remove Terms of Service ──
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');

// Remove Terms of Service from footer links entirely
footer = footer.replace(/\["Terms of Service","\/terms"\],?/g, '');
footer = footer.replace(/\["Terms of Service","\/privacy"\],?/g, '');

// Fix EST line with raw unicode
footer = footer.replace(/EST\. 2026[^<]*/g, 'EST. 2026 \u00A9 INDIA \u00B7 US \u00B7 AU');

// Fix copyright line
footer = footer.replace(/[^\x20-\x7E\n\r\t]+\s*2026 CRM DAILY/g, '\u00A9 2026 CRM DAILY');

fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('Footer - fixed EST, removed Terms of Service');

// ── 3. Fix HubSpot article title with "Category:" leak ──
// This is in WordPress CMS - we fix it in the ArticleClient display
let ac = fs.readFileSync('src/app/article/[slug]/ArticleClient.js', 'utf8');
// Clean title that ends with "-category" or "Category:"
const hadFix = ac.includes('replace(/\\s*-?\\s*category:?\\s*$/i');
if (!hadFix) {
  ac = ac.replace(
    'const [article, setArticle] = useState(initialArticle || null);',
    'const [article, setArticle] = useState(initialArticle ? {...initialArticle, title: initialArticle.title.replace(/\\s*-?\\s*category:?\\s*$/i, \'\').trim()} : null);'
  );
  fs.writeFileSync('src/app/article/[slug]/ArticleClient.js', ac, 'utf8');
  console.log('ArticleClient - fixed Category: title leak');
} else {
  console.log('ArticleClient - already fixed');
}

// ── 4. Check Sidebar for Popular Today and stats sections ──
let sidebarCheck = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');
const lines = sidebarCheck.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Popular') || l.includes('stats') || l.includes('Loading') || l.includes('Coming soon')) {
    console.log('Sidebar line ' + (i+1) + ':', l.trim().substring(0, 100));
  }
});

console.log('\nAll done!');