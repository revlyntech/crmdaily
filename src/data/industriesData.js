
const TOOLS = {
  hubspot:    { name: "HubSpot",    logo: "/logos/hubspot_logo.png" },
  salesforce: { name: "Salesforce", logo: "/logos/salesforce_logo.png" },
  pipedrive:  { name: "Pipedrive",  logo: "/logos/pipedrive_logo.png" },
  monday:     { name: "Monday CRM", logo: "/logos/monday_logo.png" },
  close:      { name: "Close CRM",  logo: "/logos/close_logo.png" },
  clay:       { name: "Clay",       logo: "/logos/clay_logo.png" },
  gong:       { name: "Gong",       logo: "/logos/gong_logo.png" },
};

function tool(key, blurb) {
  return { ...TOOLS[key], blurb };
}

export const INDUSTRIES = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Where the sales conversation meets the shop floor",
    intro: "Manufacturers sell physical things on long cycles, with quotes, credit terms and delivery windows tangled up with the customer relationship itself. A CRM here isn't just about closing the next order, it's about connecting sales conversations to what's actually happening in production.",
    whyItMatters: [
      "Order history and account status sit next to production capacity, so sales doesn't promise what production can't deliver",
      "Distributor and reseller relationships get tracked the same way direct accounts do",
      "Repeat orders and maintenance contracts are the real revenue, and they're easy to lose track of in a spreadsheet",
    ],
    whatToLookFor: [
      "Integration with ERP and inventory systems, not just email",
      "Support for long, multi-stage sales cycles with named stakeholders",
      "Territory and channel partner management if you sell through distributors",
    ],
    recommendedTools: [
      tool("hubspot", "Free tier and marketing tools make it an easy on-ramp for teams also building out a website and content presence."),
      tool("salesforce", "Deep customization fits manufacturers with complex, multi-stage sales processes."),
      tool("monday", "Flexible boards suit teams already tracking production schedules visually."),
    ],
    faqs: [
      { q: "Does a manufacturing CRM need to integrate with ERP software?", a: "In most cases yes. Without that link, sales ends up promising delivery dates production can't actually hit." },
      { q: "Can a general CRM handle distributor and reseller relationships?", a: "Most can, using territory or partner-tier fields, though dedicated channel management features vary by vendor." },
      { q: "How long does implementation typically take?", a: "Anywhere from a few weeks for a simple setup to several months if it needs deep ERP integration." },
      { q: "Is industry-specific manufacturing CRM software worth the premium?", a: "Only if the added inventory or production features genuinely replace tools you're already paying for elsewhere." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Care coordination with a compliance layer built in",
    intro: "Patient and provider relationships in healthcare come with a compliance layer most general CRMs weren't built for. The system has to help staff coordinate care without becoming a liability.",
    whyItMatters: [
      "Patient outreach and follow-up happens on a schedule tied to treatment, not a sales cadence",
      "Referral relationships between providers are relationship management, just with a different name",
      "Front-office staff need less clicking, not more, given how much they already juggle",
    ],
    whatToLookFor: [
      "HIPAA-compliant data handling as a baseline requirement, not an add-on",
      "Role-based access that actually restricts who sees clinical detail",
      "Integration with practice management or EHR systems already in place",
    ],
    recommendedTools: [
      tool("salesforce", "Enterprise-grade permissions suit larger healthcare organizations with strict access needs."),
      tool("hubspot", "Simple setup helps front-office staff adopt it without a steep learning curve."),
      tool("pipedrive", "Simple visual pipeline suits smaller practices without a dedicated CRM admin."),
    ],
    faqs: [
      { q: "Is HIPAA compliance built into most CRMs by default?", a: "No. It usually requires a specific plan tier or a signed Business Associate Agreement with the vendor." },
      { q: "Can a CRM replace an EHR system?", a: "No, a CRM manages relationships and outreach; an EHR manages clinical records. Most healthcare CRMs integrate with an EHR rather than replace it." },
      { q: "Who typically uses the CRM day to day?", a: "Usually front-office and administrative staff, with limited clinical staff involvement beyond scheduling and follow-up." },
      { q: "Does patient data stored in a CRM count as protected health information?", a: "If it can identify a patient and relates to their care, yes, which is why compliance features matter from day one." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "A memory system disguised as software",
    intro: "Agents run dozens of active listings, buyers and closings at once, and the deal that gets forgotten is the one that walks. A CRM for real estate is really a memory system for the whole business.",
    whyItMatters: [
      "Pipeline visibility across listings, showings and offers in one place",
      "Automated follow-up on cold leads that would otherwise go stale",
      "A record of every property, contact and conversation tied together",
    ],
    whatToLookFor: [
      "MLS integration where available",
      "Mobile access, since most of the job happens outside an office",
      "Automated drip campaigns for long-cycle buyer nurture",
    ],
    recommendedTools: [
      tool("pipedrive", "Visual pipeline view fits agents tracking listings and offers side by side."),
      tool("hubspot", "Marketing automation supports long-cycle buyer nurture campaigns."),
      tool("close", "Built-in calling suits agents making high call volumes to leads."),
    ],
    faqs: [
      { q: "Does a real estate CRM need MLS integration?", a: "It helps, but it isn't mandatory. Many agents manage listings manually and use the CRM purely for contact and pipeline tracking." },
      { q: "How important is mobile access?", a: "Very. Most of the job happens at showings and open houses, not at a desk." },
      { q: "Can one CRM handle both buyer and listing-side pipelines?", a: "Yes, most set these up as separate pipeline views within the same system." },
      { q: "Is CRM software worth it for a solo agent?", a: "Usually yes, mainly for automated follow-up on leads that would otherwise go cold." },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    tagline: "The client relationship is the whole business",
    intro: "The client relationship is the entire business in consulting. Losing track of a stakeholder or a commitment doesn't just cost a deal, it costs the account.",
    whyItMatters: [
      "Every engagement has multiple contacts with different priorities to track",
      "Billable time and relationship history need to sit in the same view",
      "Referrals and repeat engagements depend on remembering the details of the last one",
    ],
    whatToLookFor: [
      "Project or engagement tracking alongside contact records",
      "Easy logging of meeting notes and follow-ups",
      "Integration with time-tracking or invoicing tools",
    ],
    recommendedTools: [
      tool("hubspot", "Marketing and CRM in one place suits consultancies building their own pipeline."),
      tool("pipedrive", "Simple pipeline view keeps engagement stages clear without extra overhead."),
      tool("monday", "Board-based views suit teams juggling engagements alongside internal projects."),
    ],
    faqs: [
      { q: "Does a consulting firm need project management features in its CRM?", a: "Helpful but not essential. Many firms pair a lightweight CRM with a separate project tool and link them." },
      { q: "Can a CRM track billable hours?", a: "Some can natively; more often it integrates with dedicated time-tracking or invoicing software." },
      { q: "How many contacts per client should be tracked?", a: "All of them. Multi-stakeholder engagements are exactly where losing track of one contact costs the account." },
      { q: "Is a CRM necessary for a two- or three-person consultancy?", a: "At that size it's more about consistency than survival, but it does prevent details falling through when someone's out." },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    tagline: "Automating the paperwork stack carriers run on",
    intro: "Insurance CRM exists to automate the paperwork stack carriers and agencies run on. Quotes, claims and renewals are all relationship touchpoints wearing an administrative disguise.",
    whyItMatters: [
      "Renewal dates are the most valuable follow-up trigger in the business",
      "Claims history informs the next conversation with a policyholder",
      "Underwriting and quoting move faster with clean, centralized data",
    ],
    whatToLookFor: [
      "Automated renewal and follow-up reminders",
      "Integration with quoting or rating engines",
      "Compliance features suited to insurance-specific regulation",
    ],
    recommendedTools: [
      tool("salesforce", "Configurable workflows accommodate carrier-specific quoting and claims processes."),
      tool("hubspot", "Automated reminders help agencies stay on top of renewal follow-up."),
      tool("pipedrive", "Straightforward setup suits smaller agencies without complex compliance overhead."),
    ],
    faqs: [
      { q: "Can a CRM handle policy renewals automatically?", a: "Most support automated renewal reminders, though direct policy administration usually needs a separate system." },
      { q: "Does an insurance CRM need to integrate with a rating engine?", a: "If your agency quotes frequently, yes, otherwise reps end up re-entering the same data twice." },
      { q: "What compliance features matter most?", a: "Audit trails and documented client consent are the two most commonly required." },
      { q: "Can independent and captive agents use the same type of CRM?", a: "Broadly yes, though independent agents often need better multi-carrier tracking." },
    ],
  },
  {
    slug: "ecommerce",
    name: "eCommerce",
    tagline: "Turning anonymous traffic into people worth marketing to",
    intro: "Every anonymous browsing session is a customer you haven't met yet. A CRM for eCommerce is about turning that traffic into people worth marketing to by name.",
    whyItMatters: [
      "Purchase history should inform every future email, not just the last one",
      "Abandoned cart and browse behavior are the highest-intent signals available",
      "Customer service and marketing need to see the same order history",
    ],
    whatToLookFor: [
      "Native or easy integration with your storefront platform",
      "Segmentation based on purchase behavior, not just demographics",
      "Automated post-purchase and win-back sequences",
    ],
    recommendedTools: [
      tool("hubspot", "Marketing automation pairs well with post-purchase email sequences."),
      tool("pipedrive", "Simple pipeline view suits smaller stores managing wholesale or B2B orders."),
      tool("monday", "Visual boards help track inventory and orders alongside customer relationships."),
    ],
    faqs: [
      { q: "Does an eCommerce CRM replace my storefront platform?", a: "No, it sits alongside it, pulling in order and browsing data to inform marketing and support." },
      { q: "How important is segmentation for eCommerce CRM use?", a: "Very. Blasting the same offer to everyone performs worse than even basic purchase-based segments." },
      { q: "Can a CRM automate abandoned cart follow-up?", a: "Yes, this is one of the most common automations eCommerce teams set up first." },
      { q: "Do small stores need a CRM, or is email marketing software enough?", a: "Once you're tracking customer service and sales together, a CRM starts pulling its weight over email tools alone." },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    tagline: "One system instead of a shared drive full of spreadsheets",
    intro: "Construction businesses run on contracts, subcontractors and schedules that live in far too many places at once. A CRM consolidates that into one system instead of a shared drive full of spreadsheets.",
    whyItMatters: [
      "Bids, contracts and change orders are easier to track when tied to one project record",
      "Subcontractor and supplier relationships need the same visibility as client ones",
      "Project status and customer communication often need to happen together",
    ],
    whatToLookFor: [
      "Project-based organization rather than pure contact-based",
      "Document storage for contracts and permits",
      "Mobile access for teams working on-site, not at a desk",
    ],
    recommendedTools: [
      tool("monday", "Board-based project tracking fits construction's project-first structure well."),
      tool("hubspot", "Broad integration ecosystem connects to document and project tools via API."),
      tool("pipedrive", "Visual pipeline suits project-based sales cycles with clear stages."),
    ],
    faqs: [
      { q: "Can a CRM manage subcontractor relationships alongside client ones?", a: "Yes, most support this by adding subcontractors as a separate contact type or company category." },
      { q: "Does construction CRM software need to store contracts and permits?", a: "Document storage helps a lot here, since paperwork volume is high and time-sensitive." },
      { q: "Is mobile access critical?", a: "Yes, most updates happen on-site, not in an office." },
      { q: "Should a construction CRM be organized by project or by client?", a: "Usually by project, since one client can span multiple active jobs at once." },
    ],
  },
  {
    slug: "higher-education",
    name: "Higher Education",
    tagline: "One relationship, from first inquiry to alumni giving",
    intro: "A student's relationship with an institution runs for years, from first inquiry through enrollment to alumni giving. Losing the thread anywhere in that timeline costs more than a single lost applicant.",
    whyItMatters: [
      "Recruitment, admissions and alumni relations often use tools that don't talk to each other",
      "A prospective student's engagement history should follow them through the whole funnel",
      "Personalized outreach at scale is the difference between a form letter and a real relationship",
    ],
    whatToLookFor: [
      "Support for the full student lifecycle, not just admissions",
      "Segmentation by program, stage and engagement level",
      "Integration with existing student information systems",
    ],
    recommendedTools: [
      tool("hubspot", "Marketing Hub tools support recruitment campaigns alongside contact tracking."),
      tool("salesforce", "Education-focused customization supports the full student lifecycle."),
      tool("pipedrive", "Simple pipeline view suits smaller admissions teams tracking applicant stages."),
    ],
    faqs: [
      { q: "Can one CRM manage recruitment, admissions, and alumni relations together?", a: "Some can, though many institutions still run separate systems for each stage and integrate them." },
      { q: "How is student data privacy handled?", a: "Most support FERPA-aligned access controls, but it's worth confirming with the vendor directly." },
      { q: "Does a CRM replace a student information system?", a: "No, it complements it, focusing on relationship and communication history rather than academic records." },
      { q: "What's the biggest CRM mistake institutions make?", a: "Treating recruitment and alumni relations as separate audiences instead of one continuous relationship." },
    ],
  },
  {
    slug: "small-business",
    name: "Small Businesses",
    tagline: "Often the cheapest hire a small team ever makes",
    intro: "Lean teams need automation more than they need more headcount. A CRM is often the cheapest hire a small business ever makes, if it's simple enough to actually get used.",
    whyItMatters: [
      "Every lead matters more when there are fewer of them",
      "Automating follow-up frees up the time small teams don't have to spare",
      "A shared record prevents dropped balls when one person wears five hats",
    ],
    whatToLookFor: [
      "A short learning curve, since there's rarely a dedicated admin",
      "Pricing that scales down, not just up",
      "Core features (pipeline, contacts, tasks) done well over a long feature list",
    ],
    recommendedTools: [
      tool("pipedrive", "Fast setup and clear pipeline view suit lean teams without an admin."),
      tool("hubspot", "Generous free tier makes it a low-risk starting point."),
      tool("close", "Built-in calling and SMS suit lean teams without a separate dialer tool."),
    ],
    faqs: [
      { q: "What's the minimum team size that benefits from a CRM?", a: "Even a team of one benefits once leads exceed what memory alone can track reliably." },
      { q: "Are free CRM tiers good enough for a small business?", a: "Often yes, at least until contact volume or automation needs outgrow the free tier's limits." },
      { q: "How long does it take a small team to get value from a CRM?", a: "Most see benefit within the first few weeks, once contacts and a basic pipeline are set up." },
      { q: "Should a small business pick the cheapest CRM available?", a: "Not necessarily. The best pick is whichever one the team will actually keep using." },
    ],
  },
  {
    slug: "saas",
    name: "SaaS Companies",
    tagline: "Built for recurring revenue, not one-time sales",
    intro: "SaaS businesses run on usage-based metrics and expansion revenue, not one-time sales. A CRM built for this world needs to speak that language.",
    whyItMatters: [
      "Product usage data is often a better signal than a form fill",
      "Expansion and churn risk deserve the same attention as new logos",
      "Sales, marketing and customer success all need the same account view",
    ],
    whatToLookFor: [
      "Support for tracking recurring revenue metrics natively or via integration",
      "Product usage data feeding into the CRM record",
      "Strong customer success and renewal workflow support",
    ],
    recommendedTools: [
      tool("hubspot", "Broad integration ecosystem connects product usage data via API."),
      tool("salesforce", "Deep reporting and customization suit SaaS companies with complex account hierarchies."),
      tool("clay", "Enrichment and outbound tooling suit SaaS teams doing account-based prospecting at scale."),
    ],
    faqs: [
      { q: "Does a SaaS CRM need to track MRR natively?", a: "It helps, but many teams pull this in via integration with billing software instead." },
      { q: "How important is product usage data?", a: "Very. It's often a stronger buying signal than form fills or email opens." },
      { q: "Should sales, marketing, and customer success share one CRM?", a: "Ideally yes, since churn risk and expansion opportunity both depend on the same account history." },
      { q: "What CRM feature matters most for reducing churn?", a: "Visibility into account health signals early enough for customer success to act on them." },
    ],
  },
  {
    slug: "nonprofits",
    name: "Nonprofits",
    tagline: "Pipeline discipline, applied to donors and volunteers",
    intro: "Donor and volunteer relationships deserve the same discipline sales teams apply to pipeline, even though the goal isn't a sale.",
    whyItMatters: [
      "Donor history and giving patterns inform the next ask",
      "Volunteer coordination is relationship management with a different name",
      "Grant reporting gets easier when the underlying data is already clean",
    ],
    whatToLookFor: [
      "Donor and volunteer management as first-class objects, not workarounds",
      "Reporting built for grant and board requirements",
      "Nonprofit pricing or discounts, which many vendors offer",
    ],
    recommendedTools: [
      tool("hubspot", "Nonprofit-friendly pricing and simple setup suit lean teams."),
      tool("salesforce", "Salesforce's nonprofit program offers steep discounts for qualifying organizations."),
      tool("pipedrive", "Simple setup suits smaller nonprofits without a dedicated CRM admin."),
    ],
    faqs: [
      { q: "Can a CRM manage both donors and volunteers?", a: "Yes, most nonprofit-friendly CRMs support both as distinct but related contact types." },
      { q: "Do nonprofits get CRM pricing discounts?", a: "Many vendors offer discounted or free tiers for registered nonprofits, worth asking about directly." },
      { q: "How does a CRM help with grant reporting?", a: "Clean, centralized data makes pulling the numbers funders ask for far less painful." },
      { q: "What's the most common reason nonprofit CRM adoption fails?", a: "Treating it as a database instead of training staff to actually log interactions consistently." },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    tagline: "Purchase history as the input for every future offer",
    intro: "Not every item sells itself. Purchase history becomes the input for every future offer instead of sitting unused in a point-of-sale system.",
    whyItMatters: [
      "Personalized outreach outperforms generic promotions consistently",
      "Customer service, sales and marketing benefit from the same purchase record",
      "Loyalty programs work better with real behavioral data behind them",
    ],
    whatToLookFor: [
      "Integration with your point-of-sale and inventory systems",
      "Segmentation based on real purchase behavior",
      "Omnichannel support if you sell both online and in-store",
    ],
    recommendedTools: [
      tool("hubspot", "Marketing automation tools help turn purchase history into targeted campaigns."),
      tool("pipedrive", "Simple setup suits smaller retail operations managing wholesale accounts."),
      tool("monday", "Flexible boards support tracking both customers and stock in one place."),
    ],
    faqs: [
      { q: "Does a retail CRM need POS integration?", a: "Yes, ideally, since purchase history is the main data source that makes personalization possible." },
      { q: "Can a CRM support both online and in-store customers in one record?", a: "Yes, this is the core of an omnichannel setup, and most modern retail CRMs support it." },
      { q: "How does a CRM improve loyalty programs?", a: "By tying real purchase behavior to rewards instead of running the program on guesswork." },
      { q: "Is CRM overkill for a single physical location?", a: "Not if repeat customers matter to the business, even a simple system beats no system." },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Service",
    tagline: "Compliance and personalization, not in tension",
    intro: "Compliance and personalization aren't actually in tension when the underlying data model is right. A CRM for financial services proves it.",
    whyItMatters: [
      "Every client interaction may need to be logged for regulatory reasons anyway",
      "A single customer view across products improves both service and cross-sell",
      "Advisors and relationship managers need context before every call",
    ],
    whatToLookFor: [
      "Audit trails and compliance-friendly record keeping",
      "Role-based permissions suited to regulated environments",
      "Integration with core banking or portfolio systems",
    ],
    recommendedTools: [
      tool("salesforce", "Compliance-grade permissions and audit trails suit regulated environments."),
      tool("hubspot", "Broad customization options accommodate compliance-heavy workflows."),
      tool("pipedrive", "Straightforward pipeline view suits smaller advisory or brokerage teams."),
    ],
    faqs: [
      { q: "Can a CRM handle compliance logging automatically?", a: "Many can log interactions automatically, but formal audit trail requirements should be confirmed against your specific regulator." },
      { q: "Does a financial services CRM need core banking integration?", a: "If you want a single customer view across products, generally yes." },
      { q: "How does a CRM help with cross-selling?", a: "By surfacing what a client already holds before the next conversation happens." },
      { q: "What permission features matter most?", a: "Role-based access that restricts sensitive account data to only the people who need it." },
    ],
  },
  {
    slug: "credit-unions",
    name: "Credit Unions",
    tagline: "Members to grow, not just accounts to service",
    intro: "Credit unions exist to treat members as relationships to grow, not just accounts to service. The CRM should reflect that difference from a retail bank.",
    whyItMatters: [
      "Member lifecycle, from first account to mortgage to retirement, spans decades",
      "Cross-selling additional products depends on knowing what a member already has",
      "Member-first positioning works better with real relationship data behind it",
    ],
    whatToLookFor: [
      "Integration with core banking platforms used by credit unions",
      "Member communication preferences and history in one place",
      "Reporting suited to member growth and retention, not just sales",
    ],
    recommendedTools: [
      tool("salesforce", "Customization supports member lifecycle tracking across decades, not just transactions."),
      tool("hubspot", "Approachable interface suits member-facing teams without a dedicated CRM admin."),
      tool("monday", "Visual boards suit teams tracking member requests alongside internal projects."),
    ],
    faqs: [
      { q: "How is a credit union CRM different from a retail bank's?", a: "The focus shifts from transaction volume to long-term member relationship growth." },
      { q: "Does a credit union CRM need core banking integration?", a: "Yes, in most cases, to get a real view of what products a member already holds." },
      { q: "Can a CRM help with member retention?", a: "Yes, mainly by surfacing service history and flagging members who've gone quiet." },
      { q: "What's the biggest CRM gap for credit unions specifically?", a: "Reporting built around member growth and retention rather than raw sales figures." },
    ],
  },
  {
    slug: "mortgage",
    name: "Mortgage",
    tagline: "Dozens of files, each at a different stage",
    intro: "Loan officers juggle dozens of files sitting at different stages of the same process at once. A CRM for mortgage keeps that from becoming chaos.",
    whyItMatters: [
      "Every file has a different set of pending documents and next steps",
      "Referral relationships with realtors and past clients drive a large share of new business",
      "Missed follow-up at the wrong stage can cost a closing",
    ],
    whatToLookFor: [
      "Pipeline stages built around the mortgage process specifically",
      "Automated document and task reminders",
      "Referral partner tracking alongside borrower records",
    ],
    recommendedTools: [
      tool("pipedrive", "Pipeline stages map cleanly to loan file progress."),
      tool("hubspot", "Automation supports document and task reminders across active files."),
      tool("close", "Built-in calling fits loan officers making frequent borrower check-in calls."),
    ],
    faqs: [
      { q: "Can a CRM track loan files at different pipeline stages?", a: "Yes, most mortgage-focused setups use pipeline stages mapped directly to the loan process." },
      { q: "How important is referral tracking?", a: "Very. Realtor and past-client referrals often drive a large share of new business." },
      { q: "Does mortgage CRM software handle document collection?", a: "Some do natively; others integrate with a separate document management tool." },
      { q: "What causes the most missed follow-ups?", a: "Files sitting at a stage without a clear owner or next action attached." },
    ],
  },
  {
    slug: "pharma",
    name: "Pharma",
    tagline: "Relationship tracking under real regulatory scrutiny",
    intro: "Pharma reps operate under more scrutiny than almost any other sales role. A CRM here has to log visits and compliance details as carefully as it tracks the relationship.",
    whyItMatters: [
      "Prescriber relationships need to be documented for compliance, not just convenience",
      "Sample tracking and call reporting are regulatory requirements, not nice-to-haves",
      "Territory management determines whether reps reach the right prescribers at all",
    ],
    whatToLookFor: [
      "Built-in compliance and call reporting features",
      "Territory and account planning tools",
      "Integration with sample management systems where relevant",
    ],
    recommendedTools: [
      tool("salesforce", "Configurability supports the detailed compliance logging pharma reps require."),
      tool("hubspot", "Workflow automation can be configured for call reporting needs, with the right setup."),
      tool("pipedrive", "Simple pipeline view suits smaller pharma sales teams tracking prescriber outreach."),
    ],
    faqs: [
      { q: "Does pharma CRM software need built-in compliance reporting?", a: "Yes, call and sample reporting are typically regulatory requirements, not optional features." },
      { q: "Can a general CRM handle territory management?", a: "Some can with configuration, but dedicated pharma CRM tools usually handle this more directly." },
      { q: "How is prescriber relationship data different from typical sales contacts?", a: "It usually needs to be logged with more documentation detail for audit purposes." },
      { q: "Does sample tracking need to be built into the CRM itself?", a: "Often yes, or it needs a tightly integrated separate system, given the compliance stakes." },
    ],
  },
  {
    slug: "banking",
    name: "Banking",
    tagline: "One customer, one view, across every product",
    intro: "A bank customer usually holds several products at once, and most legacy systems treat each one separately. A CRM gives a single view of the whole relationship instead.",
    whyItMatters: [
      "Cross-sell opportunities are easy to miss when systems don't talk to each other",
      "Service history across products informs every future conversation",
      "Relationship managers need context before every meeting, not just account numbers",
    ],
    whatToLookFor: [
      "Integration with core banking systems",
      "A unified customer view across deposit, lending and other product lines",
      "Compliance and audit features suited to financial regulation",
    ],
    recommendedTools: [
      tool("salesforce", "Enterprise scale and integration options suit banks with many product lines."),
      tool("hubspot", "Marketing and service tools sit alongside the CRM for a fuller customer view."),
      tool("monday", "Flexible board views suit teams tracking cross-department requests."),
    ],
    faqs: [
      { q: "Why do banks need a CRM if they already have core banking software?", a: "Core banking manages accounts and transactions; a CRM manages the relationship and cross-product view." },
      { q: "Can a CRM unify data across deposit, lending, and other product lines?", a: "That's usually the main reason banks adopt one, since legacy systems rarely talk to each other." },
      { q: "What compliance features matter most?", a: "Audit trails and access controls suited to financial regulation are the baseline requirement." },
      { q: "Does a banking CRM help relationship managers directly?", a: "Yes, mainly by giving them context before a meeting instead of just an account number." },
    ],
  },
  {
    slug: "wealth-management",
    name: "Wealth Management",
    tagline: "The relationship is the asset",
    intro: "Advisors need a full picture of a client's life events, not just a snapshot of their portfolio. A CRM built for wealth management treats the relationship as the asset.",
    whyItMatters: [
      "Life events (marriage, retirement, inheritance) trigger the conversations that matter most",
      "Household and family relationships often span multiple accounts",
      "Compliance documentation needs to sit alongside the relationship record, not separately",
    ],
    whatToLookFor: [
      "Household-level views spanning multiple accounts and family members",
      "Integration with portfolio management and custodial systems",
      "Compliance-ready documentation and audit trails",
    ],
    recommendedTools: [
      tool("salesforce", "Deep customization supports household-level views for complex client relationships."),
      tool("hubspot", "Customization supports household-level relationship tracking with the right configuration."),
      tool("pipedrive", "Simple setup suits smaller advisory practices without a dedicated admin."),
    ],
    faqs: [
      { q: "Does a wealth management CRM need portfolio management integration?", a: "Yes, ideally, so advisors see financial data and relationship history in one place." },
      { q: "How does household-level tracking work?", a: "It links multiple accounts and family members under one relationship view instead of treating each account separately." },
      { q: "Why do life events matter so much here?", a: "Because they're usually the trigger for the next meaningful conversation with a client." },
      { q: "What compliance documentation does it typically need?", a: "Records of advice given and client acknowledgment, kept alongside the relationship history." },
    ],
  },
  {
    slug: "jewellery",
    name: "Jewellery Businesses",
    tagline: "Remembering the customer between infrequent visits",
    intro: "High-ticket, low-frequency purchases reward a business that actually remembers the customer between visits. A CRM turns that memory into a repeatable advantage.",
    whyItMatters: [
      "Anniversaries, birthdays and past purchases are natural reasons to reach out",
      "Repair and appraisal history matters as much as the original sale",
      "Personalized outreach drives repeat business in a category built on infrequent purchases",
    ],
    whatToLookFor: [
      "Simple contact and purchase history tracking",
      "Reminder automation tied to dates that matter to the customer",
      "Integration with point-of-sale systems common in retail jewellery",
    ],
    recommendedTools: [
      tool("pipedrive", "Easy setup suits smaller retail operations tracking repeat customers."),
      tool("hubspot", "Simple contact and purchase tracking suits smaller retail operations."),
      tool("close", "Built-in calling and SMS suit high-touch, relationship-based follow-up."),
    ],
    faqs: [
      { q: "Does a jewellery business really need a CRM?", a: "If repeat customers and referrals matter to the business, yes, even a simple system helps." },
      { q: "Can a CRM track repair and appraisal history?", a: "Most general CRMs can with custom fields, though dedicated retail jewellery software may handle it more natively." },
      { q: "How does reminder automation help?", a: "By prompting outreach around anniversaries and past purchase dates automatically." },
      { q: "Does it need POS integration?", a: "It helps connect purchase history to the customer record, but isn't strictly required for a simple setup." },
    ],
  },
  {
    slug: "events",
    name: "Events",
    tagline: "Before, during and after, without dropped threads",
    intro: "An event has a relationship lifecycle of its own: before, during and after, spanning attendees, sponsors and vendors. A CRM keeps all three from falling through separate cracks.",
    whyItMatters: [
      "Sponsor relationships often span multiple events and need long-term tracking",
      "Attendee engagement before an event predicts turnout better than registration numbers alone",
      "Post-event follow-up is where most of the actual business value gets realized",
    ],
    whatToLookFor: [
      "Integration with event registration and ticketing platforms",
      "Segmentation by attendee type (sponsor, speaker, general attendee)",
      "Automated post-event follow-up sequences",
    ],
    recommendedTools: [
      tool("hubspot", "Marketing tools support pre-event outreach and post-event follow-up in one system."),
      tool("monday", "Board-based views suit tracking multiple events and their vendors at once."),
      tool("pipedrive", "Visual pipeline suits tracking sponsor and vendor deals through stages."),
    ],
    faqs: [
      { q: "Can a CRM manage both attendees and sponsors?", a: "Yes, most support this by segmenting contacts into different relationship types." },
      { q: "Does event CRM software need ticketing integration?", a: "It helps significantly, since registration data is the main signal for pre-event engagement." },
      { q: "How important is post-event follow-up automation?", a: "Very. Most of the actual business value from an event gets realized in the follow-up, not the event itself." },
      { q: "Can one CRM handle relationships across multiple recurring events?", a: "Yes, this is common for organizations running an annual event with returning sponsors and attendees." },
    ],
  },
  {
    slug: "calendar-scheduling",
    name: "Calendar & Scheduling",
    tagline: "Removing the five-email dance of booking a meeting",
    intro: "Booking a meeting shouldn't take five emails to schedule. Syncing availability straight into the CRM record removes the back-and-forth entirely.",
    whyItMatters: [
      "Scheduling friction is an easy, avoidable reason a prospect goes cold",
      "A booked meeting should automatically log against the right contact record",
      "Sales and support teams both lose time to manual calendar coordination",
    ],
    whatToLookFor: [
      "Native scheduling links tied to CRM contact and deal records",
      "Two-way calendar sync, not just one-way booking pages",
      "Automatic logging of meetings against the right account",
    ],
    recommendedTools: [
      tool("hubspot", "Native scheduling links tie meetings directly to contact records."),
      tool("pipedrive", "Native scheduling features reduce the back-and-forth of booking calls."),
      tool("close", "Built-in calling reduces the need for a separate dialer tool alongside scheduling."),
    ],
    faqs: [
      { q: "Does scheduling software need to be a separate tool from the CRM?", a: "Not necessarily. Many CRMs include native scheduling links tied directly to contact records." },
      { q: "How does calendar sync reduce lost leads?", a: "By removing the back-and-forth of finding a meeting time, which is an easy point for prospects to go cold." },
      { q: "Should meetings log automatically against CRM records?", a: "Ideally yes, so nobody has to manually note that a call happened." },
      { q: "Is two-way sync necessary, or is a booking page enough?", a: "A booking page alone can create double-bookings; two-way sync avoids that problem." },
    ],
  },
  {
    slug: "warehouse-management",
    name: "Warehouse Management",
    tagline: "Inventory and the customer record, finally in sync",
    intro: "Inventory and logistics data usually lives far from the customer record. Tying the two together means sales and support are looking at the same reality.",
    whyItMatters: [
      "Order promises are only credible if sales can see real inventory levels",
      "Fulfillment delays are easier to manage when support has visibility into the cause",
      "Customer-specific stocking or reorder patterns are valuable sales signals",
    ],
    whatToLookFor: [
      "Integration with warehouse or inventory management systems",
      "Real-time stock visibility surfaced to sales and support",
      "Order history tied to the same customer record used elsewhere",
    ],
    recommendedTools: [
      tool("monday", "Visual boards suit tracking stock levels alongside customer orders."),
      tool("salesforce", "Integration depth connects cleanly to enterprise inventory and ERP systems."),
      tool("hubspot", "Broad integration ecosystem connects to inventory tools via API or Zapier."),
    ],
    faqs: [
      { q: "Does warehouse CRM integration require a dedicated inventory system?", a: "Usually yes, the CRM then pulls in stock and logistics data rather than managing it directly." },
      { q: "How does inventory visibility help sales teams?", a: "It stops reps from promising delivery on stock that isn't actually available." },
      { q: "Can support teams use the same inventory data as sales?", a: "Yes, and it's one of the more valuable shared views, since it explains fulfillment delays." },
      { q: "Is this integration worth it for a small operation?", a: "Mainly once order volume makes manual stock checks a bottleneck." },
    ],
  },
  {
    slug: "revops",
    name: "RevOps Management",
    tagline: "One pipeline, not three competing spreadsheets",
    intro: "RevOps is the operational layer keeping sales, marketing and customer success pointed at one shared pipeline instead of three competing spreadsheets.",
    whyItMatters: [
      "A single source of truth for pipeline, forecast and customer data prevents teams from arguing over whose numbers are right",
      "Process and data hygiene decisions made once apply consistently across every team touching the CRM",
      "Reporting only works if the underlying data model is designed for it from the start",
    ],
    whatToLookFor: [
      "Strong customization and automation capabilities",
      "Robust reporting and dashboarding built in, not bolted on",
      "API access for connecting to a broader RevOps tech stack",
    ],
    recommendedTools: [
      tool("salesforce", "Extensive API access and customization make it the default RevOps platform choice."),
      tool("clay", "Enrichment and outbound tooling suit RevOps teams building account-based workflows."),
      tool("gong", "Call intelligence gives RevOps visibility into every customer conversation."),
    ],
    faqs: [
      { q: "What makes a CRM good for a RevOps team specifically?", a: "Strong customization, automation, and reporting that doesn't require a developer for every change." },
      { q: "Does RevOps need API access to the CRM?", a: "Almost always, since RevOps typically connects the CRM to a broader stack of tools." },
      { q: "How does a CRM reduce sales and marketing disagreement?", a: "By giving both teams one shared source of truth for pipeline and account data." },
      { q: "What's the first thing a RevOps team should fix in a new CRM?", a: "Data hygiene and a clear definition of what each pipeline stage actually means." },
    ],
  },
  {
    slug: "salesforce-alternatives",
    name: "Moving Off Salesforce",
    tagline: "Migrating without losing years of data",
    intro: "Some teams outgrow Salesforce's complexity or cost long before they outgrow the idea of a CRM. Moving off it doesn't have to mean losing years of data.",
    whyItMatters: [
      "Salesforce's power often comes with implementation and admin overhead smaller teams don't need",
      "Per-seat and add-on pricing can scale faster than the value a team is getting from it",
      "Migration is a real project, not a weekend task, and deserves planning",
    ],
    whatToLookFor: [
      "A clear, tested data migration path before committing to a new platform",
      "Feature parity check against what your team actually uses today, not the full feature list",
      "A vendor or partner experienced in Salesforce migrations specifically",
    ],
    recommendedTools: [
      tool("hubspot", "Free tier and simpler setup appeal to teams leaving Salesforce's complexity behind."),
      tool("pipedrive", "Simpler setup and lower cost make it a common landing spot after leaving Salesforce."),
      tool("monday", "Visual, board-based setup offers a simpler alternative for teams leaving Salesforce."),
    ],
    faqs: [
      { q: "How risky is migrating data out of Salesforce?", a: "Manageable with planning, but it deserves a tested migration path rather than a same-day switch." },
      { q: "Will a smaller CRM have all the features Salesforce has?", a: "Rarely all of them, which is why checking against what your team actually uses matters more than a full feature list." },
      { q: "How long does a typical migration take?", a: "Anywhere from a few weeks for a simple setup to a few months for a heavily customized instance." },
      { q: "Is switching away from Salesforce usually about cost or complexity?", a: "Both come up often, though complexity tends to be the bigger driver for smaller teams specifically." },
    ],
  },
];

export function getIndustry(slug) {
  return INDUSTRIES.find((i) => i.slug === slug);
}