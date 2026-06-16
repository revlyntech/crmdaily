import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);

  return (
    <div className="fade-in">
      <div style={{ background:"#0F0E0D", padding:"80px 32px" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:20 }}>// GET_IN_TOUCH</span>
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:64, color:"#F2EDE4", letterSpacing:"-0.02em" }}>Contact Us</h1>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(242,237,228,0.45)", marginTop:14 }}>Editorial enquiries, tip submissions, sponsorship, or feedback.</p>
        </div>
      </div>
      <div className="grid-bg" style={{ background:"#F2EDE4", padding:"80px 32px 96px" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          {sent ? (
            <div style={{ background:"#0F0E0D", padding:40, textAlign:"center" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", color:"#22C55E", fontSize:12, letterSpacing:"0.1em" }}>MESSAGE_SENT ✓</span>
              <p style={{ fontFamily:"'Space Mono',monospace", color:"rgba(242,237,228,0.5)", fontSize:12, marginTop:8 }}>We'll respond within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[["YOUR NAME","name","text"],["EMAIL ADDRESS","email","email"],["SUBJECT","subject","text"]].map(([label,field,type]) => (
                <div key={field}>
                  <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:8 }}>// {label}</label>
                  <input type={type} required value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})} className="input-cream" />
                </div>
              ))}
              <div>
                <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.15em", display:"block", marginBottom:8 }}>// MESSAGE</label>
                <textarea required value={form.message} onChange={e => setForm({...form,message:e.target.value})} rows={6} className="input-cream" style={{ resize:"vertical" }} />
              </div>
              <button type="submit" style={{ alignSelf:"flex-start", background:"#0F0E0D", color:"#fff", border:"none", padding:"14px 28px", fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", cursor:"pointer", transition:"background 0.2s" }}
                onMouseEnter={e => e.target.style.background="#E8521A"}
                onMouseLeave={e => e.target.style.background="#0F0E0D"}>
                SEND MESSAGE →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}