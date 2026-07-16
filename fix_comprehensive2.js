const fs = require('fs');
const path = require('path');

// ── 1. Create proper /terms page matching Privacy Policy style ──
const termsContent = `import Link from 'next/link';

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
      <style>{\`
        .terms-hero { background: #0F172A; padding: 80px 32px; }
        .terms-hero h1 { font-family: 'DM Serif Display',serif; font-size: 64px; color: #FAFBFC; letter-spacing: -0.02em; }
        .terms-body { background: #FAFBFC; padding: 64px 32px 96px; }
        @media (max-width: 768px) {
          .terms-hero { padding: 48px 20px !important; }
          .terms-hero h1 { font-size: 36px !important; }
          .terms-body { padding: 40px 20px 64px !important; }
        }
      \`}</style>
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
`;

const termsDir = path.join('src', 'app', 'terms');
if (!fs.existsSync(termsDir)) fs.mkdirSync(termsDir, { recursive: true });
fs.writeFileSync(path.join(termsDir, 'page.js'), termsContent, 'utf8');
console.log('1. /terms page created with Privacy Policy styling');

// ── 2. Fix all page.js files - add SEO meta as HTML meta tags via layout ──
// Since 'use client' pages can't export metadata, we add it via SEOMeta component

// Fix About page
const aboutPage = `'use client';
import About from '../../views/About';
import Head from 'next/head';
export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About CRM Daily | CRM and GTM Intelligence</title>
        <meta name="description" content="CRM Daily is your daily source of CRM, GTM and RevOps intelligence. No vendor bias, no commissions - just expert reporting for revenue teams." />
      </Head>
      <About />
    </>
  );
}
`;
fs.writeFileSync('src/app/about/page.js', aboutPage, 'utf8');
console.log('2a. About page - meta added');

// Fix Newsletter page
const newsletterPage = `'use client';
import Newsletter from '../../views/Newsletter';
import Head from 'next/head';
export default function NewsletterPage() {
  return (
    <>
      <Head>
        <title>CRM Daily Newsletter | Daily CRM and GTM Intelligence</title>
        <meta name="description" content="Get the CRM Daily newsletter - the top CRM, GTM and RevOps stories every morning. Free, no spam, unsubscribe anytime." />
      </Head>
      <Newsletter />
    </>
  );
}
`;
fs.writeFileSync('src/app/newsletter/page.js', newsletterPage, 'utf8');
console.log('2b. Newsletter page - meta added');

// Fix Contact page
const contactPage = `'use client';
import Contact from '../../views/Contact';
import Head from 'next/head';
export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact CRM Daily | Get in Touch</title>
        <meta name="description" content="Contact the CRM Daily team. For editorial inquiries, partnerships, or feedback - we read every message. Email hello@crmdaily.co." />
      </Head>
      <Contact />
    </>
  );
}
`;
fs.writeFileSync('src/app/contact/page.js', contactPage, 'utf8');
console.log('2c. Contact page - meta added');

// Fix CRM Tools page
const crmToolsPage = `'use client';
import CRMTools from '../../views/CRMTools';
import Head from 'next/head';
export default function CRMToolsPage() {
  return (
    <>
      <Head>
        <title>CRM Tools Directory | Compare 50+ CRM Platforms</title>
        <meta name="description" content="Browse and compare 50+ CRM tools. HubSpot, Salesforce, Pipedrive, Monday CRM and more - reviewed and rated by the CRM Daily team." />
      </Head>
      <CRMTools />
    </>
  );
}
`;
fs.writeFileSync('src/app/crm-tools/page.js', crmToolsPage, 'utf8');
console.log('2d. CRM Tools page - meta added');

// ── 3. Fix encoding in Newsletter, Contact, CRMTools views ──
const viewFiles = [
  'src/views/Newsletter.jsx',
  'src/views/Contact.jsx',
  'src/views/CRMTools.jsx',
];

viewFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');

  // Remove BOM
  c = c.replace(/^\uFEFF/, '');

  // Fix em dashes to hyphens
  c = c.replace(/\u2014/g, '-');
  c = c.replace(/\u2013/g, '-');
  c = c.replace(/&mdash;/g, '-');
  c = c.replace(/&ndash;/g, '-');

  // Fix common garbled chars
  c = c.replace(/â€™/g, "'");
  c = c.replace(/â€œ/g, '"');
  c = c.replace(/â€/g, '"');
  c = c.replace(/â€"/g, '-');
  c = c.replace(/â€˜/g, "'");
  c = c.replace(/Ã©/g, 'e');
  c = c.replace(/â†'/g, 'Go');
  c = c.replace(/Â·/g, '·');
  c = c.replace(/Â©/g, '©');

  fs.writeFileSync(filePath, c, 'utf8');
  console.log('3. Encoding fixed:', filePath);
});

// ── 4. Fix em dashes EVERYWHERE in all JSX/JS files ──
const allFiles = [
  'src/views/Home.jsx',
  'src/views/News.jsx',
  'src/views/Guides.jsx',
  'src/views/Tools.jsx',
  'src/views/About.jsx',
  'src/views/Newsletter.jsx',
  'src/views/Contact.jsx',
  'src/views/CRMTools.jsx',
  'src/views/Privacy.jsx',
  'src/components/Footer.jsx',
  'src/components/Sidebar.jsx',
  'src/components/Navbar.jsx',
  'src/components/ArticleCard.jsx',
  'src/app/glossary/page.jsx',
  'src/app/article/[slug]/ArticleClient.js',
];

allFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');
  const before = c.length;

  // Fix em dashes in text content (not in CSS/style values)
  c = c.replace(/\u2014/g, '-');
  c = c.replace(/\u2013/g, '-');
  c = c.replace(/&mdash;/g, '-');
  c = c.replace(/&ndash;/g, '-');
  c = c.replace(/\u2018/g, "'");
  c = c.replace(/\u2019/g, "'");
  c = c.replace(/\u201C/g, '"');
  c = c.replace(/\u201D/g, '"');

  if (c.length !== before) {
    fs.writeFileSync(filePath, c, 'utf8');
    console.log('4. Em dashes fixed:', filePath);
  }
});

// ── 5. Fix Footer - ensure Terms links to /terms not /privacy ──
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');
footer = footer.replace(
  /\["Terms of Service","\/privacy"\]/g,
  '["Terms of Service","/terms"]'
);
// Make sure it exists
if (!footer.includes('Terms of Service')) {
  footer = footer.replace(
    '["Privacy Policy","/privacy"]',
    '["Privacy Policy","/privacy"],["Terms of Service","/terms"]'
  );
}
fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('5. Footer Terms link fixed to /terms');

// ── 6. Fix Tools.jsx - ensure no URL params cause empty page ──
let tools = fs.readFileSync('src/views/Tools.jsx', 'utf8');
// Remove any remaining useSearchParams
tools = tools.replace(/import \{ useSearchParams \} from ['"]next\/navigation['"];\n?/g, '');
tools = tools.replace(/const searchParams = useSearchParams\(\);\n\s*/g, '');
tools = tools.replace(/const params = searchParams;\n\s*/g, '');
tools = tools.replace(/const categoryFilter = searchParams\.get\(['"']category['"']\) \|\| ['"];/g, "const categoryFilter = '';");
// Ensure articles = all
tools = tools.replace(
  /const articles = categoryFilter[\s\S]*?: all;/,
  'const articles = all;'
);
fs.writeFileSync('src/views/Tools.jsx', tools, 'utf8');
console.log('6. Tools.jsx - URL params removed, shows all articles');
console.log('   Has searchParams.get:', tools.includes('searchParams.get'));
console.log('   Articles = all:', tools.includes('const articles = all;'));

console.log('\nAll done! Push to GitHub.');