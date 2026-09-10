const WP_GRAPHQL_URL = typeof window === 'undefined'
  ? 'https://cms.crmdaily.co/graphql'
  : '/api/graphql';

// In-memory cache (per serverless instance — resets on cold start, that's fine)
const cache = {
  posts: null,
  fetchedAt: null,
  TTL: 30 * 60 * 1000,
};

// Safety cap on how many posts getPosts() will ever fetch and cache in one
// go. This isn't a display limit - it's just a ceiling so a runaway archive
// can't make a single request loop forever. 1000 gives huge headroom over
// current volume (2 articles/day) while still being a bounded, safe fetch.
const MAX_FETCH = 1000;
const PAGE_SIZE = 100;

function isCacheValid() {
  return cache.posts && cache.fetchedAt && (Date.now() - cache.fetchedAt < cache.TTL);
}

function getColor(categoryName) {
  const map = {
    'CRM News': 'blue', 'HubSpot': 'purple', 'Salesforce': 'blue',
    'Automation': 'green', 'RevOps': 'purple', 'GTM Strategy': 'amber',
    'Tool Review': 'green', 'How-To Guide': 'red', 'How-To-Guide': 'red',
    'AI in Sales': 'purple', 'Sales Tech': 'green', 'RevOps Intelligence': 'purple',
  };
  return map[categoryName] || 'blue';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

function cleanExcerpt(html) {
  if (!html) return '';
  let text = html.replace(/<[^>]+>/g, '');
  text = text
    .replace(/&hellip;/g, '…').replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/\[&hellip;\]/g, '').replace(/\[…\]/g, '').trim();
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 2).join(' ').trim() || text.slice(0, 200);
}

function transformPost(post) {
  const categoryName = post.categories?.nodes?.[0]?.name || 'CRM News';
  return {
    id: post.databaseId,
    slug: post.slug,
    title: post.title,
    excerpt: cleanExcerpt(post.excerpt),
    content: post.content,
    date: formatDate(post.date),
    // Keep raw ISO dates for schema markup
    datePublished: post.date || null,
    dateModified: post.modified || post.date || null,
    category: categoryName,
    color: getColor(categoryName),
    readTime: '3 min read',
    featuredImage: post.featuredImage?.node?.sourceUrl || null,
  };
}

async function fetchWithTimeout(url, options, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal, cache: 'no-store' });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// Fetches every published post from WordPress, following cursor-based
// pagination (the same pattern getTotalPostsCount already used correctly)
// instead of a single request capped at 100 by both this code and
// WPGraphQL's own per-request limit. Stops early once either the archive
// is exhausted or MAX_FETCH is hit, whichever comes first.
async function fetchAllPosts() {
  const allNodes = [];
  let cursor = null;
  let hasMore = true;

  while (hasMore && allNodes.length < MAX_FETCH) {
    const afterClause = cursor ? `, after: "${cursor}"` : '';
    const query = `
      query GetPosts {
        posts(first: ${PAGE_SIZE}, where: { status: PUBLISH }${afterClause}) {
          nodes {
            databaseId
            slug
            title
            excerpt
            date
            modified
            featuredImage { node { sourceUrl } }
            categories { nodes { name } }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    `;

    const res = await fetchWithTimeout(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (res.status === 429) {
      console.warn('Rate limited while fetching posts, stopping pagination early');
      break;
    }

    const data = await res.json();
    const nodes = data?.data?.posts?.nodes || [];
    const pageInfo = data?.data?.posts?.pageInfo || {};

    allNodes.push(...nodes);
    hasMore = pageInfo.hasNextPage || false;
    cursor = pageInfo.endCursor || null;
    if (!hasMore || !cursor) break;
  }

  return allNodes;
}

export async function getPosts(first = 100) {
  if (isCacheValid()) return cache.posts.slice(0, first);

  try {
    const nodes = await fetchAllPosts();
    const posts = nodes.map(transformPost);
    cache.posts = posts;
    cache.fetchedAt = Date.now();
    return posts.slice(0, first);
  } catch (err) {
    console.error('WordPress fetch error:', err);
    return cache.posts || [];
  }
}

export async function getPostBySlug(slug) {
  if (isCacheValid()) {
    const cached = cache.posts.find(p => p.slug === slug);
    if (cached && cached.content) return cached;
  }

  const query = `
    query GetPostBySlug {
      post(id: "${slug}", idType: SLUG) {
        databaseId
        slug
        title
        excerpt
        content
        date
        modified
        featuredImage { node { sourceUrl } }
        categories { nodes { name } }
      }
    }
  `;

  try {
    const res = await fetchWithTimeout(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (res.status === 429) { console.warn('Rate limited, retrying...'); await new Promise(r => setTimeout(r, 1000)); return null; }
    const data = await res.json();
    if (data?.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors));
      return null;
    }
    const post = data?.data?.post;
    return post ? transformPost(post) : null;
  } catch (err) {
    console.error('WordPress post fetch error:', err);
    return null;
  }
}

export async function getPostById(id) {
  if (isNaN(id)) return getPostBySlug(id);

  if (isCacheValid()) {
    const cached = cache.posts.find(p => p.id === parseInt(id));
    if (cached && cached.content) return cached;
  }

  const query = `
    query GetPost {
      post(id: "${id}", idType: DATABASE_ID) {
        databaseId
        slug
        title
        excerpt
        content
        date
        modified
        featuredImage { node { sourceUrl } }
        categories { nodes { name } }
      }
    }
  `;

  try {
    const res = await fetchWithTimeout(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (res.status === 429) { console.warn('Rate limited, retrying...'); await new Promise(r => setTimeout(r, 1000)); return null; }
    const data = await res.json();
    const post = data?.data?.post;
    return post ? transformPost(post) : null;
  } catch (err) {
    console.error('WordPress post fetch error:', err);
    return null;
  }
}


export async function getTotalPostsCount() {
  try {
    const BASE = typeof window === 'undefined' ? 'https://cms.crmdaily.co/graphql' : '/api/graphql';
    let total = 0;
    let hasMore = true;
    let cursor = null;
    let safetyLimit = 20; 

    while (hasMore && safetyLimit > 0) {
      safetyLimit--;
      const afterClause = cursor ? `, after: "${cursor}"` : '';
      const query = `{ posts(first: 100, where: { status: PUBLISH }${afterClause}) { nodes { id } pageInfo { hasNextPage endCursor } } }`;
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