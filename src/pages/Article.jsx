import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { articles } from "../data/articles";
import CategoryBadge from "../components/CategoryBadge";
import Sidebar from "../components/Sidebar";

const imgs = { blue:"https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&q=80", purple:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", green:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", amber:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80", red:"https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80" };

export default function Article() {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) return (
    <div style={{ maxWidth:760, margin:"80px auto", padding:"0 32px", textAlign:"center" }}>
      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em" }}>ERROR / 404</span>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, color:"#0F0E0D", margin:"16px 0" }}>Article not found</h1>
      <Link to="/" style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#0F0E0D", fontWeight:700, letterSpacing:"0.1em" }}>← RETURN HOME</Link>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Meta bar */}
      <div style={{ background:"#0F0E0D", padding:"12px 32px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
          <Link to="/" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:"0.1em", textDecoration:"none", transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color="#E8521A"} onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.4)"}>← HOME</Link>
          <span style={{ color:"rgba(255,255,255,0.15)" }}>|</span>
          <CategoryBadge label={article.category} color={article.color} />
          <span style={{ color:"rgba(255,255,255,0.15)" }}>|</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em" }}>CRM DAILY TEAM · {article.date.toUpperCase()}</span>
        </div>
      </div>

      {/* Dark hero */}
      <div style={{ background:"#0F0E0D", padding:"80px 32px 0" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
            <div style={{ marginBottom:16 }}><CategoryBadge label={article.category} color={article.color} /></div>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:60, color:"#F2EDE4", lineHeight:1.05, letterSpacing:"-0.02em", maxWidth:900, marginBottom:20 }}>
              {article.title}
            </h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"rgba(242,237,228,0.5)", maxWidth:640, lineHeight:1.85, marginBottom:48 }}>
              {article.excerpt}
            </p>
          </motion.div>
          <div style={{ height:400, overflow:"hidden", position:"relative" }}>
            <img src={imgs[article.color]||imgs.blue} alt={article.title}
              style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.4) saturate(0.7)", transition:"transform 0.6s ease" }}
              onMouseEnter={e => e.target.style.transform="scale(1.02)"}
              onMouseLeave={e => e.target.style.transform="scale(1)"} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,#0F0E0D 15%,transparent 70%)" }} />
            <div style={{ position:"absolute", top:20, right:20, background:"rgba(0,0,0,0.7)", padding:"6px 14px", border:"1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.6)", letterSpacing:"0.1em" }}>READING: {article.readTime.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid-bg" style={{ background:"#F2EDE4", padding:"64px 32px 96px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 320px", gap:64, alignItems:"start" }}>
          <motion.article initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
            <blockquote style={{ borderLeft:"3px solid #E8521A", paddingLeft:24, marginBottom:40, fontFamily:"'DM Serif Display',serif", fontSize:24, color:"#0F0E0D", lineHeight:1.4, fontStyle:"italic" }}>
              {article.excerpt}
            </blockquote>
            <div className="article-body">
              <p style={{ fontFamily:"'Inter',sans-serif" }}>For revenue teams operating in 2026, staying current with CRM developments is no longer optional. The pace of change across HubSpot, Salesforce, and the broader GTM tool stack has accelerated dramatically — and the teams that adapt fastest consistently outperform those that don't.</p>
              <div style={{ background:"rgba(0,0,0,0.04)", borderLeft:"3px solid #E8521A", padding:"16px 20px", margin:"28px 0" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:8 }}>// CRMDAILY ANALYSIS</span>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#3D3A36", lineHeight:1.8, margin:0 }}>"Early adopters report a 23% improvement in forecast accuracy within 30 days of implementation. The key driver is real-time signal processing across multiple data touchpoints simultaneously."</p>
              </div>
              <h2>01 // Why This Changes Everything</h2>
              <p style={{ fontFamily:"'Inter',sans-serif" }}>The practical impact will be felt immediately across pipeline management, forecasting accuracy, and overall team productivity. CRM managers and RevOps leaders need to understand the implications to stay ahead of the curve and ensure their teams are positioned to take full advantage.</p>
              <h2>02 // Key Takeaways for Your Team</h2>
              <ul>
                <li>Review your current CRM setup and identify where this applies to your workflow</li>
                <li>Brief your sales and RevOps teams on what's changing and why it matters</li>
                <li>Set a 30-day checkpoint to measure impact on pipeline and forecast accuracy</li>
                <li>Document any changes to your process for future reference and onboarding</li>
              </ul>
              <h2>03 // What Comes Next</h2>
              <p style={{ fontFamily:"'Inter',sans-serif" }}>The bottom line is that staying current with CRM developments is a core part of the RevOps function. CRM Daily will continue tracking this story as it evolves.</p>
            </div>
            <div style={{ background:"#0F0E0D", padding:32, marginTop:48, display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, flexWrap:"wrap" }}>
              <div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>// STAY INFORMED</span>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#F2EDE4", marginBottom:8 }}>Get this kind of intelligence every morning.</h3>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.45)", lineHeight:1.7 }}>CRM Daily digest. Free. Every weekday morning.</p>
              </div>
              <Link to="/newsletter" style={{ display:"inline-block", background:"#E8521A", color:"#fff", padding:"12px 24px", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", whiteSpace:"nowrap", textDecoration:"none", transition:"background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background="#D4481A"}
                onMouseLeave={e => e.currentTarget.style.background="#E8521A"}>
                SUBSCRIBE FREE →
              </Link>
            </div>
          </motion.article>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}