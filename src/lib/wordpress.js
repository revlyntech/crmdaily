const WP_GRAPHQL_URL = 'https://www.crmdaily.co/api/graphql';

// In-memory cache (per serverless instance â€” resets on cold start, that's fine)
const cache = {
  posts: null,
  fetchedAt: null,
  TTL: 5 * 60 * 1000,
};

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
    .replace(/&hellip;/g, 'â€¦').replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, 'â€“').replace(/&#8212;/g, 'â€”')
    .replace(/\[&hellip;\]/g, '').replace(/\[â€¦\]/g, '').trim();
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

export async function getPosts(first = 100) {
  if (isCacheValid()) return cache.posts.slice(0, first);

  const query = `
    query GetPosts {
      posts(first: 100, where: { status: PUBLISH }) {
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
    const data = await res.json();
    const post = data?.data?.post;
    return post ? transformPost(post) : null;
  } catch (err) {
    console.error('WordPress post fetch error:', err);
    return null;
  }
}
