import { useEffect, useRef } from "react";

export default function StockTicker() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      const wrapper = document.createElement("div");
      wrapper.className = "tradingview-widget-container";
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "tradingview-widget-container__widget";
      wrapper.appendChild(widgetDiv);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName:"NYSE:CRM",    title:"Salesforce" },
          { proName:"NASDAQ:HUBS", title:"HubSpot" },
          { proName:"NASDAQ:MNDY", title:"Monday.com" },
          { proName:"NASDAQ:FRSH", title:"Freshworks" },
          { proName:"NASDAQ:MSFT", title:"Microsoft" },
          { proName:"NYSE:ORCL",   title:"Oracle" },
          { proName:"NASDAQ:ZI",   title:"ZoomInfo" },
          { proName:"NASDAQ:DDOG", title:"Datadog" },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      });
      wrapper.appendChild(script);
      containerRef.current.appendChild(wrapper);
    }, 500);
    return () => { clearTimeout(timeout); if (containerRef.current) containerRef.current.innerHTML = ""; };
  }, []);

  return (
    <>
      <style>{`
        .stockticker-wrapper { background: #0F0E0D; border-bottom: 1px solid rgba(255,255,255,0.06); }
        @media (max-width: 768px) { .stockticker-wrapper { display: none !important; } }
      `}</style>
      <div className="stockticker-wrapper">
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 32px 0" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"rgba(242,237,228,0.3)", letterSpacing:"0.15em", textTransform:"uppercase" }}>// CRM_STOCKS_LIVE</span>
          <span style={{ width:6, height:6, background:"#22C55E", borderRadius:"50%", boxShadow:"0 0 6px #22C55E", display:"inline-block" }} className="blink" />
        </div>
        <div ref={containerRef} style={{ width:"100%", minHeight:50 }} />
      </div>
    </>
  );
}