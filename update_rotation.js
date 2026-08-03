const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

// Replace CATEGORY_ROTATION with new 13-slot weekly rotation
c = c.replace(
`CATEGORY_ROTATION = [
    "CRM News",
    "GTM Strategy",
    "Tool Reviews",
    "RevOps Intelligence",
    "Sales Tech",
    "AI in Sales",
]`,
`# 13-slot weekly rotation
# CRM News: 2x, Tool Comparison: 2x, Explainer: 2x
# GTM Strategy: 1x, Tool Reviews: 1x, RevOps Intelligence: 1x
# Sales Tech: 1x, AI in Sales: 1x, Deep Guide: 1x, Best Tools: 1x
CATEGORY_ROTATION = [
    "CRM News",           # Day 1 slot 1
    "Tool Comparison",    # Day 1 slot 2
    "Explainer",          # Day 2 slot 1
    "GTM Strategy",       # Day 2 slot 2
    "CRM News",           # Day 3 slot 1
    "Tool Comparison",    # Day 3 slot 2
    "Explainer",          # Day 4 slot 1
    "Tool Reviews",       # Day 4 slot 2
    "RevOps Intelligence",# Day 5 slot 1
    "Deep Guide",         # Day 5 slot 2
    "Sales Tech",         # Day 6 slot 1
    "Best Tools",         # Day 6 slot 2
    "AI in Sales",        # Day 7
]`
);

// Also update category_instructions to include new types
c = c.replace(
`    category_instructions = {
        "CRM News":            "Write a news article about the most significant CRM industry development in the news items.",
        "GTM Strategy":        "Write a strategic guide about go-to-market strategy, pipeline building, or revenue team alignment. Use the news as context but make it a practical strategy piece.",
        "Tool Reviews":        "Write a detailed review or comparison of a CRM/sales tool mentioned in the news. Focus on features, use cases, pros and cons for RevOps teams.",
        "RevOps Intelligence": "Write an analytical piece about revenue operations trends, metrics, or best practices. Use the news as context.",
        "Sales Tech":          "Write about sales technology, automation tools, or the sales tech stack. Use the news as context.",
        "AI in Sales":         "Write about AI applications in sales, CRM automation, or AI-powered GTM. Use the news as context.",
    }`,
`    extra_instruction, extra_topic = get_extra_context(forced_category)

    category_instructions = {
        "CRM News":            "Write a news article about the most significant CRM industry development in the news items. Be factual and neutral.",
        "GTM Strategy":        "Write a strategic guide about go-to-market strategy, pipeline building, or revenue team alignment. Use the news as context but make it a practical strategy piece.",
        "Tool Reviews":        "Write a detailed review of a CRM or sales tool mentioned in the news. Focus on features, use cases, pros and cons for RevOps teams.",
        "RevOps Intelligence": "Write an analytical piece about revenue operations trends, metrics, or best practices. Use the news as context.",
        "Sales Tech":          "Write about sales technology, automation tools, or the sales tech stack. Use the news as context.",
        "AI in Sales":         "Write about AI applications in sales, CRM automation, or AI-powered GTM. Use the news as context.",
        "Tool Comparison":     extra_instruction or "Write a detailed comparison of two CRM tools. Compare features, pricing and use cases objectively.",
        "Explainer":           extra_instruction or "Write a clear explainer on a key CRM or GTM term. Define it, explain why it matters, give examples.",
        "Deep Guide":          extra_instruction or "Write a detailed, actionable guide on a RevOps or GTM topic. Include frameworks, steps and examples.",
        "Best Tools":          extra_instruction or "Write a best tools roundup for a specific CRM use case. Be honest and specific about each tool.",
    }`
);

// Fix writing_instruction to use new categories
c = c.replace(
    'writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])',
    'writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])\n    if extra_instruction and forced_category in ["Tool Comparison", "Explainer", "Deep Guide", "Best Tools"]:\n        writing_instruction = extra_instruction'
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done! CATEGORY_ROTATION updated');

// Verify
const lines = c.split('\n');
let inRotation = false;
console.log('\nNew CATEGORY_ROTATION:');
lines.forEach((l, i) => {
  if(l.includes('CATEGORY_ROTATION = [')) inRotation = true;
  if(inRotation) {
    console.log(l);
    if(l.includes(']')) inRotation = false;
  }
});

console.log('\nHas Tool Comparison in rotation:', c.includes('"Tool Comparison",'));
console.log('Has Explainer in rotation:', c.includes('"Explainer",'));
console.log('Has Deep Guide in rotation:', c.includes('"Deep Guide",'));
console.log('Has Best Tools in rotation:', c.includes('"Best Tools",'));
console.log('CRM News count:', (c.match(/"CRM News"/g) || []).length);