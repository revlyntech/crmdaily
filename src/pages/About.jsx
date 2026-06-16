import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="fade-in">
      <div style={{ background:"#0F0E0D", padding:"80px 32px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:20 }}>// ABOUT_CRMDAILY</span>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:64, color:"#F2EDE4", letterSpacing:"-0.02em", lineHeight:1.05, maxWidth:800 }}>About CRM Daily</h1>
          </motion.div>
        </div>
      </div>
      <div className="grid-bg" style={{ background:"#F2EDE4", padding:"80px 32px 96px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:18, color:"#3D3A36", lineHeight:1.9, marginBottom:24 }}>CRM Daily is a free media publication covering the CRM, GTM, and RevOps world — every day. We publish news, tool reviews, guides, and analysis for CRM managers, sales leaders, and revenue teams.</p>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#6B6560", lineHeight:1.9, marginBottom:24 }}>We believe CRM professionals deserve a reliable daily source of expert intelligence — not vendor marketing. Every article is written with one goal: help you make better decisions about your CRM and GTM strategy.</p>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#6B6560", lineHeight:1.9, marginBottom:48 }}>CRM Daily is powered by <a href="https://revlyn.io" target="_blank" rel="noreferrer" style={{ color:"#E8521A" }}>Revlyn</a> — a specialist CRM, RevOps, and AI enablement agency. Our editorial is independent. No vendor sponsorships affect our coverage.</p>
          <div style={{ background:"#0F0E0D", padding:40 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:16 }}>// GET STARTED</span>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:32, color:"#F2EDE4", marginBottom:16 }}>Join 5,000+ CRM professionals.</h2>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.5)", lineHeight:1.7, marginBottom:24 }}>Get the CRM Daily digest free every morning.</p>
            <Link to="/newsletter" style={{ display:"inline-block", background:"#E8521A", color:"#fff", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textDecoration:"none", transition:"background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="#D4481A"}
              onMouseLeave={e => e.currentTarget.style.background="#E8521A"}>
              SUBSCRIBE FREE →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}