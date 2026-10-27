export const dynamic = "force-dynamic";
import { INDUSTRIES } from "@/data/industriesData";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { getPosts } from "@/lib/wordpress";

export default async function sitemap() {
  const staticPages = [
    { url: "https://www.crmdaily.co",             lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: "https://www.crmdaily.co/news",         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: "https://www.crmdaily.co/guides",       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/tools",        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/crm-tools",    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/industries",   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.crmdaily.co/glossary",     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: "https://www.crmdaily.co/newsletter",   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.crmdaily.co/what-is-crm-daily", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.crmdaily.co/about",        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://www.crmdaily.co/contact",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // The interactive CRM tools suite. These are static Next.js pages, not
  // WordPress content, so they are listed here manually.
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

  // Industry pages, generated from the same data file the pages use, so
  // this list cannot drift out of sync with what exists.
  const industryPages = INDUSTRIES.map((ind) => ({
    url: `https://www.crmdaily.co/industries/${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Glossary pages, generated from the glossary data. This used to be a
  // hardcoded list of 50 slugs, 35 of which pointed at pages that do not
  // exist, while 187 real term pages were missing from the sitemap.
  const glossaryPages = GLOSSARY_TERMS.map((term) => ({
    url: "https://www.crmdaily.co/glossary/" + term.slug,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Articles. getPosts() follows WordPress cursor pagination, so it returns
  // the full archive. The old direct query asked for 1000 in one request,
  // which WordPress GraphQL typically caps at 100.
  let articlePages = [];
  try {
    const posts = await getPosts(1000);
    articlePages = posts.map((post) => ({
      url: "https://www.crmdaily.co/article/" + post.slug,
      lastModified: new Date(post.dateModified || post.datePublished),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    // If WordPress is unreachable, still serve every other page.
  }

  return [...staticPages, ...toolPages, ...industryPages, ...glossaryPages, ...articlePages];
}
