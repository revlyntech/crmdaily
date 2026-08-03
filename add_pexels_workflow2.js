const fs = require('fs');

let c = fs.readFileSync('.github/workflows/daily.yml', 'utf8');

console.log('RESEND line:', c.split('\n').find(l => l.includes('RESEND')));

// Replace with exact match
c = c.replace(
  /          RESEND_API_KEY:\s+\$\{\{ secrets\.RESEND_API_KEY \}\}/,
  '          RESEND_API_KEY:    ${{ secrets.RESEND_API_KEY }}\n          PEXELS_API_KEY:    ${{ secrets.PEXELS_API_KEY }}'
);

fs.writeFileSync('.github/workflows/daily.yml', c, 'utf8');
console.log('Has PEXELS:', c.includes('PEXELS_API_KEY'));

const lines = c.split('\n');
lines.forEach((l,i) => {
  if(l.includes('API_KEY')) console.log(i+1+':', l);
});