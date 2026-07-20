'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePosts } from "../lib/usePosts";
import { subscribeEmail } from "../utils/beehiiv";

const topics = [
  { label: "CRM News",        to: "/news" },
  { label: "HubSpot",         to: "/news?category=HubSpot" },
  { label: "Salesforce",      to: "/news?category=Salesforce" },
  { label: "RevOps",          to: "/guides?category=RevOps" },
  { label: "GTM Strategy",    to: "/guides?category=GTM+Strategy" },
  { label: "Tool Reviews",    to: "/tools" },
  { label: "How-To Guides",   to: "/guides?category=How-To+Guide" },
  { label: "AI & Automation", to: "/news?category=AI" },
  { label: "Pipedrive",       to: "/tools?category=Pipedrive" },
  { label: "Zoho",            to: "/tools?category=Zoho" },
];

export default function Sidebar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const router = useRouter();
  const { articles, loading } = usePosts(100);

  const totalArticles = articles ? articles.length : 0;
  const uniqueCategories = articles ? [...new Set(articles.map(a => a.category))] : [];
  const topicsCount = uniqueCategories.length;
  const toolsCount = articles ? articles.filter(a => ["Tool Reviews","Tool Review","Tools","RevOps Intelligence","Sales Tech","AI in Sales","GTM Strategy"].includes(a.category)).length : 0;
  const topCategoryNames = uniqueCategories.slice(0, 4).join(", ");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const r = await subscribeEmail(email);
      if (r.success) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  return (
    <>
      <style>{`
        .sidebar-wrapper { display: flex; flex-direction: column; gap: 0; }
        @media (max-width: 640px) {
          .sidebar-wrapper { margin-top: 32px; }
          .sidebar-popular { display: none !important; }
          .sidebar-stats { display: block; }
        }
      `}</style>
      <aside className="sidebar-wrapper">

        {/* Newsletter */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.2}}
          style={{ background:"#0F172A", padding:28, marginBottom:2 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:14 }}>// DAILY NEWSLETTER</span>
          <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#FAFBFC", marginBottom:10, lineHeight:1.3 }}>CRM Daily Digest</h3>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.5)", lineHeight:1.75, marginBottom:20 }}>Top CRM & GTM stories every morning. No noise, just signal.</p>
          {status === "success" ? (
            <div style={{ fontFamily:"'Space Mono',monospace", color:"#22C55E", fontSize:11, letterSpacing:"0.1em", padding:"12px", border:"1px solid rgba(34,197,94,0.3)", textAlign:"center" }}>
              ✓ SUBSCRIBED — CHECK YOUR INBOX
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <input type="email" placeholder="your@company.io" value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key==="Enter" && handleSubmit(e)}
                style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#FAFBFC", fontFamily:"'Inter',sans-serif", fontSize:13, padding:"11px 14px", outline:"none", width:"100%", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor="#E85D3A"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
              <button onClick={handleSubmit} disabled={status==="loading"}
                style={{ background:"#E85D3A", color:"#fff", border:"none", padding:"11px", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer" }}
                onMouseEnter={e => e.target.style.background="#C94E2E"}
                onMouseLeave={e => e.target.style.background="#E85D3A"}>
                {status==="loading" ? "SUBSCRIBING..." : status==="error" ? "TRY AGAIN →" : "GET DAILY DIGEST →"}
              </button>
            </div>
          )}
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.2)", marginTop:10, letterSpacing:"0.08em" }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
        </motion.div>

        {/* Popular Today */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.3}}
          className="sidebar-popular"
          style={{ background:"#FAFBFC", border:"1px solid rgba(0,0,0,0.08)", borderTop:"none", padding:28, marginBottom:2 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:18 }}>// POPULAR TODAY</span>
          {loading ? (
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#94A3B8" }}></span>
          ) : articles.slice(0,5).map((a,i) => (
            <div key={a.id} onClick={() => router.push(`/article/${a.slug}`)}
              style={{ display:"flex", gap:16, padding:"13px 0", borderBottom:i<4?"1px solid rgba(0,0,0,0.06)":"none", cursor:"pointer", transition:"opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:"rgba(0,0,0,0.1)", flexShrink:0, lineHeight:1, marginTop:2 }}>{String(i+1).padStart(2,"0")}</span>
              <div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#E85D3A", display:"block", marginBottom:4, letterSpacing:"0.1em" }}>// {a.category.toUpperCase()}</span>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:500, color:"#0F172A", lineHeight:1.4 }}>{a.title}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Browse Topics */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.4}}
          style={{ background:"#FAFBFC", border:"1px solid rgba(0,0,0,0.08)", borderTop:"none", padding:28, marginBottom:2 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:16 }}>// BROWSE TOPICS</span>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {topics.map(t => (
              <Link key={t.label} href={t.to}
                style={{ fontFamily:"'Space Mono',monospace", fontSize:9, padding:"5px 10px", border:"1px solid rgba(0,0,0,0.12)", color:"#64748B", letterSpacing:"0.08em", transition:"all 0.2s", textDecoration:"none", display:"inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#E85D3A"; e.currentTarget.style.color="#E85D3A"; e.currentTarget.style.background="rgba(232,82,26,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(0,0,0,0.12)"; e.currentTarget.style.color="#64748B"; e.currentTarget.style.background="transparent"; }}>
                + {t.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Live stats */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.5}}
          className="sidebar-stats"
          style={{ background:"#0F172A", padding:28 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em" }}>// CRM PULSE TODAY</span>
            <span style={{ width:6, height:6, background:"#22C55E", borderRadius:"50%", boxShadow:"0 0 6px #22C55E" }} className="blink" />
          </div>
          {[
            { label:"ARTICLES PUBLISHED", value:String(totalArticles || articles.length || 0), sub:"Live from CRM Daily" },
            { label:"TOPICS COVERED",     value:String(topicsCount || 6),   sub:topCategoryNames||"CRM, GTM, AI, RevOps" },
            { label:"TOOLS REVIEWED",     value:String(toolsCount || 0),    sub:"Tool reviews & comparisons" },
          ].map(s => (
            <div key={s.label} style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.35)", letterSpacing:"0.08em" }}>{s.label}</span>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#E85D3A", lineHeight:1 }}>{s.value}</span>
              </div>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", letterSpacing:"0.06em" }}>{s.sub}</span>
            </div>
          ))}
        </motion.div>

      </aside>
    </>
  );
}