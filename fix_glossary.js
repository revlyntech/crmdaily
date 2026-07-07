const fs = require('fs');
let content = fs.readFileSync('src/lib/glossary.js', 'utf8');

const termsStart = content.indexOf('export const GLOSSARY_TERMS = [');
const termsEnd = content.lastIndexOf('];') + 2;

const clean = "export const GLOSSARY_CATEGORIES = ['Sales', 'RevOps', 'GTM', 'Metrics', 'AI', 'Marketing'];\n\nexport function getTerm(slug) {\n  return GLOSSARY_TERMS.find(t => t.slug === slug);\n}\n\n" + content.substring(termsStart, termsEnd) + '\n';

fs.writeFileSync('src/lib/glossary.js', clean, 'utf8');
console.log('Done! Size:', clean.length, 'chars');
console.log('Starts with:', clean.substring(0, 80));
console.log('Ends with:', clean.substring(clean.length - 50));