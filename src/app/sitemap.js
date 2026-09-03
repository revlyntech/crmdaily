export const dynamic = "force-dynamic";
const WP_GRAPHQL_URL = "https://cms.crmdaily.co/graphql";
const GLOSSARY_SLUGS = ["arr","mrr","nrr","churn-rate","forecast","pipeline","win-rate","sales-cycle","cac","ltv","icp","revops","gtm","plg","meddic","deal-velocity","lead-scoring","sales-qualified-lead","marketing-qualified-lead","customer-success","expansion-revenue","net-dollar-retention","gross-dollar-retention","account-executive","sales-development-representative","business-development-representative","annual-contract-value","total-addressable-market","serviceable-addressable-market","product-led-growth","community-led-growth","sales-led-growth","outbound-sales","inbound-sales","account-based-marketing","demand-generation","revenue-operations","sales-operations","customer-acquisition-cost","customer-lifetime-value","sales-velocity","quota-attainment","ramp-time","sales-cycle-length","conversion-rate","close-rate","average-deal-size","sales-funnel","buyer-journey","ideal-customer-profile"];

export default async function sitemap() {
  const staticPages = [
    { url: "https://www.crmdaily.co",             lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: "https://www.crmdaily.co/news",         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: "https://www.crmdaily.co/guides",       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/tools",        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/crm-tools",    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/glossary",     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: "https://www.crmdaily.co/newsletter",   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/about",        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/contact",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // The interactive CRM tools suite - added once these pages went live.
  // These are static Next.js pages, not WordPress content, so they need
  // to be listed here manually rather than pulled from the WP query below.
  const toolPages = [
    { url: "https://www.crmdaily.co/tools/crm-matcher",              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/tools/do-you-need-a-crm",        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/tools/roi-calculator",           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/tools/stack-recommender",        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/tools/categories",               lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/tools/compare",                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/tools/alternatives",             lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/tools/directory",                lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/tools/add-ons",                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const glossaryPages = GLOSSARY_SLUGS.map(slug => ({
    url: "https://www.crmdaily.co/glossary/" + slug,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  try {
    const query = "{ posts(first: 1000, where: { status: PUBLISH }) { nodes { slug date modified } } }";
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });
    const data = await res.json();
    const posts = data?.data?.posts?.nodes || [];
    const articlePages = posts.map(post => ({
      url: "https://www.crmdaily.co/article/" + post.slug,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticPages, ...toolPages, ...glossaryPages, ...articlePages];
  } catch (err) {
    return [...staticPages, ...toolPages, ...glossaryPages];
  }
}
