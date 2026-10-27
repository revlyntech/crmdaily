import ArticleClient from './ArticleClient';
import { getPostBySlug, getPosts } from '../../../lib/wordpress';

export const revalidate = 300;

const SITE = 'https://www.crmdaily.co';

const toISO = (d) => {
  try { return d ? new Date(d).toISOString() : undefined; } catch { return undefined; }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const url = `${SITE}/article/${slug}`;
  try {
    const article = await getPostBySlug(slug);
    // If WordPress did not answer, keep a self-canonical but do not mark the
    // page noindex: a temporary failure should never remove a page from Google.
    if (!article) return { title: 'Article', alternates: { canonical: url } };
    const description = article.excerpt || 'CRM and GTM intelligence from CRM Daily.';
    const images = article.featuredImage ? [article.featuredImage] : [];
    return {
      // layout.js already adds " | CRM Daily" to every title, so it is not added
      // here. Adding it again produced "... | CRM Daily | CRM Daily".
      title: article.title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        url,
        siteName: 'CRM Daily',
        title: article.title,
        description,
        images,
        publishedTime: toISO(article.datePublished),
        modifiedTime: toISO(article.dateModified || article.datePublished),
        section: article.category || undefined,
      },
      twitter: { card: 'summary_large_image', title: article.title, description, images },
    };
  } catch {
    return { title: 'Article', alternates: { canonical: url } };
  }
}

// Only the fields the related and latest lists need, so the page does not carry
// the full text of other articles.
const slim = (p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  category: p.category,
  featuredImage: p.featuredImage || null,
  color: p.color || null,
});

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  let article = null;
  try {
    article = await getPostBySlug(slug);
  } catch (e) {
    article = null;
  }

  // Chosen on the server so they are real links in the page's HTML. Crawlers
  // and AI systems can then follow them from one article to the next.
  let related = [];
  let latest = [];
  if (article) {
    try {
      const posts = await getPosts(60);
      const others = posts.filter((p) => p.slug !== slug);
      const same = others.filter((p) => p.category === article.category).slice(0, 3);
      const fill = others.filter((p) => !same.some((s) => s.slug === p.slug)).slice(0, 3 - same.length);
      related = [...same, ...fill].map(slim);
      latest = others.slice(0, 5).map(slim);
    } catch (e) {
      // The client fetches them itself if the server could not.
    }
  }

  return <ArticleClient initialArticle={article} slug={slug} related={related} latest={latest} />;
}
