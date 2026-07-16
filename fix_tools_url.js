const fs = require('fs');
let c = fs.readFileSync('src/views/Tools.jsx', 'utf8');

// Remove useSearchParams import
c = c.replace(/import \{ useSearchParams \} from ['"]next\/navigation['"];\n?/g, '');

// Remove searchParams lines
c = c.replace(/\s*const searchParams = useSearchParams\(\);\n/g, '\n');
c = c.replace(/\s*const params = searchParams;\n/g, '');
c = c.replace(/\s*const categoryFilter = searchParams\.get\(['"']category['"']\) \|\| ['"]['"];\n/g, '\n  const categoryFilter = \'\';\n');

// Make articles = all (no filter)
c = c.replace(
  /const articles = categoryFilter[\s\S]*?: all;/,
  'const articles = all;'
);

// Fix pageTitle and pageDesc to not depend on categoryFilter
c = c.replace(
  /const pageTitle = categoryFilter \? .*? : ['"]CRM Tools & Reviews['"];/,
  "const pageTitle = 'CRM Tools & Reviews';"
);
c = c.replace(
  /const pageDesc = categoryFilter \? .*? : ['"]Honest.*?['"];/,
  "const pageDesc = 'Honest, unbiased CRM tool reviews and comparisons. HubSpot, Salesforce, Pipedrive and more.';"
);

fs.writeFileSync('src/views/Tools.jsx', c, 'utf8');
console.log('Fixed!');
console.log('Has useSearchParams:', c.includes('useSearchParams'));
console.log('Has searchParams.get:', c.includes('searchParams.get'));
console.log('Articles = all:', c.includes('const articles = all;'));

// Verify first 20 lines
const lines = c.split('\n');
console.log('\nFirst 20 lines:');
lines.slice(0, 20).forEach((l, i) => console.log(i+1+':', l));