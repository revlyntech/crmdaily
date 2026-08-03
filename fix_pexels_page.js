const fs = require('fs');
let c = fs.readFileSync('automation/writer.py', 'utf8');

c = c.replace(
  '"per_page": 30, "orientation": "landscape", "size": "large"',
  '"per_page": 30, "page": random.randint(1, 3), "orientation": "landscape", "size": "large"'
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Fixed!');
console.log('Has random page:', c.includes('random.randint(1, 3)'));
console.log('Count:', (c.match(/random\.randint\(1, 3\)/g) || []).length, 'occurrences');