import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const crmTools = [
  { label: "HubSpot",      to: "/tools?category=HubSpot" },
  { label: "Salesforce",   to: "/tools?category=Salesforce" },
  { label: "Pipedrive",    to: "/tools?category=Pipedrive" },
  { label: "Monday.com",   to: "/tools?category=Monday" },
  { label: "Zoho CRM",     to: "/tools?category=Zoho" },
  { label: "Freshsales",   to: "/tools?category=Freshsales" },
  { label: "Close CRM",    to: "/tools?category=Close" },
  { label: "Copper CRM",   to: "/tools?category=Copper" },
  { label: "All CRM Tools",to: "/tools" },
];

const navLinks = [
  { label: "News",       to: "/news" },
  { label: "Guides",     to: "/guides" },
  { label: "Tools",      to: "/tools" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "About",      to: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [crmOpen, setCrmOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); setCrmOpen(false); }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCrmOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinkStyle = (active) => ({
    color: active ? "#E8521A" : "#0F0E0D",
    fontSize: 11,
    fontFamily: "'Space Mono',monospace",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "0 18px",
    opacity: active ? 1 : 0.65,
    transition: "all 0.2s",
    textDecoration: "none",
    position: "relative",
    cursor: "pointer",
    background: "none",
    border: "none",
    height: 68,
    display: "flex",
    alignItems: "center",
  });

  return (
    <header style={{
      background: "#F2EDE4",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      transition: "box-shadow 0.3s ease",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, color: "#0F0E0D", letterSpacing: "-0.03em", lineHeight: 1 }}>crm</span>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, color: "#E8521A", letterSpacing: "-0.03em", lineHeight: 1 }}>daily</span>
            <span style={{ width: 7, height: 7, background: "#E8521A", borderRadius: "50%", marginLeft: 2, marginBottom: 3, flexShrink: 0 }} className="pulse" />
          </div>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: "rgba(0,0,0,0.3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>CRM & GTM Intelligence Daily</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-768" style={{ display: "flex", alignItems: "center", gap: 0, height: 68 }}>

          {navLinks.map(l => {
            const active = location.pathname === l.to;
            return (
              <Link key={l.to} to={l.to} style={navLinkStyle(active)}
                onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity=active?"1":"0.65"; e.currentTarget.style.color=active?"#E8521A":"#0F0E0D"; }}>
                {l.label}
              </Link>
            );
          })}

          {/* CRM Dropdown */}
          <div ref={dropdownRef} style={{ position: "relative", height: 68, display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setCrmOpen(!crmOpen)}
              style={{
                ...navLinkStyle(crmOpen),
                display: "flex", alignItems: "center", gap: 5,
                opacity: crmOpen ? 1 : 0.65,
                color: crmOpen ? "#E8521A" : "#0F0E0D",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity=crmOpen?"1":"0.65"; e.currentTarget.style.color=crmOpen?"#E8521A":"#0F0E0D"; }}>
              CRM Tools
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" style={{ transition: "transform 0.2s", transform: crmOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <AnimatePresence>
              {crmOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#0F0E0D",
                    border: "1px solid rgba(255,255,255,0.08)",
                    minWidth: 200,
                    zIndex: 200,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
                  }}>
                  {/* Arrow tip */}
                  <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, background: "#0F0E0D", borderLeft: "1px solid rgba(255,255,255,0.08)", borderTop: "1px solid rgba(255,255,255,0.08)", rotate: "45deg" }} />

                  {crmTools.map((tool, i) => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      style={{
                        display: "block",
                        padding: "11px 20px",
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 10,
                        fontWeight: tool.label === "All CRM Tools" ? 700 : 400,
                        letterSpacing: "0.08em",
                        color: tool.label === "All CRM Tools" ? "#E8521A" : "rgba(242,237,228,0.7)",
                        textDecoration: "none",
                        borderTop: i === crmTools.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                        borderBottom: i < crmTools.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        transition: "all 0.15s",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background="rgba(232,82,26,0.08)"; e.currentTarget.style.color="#E8521A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=tool.label==="All CRM Tools"?"#E8521A":"rgba(242,237,228,0.7)"; }}>
                      {tool.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact"
            style={navLinkStyle(location.pathname === "/contact")}
            onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="0.65"; e.currentTarget.style.color="#0F0E0D"; }}>
            Contact
          </Link>

          <Link to="/newsletter"
            style={{ marginLeft: 16, background: "#E8521A", color: "#fff", padding: "0 22px", height: 42, display: "flex", alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s", textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.background="#0F0E0D"}
            onMouseLeave={e => e.currentTarget.style.background="#E8521A"}>
            SUBSCRIBE FREE
          </Link>
        </nav>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, flexDirection: "column", gap: 5 }}
          className="show-768" aria-label="Menu">
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 22, height: 2, background: "#0F0E0D", transition: "all 0.2s",
              transform: mobileOpen&&i===0?"rotate(45deg) translateY(7px)":mobileOpen&&i===2?"rotate(-45deg) translateY(-7px)":"none",
              opacity: mobileOpen&&i===1?0:1 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
            style={{ borderTop:"1px solid rgba(0,0,0,0.08)", background:"#F2EDE4", overflow:"hidden" }}>
            <div style={{ padding:"16px 32px 24px" }}>
              {[...navLinks, {label:"CRM Tools",to:"/tools"}, {label:"Contact",to:"/contact"}].map(l => (
                <Link key={l.to} to={l.to}
                  style={{ display:"block", padding:"12px 0", fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", borderBottom:"1px solid rgba(0,0,0,0.06)", color:"#0F0E0D", textDecoration:"none" }}>
                  {l.label}
                </Link>
              ))}
              {/* CRM tools in mobile */}
              <div style={{ paddingLeft: 16, marginTop: 4 }}>
                {crmTools.slice(0, -1).map(t => (
                  <Link key={t.to} to={t.to}
                    style={{ display:"block", padding:"10px 0", fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:"1px solid rgba(0,0,0,0.04)", color:"#9B958F", textDecoration:"none" }}>
                    → {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.show-768{display:none!important;} @media(max-width:768px){.hide-768{display:none!important;} .show-768{display:flex!important;}}`}</style>
    </header>
  );
}