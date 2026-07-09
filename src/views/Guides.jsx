'use client';
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { usePosts } from "../lib/usePosts";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import SEOMeta from "../components/SEOMeta";

const GUIDE_CATEGORIES = ['how-to guide', 'gtm strategy', 'revops', 'how-to-guide'];

export default function Guides({ prefetchedArticles = null }) {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const { articles: fetched, loading: fetchLoading } = usePosts(prefetchedArticles ? 0 : 100);
  const all = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;
  const isLoading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;
  const articles = categoryFilter
    ? all.filter(a => a.category.toLowerCase() === categoryFilter.toLowerCase() || a.title.toLowerCase().includes(categoryFilter.toLowerCase()))
    : all.filter(a => GUIDE_CATEGORIES.includes(a.category.toLowerCase()));
  const pageTitle = categoryFilter ? categoryFilter : 'CRM & GTM Guides';
  const pageDesc = categoryFilter ? `In-depth ${categoryFilter} guides from CRM Daily practitioners.` : 'In-depth CRM and GTM guides, RevOps playbooks, and how-to tutorials written by practitioners.';

  return (
    <>
      <style>{`
        .guides-layout { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
        .guides-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) {
          .guides-hero { padding: 40px 20px !important; }
          .guides-hero h1 { font-size: 36px !important; }
          .guides-body { padding: 40px 20px 64px !important; }
          .guides-layout { grid-template-columns: 1fr !important; }
          .guides-grid { grid-template-columns: 1fr !important; }
          .guides-sidebar { display: none !important; }
        }
      `}</style>
      <div className="fade-in">
        <SEOMeta title={pageTitle} description={pageDesc} url="https://www.crmdaily.co/guides" type="website" />
        <div className="guides-hero" style={{ background:"#0F172A", padding:"64px 32px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.15em", display:"block", marginBottom:16 }}>// TECHNICAL_GUIDES</span>
              <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:"#FAFBFC", letterSpacing:"-0.02em", lineHeight:1.05 }}>{pageTitle}</h1>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginTop:16 }}>{pageDesc}</p>
            </motion.div>
          </div>
        </div>
        <div className="grid-bg guides-body" style={{ background:"#FAFBFC", padding:"64px 32px 96px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div className="guides-layout">
              <div className="guides-grid">
                {isLoading ? <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8" }}>Loading guides...</span>
                  : articles.length === 0 ? <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8" }}>No guides yet - check back soon.</span>
                  : articles.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)}
              </div>
              <div className="guides-sidebar"><Sidebar /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}