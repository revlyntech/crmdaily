import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { value: "5,000+", label: "Daily readers" },
    { value: "2×", label: "Articles per day" },
    { value: "100%", label: "Independent editorial" },
    { value: "0", label: "Vendor sponsorships" },
  ];

  const values = [
    { tag: "// NO VENDOR BIAS", title: "We don't take sides.", body: "We cover every CRM platform — HubSpot, Salesforce, Pipedrive, Monday, and beyond — with the same critical eye. No platform pays us to write favourably about them." },
    { tag: "// EXPERT REPORTING", title: "Written for practitioners.", body: "Every article is written for the people who live in CRMs every day — RevOps leads, sales managers, GTM teams. Not for executives who skim headlines." },
    { tag: "// DAILY CADENCE", title: "Fresh intelligence, every morning.", body: "Two articles a day, published at 8am and 6pm IST. So you start every day knowing what moved in the CRM world overnight." },
  ];

  return (
    <div className="fade-in">

      {/* Hero */}
      <div style={{ background: "#0F0E0D", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#E8521A", letterSpacing: "0.15em", display: "block", marginBottom: 20 }}>// ABOUT_CRMDAILY</span>
            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 64, color: "#F2EDE4", letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: 800 }}>
              The daily briefing for CRM & GTM professionals.
            </h1>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(242,237,228,0.45)", marginTop: 20, maxWidth: 560, lineHeight: 1.8 }}>
              News, tool reviews, guides, and analysis — published every day, free forever.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "#E8521A", padding: "28px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 32, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.75)", letterSpacing: "0.12em", marginTop: 6 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="grid-bg" style={{ background: "#F2EDE4", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#E8521A", letterSpacing: "0.15em", display: "block", marginBottom: 16 }}>// OUR_MISSION</span>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, color: "#0F0E0D", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 24 }}>
              CRM intelligence, without the vendor noise.
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#3D3A36", lineHeight: 1.85, marginBottom: 20 }}>
              CRM Daily was built because the CRM world lacked a truly independent daily source. Most coverage is either vendor-produced marketing or shallow roundups that don't help practitioners make real decisions.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#3D3A36", lineHeight: 1.85, marginBottom: 20 }}>
              We publish news, deep-dive guides, tool reviews, and GTM strategy analysis — every single day. No paywalls, no affiliate rankings dressed up as journalism.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#3D3A36", lineHeight: 1.85 }}>
              CRM Daily is powered by <a href="https://revlyn.io" target="_blank" rel="noreferrer" style={{ color: "#E8521A", textDecoration: "none", borderBottom: "1px solid #E8521A" }}>Revlyn</a> — a specialist CRM, RevOps, and AI enablement agency. Our editorial is fully independent. No vendor sponsorships influence our coverage.
            </p>
          </div>

          {/* Values */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {values.map((v, i) => (
              <div key={v.tag} style={{ padding: "28px 0", borderTop: i === 0 ? "1px solid rgba(15,14,13,0.12)" : "1px solid rgba(15,14,13,0.12)", borderBottom: i === values.length - 1 ? "1px solid rgba(15,14,13,0.12)" : "none" }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#E8521A", letterSpacing: "0.15em", display: "block", marginBottom: 10 }}>{v.tag}</span>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: "#0F0E0D", marginBottom: 8, letterSpacing: "-0.01em" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#6B6560", lineHeight: 1.85, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Powered by Revlyn */}
      <div style={{ background: "#0F0E0D", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#E8521A", letterSpacing: "0.15em", display: "block", marginBottom: 16 }}>// POWERED_BY</span>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 36, color: "#F2EDE4", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>Built by Revlyn.</h2>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(242,237,228,0.5)", lineHeight: 1.85, marginBottom: 28, maxWidth: 420 }}>
              Revlyn is a specialist CRM, RevOps, and AI enablement agency helping B2B revenue teams build smarter go-to-market systems. CRM Daily is our contribution to the practitioner community.
            </p>
            <a href="https://revlyn.io" target="_blank" rel="noreferrer"
              style={{ display: "inline-block", border: "1px solid rgba(242,237,228,0.2)", color: "#F2EDE4", padding: "12px 24px", fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: "0.1em", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#E8521A"; e.currentTarget.style.borderColor = "#E8521A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(242,237,228,0.2)"; }}>
              VISIT REVLYN.IO ↗
            </a>
          </div>
          <div style={{ background: "#E8521A", padding: 40 }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: "0.15em", display: "block", marginBottom: 16 }}>// JOIN THE COMMUNITY</span>
            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em" }}>Start reading CRM Daily free.</h3>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 24 }}>
              5,000+ CRM managers, RevOps leads, and GTM teams get the digest every morning.
            </p>
            <Link to="/newsletter"
              style={{ display: "inline-block", background: "#0F0E0D", color: "#fff", padding: "14px 28px", fontFamily: "'Space Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1A1917"}
              onMouseLeave={e => e.currentTarget.style.background = "#0F0E0D"}>
              SUBSCRIBE FREE →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}