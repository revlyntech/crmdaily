import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | CRM Daily',
  description: 'Terms of Service for CRM Daily - your daily CRM and GTM intelligence publication. Read our terms before using the site.',
};

export default function TermsPage() {
  const sections = [
    ["1. Acceptance of Terms", "By accessing CRM Daily (crmdaily.co), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the site."],
    ["2. Use of Content", "All articles, guides, glossary entries and tool reviews published on CRM Daily are for informational purposes only. Nothing on this site constitutes financial, legal, or professional advice. Always consult a qualified professional before making business decisions."],
    ["3. Intellectual Property", "All content on CRM Daily is owned by CRM Daily and protected by copyright law. You may not reproduce, distribute, modify or create derivative works from any content without prior written permission from CRM Daily."],
    ["4. Newsletter", "By subscribing to the CRM Daily newsletter, you agree to receive daily email updates. You can unsubscribe at any time using the link at the bottom of any email we send you."],
    ["5. Third Party Links", "CRM Daily links to third-party websites and tools for reference. We are not responsible for the content, accuracy, privacy practices or reliability of those external sites."],
    ["6. Accuracy of Information", "We make every effort to ensure content is accurate and up to date. However, CRM Daily does not guarantee the completeness, accuracy or timeliness of any information published on this site."],
    ["7. No Warranties", "CRM Daily is provided on an 'as is' basis without warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted, error-free or free of viruses."],
    ["8. Limitation of Liability", "CRM Daily and its team shall not be liable for any indirect, incidental, special or consequential damages arising from your use of the site or reliance on any content published here."],
    ["9. Changes to Terms", "We may update these Terms of Service at any time without prior notice. Continued use of CRM Daily after any changes constitutes your acceptance of the updated terms."],
    ["10. Contact", "For questions about these Terms of Service, contact us at hello@crmdaily.co or through our contact page."],
  ];

  return (
    <>
      <style>{`
        .terms-hero { background: #0F172A; padding: 80px 32px; }
        .terms-hero h1 { font-family: 'DM Serif Display',serif; font-size: 64px; color: #FAFBFC; letter-spacing: -0.02em; }
        .terms-body { background: #FAFBFC; padding: 64px 32px 96px; }
        @media (max-width: 768px) {
          .terms-hero { padding: 48px 20px !important; }
          .terms-hero h1 { font-size: 36px !important; }
          .terms-body { padding: 40px 20px 64px !important; }
        }
      `}</style>
      <div>
        <div className="terms-hero">
          <div style={{ maxWidth:1400, margin:"0 auto" }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E85D3A", letterSpacing:"0.15em", display:"block", marginBottom:20 }}>// LEGAL</span>
            <h1>Terms of Service</h1>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,237,228,0.25)", marginTop:12, letterSpacing:"0.08em" }}>LAST UPDATED: JULY 2026</p>
          </div>
        </div>
        <div className="terms-body">
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, lineHeight:1.8, color:"rgba(15,23,42,0.7)", marginBottom:48 }}>
              Please read these Terms of Service carefully before using CRM Daily. These terms govern your use of our website and content.
            </p>
            {sections.map(([title, body]) => (
              <div key={title} style={{ marginBottom:40, paddingBottom:40, borderBottom:"1px solid #E8ECF1" }}>
                <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:700, color:"#0F172A", marginBottom:12 }}>{title}</h2>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, lineHeight:1.8, color:"rgba(15,23,42,0.7)" }}>{body}</p>
              </div>
            ))}
            <div style={{ marginTop:48, display:"flex", gap:16, flexWrap:"wrap" }}>
              <Link href="/privacy" style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#E85D3A", textDecoration:"none" }}>
                Privacy Policy
              </Link>
              <Link href="/" style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(15,23,42,0.5)", textDecoration:"none" }}>
                Back to CRM Daily
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
