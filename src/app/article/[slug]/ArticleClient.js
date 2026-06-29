'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPostBySlug, getPosts } from "../../../lib/wordpress";
import { subscribeEmail } from "../../../utils/beehiiv";

const fallbackImgs = {
  blue:   "https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&q=80",
  purple: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  green:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  amber:  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  red:    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80",
};

function decodeEntities(str) {
  return str.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"')
    .replace(/&#8220;/g,'\u201C').replace(/&#8221;/g,'\u201D').replace(/&#8216;/g,'\u2018')
    .replace(/&#8217;/g,'\u2019').replace(/&#8211;/g,'\u2013').replace(/&#8212;/g,'\u2014')
    .replace(/&hellip;/g,'\u2026').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#\d+;/g,'').trim();
}

function extractHeadings(html) {
  if (!html) return [];
  return [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map((m, i) => ({ id: `sec-${i}`, text: decodeEntities(m[1]) }));
}

function injectHeadingIds(html) {
  if (!html) return html;
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, () => `<h2 id="sec-${i++}"$1>`);
}

function ArticleSchema({ article, readTime }) {
  if (!article) return null;
  const image = article.featuredImage || fallbackImgs[article.color] || fallbackImgs.blue;
  const toISO = (d) => { try { return new Date(d).toISOString(); } catch { return null; } };
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt || "",
    "image": [image],
    "datePublished": toISO(article.datePublished) || toISO(article.date),
    "dateModified": toISO(article.dateModified) || toISO(article.datePublished) || toISO(article.date),
    "author": { "@type": "Organization", "name": "CRM Daily", "url": "https://www.crmdaily.co" },
    "publisher": {
      "@type": "Organization", "name": "CRM Daily", "url": "https://www.crmdaily.co",
      "logo": { "@type": "ImageObject", "url": "https://www.crmdaily.co/favicon-192.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.crmdaily.co/article/${article.slug}` },
    "articleSection": article.category,
    "timeRequired": `PT${readTime}M`,
    "url": `https://www.crmdaily.co/article/${article.slug}`
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      setProgress(Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div style={{ position:'fixed', top:0, left:0, zIndex:999, width:`${progress}%`, height:3, background:'#e9542a', transition:'width 0.1s linear' }} />;
}

function RelatedArticles({ currentArticle }) {
  const [related, setRelated] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getPosts(50).then(posts => {
      const filtered = posts.filter(p => p.slug !== currentArticle.slug && p.category === currentArticle.category).slice(0, 3);
      if (filtered.length < 3) {
        const rest = posts.filter(p => p.slug !== currentArticle.slug && !filtered.find(f => f.slug === p.slug)).slice(0, 3 - filtered.length);
        setRelated([...filtered, ...rest]);
      } else setRelated(filtered);
    });
  }, [currentArticle.slug]);
  if (related.length === 0) return null;
  return (
    <div style={{ borderTop:'1px solid rgba(0,0,0,0.1)', paddingTop:48, marginTop:48 }}>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#e9542a', letterSpacing:'0.18em', marginBottom:24 }}>// RELATED ARTICLES</p>
      <div className="related-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24 }}>
        {related.map(a => {
          const img = a.featuredImage || fallbackImgs[a.color] || fallbackImgs.blue;
          return (
            <div key={a.id} onClick={() => { router.push(`/article/${a.slug}`); window.scrollTo(0,0); }}
              style={{ cursor:'pointer', borderTop:'2px solid rgba(0,0,0,0.08)', paddingTop:16 }}
              onMouseEnter={e => e.currentTarget.querySelector('h3').style.color='#e9542a'}
              onMouseLeave={e => e.currentTarget.querySelector('h3').style.color='#1c1a17'}>
              <img src={img} alt={a.title} style={{ width:'100%', height:140, objectFit:'cover', marginBottom:12, filter:'brightness(0.85)' }} />
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'#e9542a', letterSpacing:'0.14em', marginBottom:6 }}>{a.category.toUpperCase()}</p>
              <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:'#1c1a17', lineHeight:1.35, transition:'color 0.2s' }}>{a.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SidebarNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const r = await subscribeEmail(email);
    setStatus(r.success ? 'success' : 'error');
    if (r.success) setEmail('');
  }
  return (
    <div style={{ background:'#0d0c0b', padding:24, marginBottom:2 }}>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'#e9542a', letterSpacing:'0.18em', marginBottom:12 }}>// DAILY NEWSLETTER</p>
      <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:'#efeae1', lineHeight:1.25, marginBottom:8 }}>CRM Daily Digest</h3>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(239,234,225,0.7)', lineHeight:1.7, marginBottom:16 }}>Top CRM & GTM stories every morning. No noise, just signal.</p>
      {status === 'success' ? (
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#22C55E', letterSpacing:'0.1em' }}>✓ SUBSCRIBED</p>
      ) : (
        <>
          <input type="email" placeholder="your@company.io" value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
            style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#efeae1', fontFamily:"'Space Mono',monospace", fontSize:10, padding:'10px 12px', outline:'none', marginBottom:8, boxSizing:'border-box' }} />
          <button onClick={handleSubmit}
            style={{ width:'100%', background:'#e9542a', color:'#fff', border:'none', padding:'11px', fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.12em', cursor:'pointer' }}
            onMouseEnter={e => e.target.style.background='#d4481a'} onMouseLeave={e => e.target.style.background='#e9542a'}>
            {status === 'loading' ? 'SUBSCRIBING...' : 'GET DAILY DIGEST →'}
          </button>
        </>
      )}
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'rgba(255,255,255,0.5)', marginTop:10, letterSpacing:'0.1em' }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
    </div>
  );
}

function SidebarPopular() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => { getPosts(5).then(setPosts); }, []);
  return (
    <div style={{ background:'#efeae1', border:'1px solid rgba(0,0,0,0.1)', padding:24, marginBottom:2 }}>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'#e9542a', letterSpacing:'0.18em', marginBottom:16 }}>// POPULAR TODAY</p>
      {posts.slice(0, 5).map((a, i) => (
        <div key={a.id} onClick={() => { router.push(`/article/${a.slug}`); window.scrollTo(0, 0); }}
          style={{ display:'flex', gap:12, padding:'12px 0', borderBottom:i<4?'1px solid rgba(0,0,0,0.07)':'none', cursor:'pointer' }}
          onMouseEnter={e => e.currentTarget.querySelector('.pop-title').style.color='#e9542a'}
          onMouseLeave={e => e.currentTarget.querySelector('.pop-title').style.color='#1c1a17'}>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:'rgba(0,0,0,0.12)', flexShrink:0, lineHeight:1, marginTop:2 }}>{String(i+1).padStart(2,'0')}</span>
          <div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:'#e9542a', letterSpacing:'0.12em', marginBottom:4 }}>{a.category.toUpperCase()}</p>
            <p className="pop-title" style={{ fontFamily:"'DM Serif Display',serif", fontSize:13, color:'#1c1a17', lineHeight:1.35, transition:'color 0.2s' }}>{a.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SidebarTopics() {
  const topics = ['CRM News','HubSpot','Salesforce','RevOps','GTM Strategy','Tool Reviews','AI & Automation','Pipedrive'];
  return (
    <div style={{ background:'#efeae1', border:'1px solid rgba(0,0,0,0.1)', padding:24 }}>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'#e9542a', letterSpacing:'0.18em', marginBottom:14 }}>// BROWSE TOPICS</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {topics.map(t => (
          <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:8, padding:'5px 9px', border:'1px solid rgba(0,0,0,0.15)', color:'#6b655c', letterSpacing:'0.08em', cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e => { e.target.style.borderColor='#e9542a'; e.target.style.color='#e9542a'; }}
            onMouseLeave={e => { e.target.style.borderColor='rgba(0,0,0,0.15)'; e.target.style.color='#6b655c'; }}>
            {t.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ArticleClient({ initialArticle, slug }) {
  // If server pre-fetched the article, use it immediately (no flash)
  const [article, setArticle] = useState(initialArticle || null);
  const [loading, setLoading] = useState(!initialArticle);
  const [headings, setHeadings] = useState([]);
  const [processedContent, setProcessedContent] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle');

  useEffect(() => {
    // Process content from initialArticle on mount
    if (initialArticle?.content) {
      setHeadings(extractHeadings(initialArticle.content));
      setProcessedContent(injectHeadingIds(initialArticle.content));
    }
  }, [initialArticle]);

  useEffect(() => {
    // Only fetch client-side if server didn't provide the article
    // (e.g. client-side navigation where initialArticle may be stale/null)
    if (initialArticle) return;

    setLoading(true);
    getPostBySlug(slug).then(a => {
      setArticle(a);
      if (a?.content) {
        setHeadings(extractHeadings(a.content));
        setProcessedContent(injectHeadingIds(a.content));
      }
      setLoading(false);
    }).catch(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [slug, initialArticle]);

  async function handleFooterSub(e) {
    e.preventDefault();
    if (!subEmail) return;
    setSubStatus('loading');
    const r = await subscribeEmail(subEmail);
    setSubStatus(r.success ? 'success' : 'error');
    if (r.success) setSubEmail('');
  }

  if (loading) return (
    <>
      <ProgressBar />
      <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#efeae1' }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#e9542a', letterSpacing:'0.15em' }}>LOADING...</span>
      </div>
    </>
  );

  if (!article) return (
    <>
      <ProgressBar />
      <div style={{ maxWidth:640, margin:'80px auto', padding:'0 32px', textAlign:'center' }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#e9542a', letterSpacing:'0.15em' }}>404</span>
        <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:40, color:'#1c1a17', margin:'16px 0' }}>Article not found</h1>
        <Link href="/" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#1c1a17', fontWeight:700, letterSpacing:'0.1em' }}>← RETURN HOME</Link>
      </div>
    </>
  );

  const wordCount = article.content ? article.content.replace(/<[^>]+>/g, '').split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));

  return (
    <>
      <ProgressBar />
      <ArticleSchema article={article} readTime={readTime} />

      {/* Breadcrumb */}
      <div style={{ background:'#efeae1', borderBottom:'1px solid rgba(0,0,0,0.1)', padding:'10px 16px' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <Link href="/" style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#8a847a', letterSpacing:'0.1em', textDecoration:'none' }}
            onMouseEnter={e => e.target.style.color='#e9542a'} onMouseLeave={e => e.target.style.color='#8a847a'}>← HOME</Link>
          <span style={{ color:'rgba(0,0,0,0.2)', fontSize:10 }}>/</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#e9542a', letterSpacing:'0.1em' }}>{article.category.toUpperCase()}</span>
          <span style={{ color:'rgba(0,0,0,0.2)', fontSize:10 }}>/</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#8a847a', letterSpacing:'0.08em' }}>CRM DAILY TEAM · {article.date.toUpperCase()}</span>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ background:'#efeae1', padding:'48px 20px 80px' }}>
        <div className="article-page-layout" style={{ maxWidth:1240, margin:'0 auto', display:'grid', gridTemplateColumns:'200px minmax(0,640px) 300px', gap:'0 56px', alignItems:'start' }}>

          {/* LEFT RAIL */}
          <aside className="article-left-rail" style={{ position:'sticky', top:24 }}>
            <div style={{ paddingBottom:16, marginBottom:16, borderBottom:'1px solid rgba(0,0,0,0.1)' }}>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#e9542a', letterSpacing:'0.14em', marginBottom:6 }}>{article.category.toUpperCase()}</p>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#8a847a', letterSpacing:'0.1em' }}>{readTime} MIN READ</p>
            </div>
            <div style={{ paddingBottom:16, marginBottom:16, borderBottom:'1px solid rgba(0,0,0,0.1)' }}>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'#8a847a', letterSpacing:'0.14em', marginBottom:10 }}>SHARE</p>
              <div style={{ display:'flex', gap:8 }}>
                {[
                  { label:'X', url:`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://crmdaily.co/article/${article.slug}`)}` },
                  { label:'in', url:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://crmdaily.co/article/${article.slug}`)}` },
                  { label:'↗', url:`https://crmdaily.co/article/${article.slug}` },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ width:36, height:36, border:'1px solid rgba(0,0,0,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", fontSize:10, color:'#2b2620', textDecoration:'none', transition:'all 0.2s', flexShrink:0 }}
                    onMouseEnter={e => { e.currentTarget.style.background='#e9542a'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#e9542a'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#2b2620'; e.currentTarget.style.borderColor='rgba(0,0,0,0.15)'; }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            {headings.length > 0 && (
              <div>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:'#8a847a', letterSpacing:'0.14em', marginBottom:12 }}>IN THIS ARTICLE</p>
                <nav>
                  {headings.map(h => (
                    <a key={h.id} href={`#${h.id}`} style={{ display:'block', fontFamily:"'DM Serif Display',serif", fontSize:12, color:'#6b655c', lineHeight:1.45, marginBottom:10, textDecoration:'none', transition:'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color='#e9542a'} onMouseLeave={e => e.target.style.color='#6b655c'}>
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </aside>

          {/* CENTER ARTICLE */}
          <article className="article-center-col">
            <div className="article-mobile-meta">
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#e9542a', letterSpacing:'0.12em' }}>{article.category.toUpperCase()}</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#8a847a', letterSpacing:'0.1em' }}>{readTime} MIN READ</span>
              <div style={{ display:'flex', gap:6, marginLeft:'auto' }}>
                {[
                  { label:'X', url:`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://crmdaily.co/article/${article.slug}`)}` },
                  { label:'in', url:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://crmdaily.co/article/${article.slug}`)}` },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ width:30, height:30, border:'1px solid rgba(0,0,0,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", fontSize:9, color:'#2b2620', textDecoration:'none' }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {(article.featuredImage || fallbackImgs[article.color]) && (
              <div style={{ marginBottom:28, overflow:'hidden' }}>
                <img src={article.featuredImage || fallbackImgs[article.color] || fallbackImgs.blue} alt={article.title}
                  style={{ width:'100%', height:300, objectFit:'cover', filter:'brightness(0.88)' }} />
              </div>
            )}

            <div style={{ paddingBottom:24, marginBottom:28, borderBottom:'1px solid rgba(0,0,0,0.1)' }}>
              <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,5vw,48px)', fontWeight:700, color:'#1c1a17', lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:14 }}>{article.title}</h1>
              {article.excerpt && (
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:17, color:'#6b655c', lineHeight:1.65, fontWeight:400 }}>{article.excerpt}</p>
              )}
            </div>

            <div className="article-reader-body" dangerouslySetInnerHTML={{ __html: processedContent }} />

            <div className="article-mobile-newsletter">
              <SidebarNewsletter />
            </div>

            <RelatedArticles currentArticle={article} />
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="article-right-rail" style={{ position:'sticky', top:24 }}>
            <SidebarNewsletter />
            <SidebarPopular />
            <SidebarTopics />
          </aside>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background:'#0d0c0b', padding:'56px 20px' }}>
        <div className="article-footer-cta" style={{ maxWidth:1240, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
          <div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#e9542a', letterSpacing:'0.18em', marginBottom:12 }}>// STAY INFORMED</p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(22px,3vw,36px)', color:'#efeae1', lineHeight:1.15, maxWidth:500 }}>
              Get this kind of intelligence every morning.
            </h2>
          </div>
          {subStatus === 'success' ? (
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#22C55E', letterSpacing:'0.1em' }}>✓ SUBSCRIBED — CHECK YOUR INBOX</p>
          ) : (
            <div className="article-footer-form" style={{ display:'flex', gap:0, border:'1px solid rgba(255,255,255,0.15)' }}>
              <input type="email" placeholder="your@company.io" value={subEmail} onChange={e => setSubEmail(e.target.value)}
                style={{ background:'rgba(255,255,255,0.05)', border:'none', color:'#efeae1', fontFamily:"'Space Mono',monospace", fontSize:11, padding:'14px 18px', outline:'none', width:240, minWidth:0 }} />
              <button onClick={handleFooterSub}
                style={{ background:'#e9542a', color:'#fff', border:'none', padding:'14px 20px', fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:'0.12em', cursor:'pointer', whiteSpace:'nowrap' }}
                onMouseEnter={e => e.target.style.background='#d4481a'} onMouseLeave={e => e.target.style.background='#e9542a'}>
                {subStatus === 'loading' ? '...' : 'SUBSCRIBE FREE →'}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .article-mobile-meta { display: none; }
        .article-mobile-newsletter { display: none; }
        .article-reader-body { font-family: 'Inter', sans-serif; font-size: 18px; color: #2b2620; line-height: 1.78; }
        .article-reader-body p { font-size: 18px !important; color: #2b2620 !important; line-height: 1.78 !important; margin-bottom: 22px !important; }
        .article-reader-body h2 { font-family: 'DM Serif Display', serif !important; font-size: 28px !important; font-weight: 700 !important; color: #1c1a17 !important; line-height: 1.2 !important; margin: 44px 0 16px !important; padding-left: 16px !important; border-left: 4px solid #e9542a !important; letter-spacing: -0.01em !important; }
        .article-reader-body h3 { font-family: 'DM Serif Display', serif !important; font-size: 22px !important; color: #1c1a17 !important; line-height: 1.3 !important; margin: 32px 0 12px !important; }
        .article-reader-body strong, .article-reader-body b { font-weight: 600 !important; color: #1c1a17 !important; }
        .article-reader-body ul { list-style: none !important; padding-left: 0 !important; margin-bottom: 22px !important; }
        .article-reader-body ul li { font-size: 18px !important; color: #2b2620 !important; line-height: 1.75 !important; margin-bottom: 10px !important; padding-left: 20px !important; position: relative !important; }
        .article-reader-body ul li::before { content: '' !important; position: absolute !important; left: 0 !important; top: 10px !important; width: 7px !important; height: 7px !important; background: #e9542a !important; border-radius: 1px !important; }
        .article-reader-body ol { padding-left: 0 !important; margin-bottom: 22px !important; list-style: none !important; counter-reset: ol-counter !important; }
        .article-reader-body ol li { font-size: 18px !important; color: #2b2620 !important; line-height: 1.75 !important; margin-bottom: 10px !important; padding-left: 32px !important; position: relative !important; counter-increment: ol-counter !important; }
        .article-reader-body ol li::before { content: counter(ol-counter) !important; position: absolute !important; left: 0 !important; top: 3px !important; width: 20px !important; height: 20px !important; background: #1c1a17 !important; color: #fff !important; font-family: 'Space Mono', monospace !important; font-size: 9px !important; display: flex !important; align-items: center !important; justify-content: center !important; }
        .article-reader-body blockquote { background: #e7e0d3 !important; border-left: 4px solid #e9542a !important; padding: 20px 28px !important; margin: 32px 0 !important; font-family: 'DM Serif Display', serif !important; font-size: 22px !important; font-style: italic !important; color: #1c1a17 !important; line-height: 1.5 !important; }
        .article-reader-body blockquote p { font-family: 'DM Serif Display', serif !important; font-size: 22px !important; font-style: italic !important; color: #1c1a17 !important; margin-bottom: 8px !important; }
        .article-reader-body a { color: #e9542a !important; text-decoration: underline !important; text-underline-offset: 3px !important; }
        .article-reader-body img { width: 100% !important; height: auto !important; margin: 24px 0 !important; }
        .article-reader-body hr { border: none !important; border-top: 1px solid rgba(0,0,0,0.1) !important; margin: 36px 0 !important; }
        .article-reader-body table { width: 100% !important; border-collapse: collapse !important; margin: 28px 0 !important; font-size: 14px !important; }
        .article-reader-body table th { background: #1c1a17 !important; color: #efeae1 !important; padding: 10px 14px !important; font-family: 'Space Mono', monospace !important; font-size: 9px !important; letter-spacing: 0.1em !important; text-align: left !important; }
        .article-reader-body table td { padding: 10px 14px !important; border-bottom: 1px solid rgba(0,0,0,0.08) !important; font-size: 14px !important; color: #2b2620 !important; }
        @media (max-width: 768px) {
          .article-page-layout { grid-template-columns: 1fr !important; gap: 0 !important; }
          .article-left-rail { display: none !important; }
          .article-right-rail { display: none !important; }
          .article-mobile-meta { display: flex !important; align-items: center; gap: 10px; padding: 12px 0; margin-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.08); flex-wrap: wrap; }
          .article-mobile-newsletter { display: block !important; margin: 40px 0 0; }
          .related-grid { grid-template-columns: 1fr !important; }
          .article-footer-cta { flex-direction: column !important; align-items: flex-start !important; }
          .article-footer-form { width: 100% !important; flex-direction: column !important; }
          .article-footer-form input { width: 100% !important; }
          .article-reader-body { font-size: 16px !important; }
          .article-reader-body p { font-size: 16px !important; line-height: 1.75 !important; }
          .article-reader-body h2 { font-size: 22px !important; padding-left: 12px !important; margin: 32px 0 12px !important; }
          .article-reader-body h3 { font-size: 19px !important; margin: 24px 0 10px !important; }
          .article-reader-body blockquote { font-size: 18px !important; padding: 14px 16px !important; }
          .article-reader-body ul li { font-size: 16px !important; }
          .article-reader-body ol li { font-size: 16px !important; }
          .article-reader-body table { display: block !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
        }
      `}</style>
    </>
  );
}
