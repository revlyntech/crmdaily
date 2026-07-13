'use client';
import Link from "next/link";
import { useState } from "react";
import { subscribeEmail } from "../utils/beehiiv";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const r = await subscribeEmail(email);
    if (r.success) { setDone(true); setEmail(""); }
  }

  return (
    <footer>
      <style>{`
        .footer-newsletter { background: #E85D3A; padding: 56px 32px; text-align: center; }
        .footer-newsletter h2 { font-family: 'DM Serif Display',serif; font-size: 42px; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; line-height: 1.1; }
        .footer-form { display: flex; gap: 0; max-width: 460px; margin: 0 auto; }
        .footer-form input { flex: 1; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-right: none; color: #fff; font-family: 'Inter',sans-serif; font-size: 14px; padding: 14px 16px; outline: none; min-width: 0; }
        .footer-form button { background: #0F172A; color: #fff; border: none; padding: 14px 24px; font-family: 'Space Mono',monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; cursor: pointer; flex-shrink: 0; white-space: nowrap; }
        .footer-main { background: #0F172A; padding: 64px 32px 48px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer-bottom { max-width: 1400px; margin: 0 auto; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        @media (max-width: 640px) {
          .footer-newsletter { padding: 40px 20px; }
          .footer-newsletter h2 { font-size: 26px !important; }
          .footer-form { flex-direction: column; }
          .footer-form input { border-right: 1px solid rgba(255,255,255,0.3) !important; border-bottom: none; width: 100%; }
          .footer-form button { width: 100%; }
          .footer-main { padding: 40px 20px 32px; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
          .footer-hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Newsletter CTA strip */}
      <div className="footer-newsletter">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#0F172A", letterSpacing:"0.2em", display:"block", marginBottom:12 }}>// JOIN THE DAILY DIGEST</span>
          <h2>Start your day with CRM intelligence.</h2>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#0F172A", marginBottom:28, lineHeight:1.7 }}>
            5,000+ CRM managers, RevOps leads, and GTM teams read CRM Daily every morning.
          </p>
          {done ? (
            <div style={{ fontFamily:"'Space Mono',monospace", color:"#fff", fontSize:12, letterSpacing:"0.1em", padding:"14px 28px", border:"1px solid rgba(255,255,255,0.4)", display:"inline-block" }}>
              SUBSCRIBED SUCCESSFULLY ?
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="footer-form">
              <input type="email" placeholder="your@company.io" required value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit">JOIN FREE →</button>
            </form>
          )}
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#0F172A", marginTop:12, letterSpacing:"0.1em" }}>NO SPAM. NO FLUFF. UNSUBSCRIBE ANYTIME.</p>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:1, marginBottom:6 }}>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#FAFBFC", letterSpacing:"-0.02em" }}>crm</span>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#E85D3A", letterSpacing:"-0.02em" }}>daily</span>
              <span style={{ width:7, height:7, background:"#E85D3A", borderRadius:"50%", marginLeft:2, marginBottom:3 }} />
            </div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", letterSpacing:"0.1em", marginBottom:4 }}>EST. 2026 &copy; INDIA &middot; US &middot; AU</p>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.4)", lineHeight:1.8, maxWidth:260, marginTop:16 }}>
              Your daily source of CRM, GTM & RevOps intelligence. No vendor bias. No commissions. Just expert reporting.
            </p>
            <div style={{ marginTop:24, display:"flex", gap:12 }}>
              {[{label:"LinkedIn",href:"https://www.linkedin.com/company/78777881/"},{label:"Facebook",href:"https://www.facebook.com/profile.php?id=61591584532423"},{label:"RSS",href:"/news"}].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.35)", letterSpacing:"0.08em", cursor:"pointer", transition:"color 0.2s", textDecoration:"none" }}
                  onMouseEnter={e => e.target.style.color="#E85D3A"}
                  onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.35)"}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:20 }}>NAVIGATE</span>
            {[["Home","/"],["CRM News","/news"],["Guides","/guides"],["Tool Reviews","/tools"],["Newsletter","/newsletter"],["About","/about"],["Contact","/contact"]].map(([label,href]) => (
              <Link key={label} href={href}
                style={{ display:"block", fontFamily:"'DM Serif Display',serif", fontSize:15, color:"rgba(242,237,228,0.6)", marginBottom:10, transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E85D3A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.6)"}>{label}</Link>
            ))}
          </div>

          {/* Topics */}
          <div className="footer-hide-mobile">
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:20 }}>TOPICS</span>
            {[["HubSpot News","/news?category=HubSpot"],["Salesforce","/news?category=Salesforce"],["RevOps Strategy","/guides?category=RevOps"],["GTM Playbooks","/guides?category=GTM+Strategy"],["CRM Reviews","/tools?category=Tool+Review"],["AI in CRM","/news?category=AI"],["Pipedrive","/tools?category=Pipedrive"]].map(([label,href]) => (
              <Link key={label} href={href}
                style={{ display:"block", fontFamily:"'DM Serif Display',serif", fontSize:15, color:"rgba(242,237,228,0.6)", marginBottom:10, transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E85D3A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.6)"}>{label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.18em", display:"block", marginBottom:20 }}>COMPANY</span>
            {[["About CRM Daily","/about"],["Contact Us","/contact"],["Privacy Policy","/privacy"],["Terms of Service","/privacy"]].map(([label,href]) => (
              <Link key={label} href={href}
                style={{ display:"block", fontFamily:"'DM Serif Display',serif", fontSize:15, color:"rgba(242,237,228,0.6)", marginBottom:10, transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E85D3A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.6)"}>{label}</Link>
            ))}
            <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E85D3A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>POWERED BY</span>
              <a href="https://revlyn.io" target="_blank" rel="noreferrer"
                style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"rgba(242,237,228,0.5)", transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E85D3A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.5)"}>
                Revlyn.io →
              </a>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", marginTop:6, lineHeight:1.7 }}>CRM & RevOps Agency</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.2)", letterSpacing:"0.06em" }}>
          © 2026 CRM DAILY. ALL RIGHTS RESERVED.
          </span>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:6, height:6, background:"#22C55E", borderRadius:"50%", boxShadow:"0 0 6px #22C55E" }} className="blink" />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#22C55E", letterSpacing:"0.1em" }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
