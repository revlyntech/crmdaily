"use client";
import { useState } from "react";

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <style>{`
        .faq-accordion { border-top: 1px solid rgba(15,23,42,0.1); }
        .faq-row {
          border-bottom: 1px solid rgba(15,23,42,0.1);
          padding: 22px 0;
          cursor: pointer;
        }
        .faq-row-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .faq-question {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #0F172A;
          margin: 0;
          line-height: 1.4;
        }
        .faq-icon {
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 400;
          color: rgba(15,23,42,0.35);
          line-height: 1;
          width: 20px;
          text-align: center;
          transition: color 0.15s ease;
        }
        .faq-row:hover .faq-icon { color: #E85D3A; }
        .faq-answer {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          line-height: 1.7;
          color: #64748B;
          margin: 14px 0 0;
          max-width: 68ch;
        }
      `}</style>
      <div className="faq-accordion">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              className="faq-row"
              key={f.q}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="faq-row-head">
                <p className="faq-question">{f.q}</p>
                <span className="faq-icon">{isOpen ? "×" : "+"}</span>
              </div>
              {isOpen && <p className="faq-answer">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}