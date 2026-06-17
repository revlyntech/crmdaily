const WP_GRAPHQL_URL = 'https://rosybrown-lapwing-248978.hostingersite.com/graphql';

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

function stripHtml(html) {
  return html?.replace(/<[^>]+>/g, '').trim() || '';
}

function transformPost(post) {
  const categoryName = post.categories?.nodes?.[0]?.name || 'CRM News';
  // Use WordPress featured image if available, else null (ArticleCard handles fallback)
  const featuredImage = post.featuredImage?.node?.sourceUrl || null;
  return {
    id: post.databaseId,
    slug: post.slug,
    title: post.title,
    excerpt: stripHtml(post.excerpt),
    content: post.content,
    date: formatDate(post.date),
    category: categoryName,
    color: getColor(categoryName),
    readTime: '3 min read',
    featuredImage,
  };
}

export async function getPosts(first = 20) {
  const query = `
    query GetPosts {
      posts(first: ${first}, where: { status: PUBLISH }) {
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
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  return (data?.data?.posts?.nodes || []).map(transformPost);
}

export async function getPostById(id) {
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
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  const post = data?.data?.post;
  return post ? transformPost(post) : null;
}