'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePosts } from "../lib/usePosts";
import { articles as staticArticles } from "../data/articles";
import CategoryBadge from "../components/CategoryBadge";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";

const fallbackImages = {
  blue:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  purple: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  green:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  amber:  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  red:    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80",
};

export default function Home() {
  const router = useRouter();
  const { articles: wpArticles, loading } = usePosts(20);
  const articles = wpArticles.length > 0 ? wpArticles : staticArticles;
  const featured = articles.find(a => a.featured) || articles[0];
  const topStories = articles.filter(a => a.id !== featured?.id).slice(0, 4);
  const gridArticles = articles.filter(a => a.id !== featured?.id);

  if (!featured) return null;
  const heroImage = featured.featuredImage || fallbackImages[featured.color] || fallbackImages.blue;

  return (
    <>
      <style>{`
        .home-hero-grid { display: grid; grid-template-columns: 1fr 340px; min-height: 520px; }
        .home-hero-main { padding: 64px 64px 64px 0; border-right: 1px solid rgba(0,0,0,0.08); display: flex; flex-direction: column; justify-content: flex-end; }
        .home-hero-title { font-family: 'DM Serif Display',serif; font-size: 48px; font-weight: 400; line-height: 1.08; color: #0F172A; margin-bottom: 16px; cursor: pointer; letter-spacing: -0.02em; transition: color 0.25s; }
        .home-hero-sidebar { padding-left: 40px; padding-top: 64px; }
        .home-hero-img { height: 280px; overflow: hidden; position: relative; margin-bottom: 24px; border-radius: 2px; }
        .home-why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .home-why-title { font-family: 'DM Serif Display',serif; font-size: 48px; color: #FAFBFC; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 20px; }
        .home-articles-layout { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
        .home-articles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .home-convictions-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .home-conviction-item { padding: 40px 40px 40px 0; transition: background 0.2s; }

        @media (max-width: 768px) {
          .home-hero-grid { grid-template-columns: 1fr !important; min-height: unset !important; }
          .home-hero-main { padding: 28px 0 !important; border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.08) !important; }
          .home-hero-title { font-size: 30px !important; }
          .home-hero-img { height: 180px !important; }
          .home-hero-sidebar { display: none !important; }
          .home-why-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .home-why-title { font-size: 28px !important; }
          .home-articles-layout { grid-template-columns: 1fr !important; }
          .home-articles-grid { grid-template-columns: 1fr !important; }
          .home-sidebar-desktop { display: none !important; }
          .home-convictions-grid { grid-template-columns: 1fr !important; }
          .home-conviction-item { padding: 28px 0 !important; border-right: none !important; padding-left: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
          .home-section-pad { padding: 48px 20px !important; }
          .home-hero-actions { flex-wrap: wrap; gap: 12px !important; }
          .home-latest-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>

      <div className="fade-in">

        {/* HERO */}
        <section className="grid-bg home-section-pad" style={{ background:"#FAFBFC", borderBottom:"1px solid rgba(0,0,0,0.1)", padding:"0 32px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div className="home-hero-grid">

              <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
                className="home-hero-main">
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8", letterSpacing:"0.12em", marginBottom:16, display:"block" }}>LEAD STORY / {featured.date.toUpperCase()}</span>
                <div style={{ marginBottom:16 }}><CategoryBadge label={featured.category} color={featured.color} /></div>

                <div className="home-hero-img">
                  <img src={heroImage} alt={featured.title}
                    style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.75)", transition:"transform 0.6s ease" }}
                    onMouseEnter={e => e.target.style.transform="scale(1.02)"}
                    onMouseLeave={e => e.target.style.transform="scale(1)"} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(242,237,228,0.4) 0%, transparent 60%)" }} />
                </div>

                <h1 className="home-hero-title" onClick={() => router.push(`/article/${featured.slug}`)}
                  onMouseEnter={e => e.currentTarget.style.color="#E85D3A"}
                  onMouseLeave={e => e.currentTarget.style.color="#0F172A"}>
                  {featured.title}
                </h1>

                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"#64748B", lineHeight:1.8, marginBottom:28, maxWidth:580 }}>
                  {featured.excerpt}
                </p>

                <div className="home-hero-actions" style={{ display:"flex", alignItems:"center", gap:20 }}>
                  <button onClick={() => router.push(`/article/${featured.slug}`)}
                    style={{ background:"#0F172A", color:"#fff", border:"none", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer", transition:"background 0.2s" }}
                    onMouseEnter={e => e.target.style.background="#E85D3A"}
                    onMouseLeave={e => e.target.style.background="#0F172A"}>
                    READ FULL STORY →
                  </button>
                  <Link href="/news" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#94A3B8", letterSpacing:"0.1em", textDecoration:"none" }}>SEE ALL NEWS ·</Link>
                  <Link href="/newsletter" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#94A3B8", letterSpacing:"0.1em", textDecoration:"none" }}>SUBSCRIBE FREE</Link>
                </div>
              </motion.div>

              <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.7,delay:0.15}}
                className="home-hero-sidebar">
                <div style={{ marginBottom:28, paddingBottom:20, borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:12 }}>// WHAT WE COVER</span>
                  {["CRM & REVOPS DAILY NEWS","TOOL REVIEWS & COMPARISONS","GTM STRATEGY GUIDES"].map((item,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <span style={{ width:8, height:8, background:"#22C55E", flexShrink:0 }} />
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#64748B", letterSpacing:"0.06em" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:14 }}>// TOP STORIES</span>
                {loading ? (
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#94A3B8" }}>Loading stories...</span>
                ) : topStories.map((a,i) => (
                  <motion.div key={a.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.07}}
                    onClick={() => router.push(`/article/${a.slug}`)}
                    style={{ padding:"13px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", cursor:"pointer", transition:"opacity 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity="0.6"}
                    onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                    <div style={{ marginBottom:6 }}><CategoryBadge label={a.category} color={a.color} /></div>
                    <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:15, color:"#0F172A", lineHeight:1.35, marginBottom:6 }}>{a.title}</h3>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#94A3B8", letterSpacing:"0.06em" }}>{a.date.toUpperCase()} · {a.readTime.toUpperCase()}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY CRM DAILY */}
        <section className="home-section-pad" style={{ background:"#0F172A", padding:"80px 32px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div className="home-why-grid">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.2em", display:"block", marginBottom:20 }}>// WHY CRM DAILY</span>
                <h2 className="home-why-title">
                  The CRM world moves fast.<br />We keep you <span style={{ color:"#E85D3A" }}>ahead of it.</span>
                </h2>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.5)", lineHeight:1.85, marginBottom:32 }}>
                  Every day, CRM platforms ship updates, GTM strategies shift, and new tools emerge. CRM Daily filters the noise and delivers only what matters for your revenue team.
                </p>
                <Link href="/newsletter" style={{ display:"inline-block", background:"#E85D3A", color:"#fff", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", transition:"background 0.2s", textDecoration:"none" }}
                  onMouseEnter={e => e.currentTarget.style.background="#C94E2E"}
                  onMouseLeave={e => e.currentTarget.style.background="#E85D3A"}>
                  GET DAILY DIGEST →
                </Link>
              </motion.div>
              <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.2}}>
                {[
                  { num:"01", title:"DAILY CRM & GTM NEWS", desc:"Fresh intelligence from HubSpot, Salesforce, Pipedrive, and the entire CRM ecosystem — every morning." },
                  { num:"02", title:"EXPERT TOOL REVIEWS", desc:"Honest, unbiased reviews of every major CRM tool. No vendor sponsorships. No commission incentives." },
                  { num:"03", title:"GTM & REVOPS GUIDES", desc:"Actionable playbooks for scaling your go-to-market motion. Written by practitioners, not marketers." },
                ].map((item,i) => (
                  <div key={item.num} style={{ display:"flex", gap:24, padding:"22px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#E85D3A", flexShrink:0, lineHeight:1, marginTop:4 }}>{item.num}</span>
                    <div>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#FAFBFC", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>{item.title}</span>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.4)", lineHeight:1.75 }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* LATEST ARTICLES */}
        <section className="grid-bg home-section-pad" style={{ background:"#FAFBFC", padding:"80px 32px 96px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div className="home-latest-header" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, paddingBottom:24, borderBottom:"1px solid rgba(0,0,0,0.1)" }}>
              <div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.2em", display:"block", marginBottom:8 }}>// LATEST ARTICLES</span>
                <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:42, color:"#0F172A", letterSpacing:"-0.02em" }}>Today's Intelligence</h2>
              </div>
              <Link href="/news" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#94A3B8", letterSpacing:"0.1em", textDecoration:"none" }}>VIEW ALL ARTICLES →</Link>
            </div>
            <div className="home-articles-layout">
              <div className="home-articles-grid">
                {loading && wpArticles.length===0 ? (
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8" }}>Loading articles...</span>
                ) : (
                  gridArticles.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)
                )}
              </div>
              <div className="home-sidebar-desktop">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>

        {/* CONVICTIONS */}
        <section className="home-section-pad" style={{ background:"#0F172A", padding:"80px 32px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.2em", display:"block", marginBottom:16 }}>// THREE THINGS WE KNOW FOR CERTAIN</span>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,4vw,48px)", color:"#FAFBFC", letterSpacing:"-0.02em", marginBottom:8, maxWidth:700, lineHeight:1.1 }}>
                Three positions most CRM publications won't take.
              </h2>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.4)", maxWidth:560, marginBottom:56, lineHeight:1.85 }}>
                Covering revenue systems produces sharp convictions. Below are three we hold openly.
              </p>
            </motion.div>
            <div className="home-convictions-grid">
              {[
                { n:"CONVICTION 01", title:"A CRM is operating debt, not operating leverage, until someone operates it daily.", sub:"WHY WE REPORT THIS", body:"Most CRMs are implemented well and abandoned six weeks after go-live. Without continuous operation the CRM decays." },
                { n:"CONVICTION 02", title:"Most outbound failure is a CRM data problem, not an email tool problem.", sub:"WHY WE REPORT THIS", body:"Companies experiencing declining outbound results typically blame their sales email tool. The problem lives in the CRM — dirty data, broken suppression sync." },
                { n:"CONVICTION 03", title:"AI agents in CRM only work on a foundation most companies haven't built yet.", sub:"WHY WE REPORT THIS", body:"Every AI CRM deployment we cover has required foundation work first. The data architecture that makes the agent reliable is the larger half." },
              ].map((c,i) => (
                <motion.div key={c.n} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  className="home-conviction-item"
                  style={{ borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none", paddingLeft:i>0?40:0 }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(232,82,26,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.12em", display:"block", marginBottom:16 }}>{c.n}</span>
                  <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#FAFBFC", lineHeight:1.3, marginBottom:24 }}>{c.title}</h3>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.12em", display:"block", marginBottom:12 }}>{c.sub}</span>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.4)", lineHeight:1.8 }}>{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}