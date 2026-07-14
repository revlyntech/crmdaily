const fs = require('fs');

let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// Fix the stats values - replace loading?"..." with actual computed values
// The stats use: totalArticles, topicsCount, toolsCount
// Replace the loading state dots with proper fallback
sidebar = sidebar.replace(
  'value:loading?"...":String(totalArticles)',
  'value:String(totalArticles || articles.length || 0)'
);
sidebar = sidebar.replace(
  'value:loading?"...":String(topicsCount)',
  'value:String(topicsCount || 6)'
);
sidebar = sidebar.replace(
  'value:loading?"...":String(toolsCount)',
  'value:String(toolsCount || 0)'
);
sidebar = sidebar.replace(
  'sub:toolsCount>0?"Tool reviews live":""',
  'sub:"Tool reviews & comparisons"'
);

// Also fix Popular Today loading state - already empty string, good
// Make sure sidebar-stats is visible (remove display:none)
sidebar = sidebar.replace('.sidebar-stats { display: none !important; }', '.sidebar-stats { display: block; }');

fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('Sidebar fixed!');

// Now fix Footer - remove Terms of Service completely
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');

// Remove Terms of Service link row
footer = footer.replace(/,?\s*\["Terms of Service","\/terms"\]/g, '');
footer = footer.replace(/,?\s*\["Terms of Service","\/privacy"\]/g, '');

// Verify EST line is clean
const footerLines = footer.split('\n');
footerLines.forEach((l, i) => {
  if (l.includes('EST') || l.includes('RESERVED')) {
    console.log('Footer line ' + (i+1) + ':', l.trim().substring(0, 100));
  }
});

fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('Footer fixed - Terms of Service removed');

// Fix Tools.jsx - make sure it shows Tool Reviews category articles
let tools = fs.readFileSync('src/views/Tools.jsx', 'utf8');
console.log('Tools filter line:', tools.split('\n').find(l => l.includes('all;') || l.includes('TOOL_CAT')));