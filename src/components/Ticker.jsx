import { tickerItems } from "../data/articles";

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <div style={{ background: "#0F0E0D", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "9px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <div style={{ flexShrink: 0, padding: "0 20px 0 32px", display: "flex", alignItems: "center", gap: 8, borderRight: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ width: 6, height: 6, background: "#22C55E", borderRadius: "50%", boxShadow: "0 0 6px #22C55E" }} className="blink" />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#22C55E", letterSpacing: "0.15em", fontWeight: 700 }}>BREAKING</span>
        </div>
        <div style={{ overflow: "hidden", flex: 1, paddingLeft: 20 }}>
          <div className="ticker-animate" style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(242,237,228,0.75)", letterSpacing: "0.06em" }}>
            {doubled.map((item, i) => (
              <span key={i}>{item} &nbsp;&nbsp;·&nbsp;&nbsp; </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}