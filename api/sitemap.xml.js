const WP_GRAPHQL_URL = 'https://cms.crmdaily.co/graphql';

async function getAllArticles() {
  const query = `
    query GetAllPosts {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
          date
          modified
        }
      }
    }
  `;

  const response = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data?.data?.posts?.nodes || [];
}

export default async function handler(req, res) {
  try {
    const articles = await getAllArticles();

    const staticPages = [
      { url: 'https://www.crmdaily.co', priority: '1.0', changefreq: 'daily' },
      { url: 'https://www.crmdaily.co/news', priority: '0.9', changefreq: 'daily' },
      { url: 'https://www.crmdaily.co/guides', priority: '0.8', changefreq: 'weekly' },
      { url: 'https://www.crmdaily.co/tools', priority: '0.8', changefreq: 'weekly' },
      { url: 'https://www.crmdaily.co/crm-tools', priority: '0.8', changefreq: 'weekly' },
      { url: 'https://www.crmdaily.co/newsletter', priority: '0.7', changefreq: 'monthly' },
      { url: 'https://www.crmdaily.co/about', priority: '0.6', changefreq: 'monthly' },
      { url: 'https://www.crmdaily.co/contact', priority: '0.5', changefreq: 'monthly' },
    ];

    const articleUrls = articles.map(article => ({
      url: `https://www.crmdaily.co/article/${article.slug}`,
      lastmod: new Date(article.modified || article.date).toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'weekly',
    }));

    const allUrls = [...staticPages, ...articleUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(xml);

  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
}