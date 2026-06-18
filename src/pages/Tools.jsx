import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { usePosts } from "../lib/usePosts";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import SEOMeta from "../components/SEOMeta";

const TOOL_CATEGORIES = ['tool review', 'tools'];

export default function Tools() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category') || '';
  const { articles: all, loading } = usePosts(100);
  const articles = categoryFilter
    ? all.filter(a => a.category.toLowerCase() === categoryFilter.toLowerCase()
        || a.title.toLowerCase().includes(categoryFilter.toLowerCase()))
    : all.filter(a => TOOL_CATEGORIES.includes(a.category.toLowerCase()));

  const pageTitle = categoryFilter ? `${categoryFilter} Reviews` : 'CRM Tools & Reviews';
  const pageDesc = categoryFilter
    ? `Honest ${categoryFilter} reviews and comparisons from CRM Daily.`
    : 'Honest, unbiased CRM tool reviews and comparisons. HubSpot, Salesforce, Pipedrive and more.';

  return (
    <div className="fade-in">
      <SEOMeta
        title={pageTitle}
        description={pageDesc}
        url={`https://www.crmdaily.co/tools${categoryFilter ? `?category=${categoryFilter}` : ''}`}
        type="website"
      />
      <div style={{ background:"#0F0E0D", padding:"64px 32px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:16 }}>// TECH_STACK_REVIEWS{categoryFilter ? ` / ${categoryFilter.toUpperCase()}` : ''}</span>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:"#F2EDE4", letterSpacing:"-0.02em", lineHeight:1.05 }}>{pageTitle}</h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginTop:16 }}>{pageDesc}</p>
          </motion.div>
        </div>
      </div>
      <div className="grid-bg" style={{ background:"#F2EDE4", padding:"64px 32px 96px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 320px", gap:40, alignItems:"start" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            {loading ? (
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>Loading tools...</span>
            ) : articles.length === 0 ? (
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>No tool reviews yet — check back soon.</span>
            ) : (
              articles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)
            )}
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}