import { useState } from "react";
import { motion } from "framer-motion";
import { subscribeEmail } from "../utils/beehiiv";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const r = await subscribeEmail(email);
    if (r.success) { setStatus("success"); setEmail(""); } else setStatus("error");
  }
  return (
    <>
      <style>{`
        .nl-form-row { display: flex; gap: 0; max-width: 480px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.15); }
        .nl-form-row input { flex: 1; background: rgba(255,255,255,0.04); border: none; color: #F2EDE4; font-family: 'Inter',sans-serif; font-size: 14px; padding: 16px; outline: none; min-width: 0; }
        .nl-content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; border: 1px solid rgba(0,0,0,0.1); }
        @media (max-width: 768px) {
          .nl-hero { padding: 60px 20px 48px !important; }
          .nl-hero h1 { font-size: 42px !important; }
          .nl-form-row { flex-direction: column; max-width: 100% !important; }
          .nl-form-row input { width: 100%; }
          .nl-content-grid { grid-template-columns: 1fr !important; }
          .nl-body { padding: 48px 20px 64px !important; }
          .nl-content-item { border-right: none !important; }
        }
      `}</style>
      <div className="fade-in">
        <div className="grid-bg-dark nl-hero" style={{ background:"#0F0E0D", padding:"100px 32px 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, background:"radial-gradient(circle,rgba(232,82,26,0.07),transparent 70%)", pointerEvents:"none" }} />
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} style={{position:"relative"}}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.2em" }}>// DAILY DIGEST</span>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:72, color:"#F2EDE4", marginTop:16, marginBottom:16, letterSpacing:"-0.03em", lineHeight:1 }}>CRM Daily Digest</h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"rgba(242,237,228,0.5)", maxWidth:480, margin:"0 auto 40px", lineHeight:1.85 }}>Your morning CRM & GTM briefing. Top stories, tool updates, and actionable insights — every weekday.</p>
            {status === "success" ? (
              <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} style={{ fontFamily:"'Space Mono',monospace", color:"#22C55E", fontSize:12, letterSpacing:"0.1em", padding:"16px 32px", border:"1px solid rgba(34,197,94,0.3)", display:"inline-block" }}>
                SUBSCRIBED SUCCESSFULLY Γ£ô
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="nl-form-row">
                <input type="email" placeholder="your@company.io" required value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" disabled={status==="loading"}
                  style={{ background:"#E8521A", color:"#fff", border:"none", padding:"16px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}
                  onMouseEnter={e => e.target.style.background="#D4481A"} onMouseLeave={e => e.target.style.background="#E8521A"}>
                  {status==="loading" ? "..." : "JOIN FREE →"}
                </button>
              </form>
            )}
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.2)", marginTop:14, letterSpacing:"0.1em" }}>NO SPAM. UNSUBSCRIBE ANYTIME. 5,000+ SUBSCRIBERS.</p>
          </motion.div>
        </div>
        <div className="grid-bg nl-body" style={{ background:"#F2EDE4", padding:"80px 32px 96px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:36, color:"#0F0E0D", textAlign:"center", marginBottom:48, letterSpacing:"-0.02em" }}>What arrives in your inbox every morning</h2>
            <div className="nl-content-grid">
              {[
                { n:"01", icon:"≡ƒô░", title:"Top CRM Stories", desc:"The 5 most important CRM & GTM developments of the day, curated and explained." },
                { n:"02", icon:"≡ƒöº", title:"Tool Spotlight", desc:"One CRM tool reviewed briefly — what it does, who it's for, and whether it's worth it." },
                { n:"03", icon:"≡ƒôê", title:"Market Pulse", desc:"HubSpot and Salesforce ecosystem updates, pricing changes, and partnership news." },
                { n:"04", icon:"≡ƒÄ»", title:"GTM Insight", desc:"One actionable GTM or RevOps strategy you can implement immediately." },
              ].map((b,i) => (
                <motion.div key={b.n} className="nl-content-item" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3+i*0.08}}
                  style={{ padding:36, borderRight:i%2===0?"1px solid rgba(0,0,0,0.1)":"none", borderBottom:i<2?"1px solid rgba(0,0,0,0.1)":"none", transition:"background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background="#0F0E0D"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <div style={{ fontSize:28, marginBottom:16 }}>{b.icon}</div>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>{b.n} /</span>
                  <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#0F0E0D", marginBottom:10 }}>{b.title}</h3>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#6B6560", lineHeight:1.8 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}