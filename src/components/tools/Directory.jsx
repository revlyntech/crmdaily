"use client";
import { CRM_LIST } from "@/data/crmData";
import "./tools.css";

export default function Directory() {
  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">CRM Directory</h1>
        <p className="cd-subtitle">Every platform we track, in one list.</p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div className="cd-grid">
          {CRM_LIST.map((crm) => (
            <div className="cd-card" key={crm.id}>
              <h3 className="cd-result-name">{crm.name}</h3>
              <p className="cd-result-meta">{crm.category}</p>
              <p style={{ fontSize: "0.875rem", color: "#3D3A36", marginBottom: "0.75rem" }}>
                {crm.bestFor}
              </p>
              <p className="cd-label">STARTING PRICE</p>
              <p style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>{crm.startingPrice}</p>
              <p className="cd-label">TEAM SIZE FIT</p>
              <p style={{ fontSize: "0.875rem" }}>{crm.teamSize}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
