import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { articles } from "../data/articles";
import { subscribeEmail } from "../utils/beehiiv";

const topics = [
  { label: "CRM News", to: "/news", color: "cat-news" },
  { label: "HubSpot", to: "/news", color: "cat-news" },
  { label: "Salesforce", to: "/news", color: "cat-news" },
  { label: "RevOps", to: "/guides", color: "cat-revops" },
  { label: "GTM Strategy", to: "/guides", color: "cat-gtm" },
  { label: "Tool Reviews", to: "/tools", color: "cat-tools" },
  { label: "How-To Guides", to: "/guides", color: "cat-guide" },
  { label: "AI & Automation", to: "/news", color: "cat-revops" },
  { label: "Pipedrive", to: "/tools", color: "cat-tools" },
  { label: "Zoho", to: "/tools", color: "cat-tools" },
];

export default function Sidebar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const r = await subscribeEmail(email);
    if (r.success) { setStatus("success"); setEmail(""); }
    else setStatus("error");
  }

  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* Newsletter */}
      <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.2}}
        style={{ background: "#0F0E0D", padding: 28, marginBottom: 2 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:14 }}>// DAILY NEWSLETTER</span>
        <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#F2EDE4", marginBottom:10, lineHeight:1.3 }}>CRM Daily Digest</h3>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.5)", lineHeight:1.75, marginBottom:20 }}>Top CRM & GTM stories every morning. No noise, just signal.</p>
        {status === "success" ? (
          <div style={{ fontFamily:"'Space Mono',monospace", color:"#22C55E", fontSize:11, letterSpacing:"0.1em", padding:"12px", border:"1px solid rgba(34,197,94,0.3)", textAlign:"center" }}>
            SUBSCRIBED ✓
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <input type="email" placeholder="your@company.io" required value={email} onChange={e => setEmail(e.target.value)}
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#F2EDE4", fontFamily:"'Inter',sans-serif", fontSize:13, padding:"11px 14px", outline:"none", width:"100%", transition:"border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor="#E8521A"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
            <button type="submit" disabled={status==="loading"}
              style={{ background:"#E8521A", color:"#fff", border:"none", padding:"11px", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer", transition:"background 0.2s" }}
              onMouseEnter={e => e.target.style.background="#D4481A"}
              onMouseLeave={e => e.target.style.background="#E8521A"}>
              {status === "loading" ? "SUBSCRIBING..." : "GET DAILY DIGEST →"}
            </button>
          </form>
        )}
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.2)", marginTop:10, letterSpacing:"0.08em" }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
      </motion.div>

      {/* Popular */}
      <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.3}}
        style={{ background: "#F2EDE4", border:"1px solid rgba(0,0,0,0.08)", borderTop:"none", padding:28, marginBottom:2 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:18 }}>// POPULAR TODAY</span>
        {articles.slice(0, 5).map((a, i) => (
          <div key={a.id} onClick={() => navigate(`/article/${a.id}`)}
            style={{ display:"flex", gap:16, padding:"13px 0", borderBottom:i<4?"1px solid rgba(0,0,0,0.06)":"none", cursor:"pointer", transition:"opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity="0.6"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:"rgba(0,0,0,0.1)", flexShrink:0, lineHeight:1, marginTop:2 }}>
              {String(i+1).padStart(2,"0")}
            </span>
            <div>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#E8521A", display:"block", marginBottom:4, letterSpacing:"0.1em" }}>// {a.category.toUpperCase()}</span>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:500, color:"#0F0E0D", lineHeight:1.4 }}>{a.title}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Browse Topics — fully connected */}
      <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.4}}
        style={{ background:"#F2EDE4", border:"1px solid rgba(0,0,0,0.08)", borderTop:"none", padding:28, marginBottom:2 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:16 }}>// BROWSE TOPICS</span>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {topics.map(t => (
            <Link key={t.label} to={t.to}
              style={{ fontFamily:"'Space Mono',monospace", fontSize:9, padding:"5px 10px", border:"1px solid rgba(0,0,0,0.12)", color:"#6B6560", letterSpacing:"0.08em", transition:"all 0.2s", textDecoration:"none", display:"inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#E8521A"; e.currentTarget.style.color="#E8521A"; e.currentTarget.style.background="rgba(232,82,26,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(0,0,0,0.12)"; e.currentTarget.style.color="#6B6560"; e.currentTarget.style.background="transparent"; }}>
              + {t.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Daily stats widget */}
      <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.5}}
        style={{ background:"#0F0E0D", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em" }}>// CRM PULSE TODAY</span>
          <span style={{ width:6, height:6, background:"#22C55E", borderRadius:"50%", boxShadow:"0 0 6px #22C55E" }} className="blink" />
        </div>
        {[
          { label:"ARTICLES TODAY", value:"12", sub:"↑ 3 from yesterday" },
          { label:"TOPICS COVERED", value:"8", sub:"CRM, GTM, AI, RevOps" },
          { label:"TOOLS REVIEWED", value:"3", sub:"HubSpot, Salesforce, Zoho" },
        ].map(s => (
          <div key={s.label} style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.35)", letterSpacing:"0.08em" }}>{s.label}</span>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#E8521A", lineHeight:1 }}>{s.value}</span>
            </div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", letterSpacing:"0.06em" }}>{s.sub}</span>
          </div>
        ))}
      </motion.div>

    </aside>
  );
}