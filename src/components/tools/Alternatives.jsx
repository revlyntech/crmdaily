"use client";
import "./tools.css";

const SWITCH_GUIDES = [
  {
    from: "HubSpot",
    reason: "Outgrown the free tier costs, or want lighter marketing bloat",
    alternatives: ["Pipedrive", "Close", "Freshsales"],
  },
  {
    from: "Salesforce",
    reason: "Too complex or expensive for a small-to-mid size team",
    alternatives: ["HubSpot", "Zoho CRM", "Monday CRM"],
  },
  {
    from: "A spreadsheet",
    reason: "Lost a deal to a missed follow-up, or added a second person to sales",
    alternatives: ["Pipedrive", "Freshsales", "Nimble"],
  },
  {
    from: "Zoho CRM",
    reason: "Want a more modern interface or deeper single-purpose sales tools",
    alternatives: ["Pipedrive", "Close", "HubSpot"],
  },
];

export default function Alternatives() {
  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">Switching from something else</h1>
        <p className="cd-subtitle">
          Common jumping-off points and where teams tend to land instead.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div className="cd-grid">
          {SWITCH_GUIDES.map((g) => (
            <div className="cd-card" key={g.from}>
              <p className="cd-label">SWITCHING FROM</p>
              <h2 className="cd-result-name">{g.from}</h2>
              <p style={{ color: "#3D3A36", fontSize: "0.875rem", marginBottom: "1rem" }}>{g.reason}</p>
              <p className="cd-label">WORTH LOOKING AT</p>
              <ul className="cd-list">
                {g.alternatives.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
