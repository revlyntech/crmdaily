"use client";
import { useState } from "react";
import { CRM_LIST } from "@/data/crmData";
import "./tools.css";

const STEPS = [
  {
    key: "size",
    q: "How big is your team?",
    options: [
      { label: "Just me or 2-3 people", value: "tiny" },
      { label: "4-25 people", value: "small" },
      { label: "26-100 people", value: "mid" },
      { label: "100+ people", value: "large" },
    ],
  },
  {
    key: "priority",
    q: "What matters most right now?",
    options: [
      { label: "Keeping cost as low as possible", value: "price" },
      { label: "Marketing and lead nurturing", value: "marketing" },
      { label: "Fast, simple sales pipeline tracking", value: "pipeline" },
      { label: "Deep customization for a complex process", value: "customization" },
    ],
  },
  {
    key: "workspace",
    q: "What do you mostly work in day to day?",
    options: [
      { label: "Google Workspace", value: "google" },
      { label: "Microsoft 365", value: "microsoft" },
      { label: "Project boards / task tools", value: "boards" },
      { label: "No strong preference", value: "none" },
    ],
  },
];

function recommend(answers) {
  const { size, priority, workspace } = answers;

  if (workspace === "google" && size !== "large") {
    return CRM_LIST.find((c) => c.id === "copper");
  }
  if (priority === "customization" || size === "large") {
    return CRM_LIST.find((c) => c.id === "salesforce");
  }
  if (priority === "marketing") {
    return CRM_LIST.find((c) => c.id === "hubspot");
  }
  if (workspace === "boards") {
    return CRM_LIST.find((c) => c.id === "monday-crm");
  }
  if (priority === "price" && (size === "tiny" || size === "small")) {
    return CRM_LIST.find((c) => c.id === "freshsales");
  }
  return CRM_LIST.find((c) => c.id === "pipedrive");
}

export default function StackRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const choose = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step + 1 >= STEPS.length) {
      setResult(recommend(updated));
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">Stack recommender</h1>
        <p className="cd-subtitle">
          Three questions, one recommendation - plus what we'd double check before you commit.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">

        <div className="cd-card">
          {!result ? (
            <>
              <p className="cd-label">STEP {step + 1} OF {STEPS.length}</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", margin: "0 0 1.5rem" }}>
                {STEPS[step].q}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {STEPS[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    className="cd-btn cd-btn-secondary"
                    style={{ textAlign: "left", width: "100%" }}
                    onClick={() => choose(STEPS[step].key, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="cd-label">OUR RECOMMENDATION</p>
              <h2 className="cd-result-name">{result.name}</h2>
              <p className="cd-result-meta">{result.category} - {result.startingPrice}</p>
              <p style={{ color: "#3D3A36", marginBottom: "1rem" }}>{result.bestFor}</p>
              <p className="cd-label" style={{ marginTop: "1rem" }}>STRENGTHS</p>
              <ul className="cd-list">
                {result.strengths.map((s) => <li key={s} className="cd-strength">{s}</li>)}
              </ul>
              <p className="cd-label" style={{ marginTop: "1rem" }}>WORTH CHECKING BEFORE YOU COMMIT</p>
              <ul className="cd-list">
                {result.watchOutFor.map((w) => <li key={w} className="cd-watch">{w}</li>)}
              </ul>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                <a href="/tools/compare" className="cd-btn">Compare with alternatives</a>
                <button className="cd-btn cd-btn-secondary" onClick={reset}>Start over</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
