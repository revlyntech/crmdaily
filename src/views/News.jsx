import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { usePosts } from "../lib/usePosts";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import SEOMeta from "../components/SEOMeta";

const ARTICLES_PER_PAGE = 12;

export default function News() {
  const searchParams = useSearchParams();
  const params = searchParams;
  const categoryFilter = searchParams.get('category') || '';
  const { articles: all, loading } = usePosts(100);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = all.filter(a => {
    const matchCat = !categoryFilter || a.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  // Reset to page 1 when search changes
  function handleSearch(val) {
    setSearch(val);
    setPage(1);
  }

  const pageTitle = categoryFilter ? `${categoryFilter} News` : 'CRM & GTM News';
  const pageDesc = categoryFilter
    ? `All ${categoryFilter} articles, news and updates from CRM Daily.`
    : 'Daily CRM and GTM news GÇö HubSpot, Salesforce, Pipedrive updates, RevOps intelligence and more.';

  return (
    <>
      <style>{`
        .news-page-layout { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
        .news-articles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 48px; flex-wrap: wrap; }
        .page-btn { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.1em; padding: 8px 14px; border: 1px solid rgba(0,0,0,0.15); background: transparent; color: #6B6560; cursor: pointer; transition: all 0.2s; }
        .page-btn:hover { background: #E8521A; color: #fff; border-color: #E8521A; }
        .page-btn.active { background: #0F0E0D; color: #F2EDE4; border-color: #0F0E0D; }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .page-btn:disabled:hover { background: transparent; color: #6B6560; border-color: rgba(0,0,0,0.15); }
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
                <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.3)", pointerEvents:"none" }}>=ƒöì</span>
                <input type="text" placeholder="Search articles GÇö HubSpot, RevOps, GTM..." value={search} onChange={e => handleSearch(e.target.value)}
                  style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#F2EDE4", fontFamily:"'Space Mono',monospace", fontSize:11, padding:"14px 20px 14px 44px", outline:"none", boxSizing:"border-box", letterSpacing:"0.04em", transition:"border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor="#E8521A"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                {search && <button onClick={() => handleSearch("")} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"rgba(242,237,228,0.4)", cursor:"pointer", fontSize:16, lineHeight:1 }}>G£ò</button>}
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
                      <button key={cat} onClick={() => handleSearch(cat)}
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
                  ) : paginated.length === 0 ? (
                    <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"48px 0" }}>
                      <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:"#0F0E0D", marginBottom:8 }}>No articles found</p>
                      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>Try a different search or <button onClick={() => handleSearch("")} style={{ color:"#E8521A", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"inherit" }}>clear search</button></p>
                    </div>
                  ) : paginated.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)}
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                  <div className="pagination">
                    <button className="page-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>GåÉ PREV</button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .reduce((acc, p, idx, arr) => {
                        if (idx > 0 && p - arr[idx-1] > 1) acc.push('...');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === '...'
                          ? <span key={`ellipsis-${idx}`} style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#9B958F", padding:"0 4px" }}>...</span>
                          : <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{p}</button>
                      )
                    }

                    <button className="page-btn" onClick={() => { setPage(p => Math.min(totalPages, p+1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={page === totalPages}>NEXT GåÆ</button>

                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#9B958F", letterSpacing:"0.08em", marginLeft:8 }}>
                      PAGE {page} OF {totalPages} -+ {filtered.length} ARTICLES
                    </span>
                  </div>
                )}
              </div>
              <div className="news-sidebar-col"><Sidebar /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
