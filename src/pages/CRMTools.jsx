import { useState } from "react";
import { motion } from "framer-motion";
import SEOMeta from "../components/SEOMeta";

const categories = ["All", "CRM", "Sales Engagement", "Data & Enrichment", "Revenue Intelligence", "Automation"];

const tools = [
  { name: "HubSpot", logo: "/logos/hubspot_logo.png", category: "CRM", description: "The all-in-one CRM for marketing, sales, and service teams. Best for growing B2B companies under 500 reps.", url: "https://hubspot.com", featured: true },
  { name: "Salesforce", logo: "/logos/salesforce_logo.png", category: "CRM", description: "The world's #1 enterprise CRM. Unmatched customisation, AI, and the largest ecosystem of integrations.", url: "https://salesforce.com", featured: false },
  { name: "Pipedrive", logo: "/logos/pipedrive_logo.png", category: "CRM", description: "The sales-first CRM built for reps who live in their pipeline. Fastest setup, cleanest interface.", url: "https://pipedrive.com", featured: true },
  { name: "Monday CRM", logo: "/logos/monday_logo.png", category: "CRM", description: "Highly flexible CRM on monday.com's work OS. Customisable pipelines for any team structure.", url: "https://monday.com", featured: false },
  { name: "Close CRM", logo: "/logos/close_logo.png", category: "CRM", description: "Built-in calling, SMS, and email sequences. The CRM built for outbound sales teams.", url: "https://close.com", featured: false },
  { name: "Outreach", logo: "/logos/outreach_logo.png", category: "Sales Engagement", description: "The leading sales execution platform for sequences, calls, meetings, and pipeline management.", url: "https://outreach.io", featured: false },
  { name: "Salesloft", logo: "/logos/salesloft_logo.png", category: "Sales Engagement", description: "Revenue workflow platform with cadences, conversation intelligence, and deal management.", url: "https://salesloft.com", featured: false },
  { name: "Smartlead", logo: "/logos/smartlead_logo.webp", category: "Sales Engagement", description: "Scale cold email outreach with unlimited mailboxes and warmup. Built for high-volume outbound teams.", url: "https://smartlead.ai", featured: true },
  { name: "HeyReach", logo: "/logos/heyreach_logo.webp", category: "Sales Engagement", description: "LinkedIn outreach automation at scale. Multi-account sending for agencies and outbound teams.", url: "https://heyreach.io", featured: true },
  { name: "Clay", logo: "/logos/clay_logo.png", category: "Data & Enrichment", description: "Access 100+ premium data sources and AI research agents in one enrichment platform. The GTM data layer.", url: "https://clay.com", featured: true },
  { name: "Bitscale", logo: "/logos/bitscale_logo.png", category: "Data & Enrichment", description: "AI-powered lead enrichment and personalisation at scale. Build targeted prospect lists automatically.", url: "https://bitscale.ai", featured: true },
  { name: "Apollo.io", logo: "/logos/apollo_logo.png", category: "Data & Enrichment", description: "275M+ contacts, email sequences, and enrichment in one platform. Best free plan available.", url: "https://apollo.io", featured: false },
  { name: "LinkedIn Sales Nav", logo: "/logos/linkedin_logo.png", category: "Data & Enrichment", description: "Advanced LinkedIn search, lead recommendations, and CRM sync for outbound teams.", url: "https://linkedin.com/sales", featured: false },
  { name: "Gong", logo: "/logos/gong_logo.png", category: "Revenue Intelligence", description: "Revenue intelligence platform that captures every customer interaction and delivers insights to win more deals.", url: "https://gong.io", featured: true },
  { name: "Clari", logo: "/logos/clari_logo.png", category: "Revenue Intelligence", description: "AI revenue forecasting that eliminates spreadsheets with real-time pipeline visibility.", url: "https://clari.com", featured: false },
  { name: "Make", logo: "/logos/make_logo.png", category: "Automation", description: "Visual automation platform more powerful than Zapier. Complex CRM workflows without developers.", url: "https://make.com", featured: false },
];

export default function CRMTools() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tools.filter(t => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter(t => t.featured);
  const rest = filtered.filter(t => !t.featured);

  return (
    <>
      <style>{`
        .crmtools-hero { background: #0F0E0D; padding: 72px 32px 56px; }
        .crmtools-hero-inner { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 24px; margin-bottom: 32px; }
        .crmtools-hero h1 { font-family: 'DM Serif Display',serif; font-size: 56px; color: #F2EDE4; letter-spacing: -0.02em; line-height: 1.05; margin: 0; }
        .crmtools-tabs { max-width: 1400px; margin: 0 auto; padding: 0 32px; display: flex; gap: 0; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .crmtools-body { background: #F2EDE4; padding: 48px 32px 96px; }
        .crmtools-search { width: 100%; max-width: 520px; }
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
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.2em", display:"block", marginBottom:16 }}>// CRM_TOOLS_DIRECTORY</span>
              <div className="crmtools-hero-inner">
                <h1>CRM & Sales Tools</h1>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.45)", maxWidth:400, lineHeight:1.8, margin:0 }}>
                  {tools.length} tools curated and reviewed by the CRM Daily team. Click View to visit any tool directly.
                </p>
              </div>
              <input type="text" placeholder="Search tools — HubSpot, Clay, Gong..." value={search} onChange={e => setSearch(e.target.value)}
                className="crmtools-search"
                style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#F2EDE4", fontFamily:"'Space Mono',monospace", fontSize:11, padding:"14px 20px", outline:"none", boxSizing:"border-box", letterSpacing:"0.06em", transition:"border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor="#E8521A"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.12)"} />
            </motion.div>
          </div>
        </div>

        <div style={{ background:"#F2EDE4", borderBottom:"1px solid rgba(0,0,0,0.1)" }}>
          <div className="crmtools-tabs">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"16px 20px", border:"none", background:"transparent", cursor:"pointer", whiteSpace:"nowrap", color:activeCategory===cat?"#E8521A":"#9B958F", borderBottom:activeCategory===cat?"2px solid #E8521A":"2px solid transparent", transition:"all 0.2s" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-bg crmtools-body">
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            {featured.length > 0 && !search && (
              <>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em" }}>// OUR FAVOURITES</span>
                  <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:16, marginBottom:48 }}>
                  {featured.map((tool,i) => <ToolCard key={tool.name} tool={tool} index={i} />)}
                </div>
              </>
            )}
            {rest.length > 0 && !search && (
              <>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em" }}>// ALL TOOLS</span>
                  <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }} />
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#9B958F", letterSpacing:"0.06em" }}>{rest.length} TOOLS</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:16 }}>
                  {rest.map((tool,i) => <ToolCard key={tool.name} tool={tool} index={i} />)}
                </div>
              </>
            )}
            {search && (
              <>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em" }}>// RESULTS FOR "{search.toUpperCase()}"</span>
                  <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }} />
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#9B958F", letterSpacing:"0.06em" }}>{filtered.length} FOUND</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:16 }}>
                  {filtered.map((tool,i) => <ToolCard key={tool.name} tool={tool} index={i} />)}
                </div>
              </>
            )}
            {filtered.length === 0 && (
              <div style={{ textAlign:"center", padding:"80px 0" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F" }}>No tools found for "{search}"</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ToolCard({ tool, index }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:Math.min(index*0.04,0.3) }}
      className="card-lift"
      style={{ background:"#fff", border:"1px solid rgba(0,0,0,0.08)", padding:"24px", display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <img src={tool.logo} alt={tool.name}
          style={{ width:40, height:40, objectFit:"contain", border:"1px solid rgba(0,0,0,0.08)", padding:6, background:"#fff", flexShrink:0, borderRadius:6 }}
          onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
        <div style={{ width:40, height:40, background:"#E8521A", display:"none", alignItems:"center", justifyContent:"center", flexShrink:0, borderRadius:6 }}>
          <span style={{ color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700 }}>{tool.name.slice(0,2).toUpperCase()}</span>
        </div>
        <div>
          <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#0F0E0D", margin:0, lineHeight:1.2 }}>{tool.name}</h3>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#E8521A", letterSpacing:"0.1em" }}>{tool.category.toUpperCase()}</span>
        </div>
      </div>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"#6B6560", lineHeight:1.7, margin:0, flex:1, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{tool.description}</p>
      <div style={{ height:1, background:"rgba(0,0,0,0.07)" }} />
      <a href={tool.url} target="_blank" rel="noopener noreferrer"
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"10px 0", background:"transparent", border:"1px solid rgba(0,0,0,0.12)", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:"#0F0E0D", textDecoration:"none", transition:"all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background="#E8521A"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#E8521A"; }}
        onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0F0E0D"; e.currentTarget.style.borderColor="rgba(0,0,0,0.12)"; }}>
        VIEW ↗
      </a>
    </motion.div>
  );
}