import { tickerItems } from "../data/articles";

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <>
      <style>{`
        .ticker-wrapper { background: #0F0E0D; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 9px 0; overflow: hidden; width: 100%; white-space: nowrap; }
        @media (max-width: 768px) { .ticker-wrapper { display: none !important; } }
      `}</style>
      <div className="ticker-wrapper">
        <div style={{ display:"flex", alignItems:"center", gap:0 }}>
          <div style={{ flexShrink:0, padding:"0 20px 0 32px", display:"flex", alignItems:"center", gap:8, borderRight:"1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ width:6, height:6, background:"#22C55E", borderRadius:"50%", boxShadow:"0 0 6px #22C55E", flexShrink:0 }} className="blink" />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#22C55E", letterSpacing:"0.15em", fontWeight:700, whiteSpace:"nowrap" }}>BREAKING</span>
          </div>
          <div style={{ overflow:"hidden", flex:1, paddingLeft:20 }}
            onMouseEnter={e => { const el = e.currentTarget.querySelector('.ticker-scroll'); if (el) el.style.animationPlayState='paused'; }}
            onMouseLeave={e => { const el = e.currentTarget.querySelector('.ticker-scroll'); if (el) el.style.animationPlayState='running'; }}>
            <div className="ticker-scroll ticker-animate-slow"
              style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,237,228,0.75)", letterSpacing:"0.06em", whiteSpace:"nowrap", display:"inline-block" }}>
              {doubled.map((item,i) => (
                <span key={i} style={{ whiteSpace:"nowrap" }}>{item} &nbsp;&nbsp;·&nbsp;&nbsp;{" "}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}