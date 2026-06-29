import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({ access_key:"111f8380-9c23-4f58-b7b9-573ca69f54c6", name:form.name, email:form.email, subject:`CRM Daily Contact: ${form.subject}`, message:form.message, from_name:"CRM Daily Website", to:"hello@crmdaily.co" }),
      });
      const data = await response.json();
      if (data.success) { setStatus("success"); setForm({ name:"", email:"", subject:"", message:"" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  return (
    <>
      <style>{`
        .contact-hero { background: #0F0E0D; padding: 80px 32px; }
        .contact-hero h1 { font-family: 'DM Serif Display',serif; font-size: 64px; color: #F2EDE4; letter-spacing: -0.02em; }
        .contact-body { background: #F2EDE4; padding: 80px 32px 96px; }
        .contact-grid { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        @media (max-width: 768px) {
          .contact-hero { padding: 48px 20px !important; }
          .contact-hero h1 { font-size: 36px !important; }
          .contact-body { padding: 48px 20px 64px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
      <div className="fade-in">
        <div className="contact-hero">
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:20 }}>// GET_IN_TOUCH</span>
            <h1>Contact Us</h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginTop:14 }}>Editorial enquiries, tip submissions, sponsorship, or feedback.</p>
          </div>
        </div>
        <div className="grid-bg contact-body">
          <div className="contact-grid">
            <div>
              {status === "success" ? (
                <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} style={{ background:"#0F0E0D", padding:40, textAlign:"center" }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>Γ£ô</div>
                  <span style={{ fontFamily:"'Space Mono',monospace", color:"#22C55E", fontSize:12, letterSpacing:"0.1em", display:"block", marginBottom:12 }}>MESSAGE_SENT</span>
                  <p style={{ fontFamily:"'Space Mono',monospace", color:"rgba(242,237,228,0.5)", fontSize:11, lineHeight:1.8 }}>We received your message and will reply within 1ΓÇô2 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {[["YOUR NAME","name","text","John Smith"],["EMAIL ADDRESS","email","email","john@company.com"],["SUBJECT","subject","text","Editorial / News Tip / Sponsorship"]].map(([label,field,type,ph]) => (
                    <div key={field}>
                      <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:8 }}>// {label}</label>
                      <input type={type} required placeholder={ph} value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})} className="input-cream" />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:8 }}>// MESSAGE</label>
                    <textarea required placeholder="Tell us what's on your mind..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} rows={6} className="input-cream" style={{ resize:"vertical" }} />
                  </div>
                  {status === "error" && <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#DC2626", letterSpacing:"0.08em" }}>Something went wrong. Email us at hello@crmdaily.co</p>}
                  <button type="submit" disabled={status==="loading"}
                    style={{ alignSelf:"flex-start", background:status==="loading"?"#6B6560":"#0F0E0D", color:"#fff", border:"none", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", cursor:status==="loading"?"not-allowed":"pointer" }}
                    onMouseEnter={e => { if(status!=="loading") e.target.style.background="#E8521A"; }}
                    onMouseLeave={e => { if(status!=="loading") e.target.style.background="#0F0E0D"; }}>
                    {status==="loading" ? "SENDING..." : "SEND MESSAGE ΓåÆ"}
                  </button>
                </form>
              )}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
              <div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>// EMAIL</span>
                <a href="mailto:hello@crmdaily.co" style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#0F0E0D", transition:"color 0.2s", textDecoration:"none" }} onMouseEnter={e => e.target.style.color="#E8521A"} onMouseLeave={e => e.target.style.color="#0F0E0D"}>hello@crmdaily.co</a>
              </div>
              {[["EDITORIAL ENQUIRIES","For news tips, article pitches, and editorial feedback ΓÇö use the form or email us directly."],["SPONSORSHIP","Interested in reaching 5,000+ CRM & RevOps professionals? We offer sponsored content and newsletter placements."],["RESPONSE TIME","We respond to all enquiries within 1ΓÇô2 business days."]].map(([label,text]) => (
                <div key={label}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>// {label}</span>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#6B6560", lineHeight:1.8 }}>{text}</p>
                </div>
              ))}
              <div style={{ background:"#E8521A", padding:24 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#0F0E0D", letterSpacing:"0.15em", display:"block", marginBottom:10 }}>// POWERED BY</span>
                <a href="https://revlyn.io" target="_blank" rel="noreferrer" style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#fff", transition:"opacity 0.2s", textDecoration:"none" }} onMouseEnter={e => e.target.style.opacity="0.7"} onMouseLeave={e => e.target.style.opacity="1"}>Revlyn.io Γåù</a>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#0F0E0D", marginTop:6 }}>CRM & RevOps Agency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}