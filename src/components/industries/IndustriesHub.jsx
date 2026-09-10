'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { INDUSTRIES } from "@/data/industriesData";

const ACCENT = "#E85D3A";

export default function IndustriesHub() {
  return (
    <>
      <style>{`
        .industries-hero { background:#0F172A; padding:64px 32px; }
        .industries-body { background:#FAFBFC; padding:56px 32px 96px; }
        .industries-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:14px; max-width:1400px; margin:0 auto; }
        .industry-card {
          position:relative; overflow:hidden; background:#fff; border:1px solid rgba(15,23,42,0.1);
          border-top:2px solid ${ACCENT}; padding:20px; display:flex; flex-direction:column; min-height:150px;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease; text-decoration:none;
        }
        .industry-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -12px rgba(15,23,42,0.2); }
        .industry-num {
          position:absolute; top:-4px; right:6px; font-family:'DM Serif Display',serif;
          font-size:60px; color:rgba(15,23,42,0.05); line-height:1; user-select:none; pointer-events:none;
        }
        .industry-name { font-family:'DM Serif Display',serif; font-size:17px; color:#0F172A; margin:0 0 8px; position:relative; z-index:1; }
        .industry-desc { font-family:'Inter',sans-serif; font-size:12.5px; line-height:1.6; color:#64748B; margin:0 0 14px; position:relative; z-index:1; flex:1; }
        .industry-cta { font-family:'Space Mono',monospace; font-size:9px; font-weight:700; letter-spacing:0.08em; color:${ACCENT}; position:relative; z-index:1; }
        @media (max-width: 768px) {
          .industries-hero { padding:44px 20px; }
          .industries-body { padding:40px 20px 64px; }
        }
      `}</style>

      <div className="industries-hero">
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:ACCENT, letterSpacing:"0.2em", display:"block", marginBottom:16 }}>// CRM_BY_INDUSTRY</span>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(32px,4.5vw,48px)", color:"#FAFBFC", letterSpacing:"-0.02em", lineHeight:1.1, margin:"0 0 12px" }}>
              CRM isn't one-size-fits-all
            </h1>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14.5, color:"rgba(250,251,252,0.6)", maxWidth:560, lineHeight:1.6, margin:0 }}>
              24 industries, each with a different reason a CRM earns its keep. Find yours below.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="industries-body">
        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity:0, y:14 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }}
              transition={{ duration:0.3, delay: Math.min(i * 0.02, 0.4) }}
            >
              <Link href={`/industries/${ind.slug}`} className="industry-card">
                <span className="industry-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="industry-name">{ind.name}</h3>
                <p className="industry-desc">{ind.tagline}</p>
                <span className="industry-cta">READ MORE →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}