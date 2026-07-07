export const GLOSSARY_CATEGORIES = ['Sales', 'RevOps', 'GTM', 'Metrics', 'AI', 'Marketing'];

export function getTerm(slug) {
  return GLOSSARY_TERMS.find(t => t.slug === slug);
}

export const GLOSSARY_TERMS = [
  {
    slug: "meddic",
    term: "MEDDIC",
    category: "Sales",
    short:
      "A B2B qualification framework: Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion.",
    long:
      "MEDDIC is the enterprise sales qualification framework popularised at PTC in the 1990s and now the default at most >$50k ACV SaaS companies. It forces reps to name the quantified Metric the buyer cares about, identify the Economic buyer with signing authority, understand the Decision criteria and Decision process, Identify the pain that funds the deal, and secure an internal Champion who sells for you when you're not in the room. Variants (MEDDPICC, MEDDICC) add Paper process and Competition.",
    aliases: ["MEDDPICC", "MEDDICC"],
    related: ["acv", "champion", "economic-buyer"],
    seenIn: [
      { title: "Why forecasts still miss in the age of Agentforce", date: "Jul 4, 2026" },
    ],
  },
  {
    slug: "revops",
    term: "RevOps",
    category: "RevOps",
    short:
      "Revenue Operations, the function unifying sales, marketing and CS ops around one pipeline and system of record.",
    long:
      "RevOps consolidates the historically siloed sales, marketing and customer success operations teams into a single function that owns the end-to-end revenue engine: data model, pipeline definition, forecasting, tooling, territory design and compensation plumbing. The bet is that one team owning the full funnel produces cleaner data, faster experiments and a single source of truth.",
    related: ["bookings", "pipeline-coverage", "gtm"],
  },
  {
    slug: "plg",
    term: "PLG",
    category: "GTM",
    short:
      "Product-Led Growth, a GTM motion where the product itself is the primary acquisition and expansion driver.",
    long:
      "PLG companies use a free or self-serve product surface (freemium, free trial, open-source core) as the top of funnel, with sales layered in only for expansion into teams and enterprises. Canonical examples: Slack, Figma, Notion, Linear. The economics only work if activation is fast, viral loops exist, and the product can convert without a human touch.",
    aliases: ["Product-Led Growth"],
    related: ["plg-2026", "gtm", "activation"],
  },
  {
    slug: "acv",
    term: "ACV",
    category: "Metrics",
    short:
      "Annual Contract Value, normalised annual revenue from a customer contract, excluding one-time fees.",
    long:
      "ACV normalises multi-year contracts to a single-year figure so that a 3-year $300k deal and a 1-year $100k deal are directly comparable. It excludes one-time services, setup and overage. ACV is the denominator behind most SaaS efficiency metrics (CAC payback, magic number, sales cycle).",
    related: ["arr", "bookings", "tcv"],
  },
  {
    slug: "arr",
    term: "ARR",
    category: "Metrics",
    short: "Annual Recurring Revenue, the run-rate of contracted subscription revenue at a point in time.",
    long:
      "ARR is a snapshot: what would this book of business generate over the next 12 months if nothing changed? It excludes one-time revenue, professional services and usage overages. ARR is the number boards, VCs and public markets underwrite SaaS businesses on.",
    related: ["acv", "nrr", "bookings"],
  },
  {
    slug: "bookings",
    term: "Bookings",
    category: "Metrics",
    short:
      "Signed contract value in a period. Not revenue; not cash. The leading indicator RevOps lives on.",
    long:
      "Bookings represent the total contracted value of deals closed in a period, regardless of when the revenue is recognised or the cash lands. A $120k annual contract signed today is $120k of bookings today, but only $10k of MRR and probably $60k of cash on net-60 terms.",
    related: ["arr", "acv", "cash-collections"],
  },
  {
    slug: "agentic-sdr",
    term: "Agentic SDR",
    category: "AI",
    short:
      "An AI agent that autonomously researches, personalises and sends outbound sequences with human oversight.",
    long:
      "Agentic SDRs go beyond template-based sequencers: they research the target account, pick the trigger, draft the message in the rep's voice, decide the channel, send, wait, and follow up, with humans reviewing edge cases. The category was defined in 2024–2025 by 11x, Artisan and Regie, and is now being absorbed into the major CRMs.",
    related: ["agentforce", "outbound", "clay"],
  },
  {
    slug: "agentforce",
    term: "Agentforce",
    category: "AI",
    short: "Salesforce's platform for building and deploying autonomous AI agents inside the CRM.",
    long:
      "Launched at Dreamforce 2024, Agentforce lets customers build agents that act on Salesforce data, qualifying leads, resolving cases, updating pipeline, priced per conversation. Its rollout has quietly reshaped enterprise CRM pricing in 2026.",
    related: ["agentic-sdr", "salesforce"],
  },
  {
    slug: "nrr",
    term: "NRR",
    category: "Metrics",
    short:
      "Net Revenue Retention, % of recurring revenue retained from existing customers over 12 months, including expansion, minus churn and contraction.",
    long:
      "NRR above 120% is the mark of a category-defining SaaS business; 100–110% is healthy; sub-100% means the leaky bucket is losing water faster than sales can fill it. NRR is the single strongest predictor of long-term valuation multiples.",
    aliases: ["Net Dollar Retention", "NDR"],
    related: ["grr", "churn", "arr"],
  },
  {
    slug: "grr",
    term: "GRR",
    category: "Metrics",
    short: "Gross Revenue Retention, retention excluding any expansion revenue. Caps at 100%.",
    long:
      "GRR strips out upsell and cross-sell to expose the true stickiness of the product. If NRR is 130% but GRR is 82%, the business is masking a churn problem with heroic expansion.",
    related: ["nrr", "churn"],
  },
  {
    slug: "cac",
    term: "CAC",
    category: "Metrics",
    short: "Customer Acquisition Cost, fully-loaded S&M spend divided by new customers acquired in the period.",
    long:
      "CAC includes salaries, commissions, tooling, ads and content, not just paid media. Blended CAC divides by all new customers; paid CAC divides by customers attributable to paid channels only. CAC is only meaningful when paired with LTV and payback period.",
    related: ["ltv", "cac-payback", "magic-number"],
  },
  {
    slug: "ltv",
    term: "LTV",
    category: "Metrics",
    short: "Lifetime Value, the gross-profit-weighted expected revenue from a customer over their lifetime.",
    long:
      "The honest formula is (ARPA × gross margin) / churn rate. LTV:CAC below 3:1 signals under-investment in growth or a broken funnel; above 5:1 usually means the company is under-spending on sales & marketing.",
    related: ["cac", "nrr", "arpa"],
  },
  {
    slug: "cac-payback",
    term: "CAC Payback",
    category: "Metrics",
    short: "Months of gross profit required to recover the CAC of a new customer.",
    long:
      "CAC Payback is the working-capital metric that matters more than LTV:CAC for scaling businesses, because it dictates how much cash you need to grow. Best-in-class SMB SaaS: <12 months. Enterprise: <24 months.",
    related: ["cac", "ltv"],
  },
  {
    slug: "pipeline-coverage",
    term: "Pipeline Coverage",
    category: "RevOps",
    short: "Open pipeline in a period divided by the quota for that period. The health check every RevOps team runs on Mondays.",
    long:
      "Rule of thumb: 3x pipeline coverage entering a quarter for a mature sales org, 4–5x for a young one or one with a longer sales cycle. Below 2.5x and the quarter is in trouble regardless of what the forecast says.",
    related: ["forecast", "win-rate", "sales-cycle"],
  },
  {
    slug: "win-rate",
    term: "Win Rate",
    category: "Sales",
    short: "% of qualified opportunities that close-won in a period.",
    long:
      "Segment win rate by source, segment, product, rep and stage entered to find where the funnel actually leaks. A single blended win-rate number is close to useless.",
    related: ["pipeline-coverage", "sales-cycle"],
  },
  {
    slug: "sales-cycle",
    term: "Sales Cycle",
    category: "Sales",
    short: "Median days from opportunity created to close-won.",
    long:
      "Cycle length compounds: doubling it halves the number of deals a rep can carry per year. Measure the median, not the mean, a few 400-day whales will lie to you.",
    related: ["win-rate", "pipeline-coverage"],
  },
  {
    slug: "icp",
    term: "ICP",
    category: "GTM",
    short: "Ideal Customer Profile, the tightly-defined firmographic + behavioural profile of the accounts you win, keep and expand.",
    long:
      "ICP is not a persona and it is not a TAM slice, it is the intersection of accounts that convert fastest, churn least and expand most. Most GTM problems in Series A→B companies come from an ICP that is too broad.",
    related: ["persona", "abm", "tam"],
  },
  {
    slug: "abm",
    term: "ABM",
    category: "Marketing",
    short: "Account-Based Marketing, coordinated sales + marketing plays run against a finite named account list.",
    long:
      "ABM inverts the demand-gen funnel: pick the accounts first, then generate demand into them with a mix of advertising, direct mail, events, personalised content and outbound. Only works when the ACV justifies the touch.",
    related: ["icp", "outbound"],
  },
  {
    slug: "outbound",
    term: "Outbound",
    category: "Sales",
    short: "The GTM motion where sellers or SDRs initiate contact with accounts that have not raised a hand.",
    long:
      "Outbound was pronounced dead in 2023 as reply rates collapsed under sequencer volume. It came back in 2025 with agentic tooling that researches, drafts and sends one-to-one messages at near-inbound quality.",
    related: ["agentic-sdr", "clay", "abm"],
  },
  {
    slug: "champion",
    term: "Champion",
    category: "Sales",
    short: "An internal advocate inside the buying org who sells the deal when you are not in the room.",
    long:
      "A real champion has power, has personal upside from the deal, and can articulate the business case to their economic buyer. Without one, the deal will slip. Testing the champion (asking them to arrange the EB meeting) is a core MEDDIC discipline.",
    related: ["meddic", "economic-buyer"],
  },
  {
    slug: "economic-buyer",
    term: "Economic Buyer",
    category: "Sales",
    short: "The single person with discretionary authority to release the funds for the purchase.",
    long:
      "Not the sponsor, not the user, not the recommender, the person whose budget the money comes from. Deals that close without an EB meeting close at half the rate.",
    related: ["meddic", "champion"],
  },
  {
    slug: "forecast",
    term: "Forecast",
    category: "RevOps",
    short: "The bookings number leadership commits to the board for the current period, a range, a confidence, and the judgment behind it.",
    long:
      "A sales forecast is the number the CRO signs their name to. It is not the pipeline, not the quota, not the plan, it is the disciplined, deal-by-deal answer to the question: how much will we book this period, and how sure are we? A good forecast is a range with a stated confidence, built bottom-up from deal-level judgment (commit, best case, pipeline), reconciled against a top-down capacity model (reps × ramp × productivity), and pressure-tested against historical conversion by stage, source and segment. AI-assisted forecasting narrows the range and flags the deals most likely to slip, but it does not remove the human judgment, it changes what humans spend their judgment on.",
    aliases: ["Sales Forecast", "Revenue Forecast", "Bookings Forecast"],
    pronunciation: "/ˈfɔːrkæst/",
    firstUsed: "Standard commercial usage since the 1950s; codified in modern SaaS by Salesforce forecast categories in the mid-2000s.",
    updated: "Jul 7, 2026",
    alsoCalled: ["The Number", "The Call", "Commit + Best Case"],
    notToBeConfusedWith: [
      {
        term: "Pipeline",
        slug: "pipeline-coverage",
        note: "Pipeline is the raw open opportunity value. The forecast is the subset of pipeline you expect to actually close.",
      },
      {
        term: "Quota",
        note: "Quota is the target set at the start of the year. The forecast is what you now believe you'll deliver against it.",
      },
      {
        term: "Plan",
        note: "The plan is the board-approved number for the year. The forecast is the rolling, in-quarter update to it.",
      },
    ],
    formula: {
      label: "Weighted forecast (bottom-up)",
      expression: "Forecast = Σ (Deal Value × P(close in period))",
      note: "In practice, most orgs replace the probability with a categorical judgment (Commit / Best Case / Pipeline) and roll those buckets up, because rep-supplied percentages are notoriously miscalibrated.",
    },
    inputs: [
      { name: "Commit", description: "Deals the rep is personally staking their number on. Historical close rate: 90%+." },
      { name: "Best Case", description: "Deals that could realistically land if things break right. Historical close rate: 50–70%." },
      { name: "Pipeline", description: "Everything else qualified in-quarter. Historical close rate: 20–35%." },
      { name: "Omitted", description: "Deals excluded from the forecast, usually stage 0/1 or slipped." },
    ],
    worked: [
      {
        title: "Example, Q3 forecast for one AE",
        steps: [
          { label: "Commit", value: "$180k × 0.90 = $162k" },
          { label: "Best Case", value: "$220k × 0.60 = $132k" },
          { label: "Pipeline", value: "$400k × 0.25 = $100k" },
        ],
        result: "Weighted forecast = $394k. Rep call: $300k. Manager call: $340k. CRO commit to board: $325k (low end), $360k (high end).",
      },
    ],
    whyItMatters: [
      "It's the number the board, investors and public markets underwrite. Miss it twice and the CFO or CRO usually leaves.",
      "It sets hiring, marketing spend and cash runway for the next two quarters. A soft forecast that later firms up is cheaper than a hard forecast that misses.",
      "The discipline of forecasting, not the number itself, is where deal coaching, pipeline hygiene and rep accountability actually happen.",
    ],
    howToUse: [
      { step: "1. Freeze the definitions", detail: "Write down what Commit, Best Case and Pipeline mean at your company. Publish it. Do not change it mid-quarter." },
      { step: "2. Forecast bottom-up first", detail: "Reps call their deals → managers challenge → directors roll up → CRO reconciles. Never start top-down; you'll anchor the org." },
      { step: "3. Reconcile against a top-down model", detail: "Reps × ramp-adjusted productivity × seasonality. If bottom-up and top-down disagree by >10%, one of them is wrong. Find out which." },
      { step: "4. Track forecast accuracy", detail: "Every week, log the call vs. the actual. The goal is not to be right on average, it's to be within ±5% by week 4 of the quarter." },
      { step: "5. Post-mortem every miss", detail: "For every deal that slipped, categorise: qualification, competition, champion loss, budget, timing, product gap. The pattern is the coaching plan." },
    ],
    benchmarks: [
      { segment: "SMB SaaS, transactional", value: "±5% by week 4, ±2% by week 10", note: "Short cycles = tight late-quarter accuracy." },
      { segment: "Mid-market SaaS", value: "±10% by week 4, ±5% by week 10" },
      { segment: "Enterprise SaaS", value: "±15% by week 4, ±7% by week 10", note: "Long cycles + concentrated deals = wider bands." },
      { segment: "Usage-based / consumption", value: "±8% on net-new, ±3% on expansion", note: "Expansion is more predictable than new logo." },
    ],
    cadence: [
      { label: "Weekly", detail: "Rep 1:1s. Deal-level inspection. Update Commit / Best Case." },
      { label: "Bi-weekly", detail: "Manager roll-up call. Challenge every Commit slip and every Best Case add." },
      { label: "Monthly", detail: "CRO forecast review. Reconcile bottom-up vs. top-down. Update the board range." },
      { label: "Quarterly", detail: "Forecast accuracy post-mortem. Recalibrate stage conversion rates." },
    ],
    pitfalls: [
      { title: "Sandbagging", detail: "Reps under-call to over-deliver. Detected by systematically low commit-to-close ratios (<85%). Fix: hold reps to a symmetric accuracy target, not just 'don't miss'." },
      { title: "Happy ears", detail: "Reps forecast what the champion told them, not what the economic buyer will do. Fix: require EB confirmation to move to Commit." },
      { title: "Stage inflation", detail: "Deals get pushed to later stages to justify pipeline coverage, without the exit criteria being met. Fix: enforce stage-gate evidence in CRM." },
      { title: "Hero forecasts", detail: "The CRO overrides a soft roll-up with a personal number to protect the board relationship. Works once. Destroys trust when it misses." },
      { title: "Forecasting the pipeline, not the deals", detail: "Applying an average close rate to total pipeline value. Fine for a 300-rep org; catastrophic for anyone with deal concentration." },
    ],
    tooling: [
      { name: "Salesforce Forecast Categories", note: "The lingua franca. Pipeline / Best Case / Commit / Closed. Everything else maps to these." },
      { name: "Clari, BoostUp, Gong Forecast", note: "AI-assisted forecasting platforms. Ingest CRM + email + calls to flag deals at risk of slipping and generate a machine-called forecast alongside the rep-called one." },
      { name: "Agentforce (Salesforce)", note: "As of 2026, native agentic forecast assistants inside the CRM, reducing but not removing the manager review layer." },
      { name: "Spreadsheet", note: "Still the reconciliation layer at most companies below $100M ARR. That's fine, the discipline matters more than the tool." },
    ],
    faq: [
      {
        q: "Is the forecast the same as the quota?",
        a: "No. Quota is the target set at the start of the year. Forecast is the rolling, in-quarter estimate of what will actually book. A rep at 60% to quota can still have a credible forecast, the two numbers answer different questions.",
      },
      {
        q: "Should the forecast be a single number or a range?",
        a: "Internally, always a range: low (commit), high (commit + best case). Externally to the board, a single 'commit' number with a stated best case. Boards that receive only a single point number learn nothing about the risk profile.",
      },
      {
        q: "How much should AI-generated forecasts weigh vs. rep-called?",
        a: "Treat AI forecasts as a second opinion, not a replacement. In 2026, best-in-class orgs blend them: the AI call anchors the low end of the range and flags deals to inspect; the rep call sets the high end. Divergence >15% triggers a deal-by-deal review.",
      },
      {
        q: "When does the forecast lock?",
        a: "For public SaaS, the CFO typically locks the external forecast by week 6 of the quarter. Internally, reps continue updating weekly until the last day. The lock is a communication event, not a data event.",
      },
    ],
    furtherReading: [
      { title: "Cracking the Sales Management Code", source: "Jason Jordan, the canonical text on separating activities, objectives and results in forecasting." },
      { title: "The Qualified Sales Leader", source: "John McMahon, chapters 4 and 7 on forecast discipline in enterprise sales." },
      { title: "Clari 'State of Revenue' report", source: "Annual benchmark on forecast accuracy across SaaS segments." },
    ],
    related: ["pipeline-coverage", "win-rate", "sales-cycle", "revops", "meddic", "arr"],
    seenIn: [
      { title: "Why forecasts still miss in the age of Agentforce", date: "Jul 4, 2026" },
      { title: "The CRO's Monday: what actually happens in a forecast call", date: "Jun 23, 2026" },
      { title: "Clari's Q2 accuracy benchmark, read three ways", date: "May 19, 2026" },
    ],
  },
  {
    slug: "mrr",
    term: "MRR",
    category: "Metrics",
    short: "Monthly Recurring Revenue, the monthly-normalised version of ARR.",
    long:
      "MRR is the operating metric for SMB and self-serve businesses where contracts are monthly and expansion happens in real time. New MRR, expansion MRR, contraction MRR and churned MRR together form the SaaS movement chart.",
    related: ["arr", "nrr"],
  },
  {
    slug: "churn",
    term: "Churn",
    category: "Metrics",
    short: "The rate at which customers or revenue leave the business in a period.",
    long:
      "Logo churn counts customers; revenue churn counts dollars. Gross vs net churn is the same distinction as GRR vs NRR. Cohort-based churn analysis is the only honest way to measure it.",
    related: ["nrr", "grr"],
  },
  {
    slug: "gtm",
    term: "GTM",
    category: "GTM",
    short: "Go-To-Market, the full system of how a company acquires, sells to, and expands customers.",
    long:
      "GTM covers ICP, pricing & packaging, sales motion, marketing engine, channel strategy, CS motion and the org design that supports them. GTM fit is the second product-market fit, many companies find PMF and still fail to find GTM fit.",
    related: ["plg", "icp", "revops"],
  },
  {
    slug: "tam",
    term: "TAM",
    category: "GTM",
    short: "Total Addressable Market, the total revenue opportunity if you had 100% market share.",
    long:
      "TAM is a fundraising number; SAM (Serviceable) and SOM (Obtainable) are the operating numbers. The honest TAM is bottom-up: accounts × ACV, not analyst report top-down.",
    related: ["icp", "gtm"],
  },
  {
    slug: "magic-number",
    term: "Magic Number",
    category: "Metrics",
    short: "Net new ARR in a quarter divided by S&M spend in the prior quarter. A payback proxy.",
    long:
      "Above 1.0: invest more in S&M. Between 0.5 and 1.0: keep spending. Below 0.5: something is broken, fix efficiency before adding headcount.",
    related: ["cac-payback", "cac"],
  },
  {
    slug: "rule-of-40",
    term: "Rule of 40",
    category: "Metrics",
    short: "Growth rate + free cash flow margin should sum to at least 40 for a healthy SaaS business.",
    long:
      "The Rule of 40 became the dominant public-SaaS valuation heuristic post-2022. A 60% grower losing 20% margin passes; so does a 20% grower at 20% margin. Below 40, multiples compress fast.",
    related: ["arr", "nrr"],
  },
  {
    slug: "arpa",
    term: "ARPA",
    category: "Metrics",
    short: "Average Revenue Per Account, total recurring revenue divided by number of accounts.",
    long:
      "ARPA trending up is usually good (moving upmarket, packaging working). ARPA trending up while logo count falls is usually bad (SMB churn masked by enterprise wins).",
    related: ["ltv", "arr"],
  },
  {
    slug: "plg-2026",
    term: "PLG 2026",
    category: "GTM",
    short: "Shorthand for the post-ZIRP evolution of PLG: usage-based pricing, product-qualified accounts, and hybrid sales-assist motions.",
    long:
      "Pure self-serve PLG hit a wall in 2023 as free-tier economics broke. PLG 2026 is the pragmatic version: product creates the qualified account, a lightweight sales team closes the expansion, and pricing follows usage not seats.",
    related: ["plg", "gtm", "activation"],
  },
  {
    slug: "activation",
    term: "Activation",
    category: "GTM",
    short: "The moment a new user completes the action that reliably predicts long-term retention.",
    long:
      "Every PLG product has an activation event, Slack's 2,000 messages, Dropbox's one file on two devices, Figma's inviting a second editor. Finding it and optimising for it is the single highest-leverage growth exercise.",
    related: ["plg", "plg-2026"],
  },

  // , , , , ,  Sales frameworks & methodologies , , , , , 
  {
    slug: "bant",
    term: "BANT",
    category: "Sales",
    short: "Budget, Authority, Need, Timeline, IBM's 1960s qualification checklist, still the default for inbound SDR triage.",
    long:
      "BANT asks four questions: does the prospect have Budget, the Authority to spend it, a real Need, and a Timeline to buy? It's fast and easy to teach, which is why it survives, but it's a buyer-centric checklist, not a deal-progression framework, and it fails on modern committee-based deals where authority is diffuse.",
    related: ["meddic", "champion", "economic-buyer"],
  },
  {
    slug: "spin-selling",
    term: "SPIN Selling",
    category: "Sales",
    short: "Situation, Problem, Implication, Need-payoff, Neil Rackham's question-based framework for consultative discovery.",
    long:
      "Based on 35,000 sales-call observations at Xerox and IBM in the 1980s, SPIN found that top reps ask more Implication and Need-payoff questions, surfacing the cost of the problem, than mediocre reps, who focus on features. Still the canonical discovery framework taught inside most enterprise sales orgs.",
    related: ["discovery-call", "challenger-sale", "gap-selling"],
  },
  {
    slug: "challenger-sale",
    term: "Challenger Sale",
    category: "Sales",
    short: "CEB's 2011 research: complex-sale winners Teach, Tailor and Take Control, they reframe the buyer's worldview.",
    long:
      "Matt Dixon and Brent Adamson's data showed that in complex B2B, the top performer is the Challenger (40% of top reps), not the Relationship Builder. Challengers bring a provocative insight, tailor it to the economic buyer, and are comfortable creating constructive tension. The playbook is now baked into most enterprise enablement.",
    related: ["spin-selling", "gap-selling", "enablement"],
  },
  {
    slug: "sandler",
    term: "Sandler Selling",
    category: "Sales",
    short: "A submarine-model methodology built around upfront contracts, pain funnel and 'no' being an acceptable answer.",
    long:
      "David Sandler's 1967 system inverts the seller-buyer power dynamic: the rep sets explicit upfront contracts (agenda, next step, decision) at every meeting, digs three layers deep into pain, and disqualifies fast. Popular in mid-market and channel sales; less used in complex enterprise.",
    related: ["meddic", "discovery-call"],
  },
  {
    slug: "gap-selling",
    term: "Gap Selling",
    category: "Sales",
    short: "Keenan's framework: sell the gap between the buyer's current state and future state, quantified in business impact.",
    long:
      "Gap Selling forces reps to build a rigorous current-state / future-state / gap picture with the buyer, in the buyer's numbers, before ever mentioning the product. The bigger the quantified gap, the bigger the deal. Widely adopted in modern SaaS discovery training.",
    related: ["discovery-call", "meddic", "spin-selling"],
  },
  {
    slug: "discovery-call",
    term: "Discovery Call",
    category: "Sales",
    short: "The first substantive sales conversation, where qualification, pain and process are established, not product pitched.",
    long:
      "A well-run discovery is 70% buyer talking. The rep confirms pain, quantifies impact, maps the buying committee and agrees a mutual next step. Skipping or shortening discovery is the single biggest predictor of a deal that slips or loses to 'no decision'.",
    related: ["spin-selling", "gap-selling", "no-decision", "meddic"],
  },
  {
    slug: "demo",
    term: "Demo",
    category: "Sales",
    short: "A tailored product walkthrough tied back to the specific pain uncovered in discovery. Not a feature tour.",
    long:
      "The best demos show three to five moments that map to the buyer's stated pain, in the buyer's data if possible, and end with a specific next step. Generic 'happy path' demos correlate strongly with 'no decision' losses.",
    related: ["discovery-call", "poc", "no-decision"],
  },
  {
    slug: "poc",
    term: "POC / Pilot",
    category: "Sales",
    short: "A time-boxed, success-criteria-bound trial of the product against the buyer's real data or workflow.",
    long:
      "A real POC has: written success criteria signed by the economic buyer, a fixed end date, defined executive review, and a mutual action plan for what happens if it succeeds. POCs without these become free consulting and rarely convert.",
    aliases: ["Proof of Concept", "Pilot"],
    related: ["mutual-action-plan", "economic-buyer", "no-decision"],
  },
  {
    slug: "mutual-action-plan",
    term: "Mutual Action Plan",
    category: "Sales",
    short: "A shared, dated checklist of steps and owners, buyer and seller, from now to signature and go-live.",
    long:
      "The MAP (sometimes GPCT, close plan, joint execution plan) is the single most reliable forecasting artefact in complex sales. If the buyer edits and returns it, the deal is real. If they won't engage with it, the deal isn't.",
    aliases: ["MAP", "Close Plan", "Joint Execution Plan"],
    related: ["forecast", "meddic", "champion"],
  },
  {
    slug: "no-decision",
    term: "No Decision",
    category: "Sales",
    short: "The most common loss reason in B2B: the buyer doesn't pick a competitor, they just don't buy anything.",
    long:
      "Industry research puts no-decision losses at 40–60% of all lost enterprise deals. The root cause is almost always weak qualification of pain and impact, the buyer never built a strong enough internal case to fight for budget. Beating status quo is the real competitor.",
    related: ["discovery-call", "gap-selling", "meddic"],
  },
  {
    slug: "land-and-expand",
    term: "Land and Expand",
    category: "Sales",
    short: "GTM motion: win a small initial footprint, then grow ACV inside the account via seats, products or use cases.",
    long:
      "Popularised by New Relic, Datadog and Snowflake. Requires strong product usage data, a dedicated CS or expansion AE motion, and pricing that scales cleanly. NRR above 120% is usually a land-and-expand company.",
    related: ["nrr", "expansion-arr", "upsell", "cross-sell"],
  },
  {
    slug: "upsell",
    term: "Upsell",
    category: "Sales",
    short: "Moving an existing customer to a higher tier, more seats or a bigger contract.",
    long:
      "Upsell is the highest-margin revenue in SaaS: no CAC, existing champion, existing integration. Measured as expansion ARR / starting ARR, contributing to NRR.",
    related: ["cross-sell", "expansion-arr", "nrr"],
  },
  {
    slug: "cross-sell",
    term: "Cross-sell",
    category: "Sales",
    short: "Selling an additional product or SKU into an existing customer.",
    long:
      "Cross-sell is the multi-product platform play, HubSpot's Hubs, Salesforce's Clouds, Atlassian's suite. Requires clean product-account mapping and either a dedicated cross-sell rep or an account-owning AE with the right comp incentive.",
    related: ["upsell", "expansion-arr", "nrr"],
  },
  {
    slug: "sequence",
    term: "Sequence",
    category: "Sales",
    short: "A multi-touch, multi-channel outbound cadence executed by an SDR, email, call, LinkedIn, over ~2–3 weeks.",
    long:
      "The classic 'Aaron Ross' sequence is 8–14 touches across 3 weeks. Reply rates on templated sequences collapsed 2022–2024; the 2026 baseline is one-to-one, research-led sequences generated by agentic SDR tooling with human review.",
    aliases: ["Cadence"],
    related: ["outbound", "agentic-sdr", "sdr"],
  },
  {
    slug: "dialer",
    term: "Parallel Dialer",
    category: "Sales",
    short: "Software that dials 3–10 numbers simultaneously and connects the rep only when a human answers.",
    long:
      "Parallel dialers (Orum, Nooks, Koncert) resurrected outbound calling by removing the dead-air problem. A rep on a parallel dialer averages 30–60 connects per day vs. 5–10 on a single-line dialer.",
    related: ["outbound", "sequence", "sdr"],
  },
  {
    slug: "objection-handling",
    term: "Objection Handling",
    category: "Sales",
    short: "The rep skill of surfacing, acknowledging and resolving buyer concerns without becoming defensive.",
    long:
      "Modern methodologies (Sandler, Challenger) treat objections as information: an unspoken objection is far more dangerous than a stated one. Best-in-class enablement teams maintain a live objection library keyed to call recordings.",
    related: ["sandler", "challenger-sale", "enablement"],
  },
  {
    slug: "deal-desk",
    term: "Deal Desk",
    category: "Sales",
    short: "Cross-functional team (finance, legal, product, RevOps) that reviews and approves non-standard deal terms.",
    long:
      "Deal desks exist to move faster than legal alone while protecting margin, ARR quality and precedent. Well-run desks publish an approval matrix so reps know what needs review; poorly-run desks become deal graveyards.",
    related: ["cpq", "quote-to-cash", "revops"],
  },
  {
    slug: "cpq",
    term: "CPQ",
    category: "Sales",
    short: "Configure, Price, Quote, software that produces a valid, priced quote from a product catalogue and rules engine.",
    long:
      "CPQ (Salesforce CPQ, DealHub, PandaDoc) is the backbone of quote-to-cash. It enforces bundle rules, discount thresholds and approval workflows. Every enterprise deal desk sits on top of a CPQ.",
    aliases: ["Configure Price Quote"],
    related: ["deal-desk", "quote-to-cash", "order-form"],
  },
  {
    slug: "quote-to-cash",
    term: "Quote-to-Cash",
    category: "Sales",
    short: "The end-to-end process from generating a quote to collecting the cash, quote, contract, order, invoice, revenue.",
    long:
      "Q2C spans CPQ, CLM (contract lifecycle), billing, revenue recognition and collections. RevOps typically owns the process; finance owns the systems of record. Broken Q2C is the #1 hidden tax on SaaS growth.",
    aliases: ["Q2C"],
    related: ["cpq", "deal-desk", "cash-collections"],
  },
  {
    slug: "order-form",
    term: "Order Form",
    category: "Sales",
    short: "The commercial signature document that references the MSA and specifies products, quantities, term and price.",
    long:
      "In enterprise SaaS, the MSA is signed once; each subsequent transaction is a new order form referencing it. This structure is what makes multi-year expansion sales fast.",
    related: ["msa", "cpq", "quote-to-cash"],
  },
  {
    slug: "msa",
    term: "MSA",
    category: "Sales",
    short: "Master Services Agreement, the umbrella legal contract governing all commercial engagements between two parties.",
    long:
      "The MSA covers liability, IP, data protection, indemnity and dispute resolution. Negotiated once, then each order form or SOW sits under it. Redlining an MSA can add 30+ days to a first deal; getting it done is often the single biggest cycle-time saver.",
    aliases: ["Master Services Agreement"],
    related: ["order-form", "sow", "deal-desk"],
  },
  {
    slug: "sow",
    term: "SOW",
    category: "Sales",
    short: "Statement of Work, a scoped services engagement (implementation, integration, consulting) under an MSA.",
    long:
      "SOWs specify deliverables, timeline, milestones and payment terms for professional services. Not recurring revenue, not counted in ARR, but often critical to time-to-value.",
    aliases: ["Statement of Work"],
    related: ["msa", "time-to-value"],
  },

  // , , , , ,  Sales roles, comp & operations , , , , , 
  {
    slug: "sdr",
    term: "SDR",
    category: "Sales",
    short: "Sales Development Rep, outbound-focused rep who prospects new accounts and books meetings for AEs.",
    long:
      "SDRs sit at the top of the funnel and are measured on meetings booked, meetings held and pipeline generated. The role emerged from Aaron Ross's Predictable Revenue at Salesforce circa 2004 and is being reshaped by agentic SDR tooling.",
    aliases: ["Sales Development Representative"],
    related: ["bdr", "ae", "sequence", "agentic-sdr"],
  },
  {
    slug: "bdr",
    term: "BDR",
    category: "Sales",
    short: "Business Development Rep, often synonymous with SDR; some orgs split BDR = outbound, SDR = inbound.",
    long:
      "Naming varies by company. The functional split that matters is inbound (respond to raised hands) vs. outbound (create demand into cold accounts), the skills, cadence and comp differ materially.",
    aliases: ["Business Development Representative"],
    related: ["sdr", "ae", "outbound"],
  },
  {
    slug: "ae",
    term: "AE",
    category: "Sales",
    short: "Account Executive, the quota-carrying rep who runs deals from qualified opportunity to close.",
    long:
      "AEs are typically segmented by ACV band (SMB, mid-market, enterprise, strategic). An enterprise AE might carry 4–8 named accounts and a $1–3M quota; an SMB AE carries a territory of hundreds and closes 5–15 deals a month.",
    aliases: ["Account Executive"],
    related: ["sdr", "csm", "ote", "quota"],
  },
  {
    slug: "csm",
    term: "CSM",
    category: "Sales",
    short: "Customer Success Manager, post-sale owner of adoption, retention and (often) expansion.",
    long:
      "CSM comp models vary widely: some are pure retention (GRR-based), some carry an expansion quota, some are hybrid with AEs. The role is the single most-debated in modern SaaS org design.",
    aliases: ["Customer Success Manager"],
    related: ["nrr", "grr", "expansion-arr"],
  },
  {
    slug: "sales-engineer",
    term: "Sales Engineer",
    category: "Sales",
    short: "Technical pre-sales partner to the AE, owns demo, POC, technical validation and architecture Qs.",
    long:
      "Also called Solutions Consultant or Solutions Engineer. The SE-to-AE ratio (typically 1:2 to 1:4) is a leading indicator of a company's technical sale complexity. A great SE is often the difference between a technical win and a technical loss.",
    aliases: ["SE", "Solutions Consultant", "Solutions Engineer"],
    related: ["ae", "demo", "poc"],
  },
  {
    slug: "quota",
    term: "Quota",
    category: "Sales",
    short: "The annualised bookings or ARR target a rep is expected to deliver, the number their comp is built around.",
    long:
      "Quota is typically set at 4–6x OTE for AEs (i.e. a rep with $250k OTE carries a $1–1.5M quota). Attainment distribution should be roughly normal around 60–70% of the team hitting; if <40% hit, quotas are too high or the product/GTM is broken.",
    related: ["ote", "attainment", "capacity-model"],
  },
  {
    slug: "ote",
    term: "OTE",
    category: "Sales",
    short: "On-Target Earnings, total comp a rep earns at 100% quota attainment (base + variable).",
    long:
      "Standard splits: AE 50/50 base/variable, SDR 70/30, CSM 80/20. OTE is quoted at plan; over-attainment via accelerators can push actual earnings 1.5–3x above OTE for top performers.",
    aliases: ["On-Target Earnings"],
    related: ["quota", "accelerator", "comp-plan"],
  },
  {
    slug: "accelerator",
    term: "Accelerator",
    category: "Sales",
    short: "A comp-plan multiplier that pays a higher commission rate on bookings above quota.",
    long:
      "Typical: 1x rate to 100% quota, 1.5–2x from 100–150%, 2–3x above. Accelerators exist to prevent sandbagging and to make big-quarter reps rich, keeping them at the company.",
    related: ["comp-plan", "ote", "decelerator"],
  },
  {
    slug: "decelerator",
    term: "Decelerator",
    category: "Sales",
    short: "A comp-plan modifier that pays a lower rate below a threshold, protecting the business from paying full commission on weak performance.",
    long:
      "E.g. 0.5x below 50% attainment. Controversial: too aggressive and the team disengages; too soft and the P&L bleeds. Rare in early-stage, common in public SaaS.",
    related: ["accelerator", "comp-plan"],
  },
  {
    slug: "spiff",
    term: "SPIFF",
    category: "Sales",
    short: "A short-term bonus incentive on top of comp plan, usually for a specific product, quarter or behaviour.",
    long:
      "SPIFFs are a blunt instrument: effective for shifting rep focus in the short term (e.g. push a new product), but they train reps to wait for the next SPIFF rather than sell the base plan.",
    aliases: ["Special Performance Incentive"],
    related: ["comp-plan"],
  },
  {
    slug: "clawback",
    term: "Clawback",
    category: "Sales",
    short: "Commission recovered from a rep when a booked deal churns, downgrades or is refunded within a defined window.",
    long:
      "Standard clawback windows: 6–12 months on new logo, sometimes 3 months on expansion. Aligns rep incentives with revenue quality, not just booking speed. Contentious in every comp-plan negotiation.",
    related: ["comp-plan", "churn"],
  },
  {
    slug: "comp-plan",
    term: "Comp Plan",
    category: "Sales",
    short: "The written document governing how a rep is paid, base, variable, rate, accelerators, SPIFFs and clawbacks.",
    long:
      "The single most powerful lever a CRO has: change the comp plan and rep behaviour changes within one pay cycle. Also the most dangerous, plan errors compound quickly and destroy trust.",
    related: ["ote", "quota", "accelerator", "clawback"],
  },
  {
    slug: "attainment",
    term: "Attainment",
    category: "Sales",
    short: "The percentage of quota a rep, segment or team achieved in a period.",
    long:
      "Board-level view: % of reps at ≥100% quota (target 60–70%), median attainment (target 80–100%), top-quartile attainment. A team with 20% of reps at 200% and 60% at <50% has a product-market-fit problem masked by a few hero reps.",
    related: ["quota", "capacity-model"],
  },
  {
    slug: "ramp",
    term: "Ramp",
    category: "Sales",
    short: "The productivity curve of a new rep from hire to full quota, typically 3–9 months depending on ACV.",
    long:
      "Standard ramp: month 1–3 at 0%, month 4–6 at 33%, month 7–9 at 66%, month 10+ at 100%. Ramp-adjusted quota is what capacity models use. A rep who doesn't ramp on schedule is usually a bad hire or a bad territory, both are fixable, but only if you measure it.",
    related: ["capacity-model", "quota", "enablement"],
  },
  {
    slug: "capacity-model",
    term: "Capacity Model",
    category: "RevOps",
    short: "Top-down bookings model: # of reps × ramp-adjusted productivity × attainment assumption × seasonality.",
    long:
      "The capacity model answers 'given my current hiring plan, what's the maximum credible number?' It's the second half of every forecast reconciliation, bottom-up rep calls have to be sanity-checked against what the org can physically deliver.",
    related: ["forecast", "ramp", "attainment"],
  },
  {
    slug: "commit",
    term: "Commit",
    category: "Sales",
    short: "Forecast category: deals a rep is personally staking their number on. Historical close rate 90%+.",
    long:
      "Commit is a promise, not a probability. A deal moves to commit only when: economic buyer has verbally agreed, paper is with legal, and the close date is in-period. Everything else is Best Case.",
    related: ["forecast", "best-case", "pipeline-coverage"],
  },
  {
    slug: "best-case",
    term: "Best Case",
    category: "Sales",
    short: "Forecast category: deals that could realistically land if things break right. Historical close rate 50–70%.",
    long:
      "Best Case is where forecast accuracy lives or dies. Managers should challenge every Best Case add and every Best Case removal weekly.",
    related: ["forecast", "commit"],
  },
  {
    slug: "closed-won",
    term: "Closed-Won",
    category: "Sales",
    short: "Terminal opportunity stage, signed order form, in bookings, comp payable.",
    long:
      "Definition matters: some orgs mark closed-won on countersignature, others on first invoice. RevOps must publish and enforce one definition to keep bookings, forecast and comp aligned.",
    related: ["bookings", "closed-lost"],
  },
  {
    slug: "closed-lost",
    term: "Closed-Lost",
    category: "Sales",
    short: "Terminal opportunity stage, the deal did not close. Loss reason is the most-lied-about field in CRM.",
    long:
      "Real loss reasons cluster into: no decision, lost to competitor, lost to internal build, budget cut, champion left. Enforcing structured loss reasons (with call-recording review) is the highest-leverage RevOps hygiene move.",
    related: ["closed-won", "no-decision", "win-rate"],
  },
  {
    slug: "stage-gate",
    term: "Stage Gate",
    category: "Sales",
    short: "Explicit exit criteria a deal must satisfy to move from one pipeline stage to the next.",
    long:
      "E.g. exit Discovery only when pain, metric and EB are confirmed and logged. Stage gates are the antidote to stage inflation and the foundation of any credible forecast. AI call-summary tooling now auto-detects gate completion.",
    related: ["forecast", "meddic", "pipeline-coverage"],
  },

  // , , , , ,  RevOps / lifecycle , , , , , 
  {
    slug: "lead-scoring",
    term: "Lead Scoring",
    category: "RevOps",
    short: "Ranking inbound leads by fit (firmographic) and intent (behavioural) to prioritise SDR outreach.",
    long:
      "Modern lead scoring blends firmographic fit (ICP match), behavioural intent (site visits, content downloads, product signups) and third-party intent (Bombora, 6sense). Score decay matters as much as the score itself.",
    related: ["mql", "sql", "icp", "intent-data"],
  },
  {
    slug: "mql",
    term: "MQL",
    category: "RevOps",
    short: "Marketing Qualified Lead, an inbound lead that has met a fit + intent threshold and is ready for SDR outreach.",
    long:
      "MQL is a marketing hand-off metric. Its death has been predicted for a decade; it survives because the alternative (MQA, Marketing Qualified Account) requires account-based infrastructure most companies still don't have.",
    aliases: ["Marketing Qualified Lead"],
    related: ["sql", "sal", "lead-scoring", "pql"],
  },
  {
    slug: "sql",
    term: "SQL",
    category: "RevOps",
    short: "Sales Qualified Lead, an MQL that an SDR has contacted, qualified and accepted for AE handoff.",
    long:
      "SQL is the second gate. MQL→SQL conversion is the SDR productivity metric; SQL→Opportunity is the AE acceptance metric. Split them to diagnose funnel leaks.",
    aliases: ["Sales Qualified Lead"],
    related: ["mql", "sal", "opportunity"],
  },
  {
    slug: "sal",
    term: "SAL",
    category: "RevOps",
    short: "Sales Accepted Lead, the AE has confirmed the SQL meets the ICP and is worth working.",
    long:
      "The extra gate that stops SDRs from stuffing the pipeline with junk to hit meeting quota. SAL rate is a cleaner measure of lead quality than raw meeting-booked count.",
    aliases: ["Sales Accepted Lead"],
    related: ["mql", "sql", "opportunity"],
  },
  {
    slug: "opportunity",
    term: "Opportunity",
    category: "RevOps",
    short: "A qualified potential deal in the CRM, has a name, amount, close date, stage and owner.",
    long:
      "The opportunity is the atomic unit of pipeline. Every metric, win rate, cycle length, ACV, pipeline coverage, forecast, is a rollup of opportunity-level fields. Data quality here is everything.",
    aliases: ["Opp"],
    related: ["pipeline-coverage", "stage-gate", "forecast"],
  },
  {
    slug: "lead-routing",
    term: "Lead Routing",
    category: "RevOps",
    short: "Automated assignment of new leads to the right rep based on territory, segment, account ownership and load.",
    long:
      "Modern routing (Chili Piper, Default, LeanData) considers named-account ownership, round-robin among eligible reps, working hours and SLA. Poor routing is invisible pipeline leakage, leads sit unassigned for days.",
    related: ["round-robin", "territory", "book-of-business"],
  },
  {
    slug: "round-robin",
    term: "Round Robin",
    category: "RevOps",
    short: "Fair-share distribution of unassigned leads across eligible reps, one at a time.",
    long:
      "Simple in theory, fraught in practice: PTO, ramp status, weighted seniority, working hours and named-account overrides all complicate the round-robin. Every RevOps team maintains a bespoke rules engine.",
    related: ["lead-routing", "territory"],
  },
  {
    slug: "territory",
    term: "Territory",
    category: "RevOps",
    short: "The defined slice of the market (geography, industry, size, named accounts) a rep is responsible for.",
    long:
      "Good territory design balances TAM, existing pipeline and rep tenure so each rep has a credible path to quota. Annual territory planning is the highest-stakes RevOps exercise of the year.",
    related: ["book-of-business", "capacity-model", "tam"],
  },
  {
    slug: "book-of-business",
    term: "Book of Business",
    category: "RevOps",
    short: "The specific set of accounts a CSM or AE owns for retention and expansion.",
    long:
      "A CSM's book is measured by ARR under management, logo count and NRR. Book size tuning (typically $1–5M ARR for mid-market CSMs) is the primary lever on CSM productivity.",
    related: ["csm", "nrr", "territory"],
  },

  // , , , , ,  Metrics (extended) , , , , , 
  {
    slug: "tcv",
    term: "TCV",
    category: "Metrics",
    short: "Total Contract Value, full multi-year contract value including one-time fees, services and expected overages.",
    long:
      "TCV is the biggest number in the deal and the most gameable. A 3-year $300k ARR deal with $50k of services has $950k TCV. Boards want ARR; sales leaderboards often show TCV; the two must be reconciled.",
    aliases: ["Total Contract Value"],
    related: ["acv", "arr", "bookings"],
  },
  {
    slug: "cash-collections",
    term: "Cash Collections",
    category: "Metrics",
    short: "The cash actually received from customers in a period, the number CFOs plan runway from.",
    long:
      "Bookings ≠ revenue ≠ cash. A $1M annual bookings quarter on net-60 with 20% multi-year prepay looks very different in cash. Cash collections lag bookings by the average payment terms.",
    related: ["bookings", "dso"],
  },
  {
    slug: "dso",
    term: "DSO",
    category: "Metrics",
    short: "Days Sales Outstanding, average days to collect cash after invoicing. A working-capital efficiency metric.",
    long:
      "Formula: (AR / Revenue) × Days. Best-in-class SaaS: 30–45 days. Above 60 signals collections weakness or terms drift. Multi-year prepay pulls it down; enterprise net-90 pushes it up.",
    aliases: ["Days Sales Outstanding"],
    related: ["cash-collections"],
  },
  {
    slug: "gross-margin",
    term: "Gross Margin",
    category: "Metrics",
    short: "Revenue minus cost of revenue (hosting, support, payment processing, PS delivery), as a % of revenue.",
    long:
      "SaaS gross margin benchmarks: 75–85% (app software), 60–75% (usage-heavy infra), <60% flags a business model problem. Services-heavy revenue drags the blended number; report software GM separately.",
    related: ["rule-of-40", "contribution-margin"],
  },
  {
    slug: "burn-multiple",
    term: "Burn Multiple",
    category: "Metrics",
    short: "Net burn ÷ net new ARR. How many dollars burned to add one dollar of ARR. Coined by David Sacks.",
    long:
      "Post-ZIRP benchmark: <1 great, 1–1.5 good, 1.5–2 acceptable, >2 investigate. Replaced growth-at-all-costs as the default efficiency metric for private SaaS boards.",
    related: ["magic-number", "cac-payback", "rule-of-40"],
  },
  {
    slug: "quick-ratio",
    term: "SaaS Quick Ratio",
    category: "Metrics",
    short: "(New MRR + Expansion MRR) / (Churned MRR + Contraction MRR). Growth efficiency vs. leakage.",
    long:
      "Above 4 is elite, 2–4 is healthy, below 1 means the bucket is leaking faster than sales can fill it. Popularised by Insight Partners as a single-number SaaS health check.",
    related: ["nrr", "churn", "expansion-arr"],
  },
  {
    slug: "expansion-arr",
    term: "Expansion ARR",
    category: "Metrics",
    short: "Incremental ARR from existing customers via upsell, cross-sell, seat expansion or usage growth.",
    long:
      "Expansion ARR is the highest-margin ARR (no CAC, no ramp). Companies with expansion ARR > 30% of new ARR are structurally more valuable. Comp-plan design for expansion is the make-or-break lever.",
    related: ["upsell", "cross-sell", "nrr", "land-and-expand"],
  },
  {
    slug: "contraction-arr",
    term: "Contraction ARR",
    category: "Metrics",
    short: "ARR lost from existing customers via downgrades, seat reductions or plan changes, short of full churn.",
    long:
      "The silent NRR killer. A customer that drops from 100 seats to 60 is not churned, but is a 40% revenue loss. Segment contraction reasons like you segment churn.",
    related: ["churn", "nrr"],
  },
  {
    slug: "logo-retention",
    term: "Logo Retention",
    category: "Metrics",
    short: "% of customer accounts retained over a period, regardless of ACV, the count-based view of churn.",
    long:
      "Dollar retention (NRR/GRR) can look healthy while logo retention rots, a few big expansions mask many small churns. Report both. In SMB SaaS, 80% logo retention is elite; enterprise expects 95%+.",
    related: ["nrr", "grr", "churn"],
  },
  {
    slug: "cohort-analysis",
    term: "Cohort Analysis",
    category: "Metrics",
    short: "Grouping customers by signup period and measuring retention, expansion or LTV over time.",
    long:
      "The only honest way to measure retention. Blended monthly churn hides that Q1 cohorts might churn at 3% while Q4 cohorts churn at 8%. Cohort curves also expose whether product improvements are moving retention for new customers.",
    related: ["churn", "ltv", "activation-rate"],
  },
  {
    slug: "activation-rate",
    term: "Activation Rate",
    category: "Metrics",
    short: "% of new signups who complete the defined activation event within a defined window.",
    long:
      "Best-in-class PLG products track activation within 7 days of signup and optimise the whole onboarding around it. Moving activation rate 10 points is often worth more than 10x the ad spend.",
    related: ["activation", "plg", "time-to-value"],
  },
  {
    slug: "time-to-value",
    term: "Time to Value",
    category: "Metrics",
    short: "Days from contract signature (or signup) to the customer realising the first meaningful outcome.",
    long:
      "TTV is the leading indicator of both retention and expansion. Sub-30 days is elite for mid-market SaaS. Long TTV is usually an implementation or activation problem, not a product problem.",
    aliases: ["TTV"],
    related: ["activation", "csm", "sow"],
  },
  {
    slug: "pql",
    term: "PQL",
    category: "Metrics",
    short: "Product Qualified Lead, a user or account that has taken product actions predictive of buying intent.",
    long:
      "PQL is the PLG-native alternative to MQL: a real usage signal (invited teammates, connected data source, hit paywall) instead of a content download. PQL→SQL conversion routinely 3–10x MQL→SQL.",
    aliases: ["Product Qualified Lead"],
    related: ["mql", "sql", "plg", "activation"],
  },
  {
    slug: "nps",
    term: "NPS",
    category: "Metrics",
    short: "Net Promoter Score, % promoters (9–10) minus % detractors (0–6) on the 'would you recommend' question.",
    long:
      "Loved by CEOs, distrusted by researchers. Correlated with growth in aggregate, noisy at the account level. Track the trend, not the absolute number; segment by persona and lifecycle stage.",
    aliases: ["Net Promoter Score"],
    related: ["csat", "ces"],
  },
  {
    slug: "csat",
    term: "CSAT",
    category: "Metrics",
    short: "Customer Satisfaction Score, post-interaction 1–5 or 1–7 survey, reported as % top-box.",
    long:
      "CSAT is transactional (this ticket, this onboarding, this call) where NPS is relationship. Support and CS orgs live on CSAT; it moves faster than NPS and is more actionable at the rep level.",
    related: ["nps", "ces"],
  },

  // , , , , ,  GTM (extended) , , , , , 
  {
    slug: "pmf",
    term: "Product-Market Fit",
    category: "GTM",
    short: "The point where the market is pulling the product out of the company faster than the team can ship.",
    long:
      "Marc Andreessen's definition. Signals: retention curves flatten, organic growth appears, customers refer without prompting, NPS >40. PMF is not permanent, segment shifts and competitor moves can undo it.",
    aliases: ["PMF"],
    related: ["gtm-fit", "activation", "nrr"],
  },
  {
    slug: "gtm-fit",
    term: "GTM Fit",
    category: "GTM",
    short: "The second fit: a repeatable, scalable motion for acquiring and expanding the customers who love the product.",
    long:
      "Many companies find PMF and still fail to find GTM fit. Symptoms: every deal feels bespoke, CAC keeps rising, no rep other than the founder can close. Solving GTM fit is the Series B challenge.",
    related: ["pmf", "gtm", "icp"],
  },
  {
    slug: "persona",
    term: "Persona",
    category: "GTM",
    short: "A named archetype representing a specific role in the buying committee, champion, user, EB, etc.",
    long:
      "Personas are used to tailor messaging, content and demos. B2B personas should be role-based (VP RevOps, Head of Sales Enablement), not demographic. Distinct from ICP, which is account-level.",
    related: ["icp", "champion", "economic-buyer"],
  },
  {
    slug: "buyer-journey",
    term: "Buyer Journey",
    category: "GTM",
    short: "The stages a buyer moves through, awareness, consideration, evaluation, decision, post-purchase.",
    long:
      "In modern B2B, 60–80% of the buyer journey happens before the buyer contacts sales. This is why demand gen, thought leadership and dark-social presence matter as much as the sales motion itself.",
    related: ["funnel", "dark-social", "content-marketing"],
  },
  {
    slug: "funnel",
    term: "Funnel",
    category: "GTM",
    short: "The visual model of prospects narrowing from awareness → interest → consideration → intent → purchase.",
    long:
      "The funnel is a useful accounting tool and a misleading behavioural model, real buyers loop, exit, re-enter and involve many people. Modern GTM often uses 'flywheel' or 'buyer journey' language, but the funnel math still runs the forecast.",
    related: ["waterfall", "buyer-journey", "pipeline-coverage"],
  },
  {
    slug: "waterfall",
    term: "Marketing Waterfall",
    category: "GTM",
    short: "SiriusDecisions' funnel model: Inquiry → MQL → SAL → SQL → Opp → Closed. Conversion at each gate.",
    long:
      "The waterfall is the shared vocabulary marketing and sales use to argue about pipeline. Modern account-based versions (Demand Unit Waterfall) collapse it around accounts instead of leads.",
    related: ["mql", "sql", "sal", "funnel"],
  },

  // , , , , ,  AI (extended) , , , , , 
  {
    slug: "llm",
    term: "LLM",
    category: "AI",
    short: "Large Language Model, the transformer-based foundation model behind ChatGPT, Claude, Gemini and every 2024+ AI product.",
    long:
      "LLMs power the entire wave of AI in sales tech: call summarisation, email drafting, deal risk scoring, forecast rationalisation. Cost per token has fallen ~100x from 2023 to 2026, unlocking always-on inference workflows.",
    aliases: ["Large Language Model"],
    related: ["rag", "agent", "copilot"],
  },
  {
    slug: "rag",
    term: "RAG",
    category: "AI",
    short: "Retrieval-Augmented Generation, grounding an LLM's response in retrieved documents to reduce hallucination.",
    long:
      "The default architecture for enterprise AI in 2024–2026: embed the corpus (CRM notes, docs, calls) into a vector DB, retrieve the top-k relevant chunks at query time, and prompt the LLM with them. Every 'AI assistant in your CRM' is a RAG pipeline.",
    aliases: ["Retrieval-Augmented Generation"],
    related: ["llm", "embedding", "vector-db", "hallucination"],
  },
  {
    slug: "agent",
    term: "Agent",
    category: "AI",
    short: "An AI system that plans, uses tools and takes actions autonomously toward a goal, not just generates text.",
    long:
      "Agents are the 2025–2026 shift: from 'draft me an email' to 'own the outbound for these 50 accounts this week'. Agentforce, Clay's AI agents and 11x's Alice/Jordan are the archetypes. The unresolved question is oversight, how much a human reviews, and when.",
    related: ["agentic-sdr", "agentforce", "copilot"],
  },
  {
    slug: "copilot",
    term: "Copilot",
    category: "AI",
    short: "An AI assistant that suggests, drafts and summarises inside a human workflow, the human stays in the loop.",
    long:
      "Copilots (Microsoft Copilot, Gong Copilot, Salesforce Einstein Copilot) are the 'assistive' tier; agents are the 'autonomous' tier. The 2026 stack has both, with copilots handling the high-judgment work.",
    related: ["agent", "llm"],
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    category: "AI",
    short: "When an LLM generates plausible-sounding but factually wrong output, the fundamental risk of generative AI.",
    long:
      "Hallucination rates dropped materially from 2023 to 2026 via RAG, better base models and inference-time verification, but never to zero. Any customer-facing AI motion needs guardrails, source citation and human review of consequential outputs.",
    related: ["rag", "guardrails", "llm"],
  },
  {
    slug: "vector-db",
    term: "Vector Database",
    category: "AI",
    short: "A database that stores and searches high-dimensional embeddings, the retrieval layer of every RAG pipeline.",
    long:
      "Pinecone, Weaviate, Postgres+pgvector, Turbopuffer. Vector DBs enable semantic search: 'find CRM notes similar in meaning to this query', not 'find CRM notes with these keywords'.",
    related: ["rag", "embedding", "llm"],
  },
  {
    slug: "embedding",
    term: "Embedding",
    category: "AI",
    short: "A dense numeric vector representation of text, image or audio, the input format for semantic search and RAG.",
    long:
      "Embedding a corpus is the one-time cost of a RAG system; queries then compute embeddings on the fly and retrieve by cosine similarity. OpenAI, Cohere and Voyage lead the general-purpose embedding market; domain-specific models often outperform.",
    related: ["vector-db", "rag"],
  },
  {
    slug: "revenue-intelligence",
    term: "Revenue Intelligence",
    category: "AI",
    short: "Software category (Gong, Clari, Chorus) that captures every rep interaction and mines it for coaching, forecasting and risk.",
    long:
      "The category invented the phrase 'the deal is in the data'. RI platforms ingest calls, emails and CRM, then surface deal risk, competitor mentions, next-best-actions and forecast rollups. Now table-stakes for sales orgs above ~50 reps.",
    related: ["forecast", "deal-desk", "gong"],
  },
  {
    slug: "next-best-action",
    term: "Next Best Action",
    category: "AI",
    short: "AI-generated recommendation of the single highest-value action a rep should take on a deal right now.",
    long:
      "NBA (also 'deal signals') has moved from experimental to default in revenue intelligence platforms. Quality depends heavily on training data and on the rep's willingness to trust and click.",
    aliases: ["NBA"],
    related: ["revenue-intelligence", "agent"],
  },
  {
    slug: "clay",
    term: "Clay",
    category: "AI",
    short: "GTM data platform that combines 50+ data providers and LLM enrichment for account and contact research.",
    long:
      "Clay became the 2024–2026 default for scaled personalised outbound: pull firmographic + technographic + intent data, run LLM prompts against it (e.g. 'summarise this account's Q1 earnings priorities'), then push into the sequencer. Kicked off the 'AI-native GTM' category.",
    related: ["agentic-sdr", "outbound", "intent-data"],
  },

  // , , , , ,  Marketing (extended) , , , , , 
  {
    slug: "demand-gen",
    term: "Demand Gen",
    category: "Marketing",
    short: "The marketing discipline of creating and capturing buyer intent, paid, content, events, community.",
    long:
      "Demand gen owns the pipeline number marketing commits to. The modern split is demand creation (top-of-funnel, brand, dark social) vs. demand capture (search, retargeting, SDR-fed). Best-in-class teams measure both, not just capture.",
    aliases: ["Demand Generation"],
    related: ["dark-funnel", "abm", "content-marketing"],
  },
  {
    slug: "content-marketing",
    term: "Content Marketing",
    category: "Marketing",
    short: "Creating written, video and audio content that attracts, educates and converts a target audience over time.",
    long:
      "Content marketing is the long-cycle counterpart to paid: SEO-driven articles, podcasts, YouTube, newsletters. ROI is measurable but lagging (6–18 months). AI-generated content flooded the channel in 2023–2024; original perspective and data are the moat in 2026.",
    related: ["seo", "thought-leadership", "demand-gen"],
  },
  {
    slug: "seo",
    term: "SEO",
    category: "Marketing",
    short: "Search Engine Optimisation, earning organic ranking on Google (and increasingly LLM answers) for target queries.",
    long:
      "Post-2023, SEO strategy split: traditional (rank on Google) and answer engine optimisation (be cited by ChatGPT, Perplexity, Google AI Overviews). Both reward original data, structured content and E-E-A-T signals.",
    aliases: ["Search Engine Optimisation"],
    related: ["content-marketing", "sem"],
  },
  {
    slug: "sem",
    term: "SEM",
    category: "Marketing",
    short: "Search Engine Marketing, paid ads on search results, primarily Google Ads.",
    long:
      "SEM captures high-intent demand at the bottom of the funnel. Bidding on branded terms is defensive; bidding on competitor terms is offensive; bidding on category terms is expensive. CAC per SEM lead has risen ~30% year over year through the AI-search era.",
    aliases: ["Search Engine Marketing", "Paid Search"],
    related: ["ppc", "seo"],
  },
  {
    slug: "intent-data",
    term: "Intent Data",
    category: "Marketing",
    short: "Third-party behavioural signals (Bombora, 6sense, G2) that indicate an account is researching a category.",
    long:
      "Intent data lets marketing prioritise accounts already in-market instead of spraying the entire ICP. Accuracy varies wildly by provider and category. Best used to trigger sequences, not as a primary lead source.",
    related: ["abm", "lead-scoring", "clay"],
  },
  {
    slug: "dark-funnel",
    term: "Dark Funnel",
    category: "Marketing",
    short: "The un-attributable buyer research that happens off your properties, podcasts, Slack groups, LinkedIn, ChatGPT.",
    long:
      "Popularised by Chris Walker. Most B2B buying decisions are influenced in the dark funnel and then attributed to whichever last-touch channel the buyer eventually hits. Modern GTM optimises for dark-social presence, not attribution.",
    aliases: ["Dark Social"],
    related: ["thought-leadership", "demand-gen", "buyer-journey"],
  },
  {
    slug: "thought-leadership",
    term: "Thought Leadership",
    category: "Marketing",
    short: "Original, opinionated content from named executives that shapes how a market thinks about a category.",
    long:
      "The credible version, original research, contrarian analysis, executive POV, moves markets and shortens sales cycles. The generic version (LinkedIn platitudes ghostwritten at scale) actively damages brand equity.",
    related: ["content-marketing", "dark-funnel", "category-creation"],
  },
  {
    slug: "category-creation",
    term: "Category Creation",
    category: "Marketing",
    short: "The strategic move of defining a new market category and positioning your company as its default leader.",
    long:
      "Play Bigger's framework. Salesforce did it with CRM/SaaS, Drift with conversational marketing, Gong with revenue intelligence, HubSpot with inbound. Requires committing 60%+ of marketing spend to category evangelism, not product marketing.",
    related: ["thought-leadership", "gtm"],
  },
  {
    slug: "ctr",
    term: "CTR",
    category: "Marketing",
    short: "Click-Through Rate, clicks divided by impressions. The primary engagement metric for ads and email.",
    long:
      "Benchmarks are channel-specific: Google search 3–5%, display 0.1–0.5%, cold email 1–3%, LinkedIn Ads 0.4–0.6%. Rising CTR with falling CVR usually means creative is misleading.",
    aliases: ["Click-Through Rate"],
    related: ["cvr", "ppc"],
  },
  {
    slug: "cvr",
    term: "CVR",
    category: "Marketing",
    short: "Conversion Rate, completed actions divided by total sessions or clicks.",
    long:
      "Segment CVR by source, campaign, device and audience, a single blended CVR is close to useless. Landing page CVR is the highest-leverage optimisation surface in most SaaS funnels.",
    aliases: ["Conversion Rate"],
    related: ["ctr", "cpl"],
  },
  {
    slug: "cpl",
    term: "CPL",
    category: "Marketing",
    short: "Cost Per Lead, paid spend divided by leads generated. The top-of-funnel efficiency metric.",
    long:
      "Meaningless without lead quality context. A $50 CPL that converts to opp at 2% is worse than a $200 CPL that converts at 20%. Always report CPL alongside cost per SQL and cost per opp.",
    aliases: ["Cost Per Lead"],
    related: ["cpa", "cvr"],
  },
  {
    slug: "cpa",
    term: "CPA",
    category: "Marketing",
    short: "Cost Per Acquisition, paid spend divided by paying customers acquired. The bottom-of-funnel efficiency metric.",
    long:
      "The ad-platform sibling of CAC. CPA is channel-attributable; CAC is fully-loaded (includes salaries, tools, content). Both matter.",
    aliases: ["Cost Per Acquisition"],
    related: ["cac", "cpl"],
  },

  // ————— CRM systems & customer success —————
  {
    slug: "crm",
    term: "CRM",
    category: "Sales",
    short: "Customer Relationship Management, the system of record for accounts, contacts, opportunities and activities.",
    long: "CRM is both the software category (Salesforce, HubSpot, Pipedrive, Attio, Copper) and the discipline. It's the source of truth for pipeline, forecast, comp and territory. A CRM's value is bounded by the quality of the data reps put in, which is why every RevOps team spends most of its time on hygiene, not features.",
    aliases: ["Customer Relationship Management"],
    related: ["salesforce", "hubspot", "revops", "opportunity"],
  },
  {
    slug: "salesforce",
    term: "Salesforce",
    category: "Sales",
    short: "The dominant enterprise CRM platform, founded 1999. The default system of record above ~$50M ARR.",
    long: "Salesforce's Sales Cloud, Service Cloud, Marketing Cloud, CPQ, Slack and Agentforce collectively power the majority of the Fortune 500's revenue operations. Its per-seat pricing and Agentforce per-conversation model set the ceiling and floor for enterprise SaaS pricing in 2026.",
    related: ["crm", "agentforce", "cpq"],
  },
  {
    slug: "hubspot",
    term: "HubSpot",
    category: "Sales",
    short: "The SMB and mid-market CRM incumbent, built around an inbound marketing philosophy and a multi-Hub product suite.",
    long: "HubSpot's Hubs (Marketing, Sales, Service, CMS, Operations, Commerce) are the canonical cross-sell platform. Freemium CRM is the wedge; paid tier expansion is the model. In 2026, HubSpot's AI Breeze features are the primary differentiator against Salesforce for sub-500-employee companies.",
    related: ["crm", "cross-sell", "freemium"],
  },
  {
    slug: "health-score",
    term: "Health Score",
    category: "RevOps",
    short: "A composite metric CSMs use to predict which customers are at risk of churn or ready for expansion.",
    long: "Typical inputs: product usage frequency, feature depth, executive sponsor presence, support ticket volume, NPS, contract stage. Scored red / yellow / green. The score is only useful if a specific playbook fires from each colour.",
    related: ["csm", "churn", "playbook", "nrr"],
  },
  {
    slug: "qbr",
    term: "QBR",
    category: "Sales",
    short: "Quarterly Business Review, a strategic customer or internal review of the last quarter and the plan for the next.",
    long: "External QBRs (CSM + customer executive) review outcomes, adoption and roadmap. Internal QBRs (rep + management) inspect pipeline, forecast accuracy and territory. Both are theatre if not backed by data; both are gold when the data is real.",
    aliases: ["Quarterly Business Review"],
    related: ["ebr", "playbook", "forecast"],
  },
  {
    slug: "ebr",
    term: "EBR",
    category: "Sales",
    short: "Executive Business Review, a senior-level version of the QBR aligning C-suites on outcomes and strategic direction.",
    long: "EBRs are relationship insurance for large-ACV accounts. Attendance from the customer's C-suite is itself the leading indicator of expansion propensity. Missed EBRs are one of the most reliable churn signals.",
    aliases: ["Executive Business Review"],
    related: ["qbr", "champion", "economic-buyer"],
  },
  {
    slug: "playbook",
    term: "Playbook",
    category: "Sales",
    short: "A codified set of steps a rep or CSM runs against a specific scenario, deal type or customer signal.",
    long: "Modern playbooks live in the CRM (Salesforce Sales Programs, HubSpot Playbooks) or in dedicated tools (Ambition, Mindtickle). They turn tribal knowledge into an executable checklist and are the primary mechanism for rolling out a new methodology at scale.",
    related: ["enablement", "meddic", "health-score"],
  },
  {
    slug: "onboarding",
    term: "Onboarding",
    category: "GTM",
    short: "The structured post-sale process that gets a new customer from signature to first outcome.",
    long: "For self-serve products, onboarding is a product surface (checklist, tour, first-run experience). For enterprise, it's a services engagement led by an implementation manager. Onboarding quality correlates 1:1 with 90-day retention.",
    related: ["activation", "time-to-value", "csm"],
  },
  {
    slug: "adoption",
    term: "Adoption",
    category: "Metrics",
    short: "The extent to which a customer's users actually use the product's key features in their daily workflow.",
    long: "Measured as DAU/MAU ratio, feature adoption %, seats provisioned vs. seats active. Adoption is the leading indicator of both renewal and expansion; low adoption 60 days in is the strongest churn predictor.",
    related: ["activation-rate", "time-to-value", "nrr"],
  },
  {
    slug: "sales-kickoff",
    term: "Sales Kickoff",
    category: "Sales",
    short: "The annual all-hands sales conference that resets strategy, comp, product and territory for the year.",
    long: "SKO is equal parts rally, training and drop of the new comp plan. Effectiveness depends on how much of the content is inspection-ready (new playbooks, new messaging, new territories) vs. keynote theatre.",
    aliases: ["SKO"],
    related: ["comp-plan", "enablement", "playbook"],
  },
  {
    slug: "enablement",
    term: "Sales Enablement",
    category: "Sales",
    short: "The function that equips reps with the training, content, tooling and process to sell effectively.",
    long: "Modern enablement owns onboarding, ongoing certification, playbook rollout, competitive intel, and increasingly the AI copilot layer. Measured by ramp time, message adherence and win rate on trained scenarios.",
    related: ["ramp", "playbook", "sales-kickoff"],
  },
  {
    slug: "pip",
    term: "PIP",
    category: "Sales",
    short: "Performance Improvement Plan, the formal 30–90 day plan a rep enters when attainment falls below threshold.",
    long: "In sales orgs, PIPs are typically triggered at <50% attainment over two consecutive quarters. Roughly one in three PIPs ends in exit; the rest resolve either by a coaching win or a mutual separation before the PIP closes.",
    aliases: ["Performance Improvement Plan"],
    related: ["attainment", "comp-plan"],
  },
  {
    slug: "deal-review",
    term: "Deal Review",
    category: "Sales",
    short: "A manager-led inspection of an open opportunity against a qualification framework and MAP.",
    long: "Weekly for late-stage deals, monthly for early-stage. Best-in-class deal reviews use call recordings and MEDDIC scoring, not rep narrative. AI meeting summaries have dramatically compressed prep time since 2024.",
    related: ["meddic", "mutual-action-plan", "forecast"],
  },

  // ————— Finance & SaaS accounting —————
  {
    slug: "rev-rec",
    term: "Revenue Recognition",
    category: "Metrics",
    short: "The accounting process of recording revenue in the period it is earned, not the period it is billed or collected.",
    long: "In SaaS, subscription revenue is recognised ratably over the service period. A $120k annual contract signed Jan 1 recognises $10k/month, regardless of whether it was invoiced upfront or monthly. The unrecognised portion sits on the balance sheet as deferred revenue.",
    aliases: ["Rev Rec"],
    related: ["asc-606", "deferred-revenue", "bookings"],
  },
  {
    slug: "asc-606",
    term: "ASC 606",
    category: "Metrics",
    short: "The US GAAP standard governing revenue recognition from contracts with customers, in force since 2018.",
    long: "ASC 606 (and its IFRS twin, IFRS 15) enforces a five-step model: identify the contract, identify performance obligations, determine transaction price, allocate to obligations, recognise as satisfied. It's why sales, product and finance argue about what counts as 'one product' vs. 'a bundle'.",
    related: ["rev-rec", "deferred-revenue"],
  },
  {
    slug: "deferred-revenue",
    term: "Deferred Revenue",
    category: "Metrics",
    short: "Cash collected for services not yet delivered, sitting on the balance sheet as a liability until earned.",
    long: "Annual prepay creates a large deferred revenue balance, which is a strength (cash in hand) and a signal (customers committed). Growing deferred revenue faster than recognised revenue is a leading indicator of accelerating bookings.",
    aliases: ["Unearned Revenue"],
    related: ["rev-rec", "cash-collections"],
  },
  {
    slug: "revenue-leakage",
    term: "Revenue Leakage",
    category: "RevOps",
    short: "Contracted revenue that never becomes cash, lost to un-billed usage, missed renewals, discounts or clerical error.",
    long: "Industry studies put leakage at 1–5% of ARR at most SaaS companies. Common sources: usage overages not metered, auto-renewal notices missed, un-invoiced services, contract terms drift. Quote-to-cash and CPQ maturity are the primary defences.",
    related: ["quote-to-cash", "cpq", "cash-collections"],
  },
  {
    slug: "net-terms",
    term: "Net Terms",
    category: "Metrics",
    short: "The number of days a customer has to pay an invoice after receipt, e.g. Net 30, Net 60, Net 90.",
    long: "Enterprise customers push for Net 60 or Net 90 as a working-capital gift to themselves; SaaS companies push back for Net 30 or annual prepay. Each 30-day extension of net terms adds ~8% to DSO on that segment.",
    related: ["dso", "cash-collections"],
  },

  // ————— Data, RevTech & identity —————
  {
    slug: "cdp",
    term: "CDP",
    category: "Marketing",
    short: "Customer Data Platform, a unified store of first-party customer data, resolved to a single profile per person or account.",
    long: "CDPs (Segment, mParticle, RudderStack, Hightouch) sit between event sources and destinations. In B2B, the CDP resolves cross-device, cross-channel behaviour into a single account view that feeds scoring, personalisation and outbound triggers.",
    aliases: ["Customer Data Platform"],
    related: ["data-warehouse", "identity-resolution", "first-party-data"],
  },
  {
    slug: "data-warehouse",
    term: "Data Warehouse",
    category: "RevOps",
    short: "The central analytical database (Snowflake, BigQuery, Databricks, Redshift) where all business data is consolidated.",
    long: "In 2026, the warehouse is the source of truth. CRM, product, billing and marketing data all land there; RevOps modelling runs on top; reverse ETL pushes derived attributes back to CRM. The 'composable' modern data stack.",
    related: ["reverse-etl", "cdp", "identity-resolution"],
  },
  {
    slug: "reverse-etl",
    term: "Reverse ETL",
    category: "RevOps",
    short: "Moving modelled data from the warehouse back into operational tools (CRM, marketing, product) for activation.",
    long: "Tools like Hightouch, Census and Segment Reverse ETL sync warehouse-derived attributes (e.g. product usage score, propensity to churn) directly into Salesforce or HubSpot fields, so reps and marketers act on the same numbers analysts see.",
    related: ["data-warehouse", "cdp"],
  },
  {
    slug: "identity-resolution",
    term: "Identity Resolution",
    category: "Marketing",
    short: "The process of stitching multiple signals (emails, cookies, device IDs, IP) into a single canonical person or account.",
    long: "Identity resolution is the layer that makes ABM, retargeting and lifecycle marketing work. Post-cookie deprecation, deterministic identity from first-party data has become the moat over probabilistic ad-tech identity.",
    related: ["cdp", "first-party-data", "abm"],
  },
  {
    slug: "first-party-data",
    term: "First-Party Data",
    category: "Marketing",
    short: "Data you collect directly from your own audiences and customers via your own properties and product.",
    long: "First-party data is the post-cookie moat. Email captures, product events, CRM records, survey responses. It's cheaper, more accurate and more legally defensible than third-party data, which is why every 2020s GTM strategy is a first-party data strategy.",
    related: ["third-party-data", "cdp", "identity-resolution"],
  },
  {
    slug: "third-party-data",
    term: "Third-Party Data",
    category: "Marketing",
    short: "Data purchased or licensed from external providers (data brokers, intent networks, enrichment vendors).",
    long: "Bombora, ZoomInfo, Apollo, Clearbit, 6sense. Third-party data enriches firmographics and signals intent, but it's noisier and increasingly regulated (GDPR, CCPA, EU AI Act). Best used to enrich first-party records, not to replace them.",
    related: ["first-party-data", "intent-data"],
  },

  // ————— Partnerships & channel —————
  {
    slug: "channel-sales",
    term: "Channel Sales",
    category: "GTM",
    short: "Selling through third parties (resellers, VARs, MSPs, SIs) instead of, or alongside, direct sales.",
    long: "Channel is the fastest way to reach geographies or verticals where a direct team doesn't make sense. Requires channel-specific pricing (margin for the partner), enablement, deal registration and channel-friendly comp for internal reps.",
    aliases: ["Indirect Sales"],
    related: ["reseller", "marketplace", "mdf"],
  },
  {
    slug: "reseller",
    term: "Reseller",
    category: "GTM",
    short: "A partner that resells the vendor's product to end customers, taking a margin on each transaction.",
    long: "Resellers range from transactional (order pass-through) to VARs (value-added, doing implementation and support). The reseller-vs-referral distinction matters for revenue recognition: resellers own the customer contract; referral partners don't.",
    related: ["channel-sales", "marketplace"],
  },
  {
    slug: "marketplace",
    term: "Marketplace",
    category: "GTM",
    short: "Cloud provider (AWS, Azure, GCP) or SaaS platform (Salesforce AppExchange) storefronts for third-party software.",
    long: "AWS Marketplace has become a serious enterprise procurement channel: customers spend committed cloud budget on your software, reducing procurement friction. Private offers (custom-priced, custom-term) are now common at $100k+ ACV.",
    related: ["private-offer", "channel-sales"],
  },
  {
    slug: "private-offer",
    term: "Private Offer",
    category: "GTM",
    short: "A cloud marketplace deal with custom pricing, term and terms negotiated 1:1 with a specific customer.",
    long: "AWS, Azure and GCP marketplaces support private offers that let vendors close bespoke enterprise deals through the marketplace's billing infrastructure, drawing down the customer's committed cloud spend. Now the default enterprise SaaS closing motion for infra-adjacent products.",
    related: ["marketplace", "channel-sales"],
  },
  {
    slug: "mdf",
    term: "MDF",
    category: "GTM",
    short: "Market Development Funds, co-op marketing dollars vendors give partners to drive joint pipeline.",
    long: "MDF funds partner-run events, joint webinars, co-branded content and demand-gen campaigns. Effectiveness depends on tight tracking: pipeline sourced, revenue closed, ROI per dollar. Poorly-managed MDF is one of the biggest sources of marketing waste in enterprise SaaS.",
    aliases: ["Market Development Funds", "Co-op Funds"],
    related: ["channel-sales", "reseller"],
  },

  // ————— Pricing & packaging —————
  {
    slug: "packaging",
    term: "Packaging",
    category: "GTM",
    short: "How product features are grouped into tiers, editions or add-ons that customers buy.",
    long: "Packaging is the highest-leverage GTM decision most SaaS companies never revisit. Good packaging creates a clear upgrade path, avoids feature cannibalisation between tiers, and makes the buyer's decision fast. Repackaging is often a 20–40% ARR event with no product change.",
    related: ["pricing-page", "freemium", "usage-based-pricing"],
  },
  {
    slug: "pricing-page",
    term: "Pricing Page",
    category: "GTM",
    short: "The public web page that communicates tiers, prices and value. The most inspected page in most SaaS websites.",
    long: "Best-in-class pricing pages have: 3–4 tiers max, clear per-tier value differentiators, ARR anchors, social proof, and a self-serve or 'talk to sales' path per tier. A/B testing pricing pages moves conversion more reliably than any other funnel surface.",
    related: ["packaging", "freemium", "cvr"],
  },
  {
    slug: "freemium",
    term: "Freemium",
    category: "GTM",
    short: "A pricing model with a permanently free tier alongside paid tiers that unlock capacity, features or support.",
    long: "Freemium works when the free tier is genuinely useful, viral, and creates an obvious upgrade trigger (usage cap, collaboration, admin controls). Slack, Notion, Figma, Linear are canonical. Freemium fails when the free tier cannibalises paid or when conversion is <3% at maturity.",
    related: ["free-trial", "plg", "packaging"],
  },
  {
    slug: "free-trial",
    term: "Free Trial",
    category: "GTM",
    short: "A time-boxed evaluation of the paid product, typically 14 or 30 days, with or without a credit card upfront.",
    long: "Trial with credit card upfront converts higher (~60% of trials to paid) but starts fewer trials; trial without card converts lower (~15%) but generates more top of funnel. The right choice depends on ACV, time-to-value and support cost per trial.",
    related: ["freemium", "reverse-trial", "activation-rate"],
  },
  {
    slug: "reverse-trial",
    term: "Reverse Trial",
    category: "GTM",
    short: "New signups get the paid tier free for 14–30 days, then drop to freemium if they don't convert. Best of both worlds.",
    long: "Reverse trial (popularised by Canva, Notion, Miro, Linear) captures the top of funnel of freemium and the aha-moment power of a full trial. Requires strong in-app upgrade prompts and a genuinely valuable free tier as the fallback.",
    related: ["free-trial", "freemium", "plg-2026"],
  },
  {
    slug: "usage-based-pricing",
    term: "Usage-Based Pricing",
    category: "GTM",
    short: "Pricing that scales with a consumption metric (API calls, events, tokens, GB) rather than seats.",
    long: "Popularised by Twilio, Snowflake, Datadog. Aligns cost to value, expands automatically with customer growth, and is what makes agentic AI pricing possible. Requires strong metering infrastructure and creates forecasting complexity (consumption is lumpier than seats).",
    aliases: ["UBP", "Consumption Pricing"],
    related: ["seat-based-pricing", "hybrid-pricing", "expansion-arr"],
  },
  {
    slug: "seat-based-pricing",
    term: "Seat-Based Pricing",
    category: "GTM",
    short: "Pricing per named user or active seat. The default SaaS pricing model since 1999.",
    long: "Predictable, easy to forecast, easy to sell. But it under-monetises heavy users and creates seat-hoarding at renewal. Being displaced or hybridised by usage-based pricing in AI-native products where the value scales with usage, not headcount.",
    related: ["usage-based-pricing", "hybrid-pricing"],
  },
  {
    slug: "hybrid-pricing",
    term: "Hybrid Pricing",
    category: "GTM",
    short: "A pricing model combining a seat-based platform fee with usage-based charges for consumption components.",
    long: "The 2026 default for AI-forward SaaS: seat fees for the interface and admin, usage fees for AI actions (per conversation, per token, per completed workflow). Balances predictability with value alignment.",
    related: ["seat-based-pricing", "usage-based-pricing", "agentforce"],
  },

  // ————— Growth, positioning, PMM —————
  {
    slug: "jtbd",
    term: "Jobs to Be Done",
    category: "GTM",
    short: "Clay Christensen's framework: customers 'hire' a product to do a specific job in their life or work.",
    long: "JTBD shifts the question from 'who is my customer' (persona) to 'what job are they hiring me to do'. The classic milkshake study is canonical. JTBD is the discipline behind good positioning and honest product roadmap prioritisation.",
    aliases: ["JTBD"],
    related: ["persona", "positioning", "icp"],
  },
  {
    slug: "positioning",
    term: "Positioning",
    category: "GTM",
    short: "The deliberate choice of what your product is, who it's for, and what it's better than. April Dunford's discipline.",
    long: "Positioning has five components: alternatives, unique attributes, value, best-fit customer, market category. Weak positioning is the root cause of most 'we can't seem to close deals' problems even when the product is good.",
    related: ["jtbd", "category-creation", "icp"],
  },
  {
    slug: "wedge",
    term: "Wedge",
    category: "GTM",
    short: "The narrow initial use case or persona a company enters the market through, before expanding to the broader vision.",
    long: "HubSpot's wedge was free CRM; Snowflake's was cloud data warehouse; Figma's was browser-based UI design. The right wedge is small enough to dominate quickly and adjacent enough to expand from. The wrong wedge traps the company forever.",
    related: ["pmf", "positioning", "icp"],
  },
  {
    slug: "viral-coefficient",
    term: "Viral Coefficient",
    category: "GTM",
    short: "The number of new users each existing user brings in, on average. Sustained growth requires k > 1.",
    long: "K-factor = invitations sent × conversion rate. Slack, Dropbox and Calendly had structural virality; most SaaS does not. Confusing 'word of mouth' with virality is a common founder trap.",
    aliases: ["K-Factor"],
    related: ["activation-rate", "plg", "referral-loop"],
  },
  {
    slug: "referral-loop",
    term: "Referral Loop",
    category: "GTM",
    short: "A programmatic incentive that turns satisfied customers into a repeatable acquisition channel.",
    long: "Best-in-class referral programs (Dropbox, Notion, Wise) reward both parties, are visible in-product, and produce customers with 20–40% higher LTV than paid-acquired ones. Referral is not virality; both can compound growth but the mechanics differ.",
    related: ["viral-coefficient", "activation-rate"],
  },

  // ————— Marketing (extended) —————
  {
    slug: "ppc",
    term: "PPC",
    category: "Marketing",
    short: "Pay-Per-Click advertising, primarily Google Ads and Bing, where the advertiser is charged per click.",
    long: "PPC is the demand-capture workhorse for bottom-of-funnel intent. In B2B SaaS, brand keywords are cheapest per conversion, category keywords are most contested, and competitor conquesting is a knife fight with escalating CPCs.",
    aliases: ["Pay-Per-Click"],
    related: ["sem", "ctr", "cvr"],
  },
  {
    slug: "retargeting",
    term: "Retargeting",
    category: "Marketing",
    short: "Serving ads to users who previously visited your site or engaged with your content.",
    long: "Retargeting has the highest CTR of any paid channel because the audience is warm. Post-cookie changes (ATT, GA4, Chrome deprecation) have degraded audience quality; first-party audiences and CAPI-fed lists are the workaround.",
    related: ["first-party-data", "ppc"],
  },
  {
    slug: "webinar",
    term: "Webinar",
    category: "Marketing",
    short: "A live or on-demand online presentation, typically 30–60 minutes, used to educate prospects and generate MQLs.",
    long: "The B2B lead-gen workhorse. Live webinar attendance rates hover at 30–40% of registrants; on-demand replays typically drive 2–3x the pipeline of the live event. Quality of the speaker and specificity of the topic beat production value every time.",
    related: ["demand-gen", "mql", "event-marketing"],
  },
  {
    slug: "field-marketing",
    term: "Field Marketing",
    category: "Marketing",
    short: "Regional, in-person marketing (dinners, roadshows, executive events) run in tight coordination with the local sales team.",
    long: "Field marketing is the ABM tactic that survived the pandemic best. Small executive dinners for 8–15 named accounts routinely produce more pipeline than a booth at a 5,000-person conference at a fraction of the cost.",
    related: ["abm", "event-marketing", "demand-gen"],
  },
  {
    slug: "event-marketing",
    term: "Event Marketing",
    category: "Marketing",
    short: "The discipline of planning, sponsoring or hosting in-person and virtual events to drive brand, pipeline and community.",
    long: "Event marketing spans owned (your user conference), sponsored (industry conferences) and field (small executive events). Attribution is notoriously hard; the honest measure is pipeline sourced within 90 days of the event plus qualitative brand lift.",
    related: ["field-marketing", "demand-gen"],
  },

  // ————— AI (2026 additions) —————
  {
    slug: "mcp",
    term: "Model Context Protocol",
    category: "AI",
    short: "An open standard (introduced by Anthropic in late 2024) for connecting AI models to tools, data and services.",
    long: "MCP is the USB-C of AI agents: instead of every AI product building bespoke integrations, tools expose an MCP server and any MCP-compatible model can call them. By 2026, most enterprise CRM, data warehouse and observability tools ship MCP servers as table stakes.",
    aliases: ["MCP"],
    related: ["agent", "tool-use", "copilot"],
  },
  {
    slug: "tool-use",
    term: "Tool Use",
    category: "AI",
    short: "An LLM's ability to call external functions, APIs or MCP servers as part of its reasoning loop.",
    long: "Tool use is what turns an LLM from a text generator into an agent. Modern agents chain dozens of tool calls per task: search CRM, enrich account, draft email, book meeting. Reliability of tool-use is the primary quality axis for enterprise agent platforms in 2026.",
    related: ["agent", "mcp", "llm"],
  },
  {
    slug: "prompt-engineering",
    term: "Prompt Engineering",
    category: "AI",
    short: "The craft of designing model inputs (system prompts, few-shot examples, output schemas) to elicit reliable outputs.",
    long: "Once a fashionable job title, prompt engineering is now a baseline skill for anyone building on LLMs. Modern practice: structured output schemas, retrieval grounding, evaluation harnesses, and treating prompts like versioned code.",
    related: ["llm", "rag", "guardrails"],
  },
  {
    slug: "fine-tuning",
    term: "Fine-Tuning",
    category: "AI",
    short: "Additional training of a base model on domain-specific data to specialise its behaviour.",
    long: "In 2023 fine-tuning was the default customisation lever. By 2026, RAG plus long context has replaced most fine-tuning use cases, except for style adaptation, low-latency task-specific models, and regulated domains where a private model is required.",
    related: ["llm", "rag", "embedding"],
  },
  {
    slug: "guardrails",
    term: "Guardrails",
    category: "AI",
    short: "The layer of policies, filters and validators that constrain LLM outputs to safe, on-brand, on-topic responses.",
    long: "Guardrails span input filtering (jailbreak detection, PII scrubbing), output validation (schema conformance, hallucination checks) and behavioural policy (tone, refusal). Every enterprise agent deployment has a guardrail layer; missing one is the fastest path to a public incident.",
    related: ["hallucination", "prompt-engineering"],
  },
  {
    slug: "signal-based-selling",
    term: "Signal-Based Selling",
    category: "Sales",
    short: "Triggering outbound sales motions from real-time buying signals (job change, funding, tech stack shift, product usage) rather than fixed cadences.",
    long: "Signal-based (Common Room, Koala, Pocus, UserGems) replaces 'work this list on Monday' with 'contact this person now because they just did X'. Reply rates and conversion consistently 3–8x classic cold outbound. The dominant modern outbound motion.",
    related: ["outbound", "intent-data", "clay"],
  },
  {
    slug: "revenue-orchestration",
    term: "Revenue Orchestration",
    category: "RevOps",
    short: "Software category (Default, Distribute, LeanData, Chili Piper) that automates handoffs, routing and workflows across the revenue stack.",
    long: "Revenue orchestration platforms sit above CRM, marketing automation and calendar tools, executing the 'if this then that' logic that RevOps used to hand-code in Zapier and Salesforce Flow. The category consolidated fast in 2025–2026 as agentic capabilities absorbed the routing layer.",
    related: ["lead-routing", "revops", "agent"],
  },
  {
    slug: "ai-native",
    term: "AI-Native",
    category: "GTM",
    short: "A product or company whose core value, workflow and pricing were designed around AI from day one, not retrofitted.",
    long: "AI-native distinguishes from 'AI-added'. Cursor, Perplexity, Clay, 11x, Harvey are AI-native; most incumbents ship 'AI features' bolted onto existing SKUs. In 2026, AI-native positioning commands a premium multiple but a shorter half-life as capabilities diffuse.",
    related: ["ai-forward", "plg-2026", "agent"],
  },
];
