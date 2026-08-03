const fs = require('fs');

let c = fs.readFileSync('.github/workflows/daily.yml', 'utf8');

// Add PEXELS_API_KEY after RESEND_API_KEY
c = c.replace(
  '          RESEND_API_KEY:      ${{ secrets.RESEND_API_KEY }}',
  '          RESEND_API_KEY:      ${{ secrets.RESEND_API_KEY }}\n          PEXELS_API_KEY:      ${{ secrets.PEXELS_API_KEY }}'
);

fs.writeFileSync('.github/workflows/daily.yml', c, 'utf8');
console.log('Done!');
console.log('Has PEXELS:', c.includes('PEXELS_API_KEY'));

// Show the env section
const lines = c.split('\n');
lines.forEach((l,i) => {
  if(l.includes('API_KEY') || l.includes('env:')) {
    console.log(i+1+':', l);
  }
});