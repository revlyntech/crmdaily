const fs = require('fs');
const path = require('path');

// In Next.js App Router, metadata must be in SERVER components (no 'use client')
// The trick: create a server component that exports metadata + renders the client component

const pages = [
  {
    file: 'src/app/about/page.js',
    content: `import About from '../../views/About';

export const metadata = {
  title: 'About CRM Daily | CRM and GTM Intelligence',
  description: 'CRM Daily is your daily source of CRM, GTM and RevOps intelligence. No vendor bias, no commissions - just expert reporting for revenue teams.',
};

export default function AboutPage() {
  return <About />;
}
`
  },
  {
    file: 'src/app/newsletter/page.js',
    content: `import Newsletter from '../../views/Newsletter';

export const metadata = {
  title: 'CRM Daily Newsletter | Daily CRM and GTM Intelligence',
  description: 'Get the CRM Daily newsletter - the top CRM, GTM and RevOps stories every morning. Free, no spam, unsubscribe anytime.',
};

export default function NewsletterPage() {
  return <Newsletter />;
}
`
  },
  {
    file: 'src/app/contact/page.js',
    content: `import Contact from '../../views/Contact';

export const metadata = {
  title: 'Contact CRM Daily | Get in Touch',
  description: 'Contact the CRM Daily team. For editorial inquiries, partnerships, or feedback - we read every message. Email hello@crmdaily.co.',
};

export default function ContactPage() {
  return <Contact />;
}
`
  },
  {
    file: 'src/app/crm-tools/page.js',
    content: `import CRMTools from '../../views/CRMTools';

export const metadata = {
  title: 'CRM Tools Directory | Compare 50+ CRM Platforms',
  description: 'Browse and compare 50+ CRM tools. HubSpot, Salesforce, Pipedrive, Monday CRM and more - reviewed and rated by the CRM Daily team.',
};

export default function CRMToolsPage() {
  return <CRMTools />;
}
`
  },
  {
    file: 'src/app/glossary/page.jsx',
    // Glossary already has 'use client' - add metadata via a layout file instead
    skip: true
  },
];

// Write page files
pages.forEach(({ file, content, skip }) => {
  if (skip) return;
  // Remove 'use client' from page.js - it must be a server component to export metadata
  // The views themselves have 'use client' - that's fine
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed:', file);
});

// For glossary - create a metadata file next to it
const glossaryMetadata = `export const metadata = {
  title: 'CRM Glossary | 180 CRM and GTM Terms Defined',
  description: 'The complete CRM and GTM glossary. 180 terms every sales, RevOps and GTM operator should know - ARR, NRR, MEDDIC, ICP, CAC, LTV and more.',
};
`;

// Glossary page.jsx has 'use client' so we can't add metadata directly
// Instead create a layout.js for the glossary route
const glossaryLayout = `export const metadata = {
  title: 'CRM Glossary | 180 CRM and GTM Terms Defined',
  description: 'The complete CRM and GTM glossary. 180 terms every sales, RevOps and GTM operator should know - ARR, NRR, MEDDIC, ICP, CAC, LTV and more.',
};

export default function GlossaryLayout({ children }) {
  return children;
}
`;

fs.writeFileSync('src/app/glossary/layout.js', glossaryLayout, 'utf8');
console.log('Fixed: src/app/glossary/layout.js (metadata for glossary)');

// Also add layout for glossary slug pages
const glossarySlugLayout = `export const dynamic = 'force-dynamic';

export default function GlossarySlugLayout({ children }) {
  return children;
}
`;

const slugDir = 'src/app/glossary/[slug]';
fs.writeFileSync(path.join(slugDir, 'layout.js'), glossarySlugLayout, 'utf8');
console.log('Fixed: src/app/glossary/[slug]/layout.js');

// Verify - check that page files don't have 'use client'
pages.forEach(({ file, skip }) => {
  if (skip) return;
  const c = fs.readFileSync(file, 'utf8');
  const hasUseClient = c.includes("'use client'");
  const hasMetadata = c.includes('export const metadata');
  console.log(file, '- use client:', hasUseClient, '| has metadata:', hasMetadata);
});

console.log('\nDone! Push to GitHub now.');