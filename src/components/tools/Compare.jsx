"use client";
import { useState } from "react";
import { CRM_LIST } from "@/data/crmData";
import "./tools.css";

export default function Compare() {
  const [selected, setSelected] = useState(["hubspot", "pipedrive"]);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 4) {
      setSelected([...selected, id]);
    }
  };

  const chosen = CRM_LIST.filter((c) => selected.includes(c.id));

  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">Compare CRMs side by side</h1>
        <p className="cd-subtitle">Pick up to four to compare directly.</p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div style={{ marginBottom: "2rem" }}>
          {CRM_LIST.map((c) => (
            <button
              key={c.id}
              className={`cd-pill ${selected.includes(c.id) ? "active" : ""}`}
              onClick={() => toggle(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {chosen.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="cd-table">
              <thead>
                <tr>
                  <th></th>
                  {chosen.map((c) => (
                    <th key={c.id} style={{ color: "#0F172A", fontFamily: "'DM Serif Display', serif", fontSize: "1rem" }}>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>CATEGORY</th>
                  {chosen.map((c) => <td key={c.id}>{c.category}</td>)}
                </tr>
                <tr>
                  <th>STARTING PRICE</th>
                  {chosen.map((c) => <td key={c.id}>{c.startingPrice}</td>)}
                </tr>
                <tr>
                  <th>TEAM SIZE FIT</th>
                  {chosen.map((c) => <td key={c.id}>{c.teamSize}</td>)}
                </tr>
                <tr>
                  <th>BEST FOR</th>
                  {chosen.map((c) => <td key={c.id}>{c.bestFor}</td>)}
                </tr>
                <tr>
                  <th>STRENGTHS</th>
                  {chosen.map((c) => (
                    <td key={c.id}>
                      <ul className="cd-list">
                        {c.strengths.map((s) => <li key={s} className="cd-strength">{s}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>WATCH OUT FOR</th>
                  {chosen.map((c) => (
                    <td key={c.id}>
                      <ul className="cd-list">
                        {c.watchOutFor.map((w) => <li key={w} className="cd-watch">{w}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "#8A8680" }}>Pick at least one CRM above to see details.</p>
        )}
      </div>
    </div>
    </>
  );
}
