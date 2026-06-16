import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "News", to: "/news" },
  { label: "Guides", to: "/guides" },
  { label: "Tools", to: "/tools" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header style={{
      background: "#F2EDE4",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      transition: "box-shadow 0.3s ease",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

        {/* Logo — crmdaily */}
        <Link to="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, color: "#0F0E0D", letterSpacing: "-0.03em", lineHeight: 1 }}>crm</span>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, color: "#E8521A", letterSpacing: "-0.03em", lineHeight: 1 }}>daily</span>
            <span style={{ width: 7, height: 7, background: "#E8521A", borderRadius: "50%", marginLeft: 2, marginBottom: 3, flexShrink: 0 }} className="pulse" />
          </div>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: "rgba(0,0,0,0.3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>CRM & GTM Intelligence Daily</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-768" style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {links.map(l => {
            const active = location.pathname === l.to;
            return (
              <Link key={l.to} to={l.to}
                style={{ color: active ? "#E8521A" : "#0F0E0D", fontSize: 11, fontFamily: "'Space Mono',monospace", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 18px", opacity: active ? 1 : 0.65, transition: "all 0.2s", textDecoration: "none", position: "relative" }}
                onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity=active?"1":"0.65"; e.currentTarget.style.color=active?"#E8521A":"#0F0E0D"; }}>
                {l.label}
              </Link>
            );
          })}
          <Link to="/contact"
            style={{ color: "#0F0E0D", fontSize: 11, fontFamily: "'Space Mono',monospace", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 18px", opacity: 0.65, transition: "all 0.2s", textDecoration: "none" }}
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
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, flexDirection: "column", gap: 5 }} className="show-768" aria-label="Menu">
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#0F0E0D", transition: "all 0.2s", transform: open&&i===0?"rotate(45deg) translateY(7px)":open&&i===2?"rotate(-45deg) translateY(-7px)":"none", opacity: open&&i===1?0:1 }} />)}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} style={{ borderTop:"1px solid rgba(0,0,0,0.08)", background:"#F2EDE4", overflow:"hidden" }}>
            <div style={{ padding:"16px 32px 24px" }}>
              {[...links, {label:"Contact",to:"/contact"}].map(l => <Link key={l.to} to={l.to} style={{ display:"block", padding:"12px 0", fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", borderBottom:"1px solid rgba(0,0,0,0.06)", color:"#0F0E0D", textDecoration:"none" }}>{l.label}</Link>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`.show-768{display:none!important;} @media(max-width:768px){.hide-768{display:none!important;} .show-768{display:flex!important;}}`}</style>
    </header>
  );
}