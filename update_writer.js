const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

// ── 1. Update CATEGORY_ROTATION to include new content types ──
c = c.replace(
  `CATEGORY_ROTATION = [
    "CRM News",
    "GTM Strategy",
    "Tool Reviews",
    "RevOps Intelligence",
    "Sales Tech",
    "AI in Sales",
]`,
  `CATEGORY_ROTATION = [
    "CRM News",           # Daily news
    "Tool Comparison",    # HubSpot vs Salesforce type
    "GTM Strategy",       # GTM strategy guides
    "Explainer",          # What is RevOps type
    "Tool Reviews",       # Single tool review
    "Deep Guide",         # Long detailed guide
    "RevOps Intelligence",# RevOps analysis
    "Best Tools",         # Best CRM for X type
    "Sales Tech",         # Sales tech stack
    "AI in Sales",        # AI in sales
    "CRM News",           # Second news slot
    "Tool Comparison",    # Second comparison slot
    "GTM Strategy",       # Second GTM slot
    "Explainer",          # Second explainer slot
]`
);

// ── 2. Add comparison/explainer/guide/best tools topic pools ──
const newPools = `
# ── Comparison topics ──
COMPARISON_TOPICS = [
    ("HubSpot", "Salesforce", "B2B sales teams"),
    ("Pipedrive", "HubSpot", "small and mid-size businesses"),
    ("Salesforce", "Monday CRM", "enterprise RevOps teams"),
    ("Zoho CRM", "Pipedrive", "startups and growing teams"),
    ("HubSpot", "Zoho CRM", "marketing-led growth teams"),
    ("Freshsales", "Pipedrive", "field sales teams"),
    ("Salesforce", "HubSpot", "RevOps and operations leaders"),
    ("Monday CRM", "Zoho CRM", "project-driven sales teams"),
]

# ── Explainer topics ──
EXPLAINER_TOPICS = [
    ("What is RevOps", "revenue operations", "RevOps"),
    ("What is a GTM Motion", "go-to-market strategy", "GTM"),
    ("What is ARR", "Annual Recurring Revenue", "ARR"),
    ("What is ICP", "Ideal Customer Profile", "ICP"),
    ("What is Sales Velocity", "sales velocity formula", "sales velocity"),
    ("What is MEDDIC", "MEDDIC sales qualification", "MEDDIC"),
    ("What is NRR", "Net Revenue Retention", "NRR"),
    ("What is Pipeline Coverage", "pipeline coverage ratio", "pipeline coverage"),
    ("What is a Sales Cycle", "sales cycle length", "sales cycle"),
    ("What is Account-Based Marketing", "ABM strategy B2B", "ABM"),
]

# ── Deep Guide topics ──
GUIDE_TOPICS = [
    ("How to Build a RevOps Function from Scratch", "RevOps setup guide", "RevOps"),
    ("The Complete GTM Strategy Guide for 2026", "GTM strategy 2026", "GTM strategy"),
    ("How to Reduce Churn Rate for SaaS Teams", "churn reduction SaaS", "churn rate"),
    ("CRM Implementation Guide for B2B Teams", "CRM implementation guide", "CRM setup"),
    ("How to Forecast Sales Accurately in 2026", "sales forecasting methods", "sales forecast"),
    ("The RevOps Tech Stack Guide for 2026", "RevOps tech stack 2026", "RevOps tools"),
    ("How to Build a Sales Pipeline That Converts", "sales pipeline management", "pipeline"),
    ("Account-Based Marketing Playbook for B2B", "ABM playbook B2B", "ABM strategy"),
]

# ── Best Tools topics ──
BEST_TOOLS_TOPICS = [
    ("Best CRM for Startups in 2026", "best CRM startup 2026", "startup CRM"),
    ("Best CRM for Enterprise Sales Teams", "best enterprise CRM 2026", "enterprise CRM"),
    ("Best Sales Automation Tools for RevOps", "sales automation tools 2026", "sales automation"),
    ("Best CRM for Real Estate Teams in 2026", "best real estate CRM 2026", "real estate CRM"),
    ("Best GTM Tools for B2B SaaS in 2026", "GTM tools B2B SaaS 2026", "GTM tools"),
    ("Best Pipeline Management Tools in 2026", "pipeline management software", "pipeline tools"),
]

import random

def get_extra_context(category):
    if category == "Tool Comparison":
        topic = random.choice(COMPARISON_TOPICS)
        return f"Write a detailed comparison of {topic[0]} vs {topic[1]} for {topic[2]}. Compare features, pricing, integrations and use cases. Be objective and fair to both tools.", topic[0] + " vs " + topic[1]
    elif category == "Explainer":
        topic = random.choice(EXPLAINER_TOPICS)
        return f"Write a clear, practical explainer on: {topic[0]}. Define the term, explain why it matters, give real examples and actionable takeaways.", topic[0]
    elif category == "Deep Guide":
        topic = random.choice(GUIDE_TOPICS)
        return f"Write a detailed, actionable guide on: {topic[0]}. Include frameworks, steps, examples and common mistakes to avoid. This should be genuinely useful, not generic.", topic[0]
    elif category == "Best Tools":
        topic = random.choice(BEST_TOOLS_TOPICS)
        return f"Write a best tools article: {topic[0]}. Give honest, specific opinions on each tool. Include pros, cons, pricing and who each tool is best for.", topic[0]
    return "", ""

`;

// Insert after CATEGORY_LOG definition
c = c.replace(
  'CATEGORY_LOG = "category_log.json"',
  'CATEGORY_LOG = "category_log.json"\n' + newPools
);

// ── 3. Update category_instructions to include new types ──
c = c.replace(
  `    category_instructions = {
        "CRM News":           "Write a news article about the most significant CRM industry development in thenews items.",
        "GTM Strategy":       "Write a strategic guide about go-to-market strategy, pipeline building, or revenue team alignment. Use the news as context but make it a practical strategy piece.",
        "Tool Reviews":       "Write a detailed review or comparison of a CRM/sales tool mentioned in the news. Focus on features, use cases, pros and cons for RevOps teams.",
        "RevOps Intelligence":"Write an analytical piece about revenue operations trends, metrics, or best practices. Use the news as context.",
        "Sales Tech":         "Write about sales technology, automation tools, or the sales tech stack. Use the news as context.",
        "AI in Sales":        "Write about AI applications in sales, CRM automation, or AI-powered GTM. Use the news as context.",
    }`,
  `    extra_instruction, extra_topic = get_extra_context(forced_category)

    category_instructions = {
        "CRM News":            "Write a news article about the most significant CRM industry development in the news items. Be factual and neutral.",
        "GTM Strategy":        "Write a strategic guide about go-to-market strategy, pipeline building, or revenue team alignment. Use the news as context but make it a practical strategy piece.",
        "Tool Reviews":        "Write a detailed review of a CRM or sales tool mentioned in the news. Focus on features, use cases, pros and cons for RevOps teams.",
        "RevOps Intelligence": "Write an analytical piece about revenue operations trends, metrics, or best practices. Use the news as context.",
        "Sales Tech":          "Write about sales technology, automation tools, or the sales tech stack. Use the news as context.",
        "AI in Sales":         "Write about AI applications in sales, CRM automation, or AI-powered GTM. Use the news as context.",
        "Tool Comparison":     extra_instruction or "Write a comparison of two CRM tools. Compare features, pricing and use cases objectively.",
        "Explainer":           extra_instruction or "Write a clear explainer on a key CRM or GTM term. Define it, explain why it matters, give examples.",
        "Deep Guide":          extra_instruction or "Write a detailed, actionable guide on a RevOps or GTM topic. Include frameworks, steps and examples.",
        "Best Tools":          extra_instruction or "Write a best tools roundup for a specific CRM use case. Be honest and specific about each tool.",
    }`
);

// ── 4. Add HEADLINE DIVERSITY and NO EM DASH rules to prompt ──
c = c.replace(
  'IMPORTANT RULES:',
  `HEADLINE DIVERSITY RULES:
- NEVER start the title with "AI Is Reshaping" or "AI is Reshaping"
- NEVER use em dashes (- or &mdash;) anywhere. Use hyphens (-) only.
- Vary headline formulas: use questions, "How to", "Why", numbers like "5 Ways", comparisons "X vs Y", "What Is X"
- Make each headline feel fresh and specific, not generic

PROFESSIONAL TONE RULES:
- NEVER describe any tool as failing, struggling, under pressure, dying or losing market share
- Compare tools on features and fit, not on financial health or market position
- Write objectively. No vendor bias.
- No exclamation marks in body text.
- No filler phrases like "In today's fast-paced landscape" or "In the ever-evolving world of"

IMPORTANT RULES:`
);

// ── 5. Add em dash post-processing ──
c = c.replace(
  "response = response.replace('\\u2014', '-').replace('\\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-')",
  "response = response.replace('\\u2014', '-').replace('\\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-').replace('&#8212;', '-').replace('&#8211;', '-')"
);

c = c.replace(
  "content = content.replace('\\u2014', '-').replace('\\u2013', '-').replace('&mdash;', '-').replace('&ndash;','-')",
  "content = content.replace('\\u2014', '-').replace('\\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-').replace('&#8212;', '-').replace('&#8211;', '-')"
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done! writer.py updated with new content types');
console.log('CATEGORY_ROTATION has:', (c.match(/CATEGORY_ROTATION/g) || []).length, 'references');
console.log('Has Tool Comparison:', c.includes('Tool Comparison'));
console.log('Has Explainer:', c.includes('Explainer'));
console.log('Has Deep Guide:', c.includes('Deep Guide'));
console.log('Has Best Tools:', c.includes('Best Tools'));
console.log('Has no em dash rule:', c.includes('NEVER use em dashes'));