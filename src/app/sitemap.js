export const dynamic = "force-dynamic";

const WP_GRAPHQL_URL = "https://www.crmdaily.co/api/graphql";

export default async function sitemap() {
  const staticPages = [
    { url: "https://www.crmdaily.co", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://www.crmdaily.co/news", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://www.crmdaily.co/guides", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://www.crmdaily.co/tools", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://www.crmdaily.co/newsletter", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
  try {
    const query = "{ posts(first: 1000, where: { status: PUBLISH }) { nodes { slug date modified } } }";
    const res = await fetch(WP_GRAPHQL_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }), cache: "no-store" });
    const data = await res.json();
    const posts = data?.data?.posts?.nodes || [];
    const articlePages = posts.map(post => ({ url: "https://www.crmdaily.co/article/" + post.slug, lastModified: new Date(post.modified || post.date), changeFrequency: "weekly", priority: 0.8 }));
    return [...staticPages, ...articlePages];
  } catch (err) {
    return staticPages;
  }
}