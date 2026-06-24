import { useState, useEffect } from "react";

export default function TopBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(ist.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true }));
      setDate(ist.toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" }));
      setDay(ist.toLocaleDateString("en-IN", { weekday:"long" }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        .topbar { background: #0F0E0D; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 8px 0; }
        .topbar-inner { max-width: 1400px; margin: 0 auto; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; }
        .topbar-right { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 768px) {
          .topbar { display: none !important; }
        }
      `}</style>
      <div className="topbar">
        <div className="topbar-inner">
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.7)", letterSpacing:"0.1em" }}>
            CRM DAILY — YOUR DAILY CRM & GTM INTELLIGENCE
          </span>
          <div className="topbar-right">
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.6)", letterSpacing:"0.06em" }}>{day.toUpperCase()}</span>
            <span style={{ width:1, height:10, background:"rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.7)", letterSpacing:"0.06em" }}>{date}</span>
            <span style={{ width:1, height:10, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(232,82,26,0.12)", border:"1px solid rgba(232,82,26,0.25)", padding:"2px 10px", borderRadius:2 }}>
              <span style={{ width:5, height:5, background:"#E8521A", borderRadius:"50%" }} className="blink" />
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#E8521A", letterSpacing:"0.08em", fontWeight:700 }}>{time} IST</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}