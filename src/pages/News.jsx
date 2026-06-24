import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { usePosts } from "../lib/usePosts";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import SEOMeta from "../components/SEOMeta";

export default function News() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category') || '';
  const { articles: all, loading } = usePosts(100);
  const [search, setSearch] = useState("");

  const filtered = all.filter(a => {
    const matchCat = !categoryFilter || a.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const pageTitle = categoryFilter ? `${categoryFilter} News` : 'CRM & GTM News';
  const pageDesc = categoryFilter
    ? `All ${categoryFilter} articles, news and updates from CRM Daily.`
    : 'Daily CRM and GTM news — HubSpot, Salesforce, Pipedrive updates, RevOps intelligence and more.';

  return (
    <>
      <style>{`
        .news-page-layout { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
        .news-articles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) {
          .news-page-layout { grid-template-columns: 1fr !important; }
          .news-articles-grid { grid-template-columns: 1fr !important; }
          .news-sidebar-col { display: none !important; }
          .news-hero { padding: 40px 20px 32px !important; }
          .news-hero h1 { font-size: 36px !important; }
          .news-body { padding: 40px 20px 64px !important; }
          .news-search { max-width: 100% !important; }
        }
      `}</style>
      <div className="fade-in">
        <SEOMeta title={pageTitle} description={pageDesc} url={`https://www.crmdaily.co/news${categoryFilter ? `?category=${categoryFilter}` : ''}`} type="website" />

        <div className="news-hero" style={{ background:"#0F0E0D", padding:"64px 32px 48px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:16 }}>
                // CRM_NEWS_FEED{categoryFilter ? ` / ${categoryFilter.toUpperCase()}` : ''}
              </span>
              <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:"#F2EDE4", letterSpacing:"-0.02em", lineHeight:1.05, marginBottom:16 }}>{pageTitle}</h1>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginBottom:32 }}>{pageDesc}</p>
              <div className="news-search" style={{ position:"relative", maxWidth:520 }}>
                <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.3)", pointerEvents:"none" }}>🔍</span>
                <input type="text" placeholder="Search articles — HubSpot, RevOps, GTM..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#F2EDE4", fontFamily:"'Space Mono',monospace", fontSize:11, padding:"14px 20px 14px 44px", outline:"none", boxSizing:"border-box", letterSpacing:"0.04em", transition:"border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor="#E8521A"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"rgba(242,237,228,0.4)", cursor:"pointer", fontSize:16, lineHeight:1 }}>✕</button>}
              </div>
              {search && <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(242,237,228,0.4)", marginTop:12, letterSpacing:"0.08em" }}>{filtered.length} result{filtered.length!==1?"s":""} for "{search}"</p>}
            </motion.div>
          </div>
        </div>

        <div className="grid-bg news-body" style={{ background:"#F2EDE4", padding:"64px 32px 96px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div className="news-page-layout">
              <div>
                {!categoryFilter && !search && (
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
                    {["CRM News","GTM Strategy","RevOps Intelligence","Sales Tech","AI in Sales","Tool Reviews"].map(cat => (
                      <button key={cat} onClick={() => setSearch(cat)}
                        style={{ background:"transparent", border:"1px solid rgba(0,0,0,0.12)", fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.1em", color:"#6B6560", padding:"6px 12px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background="#E8521A"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#E8521A"; }}
                        onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#6B6560"; e.currentTarget.style.borderColor="rgba(0,0,0,0.12)"; }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
                <div className="news-articles-grid">
                  {loading ? (
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>Loading articles...</span>
                  ) : filtered.length === 0 ? (
                    <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"48px 0" }}>
                      <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:"#0F0E0D", marginBottom:8 }}>No articles found</p>
                      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>Try a different search or <button onClick={() => setSearch("")} style={{ color:"#E8521A", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"inherit" }}>clear search</button></p>
                    </div>
                  ) : filtered.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)}
                </div>
              </div>
              <div className="news-sidebar-col"><Sidebar /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}