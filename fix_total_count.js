const fs = require('fs');

let wp = fs.readFileSync('src/lib/wordpress.js', 'utf8');

// Replace getTotalPostsCount with cursor-based pagination version
const oldFn = wp.indexOf('export async function getTotalPostsCount()');
if (oldFn !== -1) {
  // Remove old function
  wp = wp.substring(0, oldFn);
}

// Add new cursor-based count function
const newFn = `
export async function getTotalPostsCount() {
  try {
    const BASE = typeof window === 'undefined' ? 'https://cms.crmdaily.co/graphql' : 'https://www.crmdaily.co/api/graphql';
    let total = 0;
    let hasMore = true;
    let cursor = null;
    let safetyLimit = 20; // max 20 pages x 100 = 2000 articles

    while (hasMore && safetyLimit > 0) {
      safetyLimit--;
      const afterClause = cursor ? \`, after: "\${cursor}"\` : '';
      const query = \`{ posts(first: 100, where: { status: PUBLISH }\${afterClause}) { nodes { id } pageInfo { hasNextPage endCursor } } }\`;
      const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        cache: 'no-store'
      });
      const data = await res.json();
      const nodes = data?.data?.posts?.nodes || [];
      const pageInfo = data?.data?.posts?.pageInfo || {};
      total += nodes.length;
      hasMore = pageInfo.hasNextPage || false;
      cursor = pageInfo.endCursor || null;
      if (!hasMore || !cursor) break;
    }
    return total;
  } catch {
    return 0;
  }
}
`;

wp = wp + newFn;
fs.writeFileSync('src/lib/wordpress.js', wp, 'utf8');
console.log('Fixed getTotalPostsCount with cursor pagination');

// Test it locally
const https = require('https');
const query = JSON.stringify({query: '{ posts(first: 100, where: { status: PUBLISH }) { nodes { id } pageInfo { hasNextPage endCursor } } }'});
const options = { hostname: 'cms.crmdaily.co', path: '/graphql', method: 'POST', headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(query)} };
const req = https.request(options, res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const parsed = JSON.parse(data);
    console.log('First batch:', parsed?.data?.posts?.nodes?.length, 'posts');
    console.log('Has more pages:', parsed?.data?.posts?.pageInfo?.hasNextPage);
    console.log('End cursor:', parsed?.data?.posts?.pageInfo?.endCursor?.substring(0,20));
  });
});
req.write(query);
req.end();