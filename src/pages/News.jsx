import { motion } from "framer-motion";
import { usePosts } from "../lib/usePosts";
import { articles as staticArticles } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";

export default function News() {
  const { articles: wpArticles, loading } = usePosts(50);

  // Use WordPress articles if loaded, fall back to static while loading
  const articles = wpArticles.length > 0 ? wpArticles : staticArticles;

  return (
    <div className="fade-in">
      <div style={{ background:"#0F0E0D", padding:"64px 32px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:16 }}>// CRM_NEWS_FEED</span>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:"#F2EDE4", letterSpacing:"-0.02em", lineHeight:1.05 }}>CRM & GTM News</h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginTop:16 }}>Daily intelligence from across the CRM, sales, and go-to-market world.</p>
          </motion.div>
        </div>
      </div>
      <div className="grid-bg" style={{ background:"#F2EDE4", padding:"64px 32px 96px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 320px", gap:40, alignItems:"start" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            {loading && wpArticles.length === 0 ? (
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>Loading articles...</span>
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