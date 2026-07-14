export const dynamic = 'force-dynamic';
import { getPosts } from '../../lib/wordpress';

export const revalidate = 300;

export async function GET() {
  let posts = [];
  try {
    posts = await getPosts(50);
  } catch (e) {
    posts = [];
  }

  const baseUrl = 'https://www.crmdaily.co';
  const now = new Date().toUTCString();

  const items = posts.map(post => {
    const url = `${baseUrl}/article/${post.slug}`;
    const excerpt = (post.excerpt || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const title = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const image = post.featuredImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80';
    const date = post.datePublished ? new Date(post.datePublished).toUTCString() : now;

    return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${excerpt}</description>
      <pubDate>${date}</pubDate>
      <category>${post.category || 'CRM News'}</category>
      <enclosure url="${image}" type="image/jpeg" length="0"/>
      <media:content url="${image}" medium="image"/>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CRM Daily — CRM &amp; GTM Intelligence</title>
    <link>${baseUrl}</link>
    <description>Daily CRM and GTM news — HubSpot, Salesforce, Pipedrive updates, RevOps intelligence and more.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/favicon-192.png</url>
      <title>CRM Daily</title>
      <link>${baseUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}