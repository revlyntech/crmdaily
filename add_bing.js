const fs = require('fs');
let c = fs.readFileSync('src/app/layout.js', 'utf8');

// Remove any existing msvalidate tags first
c = c.replace(/<meta name="msvalidate\.01"[^/]*\/>\n?/g, '');

// Add directly after <head> tag
c = c.replace('<head>', '<head>\n        <meta name="msvalidate.01" content="2867C58B06CE8D9FE5C1532DBDC7B34D" />');

fs.writeFileSync('src/app/layout.js', c, 'utf8');
console.log('Done!');

const lines = c.split('\n');
lines.forEach((l,i) => {
  if(l.includes('msvalidate') || l.includes('<head>')) {
    console.log(i+1+':', l.trim().substring(0,100));
  }
});