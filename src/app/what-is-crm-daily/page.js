import Link from 'next/link';
import { SITE_ID, ORG_ID, ABOUT_URL, faqSchema, graph } from '../../lib/schema';

export const metadata = {
  title: 'What is CRM Daily? Publisher, Coverage and FAQ',
  description:
    'CRM Daily (crmdaily.co) is a free daily publication about CRM, GTM and RevOps, powered by Revlyn. See what it covers, who it is for and common questions.',
  alternates: { canonical: ABOUT_URL },
};

// Used twice: shown on the page and sent to search engines as structured data.
// Keeping one list means the visible text and the structured data always match.
const FAQS = [
  {
    q: 'What is CRM Daily?',
    a: 'CRM Daily (crmdaily.co) is a free daily publication about CRM, GTM and RevOps. It publishes news, guides, tool comparisons and reviews for people who choose, run and fix customer relationship management software and the revenue operations around it.',
  },
  {
    q: 'Who is behind CRM Daily?',
    a: 'CRM Daily is powered by Revlyn, a specialist CRM, RevOps and AI enablement agency (revlyn.io).',
  },
  {
    q: 'Is CRM Daily a CRM software product?',
    a: 'No. CRM Daily is a publication, not software. It does not sell a CRM, and it is not affiliated with similarly named software products such as DailyCRM.',
  },
  {
    q: 'What does CRM Daily cover?',
    a: 'CRM news, tool comparisons and reviews, GTM and RevOps guides, a glossary of CRM terms, CRM guides for 24 industries and nine free interactive tools, such as a CRM matcher and an ROI calculator.',
  },
  {
    q: 'How often does CRM Daily publish?',
    a: 'Two new articles every day, and there is a free email newsletter.',
  },
  {
    q: 'Is CRM Daily free?',
    a: 'Yes. Everything on CRM Daily is free to read, and the newsletter is free.',
  },
  {
    q: 'How do I contact CRM Daily or report a mistake?',
    a: 'Email hello@crmdaily.co or use the contact page at crmdaily.co/contact.',
  },
];

const FACTS = [
  ['Name', 'CRM Daily (also written CRMDaily)'],
  ['Website', 'crmdaily.co'],
  ['What it is', 'A free online publication, not software'],
  ['Powered by', 'Revlyn (revlyn.io)'],
  ['Topics', 'CRM, GTM (go-to-market) and RevOps (revenue operations)'],
  ['Publishing rhythm', 'Two new articles every day'],
  ['Price', 'Free to read'],
  ['Contact', 'hello@crmdaily.co'],
];

const COVERS = [
  ['/news', 'News', 'daily CRM and GTM news'],
  ['/guides', 'Guides', 'step-by-step CRM, RevOps and GTM guides'],
  ['/tools', 'Tool reviews', 'CRM tool comparisons and reviews'],
  ['/crm-tools', 'CRM directory', 'CRM products and nine free interactive tools'],
  ['/glossary', 'Glossary', 'plain-English CRM, RevOps and GTM terms'],
  ['/industries', 'Industry guides', 'how to choose a CRM in 24 industries'],
];

const ink = '#0F172A';
const ember = '#E85D3A';
const mono = "'Space Mono', monospace";
const serif = "'DM Serif Display', serif";

const label = { fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: ember, margin: 0 };
const h2 = { fontFamily: serif, fontSize: 30, fontWeight: 700, color: ink, margin: '48px 0 16px', lineHeight: 1.2 };
const body = { fontSize: 17, lineHeight: 1.75, color: 'rgba(15,23,42,0.82)', margin: '0 0 16px' };
const link = { color: ember, textDecoration: 'none', fontWeight: 600 };

// Open-and-close FAQ, in the same style as the FAQ on the industry pages: a
// + / - toggle, one answer open at a time, an accent colour on hover. It uses
// the browser's built-in <details> element, so every answer is already in the
// page's HTML (search engines and AI read it) even while it is collapsed.
const FAQ_CSS = `
  .wid-faq { border-top: 1px solid #CBD5E1; }
  .wid-faq-row { border-bottom: 1px solid #CBD5E1; }
  .wid-faq-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 22px 0; cursor: pointer; list-style: none; }
  .wid-faq-head::-webkit-details-marker { display: none; }
  .wid-faq-head:focus-visible { outline: 2px solid #E85D3A; outline-offset: 4px; }
  .wid-faq-q { font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 700; line-height: 1.3; color: #0F172A; margin: 0; transition: color 0.15s ease; }
  .wid-faq-head:hover .wid-faq-q { color: #E85D3A; }
  .wid-faq-icon { flex-shrink: 0; width: 18px; text-align: center; font-family: 'Space Mono', monospace; font-size: 18px; font-weight: 700; line-height: 1.3; color: #E85D3A; }
  .wid-faq-icon::before { content: '+'; }
  .wid-faq-row[open] .wid-faq-icon::before { content: '\u2212'; }
  .wid-faq-a { font-size: 16px; line-height: 1.7; color: rgba(15, 23, 42, 0.72); margin: 0 0 22px; max-width: 68ch; }
`;

export default function WhatIsCrmDailyPage() {
  const pageSchema = graph(
    {
      '@type': 'AboutPage',
      '@id': ABOUT_URL + '#webpage',
      url: ABOUT_URL,
      name: 'What is CRM Daily?',
      description: metadata.description,
      inLanguage: 'en',
      about: { '@id': ORG_ID },
      isPartOf: { '@id': SITE_ID },
    },
    faqSchema(FAQS, ABOUT_URL)
  );

  return (
    <article style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px', fontFamily: "'Inter', sans-serif", color: ink }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <p style={label}>// About</p>
      <h1 style={{ fontFamily: serif, fontSize: 52, fontWeight: 700, lineHeight: 1.05, margin: '12px 0 24px', color: ink }}>What is CRM Daily?</h1>

      <p style={{ ...body, fontSize: 20, lineHeight: 1.6, color: ink }}>
        CRM Daily (crmdaily.co) is a free daily publication about CRM, GTM and RevOps. It publishes news, guides, tool comparisons and reviews for people who choose, run and fix customer relationship management software and the revenue operations around it.
      </p>
      <p style={body}>
        CRM Daily is a publication, not CRM software. It does not sell a CRM, and it is not affiliated with similarly named software products such as DailyCRM. It is powered by Revlyn, a specialist CRM, RevOps and AI enablement agency (revlyn.io).
      </p>

      <h2 style={h2}>CRM Daily at a glance</h2>
      <dl style={{ margin: 0, border: '2px solid ' + ink }}>
        {FACTS.map(([k, v], i) => (
          <div key={k} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 16px', borderTop: i ? '1px solid #CBD5E1' : 'none' }}>
            <dt style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,23,42,0.55)', width: 170, flexShrink: 0, paddingTop: 3 }}>{k}</dt>
            <dd style={{ margin: 0, fontSize: 16, flex: 1, minWidth: 220 }}>{v}</dd>
          </div>
        ))}
      </dl>

      <h2 style={h2}>Who CRM Daily is for</h2>
      <p style={body}>
        CRM managers, RevOps leads, sales operations teams, founders and GTM teams who need to pick, set up or improve a CRM, and want to keep up with the tools and ideas shaping revenue teams.
      </p>

      <h2 style={h2}>What CRM Daily covers</h2>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {COVERS.map(([href, name, text]) => (
          <li key={href} style={{ ...body, margin: '0 0 8px' }}>
            <Link href={href} style={link}>{name}</Link>: {text}
          </li>
        ))}
      </ul>

      <h2 style={h2}>Frequently asked questions</h2>
      <style>{FAQ_CSS}</style>
      <div className="wid-faq">
        {FAQS.map((f) => (
          <details className="wid-faq-row" name="wid-faq" key={f.q}>
            <summary className="wid-faq-head">
              <h3 className="wid-faq-q">{f.q}</h3>
              <span className="wid-faq-icon" aria-hidden="true" />
            </summary>
            <p className="wid-faq-a">{f.a}</p>
          </details>
        ))}
      </div>

      <p style={{ ...body, marginTop: 40 }}>
        <Link href="/newsletter" style={link}>Subscribe to the free newsletter</Link> or <Link href="/contact" style={link}>get in touch</Link>.
      </p>
    </article>
  );
}
