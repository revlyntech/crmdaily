import { Link } from "react-router-dom";
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

      {/* Newsletter CTA strip */}
      <div style={{ background: "#E8521A", padding: "56px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.7)", letterSpacing:"0.2em", display:"block", marginBottom:12 }}>// JOIN THE DAILY DIGEST</span>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:42, color:"#fff", marginBottom:12, letterSpacing:"-0.02em", lineHeight:1.1 }}>
            Start your day with CRM intelligence.
          </h2>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(255,255,255,0.65)", marginBottom:28, lineHeight:1.7 }}>
            5,000+ CRM managers, RevOps leads, and GTM teams read CRM Daily every morning.
          </p>
          {done ? (
            <div style={{ fontFamily:"'Space Mono',monospace", color:"#fff", fontSize:12, letterSpacing:"0.1em", padding:"14px 28px", border:"1px solid rgba(255,255,255,0.4)", display:"inline-block" }}>
              SUBSCRIBED SUCCESSFULLY ✓
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", gap:0, maxWidth:460, margin:"0 auto" }}>
              <input type="email" placeholder="your@company.io" required value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex:1, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRight:"none", color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:14, padding:"14px 16px", outline:"none" }} />
              <button type="submit"
                style={{ background:"#0F0E0D", color:"#fff", border:"none", padding:"14px 24px", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}
                onMouseEnter={e => e.target.style.background="#1A1917"}
                onMouseLeave={e => e.target.style.background="#0F0E0D"}>
                JOIN FREE →
              </button>
            </form>
          )}
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.45)", marginTop:12, letterSpacing:"0.1em" }}>NO SPAM. NO FLUFF. UNSUBSCRIBE ANYTIME.</p>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ background: "#0F0E0D", padding: "64px 32px 48px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:1, marginBottom:6 }}>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#F2EDE4", letterSpacing:"-0.02em" }}>crm</span>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#E8521A", letterSpacing:"-0.02em" }}>daily</span>
              <span style={{ width:7, height:7, background:"#E8521A", borderRadius:"50%", marginLeft:2, marginBottom:3 }} />
            </div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", letterSpacing:"0.1em", marginBottom:4 }}>EST. 2026 · INDIA → US + AU</p>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.4)", lineHeight:1.8, maxWidth:260, marginTop:16 }}>
              Your daily source of CRM, GTM & RevOps intelligence. No vendor bias. No commissions. Just expert reporting.
            </p>
            <div style={{ marginTop:24, display:"flex", gap:12 }}>
              {["LinkedIn","Twitter","RSS"].map(s => (
                <span key={s} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.35)", letterSpacing:"0.08em", cursor:"pointer", transition:"color 0.2s" }}
                  onMouseEnter={e => e.target.style.color="#E8521A"}
                  onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.35)"}>{s}</span>
              ))}
            </div>
          </div>

          {/* Navigate — all connected */}
          <div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:20 }}>NAVIGATE</span>
            {[
              ["Home", "/"],
              ["CRM News", "/news"],
              ["Guides", "/guides"],
              ["Tool Reviews", "/tools"],
              ["Newsletter", "/newsletter"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link key={label} to={href} style={{ display:"block", fontFamily:"'DM Serif Display',serif", fontSize:15, color:"rgba(242,237,228,0.6)", marginBottom:10, transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E8521A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.6)"}>{label}</Link>
            ))}
          </div>

          {/* Topics — all connected */}
          <div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:20 }}>TOPICS</span>
            {[
              ["HubSpot News", "/news"],
              ["Salesforce", "/news"],
              ["RevOps Strategy", "/guides"],
              ["GTM Playbooks", "/guides"],
              ["CRM Reviews", "/tools"],
              ["AI in CRM", "/news"],
              ["Pipedrive", "/tools"],
            ].map(([label, href]) => (
              <Link key={label} to={href} style={{ display:"block", fontFamily:"'DM Serif Display',serif", fontSize:15, color:"rgba(242,237,228,0.6)", marginBottom:10, transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E8521A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.6)"}>{label}</Link>
            ))}
          </div>

          {/* Legal + contact */}
          <div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.18em", display:"block", marginBottom:20 }}>COMPANY</span>
            {[
              ["About CRM Daily", "/about"],
              ["Contact Us", "/contact"],
              ["Privacy Policy", "/privacy"],
              ["Terms of Service", "/privacy"],
            ].map(([label, href]) => (
              <Link key={label} to={href} style={{ display:"block", fontFamily:"'DM Serif Display',serif", fontSize:15, color:"rgba(242,237,228,0.6)", marginBottom:10, transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E8521A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.6)"}>{label}</Link>
            ))}
            <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>POWERED BY</span>
              <a href="https://revlyn.io" target="_blank" rel="noreferrer" style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"rgba(242,237,228,0.5)", transition:"color 0.2s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.color="#E8521A"}
                onMouseLeave={e => e.target.style.color="rgba(242,237,228,0.5)"}>
                Revlyn.io ↗
              </a>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", marginTop:6, lineHeight:1.7 }}>CRM & RevOps Agency</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ maxWidth:1400, margin:"0 auto", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.2)", letterSpacing:"0.06em" }}>
            © 2026 CRM DAILY. ALL RIGHTS RESERVED. — BUILT IN INDIA · SERVING THE WORLD
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