const WP_GRAPHQL_URL = 'https://rosybrown-lapwing-248978.hostingersite.com/graphql';

// ─── In-memory cache ───────────────────────────────────────────
// Stores fetched articles for 5 minutes so repeated visits
// and page navigations don't re-fetch from WordPress every time
const cache = {
  posts: null,
  fetchedAt: null,
  TTL: 5 * 60 * 1000, // 5 minutes
};

function isCacheValid() {
  return cache.posts && cache.fetchedAt && (Date.now() - cache.fetchedAt < cache.TTL);
}

// ─── Helpers ───────────────────────────────────────────────────
function getColor(categoryName) {
  const map = {
    'CRM News': 'blue', 'HubSpot': 'purple', 'Salesforce': 'blue',
    'Automation': 'green', 'RevOps': 'purple', 'GTM Strategy': 'amber',
    'Tool Review': 'green', 'How-To Guide': 'red', 'How-To-Guide': 'red',
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
    category: categoryName,
    color: getColor(categoryName),
    readTime: '3 min read',
    featuredImage: post.featuredImage?.node?.sourceUrl || null,
  };
}

// ─── Fetch with timeout ────────────────────────────────────────
async function fetchWithTimeout(url, options, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// ─── Main fetch — with cache ───────────────────────────────────
export async function getPosts(first = 100) {
  // Return cached data instantly if still fresh
  if (isCacheValid()) {
    return cache.posts.slice(0, first);
  }

  const query = `
    query GetPosts {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          databaseId
          slug
          title
          excerpt
          date
          featuredImage { node { sourceUrl } }
          categories { nodes { name } }
        }
      }
    }
  `;

  try {
    const res = await fetchWithTimeout(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    const posts = (data?.data?.posts?.nodes || []).map(transformPost);

    // Store in cache
    cache.posts = posts;
    cache.fetchedAt = Date.now();

    return posts.slice(0, first);
  } catch (err) {
    console.error('WordPress fetch error:', err);
    // Return stale cache if available rather than empty
    return cache.posts || [];
  }
}

// ─── Single post fetch — no cache needed ──────────────────────
export async function getPostById(id) {
  // Check cache first — avoid an extra network call
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
    const data = await res.json();
    const post = data?.data?.post;
    return post ? transformPost(post) : null;
  } catch (err) {
    console.error('WordPress post fetch error:', err);
    return null;
  }
}