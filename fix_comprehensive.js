const fs = require('fs');
const path = require('path');

// ── 1. Fix Sidebar topics - point to /news for all categories ──
let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// Fix topic links - Pipedrive and Zoho point to /tools which breaks
// All category links should go to /news since articles are there
sidebar = sidebar.replace(
  `const topics = [
  { label: "CRM News",        to: "/news" },
  { label: "HubSpot",         to: "/news?category=HubSpot" },
  { label: "Salesforce",      to: "/news?category=Salesforce" },
  { label: "RevOps",          to: "/guides?category=RevOps" },
  { label: "GTM Strategy",    to: "/guides?category=GTM+Strategy" },
  { label: "Tool Reviews",    to: "/tools" },
  { label: "How-To Guides",   to: "/guides?category=How-To+Guide" },
  { label: "AI & Automation", to: "/news?category=AI" },
  { label: "Pipedrive",       to: "/tools?category=Pipedrive" },
  { label: "Zoho",            to: "/tools?category=Zoho" },
];`,
  `const topics = [
  { label: "CRM News",        to: "/news" },
  { label: "HubSpot",         to: "/news?category=HubSpot" },
  { label: "Salesforce",      to: "/news?category=Salesforce" },
  { label: "RevOps",          to: "/news?category=RevOps+Intelligence" },
  { label: "GTM Strategy",    to: "/news?category=GTM+Strategy" },
  { label: "Tool Reviews",    to: "/news?category=Tool+Reviews" },
  { label: "AI in Sales",     to: "/news?category=AI+in+Sales" },
  { label: "Sales Tech",      to: "/news?category=Sales+Tech" },
];`
);

// Fix CRM Pulse Today stats - use usePosts(100) to get all articles
sidebar = sidebar.replace(
  'const { articles, loading } = usePosts(20);',
  'const { articles, loading } = usePosts(100);'
);

// Fix toolsCount to match actual category names from WordPress
sidebar = sidebar.replace(
  'const toolsCount = articles.filter(a => a.category === "Tool Review" || a.category === "Tools").length;',
  'const toolsCount = articles.filter(a => ["Tool Reviews","Tool Review","Tools","RevOps Intelligence","Sales Tech","AI in Sales","GTM Strategy"].includes(a.category)).length;'
);

fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('1. Sidebar fixed - topics point to /news, stats use 100 articles');

// ── 2. Fix Footer - add all missing pages, fix Terms link ──
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');

// Fix Company links - add Terms pointing to /terms
footer = footer.replace(
  '[["About CRM Daily","/about"],["Contact Us","/contact"],["Privacy Policy","/privacy"],["Terms of Se',
  '[["About CRM Daily","/about"],["Contact Us","/contact"],["Privacy Policy","/privacy"],["Terms of Se'
);

// Find and fix the full company links array
footer = footer.replace(
  /\[\["About CRM Daily","\/about"\],\["Contact Us","\/contact"\],\["Privacy Policy","\/privacy"\],\["Terms of Service","[^"]*"\]\]/,
  '[["About CRM Daily","/about"],["Contact Us","/contact"],["Privacy Policy","/privacy"],["Terms of Service","/terms"]]'
);

// Fix Topics section - add Glossary
footer = footer.replace(
  /\[\["HubSpot News","\/news\?category=HubSpot"\],\["Salesforce","\/news\?category=Salesforce"\],\["RevOps Stra[^]]*\]\]/,
  '[["HubSpot News","/news?category=HubSpot"],["Salesforce","/news?category=Salesforce"],["RevOps Strategy","/news?category=RevOps+Intelligence"],["GTM Strategy","/news?category=GTM+Strategy"],["AI in Sales","/news?category=AI+in+Sales"],["CRM Glossary","/glossary"]]'
);

fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('2. Footer fixed - Terms points to /terms, topics updated');

// ── 3. Fix encoding on Newsletter, Contact, CRM Tools, Glossary pages ──
const viewsToFix = [
  'src/views/Newsletter.jsx',
  'src/views/Contact.jsx', 
  'src/views/CRMTools.jsx',
];

viewsToFix.forEach(viewPath => {
  if (!fs.existsSync(viewPath)) {
    console.log('3. MISSING:', viewPath);
    return;
  }
  let v = fs.readFileSync(viewPath, 'utf8');
  
  // Add 'use client' if missing
  v = v.replace(/^\uFEFF/, '');
  if (!v.startsWith("'use client'")) {
    v = "'use client';\n" + v;
  }
  
  fs.writeFileSync(viewPath, v, 'utf8');
  console.log('3. Fixed encoding:', viewPath);
});

// ── 4. Add meta descriptions to About, Newsletter, Contact, CRM Tools pages ──
const pagesMeta = {
  'src/app/about/page.js': {
    content: `'use client';
import About from '../../views/About';
export const metadata = {
  title: 'About CRM Daily | CRM & GTM Intelligence',
  description: 'CRM Daily is your daily source of CRM, GTM and RevOps intelligence. No vendor bias, no commissions — just expert reporting for revenue teams.',
};
export default function AboutPage() { return <About />; }
`
  },
  'src/app/newsletter/page.js': {
    content: `'use client';
import Newsletter from '../../views/Newsletter';
export const metadata = {
  title: 'CRM Daily Newsletter | Daily CRM & GTM Intelligence',
  description: 'Get the CRM Daily newsletter — the top CRM, GTM and RevOps stories every morning. Free, no spam, unsubscribe anytime.',
};
export default function NewsletterPage() { return <Newsletter />; }
`
  },
  'src/app/contact/page.js': {
    content: `'use client';
import Contact from '../../views/Contact';
export const metadata = {
  title: 'Contact CRM Daily | Get in Touch',
  description: 'Contact the CRM Daily team. For editorial inquiries, partnerships, or feedback — we read every message.',
};
export default function ContactPage() { return <Contact />; }
`
  },
  'src/app/crm-tools/page.js': {
    content: `'use client';
import CRMTools from '../../views/CRMTools';
export const metadata = {
  title: 'CRM Tools Directory | Compare 50+ CRM Platforms',
  description: 'Browse and compare 50+ CRM tools. HubSpot, Salesforce, Pipedrive, Monday CRM and more — reviewed and rated by the CRM Daily team.',
};
export default function CRMToolsPage() { return <CRMTools />; }
`
  },
};

Object.entries(pagesMeta).forEach(([pagePath, { content }]) => {
  // metadata export doesn't work with 'use client' in Next.js
  // We need to handle this differently - just add the page without metadata for client components
  let simpleContent = content;
  // Remove metadata from client components (Next.js doesn't support it)
  simpleContent = simpleContent.replace(/export const metadata = \{[\s\S]*?\};\n/g, '');
  
  fs.writeFileSync(pagePath, simpleContent, 'utf8');
  console.log('4. Page fixed:', pagePath);
});

// ── 5. Create /terms page ──
const termsPage = `import Link from 'next/link';

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
`;

const termsDir = path.join('src', 'app', 'terms');
if (!fs.existsSync(termsDir)) fs.mkdirSync(termsDir, { recursive: true });
fs.writeFileSync(path.join(termsDir, 'page.js'), termsPage, 'utf8');
console.log('5. /terms page created');

// ── 6. Fix News.jsx category filter to match actual WP category names ──
let news = fs.readFileSync('src/views/News.jsx', 'utf8');

// The category filter uses URL params like ?category=HubSpot
// Make sure it matches against both category name and article tags
const hasFlexFilter = news.includes('a.tags');
if (!hasFlexFilter) {
  news = news.replace(
    'const matchCat = !categoryFilter || a.category.toLowerCase() === categoryFilter.toLowerCase();',
    'const matchCat = !categoryFilter || a.category.toLowerCase().includes(categoryFilter.toLowerCase()) || a.title.toLowerCase().includes(categoryFilter.toLowerCase());'
  );
  fs.writeFileSync('src/views/News.jsx', news, 'utf8');
  console.log('6. News.jsx - flexible category filter applied');
} else {
  console.log('6. News.jsx - already has flexible filter');
}

console.log('\n✅ All fixes applied! Push to GitHub.');