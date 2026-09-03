"use client";
import "./tools.css";

const ADDONS = [
  {
    name: "Calendly / scheduling tools",
    pairsWith: "Any CRM",
    why: "Removes the back-and-forth of booking calls, and most sync straight into activity timelines.",
  },
  {
    name: "Zapier or Make",
    pairsWith: "Any CRM",
    why: "Connects your CRM to tools that don't have a native integration - useful glue for smaller stacks.",
  },
  {
    name: "Gong or Chorus",
    pairsWith: "Salesforce, HubSpot",
    why: "Call recording and conversation intelligence for teams doing enough calls to justify the cost.",
  },
  {
    name: "Clearbit or similar enrichment tools",
    pairsWith: "HubSpot, Salesforce",
    why: "Fills in firmographic data automatically so reps aren't manually researching every new lead.",
  },
  {
    name: "DocuSign or PandaDoc",
    pairsWith: "Any CRM",
    why: "Keeps contracts and signatures inside the same record as the deal that produced them.",
  },
  {
    name: "Slack integration",
    pairsWith: "Most major CRMs",
    why: "Pushes deal updates into the channels your team already watches, instead of a separate notification feed.",
  },
];

export default function AddOns() {
  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">Integrations and add-ons worth knowing about</h1>
        <p className="cd-subtitle">
          The CRM is the system of record - these are the tools that make it actually useful day to day.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div className="cd-grid">
          {ADDONS.map((a) => (
            <div className="cd-card" key={a.name}>
              <h3 className="cd-result-name">{a.name}</h3>
              <p className="cd-result-meta">Pairs with: {a.pairsWith}</p>
              <p style={{ fontSize: "0.875rem", color: "#3D3A36" }}>{a.why}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
