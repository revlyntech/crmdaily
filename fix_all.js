const fs = require('fs');

// Fix 1: News.jsx - pagination arrow garbled char
let news = fs.readFileSync('src/views/News.jsx', 'utf8');
news = news.replace('\u0393\u00e5\u00c9 PREV', '\u2190 PREV');
news = news.replace('Γ\u00e5\u00c9 PREV', '\u2190 PREV');
// Try all variants
news = news.replace(/[^\x00-\x7F]+\s*PREV/, '\u2190 PREV');
fs.writeFileSync('src/views/News.jsx', news, 'utf8');
console.log('Fixed pagination arrow');

// Fix 2: Tools.jsx - show ALL articles not just tool categories
let tools = fs.readFileSync('src/views/Tools.jsx', 'utf8');
const before = tools.includes('TOOL_CATEGORIES.includes');
tools = tools.replace(/: all\.filter\(a => TOOL_CATEGORIES\.includes\(a\.category\.toLowerCase\(\)\)\);/, ': all;');
fs.writeFileSync('src/views/Tools.jsx', tools, 'utf8');
console.log('Fixed tools filter:', before ? 'was restricted, now shows all' : 'pattern not found');

// Fix 3: Footer - Terms of Service link
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');
footer = footer.replace('["Terms of Service","/privacy"]', '["Terms of Service","/terms"]');
fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('Fixed Terms of Service link');

// Fix 4: Footer EST line - check current state
const footerLines = footer.split('\n');
footerLines.forEach((l, i) => {
  if (l.includes('EST') || l.includes('INDIA')) {
    console.log('EST line ' + (i+1) + ':', l.trim().substring(0, 100));
  }
  if (l.includes('reserved') || l.includes('RESERVED')) {
    console.log('Copyright line ' + (i+1) + ':', l.trim().substring(0, 100));
  }
});

// Also fix Sidebar - Popular Today Loading and Tools Reviewed Coming soon
const sidebarPath = 'src/components/Sidebar.jsx';
if (fs.existsSync(sidebarPath)) {
  let sidebar = fs.readFileSync(sidebarPath, 'utf8');
  const hadLoading = sidebar.includes('Loading...');
  const hadComingSoon = sidebar.includes('Coming soon');
  sidebar = sidebar.replace(/Loading\.\.\./g, '');
  sidebar = sidebar.replace(/Coming soon/g, '');
  fs.writeFileSync(sidebarPath, sidebar, 'utf8');
  console.log('Fixed Sidebar - Loading:', hadLoading, 'Coming soon:', hadComingSoon);
}

// Check ArticleClient for Loading and Coming soon
const articleClientPath = 'src/app/article/[slug]/ArticleClient.js';
if (fs.existsSync(articleClientPath)) {
  let ac = fs.readFileSync(articleClientPath, 'utf8');
  const hadLoading = ac.includes('Loading...');
  const hadComingSoon = ac.includes('Coming soon');
  ac = ac.replace(/<span[^>]*>Loading\.\.\.<\/span>/g, '<span></span>');
  ac = ac.replace(/Coming soon/g, '');
  fs.writeFileSync(articleClientPath, ac, 'utf8');
  console.log('Fixed ArticleClient - Loading:', hadLoading, 'Coming soon:', hadComingSoon);
}

console.log('All fixes applied!');