import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { usePosts } from "../lib/usePosts";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import SEOMeta from "../components/SEOMeta";

const TOOL_CATEGORIES = ['tool review', 'tools'];

export default function Tools() {
  const searchParams = useSearchParams();
  const params = searchParams;
  const categoryFilter = searchParams.get('category') || '';
  const { articles: all, loading } = usePosts(100);
  const articles = categoryFilter
    ? all.filter(a => a.category.toLowerCase() === categoryFilter.toLowerCase() || a.title.toLowerCase().includes(categoryFilter.toLowerCase()))
    : all.filter(a => TOOL_CATEGORIES.includes(a.category.toLowerCase()));

  const pageTitle = categoryFilter ? `${categoryFilter} Reviews` : 'CRM Tools & Reviews';
  const pageDesc = categoryFilter ? `Honest ${categoryFilter} reviews and comparisons from CRM Daily.` : 'Honest, unbiased CRM tool reviews and comparisons. HubSpot, Salesforce, Pipedrive and more.';

  return (
    <>
      <style>{`
        .tools-layout { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
        .tools-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) {
          .tools-hero { padding: 40px 20px !important; }
          .tools-hero h1 { font-size: 36px !important; }
          .tools-body { padding: 40px 20px 64px !important; }
          .tools-layout { grid-template-columns: 1fr !important; }
          .tools-grid { grid-template-columns: 1fr !important; }
          .tools-sidebar { display: none !important; }
        }
      `}</style>
      <div className="fade-in">
        <SEOMeta title={pageTitle} description={pageDesc} url={`https://www.crmdaily.co/tools${categoryFilter ? `?category=${categoryFilter}` : ''}`} type="website" />
        <div className="tools-hero" style={{ background:"#0F172A", padding:"64px 32px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.15em", display:"block", marginBottom:16 }}>// TECH_STACK_REVIEWS{categoryFilter ? ` / ${categoryFilter.toUpperCase()}` : ''}</span>
              <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:"#FAFBFC", letterSpacing:"-0.02em", lineHeight:1.05 }}>{pageTitle}</h1>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginTop:16 }}>{pageDesc}</p>
            </motion.div>
          </div>
        </div>
        <div className="grid-bg tools-body" style={{ background:"#FAFBFC", padding:"64px 32px 96px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div className="tools-layout">
              <div className="tools-grid">
                {loading ? <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8" }}>Loading tools...</span>
                  : articles.length === 0 ? <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8" }}>No tool reviews yet — check back soon.</span>
                  : articles.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)}
              </div>
              <div className="tools-sidebar"><Sidebar /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}