"use client";
import { useState, useMemo } from "react";
import { CRM_LIST, CATEGORIES } from "@/data/crmData";
import "./tools.css";

const TEAM_SIZES = ["Any", "1-10", "11-50", "51-100", "100+"];

function fitsTeamSize(crm, bucket) {
  if (bucket === "Any") return true;
  // crm.teamSize is a free-text range like "1-25" or "10-1000+" - do a
  // simple overlap check against the selected bucket's rough numeric range.
  const ranges = {
    "1-10": [1, 10],
    "11-50": [11, 50],
    "51-100": [51, 100],
    "100+": [100, Infinity],
  };
  const [selLow, selHigh] = ranges[bucket];
  const nums = crm.teamSize.match(/\d+/g)?.map(Number) || [1, 9999];
  const crmLow = nums[0];
  const crmHigh = crm.teamSize.includes("+") ? Infinity : (nums[1] || nums[0]);
  return crmLow <= selHigh && crmHigh >= selLow;
}

export default function CRMMatcher() {
  const [category, setCategory] = useState("All");
  const [pricing, setPricing] = useState("Any");
  const [teamSize, setTeamSize] = useState("Any");

  const filtered = useMemo(() => {
    return CRM_LIST.filter((crm) => {
      const catMatch = category === "All" || crm.category === category;
      const priceMatch =
        pricing === "Any" ||
        (pricing === "Low" && crm.pricingTier.includes("low")) ||
        (pricing === "Mid" && crm.pricingTier.includes("mid")) ||
        (pricing === "High" && crm.pricingTier === "high");
      const sizeMatch = fitsTeamSize(crm, teamSize);
      return catMatch && priceMatch && sizeMatch;
    });
  }, [category, pricing, teamSize]);


  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">CRM Matcher</h1>
        <p className="cd-subtitle">
          Filter by category and budget to narrow the field before you start demoing anything.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div style={{ marginBottom: "1rem" }}>
          <p className="cd-label">TEAM SIZE</p>
          {TEAM_SIZES.map((t) => (
            <button
              key={t}
              className={`cd-pill ${teamSize === t ? "active" : ""}`}
              onClick={() => setTeamSize(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <p className="cd-label">CATEGORY</p>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              className={`cd-pill ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <p className="cd-label">BUDGET</p>
          {["Any", "Low", "Mid", "High"].map((p) => (
            <button
              key={p}
              className={`cd-pill ${pricing === p ? "active" : ""}`}
              onClick={() => setPricing(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <p style={{ color: "#8A8680", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {filtered.length} match{filtered.length === 1 ? "" : "es"}
        </p>

        <div className="cd-grid">
          {filtered.map((crm) => (
            <div className="cd-card" key={crm.id}>
              <h3 className="cd-result-name">{crm.name}</h3>
              <p className="cd-result-meta">{crm.category} - {crm.startingPrice}</p>
              <p style={{ fontSize: "0.875rem", color: "#3D3A36", marginBottom: "0.75rem" }}>
                {crm.bestFor}
              </p>
              <ul className="cd-list">
                {crm.strengths.slice(0, 2).map((s) => (
                  <li key={s} className="cd-strength">{s}</li>
                ))}
              </ul>
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ color: "#8A8680" }}>Nothing matches those filters - try widening your budget or category.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
