import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | CRM Daily',
  description: 'Terms of Service for CRM Daily — your daily CRM and GTM intelligence publication.',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth:800, margin:'0 auto', padding:'80px 32px', fontFamily:"'Inter',sans-serif", color:'#0F172A' }}>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#E85D3A', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// Legal</div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:64, fontWeight:700, marginBottom:8 }}>Terms of Service</h1>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(15,23,42,0.5)', marginBottom:48 }}>Last updated: July 2026</p>
      
      {[
        { title:'1. Acceptance of Terms', body:'By accessing CRM Daily (crmdaily.co), you agree to these Terms of Service. If you do not agree, please do not use the site.' },
        { title:'2. Content', body:'All articles, guides, glossary entries and tool reviews on CRM Daily are for informational purposes only. We do not provide financial, legal or professional advice. Always consult a qualified professional before making business decisions.' },
        { title:'3. Intellectual Property', body:'All content on CRM Daily is owned by CRM Daily and protected by copyright. You may not reproduce, distribute or create derivative works without prior written permission.' },
        { title:'4. Third Party Links', body:'CRM Daily links to third-party websites and tools. We are not responsible for the content, accuracy or practices of those sites.' },
        { title:'5. No Warranties', body:'CRM Daily is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness or timeliness of any content.' },
        { title:'6. Limitation of Liability', body:'CRM Daily shall not be liable for any indirect, incidental or consequential damages arising from your use of the site.' },
        { title:'7. Changes', body:'We may update these terms at any time. Continued use of CRM Daily after changes constitutes acceptance of the new terms.' },
        { title:'8. Contact', body:'For questions about these terms, contact us at hello@crmdaily.co.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom:32, paddingBottom:32, borderBottom:'1px solid #E8ECF1' }}>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:700, marginBottom:12 }}>{s.title}</h2>
          <p style={{ fontSize:16, lineHeight:1.8, color:'rgba(15,23,42,0.75)' }}>{s.body}</p>
        </div>
      ))}
      
      <Link href="/" style={{ display:'inline-block', marginTop:32, fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#E85D3A', textDecoration:'none' }}>
        ← Back to CRM Daily
      </Link>
    </div>
  );
}
