import { motion } from "framer-motion";

const sections = [
  ["Who we are","CRM Daily is a free media publication covering CRM, GTM, and RevOps. Powered by Revlyn."],
  ["What data we collect","We collect email addresses for our newsletter and standard analytics via Google Analytics."],
  ["How we use your data","Your email is used solely to send the CRM Daily digest. We never sell or share your data."],
  ["Newsletter","Unsubscribe at any time using the link at the bottom of any email we send you."],
  ["Cookies","We use essential and analytics cookies. Disable them in your browser settings anytime."],
  ["Your rights","You can access, correct, or delete your data at any time. Contact us via our contact page."],
];

export default function Privacy() {
  return (
    <>
      <style>{`
        .privacy-hero { background: #0F0E0D; padding: 80px 32px; }
        .privacy-hero h1 { font-family: 'DM Serif Display',serif; font-size: 64px; color: #F2EDE4; letter-spacing: -0.02em; }
        .privacy-body { background: #F2EDE4; padding: 64px 32px 96px; }
        @media (max-width: 768px) {
          .privacy-hero { padding: 48px 20px !important; }
          .privacy-hero h1 { font-size: 36px !important; }
          .privacy-body { padding: 40px 20px 64px !important; }
        }
      `}</style>
      <div className="fade-in">
        <div className="privacy-hero">
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:20 }}>// LEGAL</span>
            <h1>Privacy Policy</h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", marginTop:12, letterSpacing:"0.08em" }}>LAST_UPDATED: JUNE 2026</p>
          </div>
        </div>
        <div className="grid-bg privacy-body">
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            {sections.map(([title,text],i) => (
              <motion.div key={title} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                style={{ marginBottom:32, paddingBottom:32, borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>
                  {String(i+1).padStart(2,"0")} // {title.toUpperCase().replace(/ /g,"_")}
                </span>
                <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:"#0F0E0D", marginBottom:12 }}>{title}</h2>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#6B6560", lineHeight:1.85 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}