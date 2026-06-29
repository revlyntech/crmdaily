'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "News",       to: "/news" },
  { label: "Guides",     to: "/guides" },
  { label: "Tools",      to: "/tools" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "About",      to: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const linkStyle = (active) => ({
    color: active ? "#E8521A" : "#0F0E0D",
    fontSize: 11, fontFamily: "'Space Mono',monospace", fontWeight: 700,
    letterSpacing: "0.1em", textTransform: "uppercase",
    padding: "0 18px", opacity: active ? 1 : 0.65,
    transition: "all 0.2s", textDecoration: "none",
    height: 68, display: "flex", alignItems: "center",
  });

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; align-items: center; gap: 0; height: 68px; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-header-inner { padding: 0 16px !important; }
        }
      `}</style>
      <header style={{ background:"#F2EDE4", borderBottom:"1px solid rgba(0,0,0,0.1)", position:"sticky", top:0, zIndex:100, boxShadow:scrolled?"0 2px 20px rgba(0,0,0,0.08)":"none", transition:"box-shadow 0.3s ease" }}>
        <div className="nav-header-inner" style={{ maxWidth:1400, margin:"0 auto", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>

          <Link href="/" style={{ display:"flex", flexDirection:"column", textDecoration:"none", gap:2 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:1 }}>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, fontWeight:400, color:"#0F0E0D", letterSpacing:"-0.03em", lineHeight:1 }}>crm</span>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, fontWeight:400, color:"#E8521A", letterSpacing:"-0.03em", lineHeight:1 }}>daily</span>
              <span style={{ width:7, height:7, background:"#E8521A", borderRadius:"50%", marginLeft:2, marginBottom:3, flexShrink:0 }} className="pulse" />
            </div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:"rgba(0,0,0,0.3)", letterSpacing:"0.18em", textTransform:"uppercase" }}>CRM & GTM Intelligence Daily</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            {navLinks.map(l => {
              const active = pathname === l.to;
              return (
                <Link key={l.to} href={l.to} style={linkStyle(active)}
                  onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity=active?"1":"0.65"; e.currentTarget.style.color=active?"#E8521A":"#0F0E0D"; }}>
                  {l.label}
                </Link>
              );
            })}
            <Link href="/crm-tools" style={linkStyle(pathname==="/crm-tools")}
              onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity=pathname==="/crm-tools"?"1":"0.65"; e.currentTarget.style.color=pathname==="/crm-tools"?"#E8521A":"#0F0E0D"; }}>
              CRM Tools
            </Link>
            <Link href="/contact" style={linkStyle(pathname==="/contact")}
              onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="#E8521A"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity="0.65"; e.currentTarget.style.color="#0F0E0D"; }}>
              Contact
            </Link>
            <Link href="/newsletter"
              style={{ marginLeft:16, background:"#E8521A", color:"#fff", padding:"0 22px", height:42, display:"flex", alignItems:"center", fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", transition:"background 0.2s", textDecoration:"none" }}
              onMouseEnter={e => e.currentTarget.style.background="#0F0E0D"}
              onMouseLeave={e => e.currentTarget.style.background="#E8521A"}>
              SUBSCRIBE FREE
            </Link>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-hamburger" aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:22, height:2, background:"#0F0E0D", transition:"all 0.2s",
                transform:mobileOpen&&i===0?"rotate(45deg) translateY(7px)":mobileOpen&&i===2?"rotate(-45deg) translateY(-7px)":"none",
                opacity:mobileOpen&&i===1?0:1 }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
              style={{ borderTop:"1px solid rgba(0,0,0,0.08)", background:"#F2EDE4", overflow:"hidden" }}>
              <div style={{ padding:"16px 20px 24px" }}>
                {[...navLinks, {label:"CRM Tools",to:"/crm-tools"},{label:"Contact",to:"/contact"}].map(l => (
                  <Link key={l.to} href={l.to}
                    style={{ display:"block", padding:"14px 0", fontFamily:"'Space Mono',monospace", fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", borderBottom:"1px solid rgba(0,0,0,0.06)", color:"#0F0E0D", textDecoration:"none" }}>
                    {l.label}
                  </Link>
                ))}
                <Link href="/newsletter"
                  style={{ display:"block", marginTop:16, background:"#E8521A", color:"#fff", padding:"14px 20px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textAlign:"center", textDecoration:"none" }}>
                  SUBSCRIBE FREE →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
