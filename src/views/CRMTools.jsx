'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOMeta from "../components/SEOMeta";
import ToolsHub from "../components/tools/ToolsHub";

const categories = ["All", "CRM", "Sales Engagement", "Data & Enrichment", "Revenue Intelligence", "Automation"];

const CATEGORY_COLORS = {
  "CRM": "#E85D3A",
  "Sales Engagement": "#3B82F6",
  "Data & Enrichment": "#8B5CF6",
  "Revenue Intelligence": "#10B981",
  "Automation": "#F59E0B",
};

const tools = [
  { name: "HubSpot", logo: "/logos/hubspot_logo.png", category: "CRM", description: "The all-in-one CRM for marketing, sales, and service teams. Best for growing B2B companies under 500 reps.", url: "https://hubspot.com" },
  { name: "Salesforce", logo: "/logos/salesforce_logo.png", category: "CRM", description: "The world's #1 enterprise CRM. Unmatched customisation, AI, and the largest ecosystem of integrations.", url: "https://salesforce.com" },
  { name: "Pipedrive", logo: "/logos/pipedrive_logo.png", category: "CRM", description: "The sales-first CRM built for reps who live in their pipeline. Fastest setup, cleanest interface.", url: "https://pipedrive.com" },
  { name: "Monday CRM", logo: "/logos/monday_logo.png", category: "CRM", description: "Highly flexible CRM on monday.com's work OS. Customisable pipelines for any team structure.", url: "https://monday.com" },
  { name: "Close CRM", logo: "/logos/close_logo.png", category: "CRM", description: "Built-in calling, SMS, and email sequences. The CRM built for outbound sales teams.", url: "https://close.com" },
  { name: "Outreach", logo: "/logos/outreach_logo.png", category: "Sales Engagement", description: "The leading sales execution platform for sequences, calls, meetings, and pipeline management.", url: "https://outreach.io" },
  { name: "Salesloft", logo: "/logos/salesloft_logo.png", category: "Sales Engagement", description: "Revenue workflow platform with cadences, conversation intelligence, and deal management.", url: "https://salesloft.com" },
  { name: "Smartlead", logo: "/logos/smartlead_logo.webp", category: "Sales Engagement", description: "Scale cold email outreach with unlimited mailboxes and warmup. Built for high-volume outbound teams.", url: "https://smartlead.ai" },
  { name: "HeyReach", logo: "/logos/heyreach_logo.webp", category: "Sales Engagement", description: "LinkedIn outreach automation at scale. Multi-account sending for agencies and outbound teams.", url: "https://heyreach.io" },
  { name: "Clay", logo: "/logos/clay_logo.png", category: "Data & Enrichment", description: "Access 100+ premium data sources and AI research agents in one enrichment platform. The GTM data layer.", url: "https://clay.com" },
  { name: "Bitscale", logo: "/logos/bitscale_logo.png", category: "Data & Enrichment", description: "AI-powered lead enrichment and personalisation at scale. Build targeted prospect lists automatically.", url: "https://bitscale.ai" },
  { name: "Apollo.io", logo: "/logos/apollo_logo.png", category: "Data & Enrichment", description: "275M+ contacts, email sequences, and enrichment in one platform. Best free plan available.", url: "https://apollo.io" },
  { name: "LinkedIn Sales Nav", logo: "/logos/linkedin_logo.png", category: "Data & Enrichment", description: "Advanced LinkedIn search, lead recommendations, and CRM sync for outbound teams.", url: "https://linkedin.com/sales" },
  { name: "Gong", logo: "/logos/gong_logo.png", category: "Revenue Intelligence", description: "Revenue intelligence platform that captures every customer interaction and delivers insights to win more deals.", url: "https://gong.io" },
  { name: "Clari", logo: "/logos/clari_logo.png", category: "Revenue Intelligence", description: "AI revenue forecasting that eliminates spreadsheets with real-time pipeline visibility.", url: "https://clari.com" },
  { name: "Make", logo: "/logos/make_logo.png", category: "Automation", description: "Visual automation platform more powerful than Zapier. Complex CRM workflows without developers.", url: "https://make.com" },
];

function countFor(cat) {
  if (cat === "All") return tools.length;
  return tools.filter(t => t.category === cat).length;
}

export default function CRMTools() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tools.filter(t => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        .crmtools-hero { background: #0F172A; padding: 72px 32px 56px; position: relative; overflow: hidden; }
        .crmtools-hero::before {
          content: ''; position: absolute; top: -40%; right: -10%; width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(232,93,58,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .crmtools-hero-inner { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 24px; margin-bottom: 32px; }
        .crmtools-hero h1 { font-family: 'DM Serif Display',serif; font-size: 56px; color: #FAFBFC; letter-spacing: -0.02em; line-height: 1.05; margin: 0; }
        .crmtools-tabs { max-width: 1400px; margin: 0 auto; padding: 0 32px; display: flex; gap: 4px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .crmtools-tab { display: flex; align-items: center; gap: 7px; }
        .crmtools-tab-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .crmtools-tab-count { opacity: 0.55; font-size: 9px; }
        .crmtools-body { background: #FAFBFC; padding: 48px 32px 96px; }
        .crmtools-search { width: 100%; max-width: 520px; }
        .crmtools-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.08); border-top: 3px solid transparent;
          padding: 24px; display: flex; flex-direction: column; gap: 14px; position: relative;
          cursor: pointer; transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .crmtools-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -8px rgba(15,23,42,0.16);
        }
        .crmtools-card:hover .crmtools-logo-wrap { transform: scale(1.06); }
        .crmtools-card:hover .crmtools-view-arrow { transform: translateX(3px); }
        .crmtools-logo-wrap { transition: transform 0.22s cubic-bezier(0.16,1,0.3,1); }
        .crmtools-view-pill {
          border: 1px solid rgba(0,0,0,0.12); transition: all 0.2s ease;
        }
        .crmtools-card:hover .crmtools-view-pill {
          background: var(--accent, #E85D3A); color: #fff; border-color: var(--accent, #E85D3A);
        }
        .crmtools-view-arrow { display: inline-block; transition: transform 0.22s ease; }
        @media (max-width: 768px) {
          .crmtools-hero { padding: 40px 20px 32px !important; }
          .crmtools-hero h1 { font-size: 32px !important; }
          .crmtools-hero-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .crmtools-hero-inner p { display: none; }
          .crmtools-tabs { padding: 0 16px !important; }
          .crmtools-body { padding: 32px 16px 64px !important; }
          .crmtools-search { max-width: 100% !important; }
        }
      `}</style>
      <div className="fade-in">
        <SEOMeta title="CRM Tools Directory 2026" description="Explore the best CRM tools, sales engagement platforms, and revenue intelligence software. Curated by CRM Daily." url="https://www.crmdaily.co/crm-tools" />

        <div className="crmtools-hero">
          <div style={{ maxWidth:1400, margin:"0 auto", position:"relative" }}>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.2em", display:"block", marginBottom:16 }}>// CRM_TOOLS_DIRECTORY</span>
              <div className="crmtools-hero-inner">
                <h1>CRM & Sales Tools</h1>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.45)", maxWidth:400, lineHeight:1.8, margin:0 }}>
                  {tools.length} tools curated and reviewed by the CRM Daily team. Click any card to visit the tool directly.
                </p>
              </div>
              <div style={{ position:"relative" }}>
                <input type="text" placeholder="Search tools - HubSpot, Clay, Gong..." value={search} onChange={e => setSearch(e.target.value)}
                  className="crmtools-search"
                  style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#FAFBFC", fontFamily:"'Space Mono',monospace", fontSize:11, padding:"14px 20px", outline:"none", boxSizing:"border-box", letterSpacing:"0.06em", transition:"border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor="#E85D3A"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                {search && (
                  <button onClick={() => setSearch("")} aria-label="Clear search"
                    style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"rgba(242,237,228,0.5)", cursor:"pointer", fontFamily:"'Space Mono',monospace", fontSize:13 }}>
                    ✕
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <ToolsHub />

        <div style={{ background:"#FAFBFC", padding:"8px 32px 0", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth:1400, margin:"0 auto", padding:"32px 0 8px" }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:8 }}>// PRODUCT DIRECTORY</span>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#0F172A", margin:0 }}>Or browse every tool we track</h2>
          </div>
        </div>

        <div style={{ background:"#FAFBFC", borderBottom:"1px solid rgba(0,0,0,0.1)", position:"sticky", top:0, zIndex:10 }}>
          <div className="crmtools-tabs">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="crmtools-tab"
                style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"16px 18px", border:"none", background:"transparent", cursor:"pointer", whiteSpace:"nowrap", color:activeCategory===cat?"#0F172A":"#94A3B8", borderBottom:activeCategory===cat?`2px solid ${CATEGORY_COLORS[cat] || "#E85D3A"}`:"2px solid transparent", transition:"all 0.2s" }}>
                {cat !== "All" && <span className="crmtools-tab-dot" style={{ background: CATEGORY_COLORS[cat] }} />}
                {cat}
                <span className="crmtools-tab-count">({countFor(cat)})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid-bg crmtools-body">
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em" }}>
                {search ? `// RESULTS FOR "${search.toUpperCase()}"` : "// TOOLS"}
              </span>
              <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }} />
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#94A3B8", letterSpacing:"0.06em" }}>{filtered.length} TOOLS</span>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div key={activeCategory + search} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.15 }}
                  style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:16 }}>
                  {filtered.map((tool, i) => <ToolCard key={tool.name} tool={tool} index={i} />)}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:"center", padding:"80px 0" }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#94A3B8" }}>No tools found for "{search}" - try a different term.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

function ToolCard({ tool, index }) {
  const accent = CATEGORY_COLORS[tool.category] || "#E85D3A";

  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.35, delay:Math.min(index*0.03,0.24) }}
      className="crmtools-card"
      style={{ borderTopColor: accent, textDecoration: "none", "--accent": accent }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div className="crmtools-logo-wrap" style={{ flexShrink:0 }}>
          <img src={tool.logo} alt={tool.name}
            style={{ width:40, height:40, objectFit:"contain", border:"1px solid rgba(0,0,0,0.08)", padding:6, background:"#fff", borderRadius:6, display:"block" }}
            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
          <div style={{ width:40, height:40, background:accent, display:"none", alignItems:"center", justifyContent:"center", borderRadius:6 }}>
            <span style={{ color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700 }}>{tool.name.slice(0,2).toUpperCase()}</span>
          </div>
        </div>
        <div>
          <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#0F172A", margin:0, lineHeight:1.2 }}>{tool.name}</h3>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:accent, letterSpacing:"0.1em", fontWeight:700 }}>{tool.category.toUpperCase()}</span>
        </div>
      </div>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"#64748B", lineHeight:1.7, margin:0, flex:1, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{tool.description}</p>
      <div style={{ height:1, background:"rgba(0,0,0,0.07)" }} />
      <span
        className="crmtools-view-pill"
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"10px 0", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:"#0F172A" }}>
        VIEW <span className="crmtools-view-arrow">→</span>
      </span>
    </motion.a>
  );
}
