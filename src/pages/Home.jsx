import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { articles } from "../data/articles";
import CategoryBadge from "../components/CategoryBadge";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";

const featured = articles.find(a => a.featured);
const topStories = articles.filter(a => !a.featured).slice(0, 4);
const gridArticles = articles.filter(a => !a.featured);

export default function Home() {
  const navigate = useNavigate();
  if (!featured) return null;

  return (
    <div className="fade-in">

      {/* HERO */}
      <section className="grid-bg" style={{ background: "#F2EDE4", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", minHeight: 520 }}>

            {/* Featured */}
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
              style={{ padding: "64px 64px 64px 0", borderRight: "1px solid rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#9B958F", letterSpacing:"0.12em", marginBottom:16, display:"block" }}>LEAD STORY / {featured.date.toUpperCase()}</span>

              <div style={{ marginBottom:16 }}><CategoryBadge label={featured.category} color={featured.color} /></div>

              <h1 onClick={() => navigate(`/article/${featured.id}`)}
                style={{ fontFamily:"'DM Serif Display',serif", fontSize:58, fontWeight:400, lineHeight:1.08, color:"#0F0E0D", marginBottom:20, cursor:"pointer", letterSpacing:"-0.02em", transition:"color 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.color="#E8521A"}
                onMouseLeave={e => e.currentTarget.style.color="#0F0E0D"}>
                {featured.title}
              </h1>

              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, color:"#6B6560", lineHeight:1.8, marginBottom:32, maxWidth:580 }}>
                {featured.excerpt}
              </p>

              <div style={{ display:"flex", alignItems:"center", gap:20 }}>
                <button onClick={() => navigate(`/article/${featured.id}`)}
                  style={{ background:"#0F0E0D", color:"#fff", border:"none", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer", transition:"background 0.2s" }}
                  onMouseEnter={e => e.target.style.background="#E8521A"}
                  onMouseLeave={e => e.target.style.background="#0F0E0D"}>
                  READ FULL STORY →
                </button>
                <Link to="/news" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#9B958F", letterSpacing:"0.1em", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => e.target.style.color="#E8521A"}
                  onMouseLeave={e => e.target.style.color="#9B958F"}>
                  SEE ALL NEWS ·
                </Link>
                <Link to="/newsletter" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#9B958F", letterSpacing:"0.1em", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => e.target.style.color="#E8521A"}
                  onMouseLeave={e => e.target.style.color="#9B958F"}>
                  SUBSCRIBE FREE
                </Link>
              </div>
            </motion.div>

            {/* Right panel */}
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.7,delay:0.15}}
              style={{ paddingLeft:40, paddingTop:64 }}>

              <div style={{ marginBottom:28, paddingBottom:20, borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:12 }}>// WHAT WE COVER</span>
                {[
                  "CRM & REVOPS DAILY NEWS",
                  "TOOL REVIEWS & COMPARISONS",
                  "GTM STRATEGY GUIDES",
                ].map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={{ width:8, height:8, background:"#22C55E", flexShrink:0 }} />
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#6B6560", letterSpacing:"0.06em" }}>{item}</span>
                  </div>
                ))}
              </div>

              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:14 }}>// TOP STORIES</span>
              {topStories.map((a, i) => (
                <motion.div key={a.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.07}}
                  onClick={() => navigate(`/article/${a.id}`)}
                  style={{ padding:"13px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", cursor:"pointer", transition:"opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.6"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                  <div style={{ marginBottom:6 }}><CategoryBadge label={a.category} color={a.color} /></div>
                  <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:15, color:"#0F0E0D", lineHeight:1.35, marginBottom:6 }}>{a.title}</h3>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#9B958F", letterSpacing:"0.06em" }}>{a.date.toUpperCase()} · {a.readTime.toUpperCase()}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CRM LANDSCAPE section — dark, engaging */}
      <section style={{ background: "#0F0E0D", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.2em", display:"block", marginBottom:20 }}>// WHY CRM DAILY</span>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, color:"#F2EDE4", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:20 }}>
                The CRM world moves fast.<br />
                We keep you <span style={{ color:"#E8521A" }}>ahead of it.</span>
              </h2>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.5)", lineHeight:1.85, marginBottom:32 }}>
                Every day, CRM platforms ship updates, GTM strategies shift, and new tools emerge. CRM Daily filters the noise and delivers only what matters for your revenue team.
              </p>
              <Link to="/newsletter" style={{ display:"inline-block", background:"#E8521A", color:"#fff", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", transition:"background 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.background="#D4481A"}
                onMouseLeave={e => e.currentTarget.style.background="#E8521A"}>
                GET DAILY DIGEST →
              </Link>
            </motion.div>

            <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.2}}>
              {[
                { num:"01", title:"DAILY CRM & GTM NEWS", desc:"Fresh intelligence from HubSpot, Salesforce, Pipedrive, and the entire CRM ecosystem — every morning." },
                { num:"02", title:"EXPERT TOOL REVIEWS", desc:"Honest, unbiased reviews of every major CRM tool. No vendor sponsorships. No commission incentives." },
                { num:"03", title:"GTM & REVOPS GUIDES", desc:"Actionable playbooks for scaling your go-to-market motion. Written by practitioners, not marketers." },
              ].map((item, i) => (
                <motion.div key={item.num} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  style={{ display:"flex", gap:24, padding:"22px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", transition:"background 0.2s", cursor:"default" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(232,82,26,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#E8521A", flexShrink:0, lineHeight:1, marginTop:4 }}>{item.num}</span>
                  <div>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#F2EDE4", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>{item.title}</span>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.4)", lineHeight:1.75 }}>{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="grid-bg" style={{ background:"#F2EDE4", padding:"80px 32px 96px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, paddingBottom:24, borderBottom:"1px solid rgba(0,0,0,0.1)" }}>
            <div>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.2em", display:"block", marginBottom:8 }}>// LATEST ARTICLES</span>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:42, color:"#0F0E0D", letterSpacing:"-0.02em" }}>Today's Intelligence</h2>
            </div>
            <Link to="/news" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#9B958F", letterSpacing:"0.1em", cursor:"pointer", transition:"color 0.2s", textDecoration:"none" }}
              onMouseEnter={e => e.target.style.color="#E8521A"}
              onMouseLeave={e => e.target.style.color="#9B958F"}>
              VIEW ALL ARTICLES →
            </Link>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:40, alignItems:"start" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
              {gridArticles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
            </div>
            <Sidebar />
          </div>
        </div>
      </section>

      {/* CRM Conviction section */}
      <section style={{ background:"#0F0E0D", padding:"80px 32px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.2em", display:"block", marginBottom:16 }}>// THREE THINGS WE KNOW FOR CERTAIN</span>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, color:"#F2EDE4", letterSpacing:"-0.02em", marginBottom:8, maxWidth:700, lineHeight:1.1 }}>
              Three positions most CRM publications won't take.
            </h2>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.4)", maxWidth:560, marginBottom:56, lineHeight:1.85 }}>
              Covering revenue systems produces sharp convictions. Below are three we hold openly — each defensible because we've reported against it.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {[
              { n:"CONVICTION 01", title:"A CRM is operating debt, not operating leverage, until someone operates it daily.", sub:"WHY WE REPORT THIS", body:"Most CRMs are implemented well and abandoned six weeks after go-live. Without continuous operation — workflows tuned, fields populated, integrations monitored — the CRM decays." },
              { n:"CONVICTION 02", title:"Most outbound failure is a CRM data problem, not an email tool problem.", sub:"WHY WE REPORT THIS", body:"Companies experiencing declining outbound results typically blame their sales email tool. The pattern repeats because the underlying problem lives in the CRM — dirty data, broken suppression sync." },
              { n:"CONVICTION 03", title:"AI agents in CRM only work on a foundation most companies haven't built yet.", sub:"WHY WE REPORT THIS", body:"Every AI CRM deployment we cover has required foundation work first. The agent build itself is the smaller half. The data architecture that makes the agent reliable is the larger half." },
            ].map((c, i) => (
              <motion.div key={c.n} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                style={{ padding:"40px 40px 40px 0", borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none", paddingLeft:i>0?40:0, transition:"background 0.2s", cursor:"default" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(232,82,26,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.12em", display:"block", marginBottom:16 }}>{c.n}</span>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#F2EDE4", lineHeight:1.3, marginBottom:24 }}>{c.title}</h3>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.12em", display:"block", marginBottom:12 }}>{c.sub}</span>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.4)", lineHeight:1.8 }}>{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}