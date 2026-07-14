const fs = require('fs');
let c = fs.readFileSync('src/views/Home.jsx', 'utf8');
c = c.replace(/import \{ articles as staticArticles \} from ["']\.\.\/data\/articles["'];\n?/g, '');
fs.writeFileSync('src/views/Home.jsx', c, 'utf8');
console.log('Done');
console.log('staticArticles remaining:', c.includes('staticArticles'));