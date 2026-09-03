'use client';
import { motion } from "framer-motion";

const ACCENT = "#E8521A";

const GROUPS = [
  {
    label: "Pick a tool",
    heading: "Find the right CRM, fast",
    items: [
      { num: "01", badge: "INTERACTIVE", meta: "2 MIN", name: "CRM Matcher", desc: "Filter by category and budget to build a shortlist.", cta: "START MATCHING", href: "/tools/crm-matcher" },
      { num: "02", badge: "QUIZ", meta: "5 QUESTIONS", name: "Do You Even Need a CRM?", desc: "A blunt 5-question check before you spend a cent.", cta: "TAKE THE CHECK", href: "/tools/do-you-need-a-crm" },
      { num: "03", badge: "CALCULATOR", meta: "LIVE NUMBERS", name: "ROI Calculator", desc: "What staying disorganised costs you, month by month.", cta: "RUN THE MATHS", href: "/tools/roi-calculator" },
      { num: "04", badge: "INTERACTIVE", meta: "3 QUESTIONS", name: "Stack Recommender", desc: "Three questions, one recommendation.", cta: "GET A PICK", href: "/tools/stack-recommender" },
    ],
  },
  {
    label: "Research",
    heading: "See the whole market at once",
    items: [
      { num: "05", badge: "INDEX", meta: "5 CATEGORIES", name: "CRM Categories", desc: "Every major CRM sorted by what it's actually built for.", cta: "BROWSE CATEGORIES", href: "/tools/categories" },
      { num: "06", badge: "COMPARISON", meta: "UP TO 4 TOOLS", name: "Side-by-Side Compare", desc: "Put up to four CRMs next to each other.", cta: "COMPARE TOOLS", href: "/tools/compare" },
      { num: "07", badge: "PLAYBOOK", meta: "12 GUIDES", name: "Switching From X", desc: "Considering a move off your current CRM? Start here.", cta: "SEE MIGRATION GUIDES", href: "/tools/alternatives" },
    ],
  },
  {
    label: "Directory",
    heading: "Browse every listing",
    items: [
      { num: "08", badge: "DIRECTORY", meta: "16 TOOLS", name: "CRM Directory", desc: "Our full, regularly updated platform list.", cta: "OPEN DIRECTORY", href: "/tools/directory" },
      { num: "09", badge: "DIRECTORY", meta: "40+ ADD-ONS", name: "Integrations & Add-ons", desc: "What's worth bolting onto whatever CRM you run.", cta: "SEE ADD-ONS", href: "/tools/add-ons" },
    ],
  },
];

export default function ToolsHub() {
  return (
    <section className="tools-hub">
      <style>{`
        .tools-hub { background:#FAFBFC; padding:56px 32px 76px; font-family:'Inter',sans-serif; }
        .tools-hub-inner { max-width:1400px; margin:0 auto; }

        .tools-group { margin-bottom:44px; }
        .tools-group:last-child { margin-bottom:0; }
        .tools-group-head { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .tools-group-dash { width:18px; height:1.5px; background:${ACCENT}; flex-shrink:0; }
        .tools-group-label { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:${ACCENT}; font-weight:700; }
        .tools-group-heading { font-family:'DM Serif Display',serif; font-size:28px; color:#0F172A; margin:0 0 22px; letter-spacing:-0.01em; }

        .tools-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }

        .tool-card {
          position:relative; overflow:hidden; background:#fff; border:1px solid rgba(15,23,42,0.1);
          border-top:2px solid ${ACCENT}; padding:20px 20px 18px; text-decoration:none; color:inherit;
          display:flex; flex-direction:column; min-height:210px;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .tool-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -12px rgba(15,23,42,0.2); }

        .tool-card-num {
          position:absolute; top:-6px; right:8px; font-family:'DM Serif Display',serif;
          font-size:84px; color:rgba(15,23,42,0.055); line-height:1; user-select:none; pointer-events:none;
        }

        .tool-card-badges { display:flex; align-items:center; gap:8px; margin-bottom:14px; position:relative; z-index:1; }
        .tool-card-badge {
          background:${ACCENT}; color:#fff; font-family:'Space Mono',monospace; font-size:9px; font-weight:700;
          letter-spacing:0.08em; padding:4px 8px; display:inline-block;
        }
        .tool-card-meta {
          font-family:'Space Mono',monospace; font-size:9px; letter-spacing:0.06em; color:#94A3B8;
        }

        .tool-card-name {
          font-family:'DM Serif Display',serif; font-size:19px; color:#0F172A; margin:0 0 8px;
          line-height:1.25; position:relative; z-index:1;
        }
        .tool-card-desc {
          font-family:'Inter',sans-serif; font-size:13px; line-height:1.6; color:#64748B; margin:0;
          flex:1; position:relative; z-index:1;
        }

        .tool-card-divider { height:1px; background:rgba(15,23,42,0.08); margin:16px 0 12px; position:relative; z-index:1; }

        .tool-card-cta {
          font-family:'Space Mono',monospace; font-size:10px; font-weight:700; letter-spacing:0.08em;
          color:#0F172A; display:flex; align-items:center; justify-content:space-between; position:relative; z-index:1;
        }
        .tool-card-arrow { color:${ACCENT}; display:inline-block; transition: transform 0.2s ease; }
        .tool-card:hover .tool-card-arrow { transform: translateX(4px); }

        @media (max-width: 768px) {
          .tools-hub { padding:40px 20px 56px; }
          .tools-group-heading { font-size:22px; }
        }
      `}</style>

      <div className="tools-hub-inner">
        {GROUPS.map((group) => (
          <div className="tools-group" key={group.heading}>
            <div className="tools-group-head">
              <span className="tools-group-dash" />
              <span className="tools-group-label">{group.label}</span>
            </div>
            <h2 className="tools-group-heading">{group.heading}</h2>

            <div className="tools-grid">
              {group.items.map((item, i) => (
                <motion.a
                  href={item.href}
                  key={item.name}
                  className="tool-card"
                  initial={{ opacity:0, y:14 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-40px" }}
                  transition={{ duration:0.35, delay: i * 0.05 }}
                >
                  <span className="tool-card-num">{item.num}</span>

                  <div className="tool-card-badges">
                    <span className="tool-card-badge">{item.badge}</span>
                    <span className="tool-card-meta">{item.meta}</span>
                  </div>

                  <h3 className="tool-card-name">{item.name}</h3>
                  <p className="tool-card-desc">{item.desc}</p>

                  <div className="tool-card-divider" />

                  <div className="tool-card-cta">
                    <span>{item.cta}</span>
                    <span className="tool-card-arrow">→</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
