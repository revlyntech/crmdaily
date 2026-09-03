"use client";
import { useState } from "react";
import "./tools.css";

const QUESTIONS = [
  {
    q: "How many people on your team talk to customers or leads?",
    options: [
      { text: "Just me", score: 0 },
      { text: "2-5 people", score: 2 },
      { text: "6+ people", score: 3 },
    ],
  },
  {
    q: "Where do you currently track leads and customers?",
    options: [
      { text: "I remember most of it", score: 3 },
      { text: "A spreadsheet", score: 2 },
      { text: "A proper CRM already", score: -3 },
    ],
  },
  {
    q: "Have you ever lost track of a follow-up and missed a deal because of it?",
    options: [
      { text: "Never happened", score: 0 },
      { text: "Once or twice", score: 2 },
      { text: "More often than I'd like to admit", score: 3 },
    ],
  },
  {
    q: "How many active leads or deals are you juggling right now?",
    options: [
      { text: "Under 10", score: 0 },
      { text: "10-50", score: 2 },
      { text: "50+", score: 3 },
    ],
  },
  {
    q: "Does more than one person need visibility into the same customer relationships?",
    options: [
      { text: "No, it's just me", score: 0 },
      { text: "Sometimes", score: 2 },
      { text: "Yes, constantly", score: 3 },
    ],
  },
];

function getVerdict(score) {
  if (score <= 3) {
    return {
      title: "Not yet - a spreadsheet is still fine",
      body: "Your volume and team size don't justify a CRM subscription yet. Revisit this once you're juggling more leads than you can hold in your head, or once a second person needs the same visibility you have.",
    };
  }
  if (score <= 8) {
    return {
      title: "You're right on the edge",
      body: "You could survive without one a bit longer, but you're likely already losing small things - a follow-up here, a detail there. A lightweight, cheap CRM would probably pay for itself within a month or two.",
    };
  }
  return {
    title: "Yes - you need one now",
    body: "Between your team size, deal volume, and the follow-ups already slipping through, a spreadsheet is actively costing you deals. This is worth fixing this quarter, not eventually.",
  };
}

export default function DoYouNeedCRM() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (points) => {
    const newScore = score + points;
    if (step + 1 >= QUESTIONS.length) {
      setScore(newScore);
      setDone(true);
    } else {
      setScore(newScore);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  const progress = done ? 100 : (step / QUESTIONS.length) * 100;

  return (
    <>
    <div className="cd-tool-hero">
      <div className="cd-tool-hero-inner">
        <p className="cd-eyebrow">CRM DAILY TOOLS</p>
        <h1 className="cd-title">Do you even need a CRM?</h1>
        <p className="cd-subtitle">
          Five honest questions. No sales pitch at the end - just a straight answer.
        </p>
      </div>
    </div>
    <div className="cd-tool-body">
      <div className="cd-tool-inner">
        <div className="cd-progress-bar">
          <div className="cd-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="cd-card">
          {!done ? (
            <>
              <p className="cd-label">QUESTION {step + 1} OF {QUESTIONS.length}</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", margin: "0 0 1.5rem" }}>
                {QUESTIONS[step].q}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.text}
                    className="cd-btn cd-btn-secondary"
                    style={{ textAlign: "left", width: "100%" }}
                    onClick={() => answer(opt.score)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="cd-label">YOUR ANSWER</p>
              <h2 className="cd-result-name">{getVerdict(score).title}</h2>
              <p style={{ color: "#3D3A36", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {getVerdict(score).body}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a href="/tools/crm-matcher" className="cd-btn">
                  Find a CRM that fits
                </a>
                <button className="cd-btn cd-btn-secondary" onClick={reset}>
                  Retake quiz
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
