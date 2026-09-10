import { INDUSTRIES, getIndustry } from "@/data/industriesData";
import Link from "next/link";
import FAQAccordion from "@/components/industries/FAQAccordion";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `CRM for ${industry.name}`,
    description: industry.intro,
  };
}

const ACCENT = "#E85D3A";

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return (
      <div style={{ padding: "96px 32px", textAlign: "center", fontFamily: "'Inter',sans-serif" }}>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 32 }}>Industry not found</h1>
        <Link href="/industries" style={{ color: ACCENT }}>← Back to all industries</Link>
      </div>
    );
  }

  const otherIndustries = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 4);

  return (
    <>
      <style>{`
        .ind-hero { background:#0F172A; padding:64px 32px; }
        .ind-body { background:#FAFBFC; padding:56px 32px 96px; }
        .ind-inner { max-width:820px; margin:0 auto; }
        .ind-section-label { font-family:'Space Mono',monospace; font-size:10px; color:${ACCENT}; letter-spacing:0.15em; margin:0 0 12px; display:block; }
        .ind-section-heading { font-family:'DM Serif Display',serif; font-size:24px; color:#0F172A; margin:0 0 18px; }
        .ind-list { margin:0 0 40px; padding:0; list-style:none; }
        .ind-list li { display:flex; gap:12px; padding:14px 0; border-bottom:1px solid rgba(15,23,42,0.08); font-family:'Inter',sans-serif; font-size:14.5px; line-height:1.6; color:#3D3A36; }
        .ind-list li::before { content:"→"; color:${ACCENT}; flex-shrink:0; font-weight:700; }
        .ind-cta { background:#0F172A; padding:32px; display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between; margin-bottom:48px; }
        .ind-cta-btn { font-family:'Space Mono',monospace; font-size:11px; font-weight:700; letter-spacing:0.08em; text-decoration:none; padding:12px 22px; }
        .ind-tools-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; margin-bottom:48px; }
        .ind-tool-card { border:1px solid rgba(15,23,42,0.1); border-top:2px solid ${ACCENT}; padding:18px; background:#fff; }
        .ind-tool-logo { width:36px; height:36px; object-fit:contain; margin-bottom:10px; display:block; }
        .ind-tool-name { font-family:'DM Serif Display',serif; font-size:15px; color:#0F172A; margin:0 0 6px; }
        .ind-tool-blurb { font-family:'Inter',sans-serif; font-size:12px; line-height:1.55; color:#64748B; margin:0; }
        .ind-related { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; }
        .ind-related a { display:block; padding:16px; border:1px solid rgba(15,23,42,0.1); border-top:2px solid ${ACCENT}; text-decoration:none; color:#0F172A; font-family:'Inter',sans-serif; font-size:13.5px; font-weight:600; }
        @media (max-width: 768px) {
          .ind-hero { padding:44px 20px; }
          .ind-body { padding:40px 20px 64px; }
        }
      `}</style>

      <div className="ind-hero">
        <div className="ind-inner">
          <Link href="/industries" style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(250,251,252,0.5)", textDecoration: "none", letterSpacing: "0.1em" }}>
            ← ALL INDUSTRIES
          </Link>
          <p className="ind-section-label" style={{ marginTop: 20 }}>// CRM_BY_INDUSTRY</p>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(30px,4.5vw,44px)", color: "#FAFBFC", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 12px" }}>
            CRM for {industry.name}
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(250,251,252,0.6)", margin: 0 }}>
            {industry.tagline}
          </p>
        </div>
      </div>

      <div className="ind-body">
        <div className="ind-inner">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.75, color: "#0F172A", marginBottom: 48 }}>
            {industry.intro}
          </p>

          <p className="ind-section-label">WHY IT MATTERS</p>
          <h2 className="ind-section-heading">The relationship problem {industry.name.toLowerCase()} actually has</h2>
          <ul className="ind-list">
            {industry.whyItMatters.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <p className="ind-section-label">WHAT TO LOOK FOR</p>
          <h2 className="ind-section-heading">Choosing a CRM for {industry.name.toLowerCase()}</h2>
          <ul className="ind-list">
            {industry.whatToLookFor.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <p className="ind-section-label">RECOMMENDED CRMS</p>
          <h2 className="ind-section-heading">CRMs worth considering for {industry.name.toLowerCase()}</h2>
          <div className="ind-tools-grid">
            {industry.recommendedTools.map((t) => (
              <div className="ind-tool-card" key={t.name}>
                <img src={t.logo} alt={t.name} className="ind-tool-logo" />
                <p className="ind-tool-name">{t.name}</p>
                <p className="ind-tool-blurb">{t.blurb}</p>
              </div>
            ))}
          </div>

          <div className="ind-cta">
            <div>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: ACCENT, letterSpacing: "0.1em", margin: "0 0 6px" }}>NOT SURE WHERE TO START</p>
              <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 19, color: "#FAFBFC", margin: 0 }}>Match your needs to a CRM in a few questions</p>
            </div>
            <Link href="/tools/crm-matcher" className="ind-cta-btn" style={{ background: ACCENT, color: "#fff" }}>
              OPEN CRM MATCHER →
            </Link>
          </div>

          <p className="ind-section-label">FAQ</p>
          <h2 className="ind-section-heading">Common questions about CRM for {industry.name.toLowerCase()}</h2>
          <div style={{ marginBottom: 48 }}>
            <FAQAccordion faqs={industry.faqs} />
          </div>

          <p className="ind-section-label">OTHER INDUSTRIES</p>
          <div className="ind-related">
            {otherIndustries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`}>{i.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}