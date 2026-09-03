"use client";
import { CRM_LIST, CATEGORIES } from "@/data/crmData";
import "./tools.css";

export default function Categories() {
  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">The CRM landscape, by category</h1>
        <p className="cd-subtitle">
          Most CRMs get compared on price alone. Category is usually the bigger fork in the road.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        {CATEGORIES.map((cat) => {
          const items = CRM_LIST.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", marginBottom: "1rem", color: "#0F172A" }}>
                {cat}
              </h2>
              <div className="cd-grid">
                {items.map((crm) => (
                  <div className="cd-card" key={crm.id}>
                    <h3 className="cd-result-name">{crm.name}</h3>
                    <p className="cd-result-meta">{crm.startingPrice}</p>
                    <p style={{ fontSize: "0.875rem", color: "#3D3A36" }}>{crm.bestFor}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
