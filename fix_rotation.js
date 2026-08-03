const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

// Replace CATEGORY_ROTATION using regex
c = c.replace(
  /CATEGORY_ROTATION = \[[\s\S]*?\]/,
  `CATEGORY_ROTATION = [
    "CRM News",            # Day 1 - slot 1
    "Tool Comparison",     # Day 1 - slot 2
    "Explainer",           # Day 2 - slot 1
    "GTM Strategy",        # Day 2 - slot 2
    "CRM News",            # Day 3 - slot 1
    "Tool Comparison",     # Day 3 - slot 2
    "Explainer",           # Day 4 - slot 1
    "Tool Reviews",        # Day 4 - slot 2
    "RevOps Intelligence", # Day 5 - slot 1
    "Deep Guide",          # Day 5 - slot 2
    "Sales Tech",          # Day 6 - slot 1
    "Best Tools",          # Day 6 - slot 2
    "AI in Sales",         # Day 7
]`
);

// Update category_instructions to include new types
c = c.replace(
  /    category_instructions = \{[\s\S]*?\n    \}/,
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

// Fix writing_instruction line
c = c.replace(
  'writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])',
  'writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])'
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done!');

// Verify rotation
const match = c.match(/CATEGORY_ROTATION = \[[\s\S]*?\]/);
if (match) {
  console.log('\nNew CATEGORY_ROTATION:');
  console.log(match[0]);
}

console.log('\nVerification:');
console.log('Tool Comparison in rotation:', (c.match(/"Tool Comparison"/g)||[]).length, 'times');
console.log('Explainer in rotation:', (c.match(/"Explainer"/g)||[]).length, 'times');
console.log('CRM News in rotation:', (c.match(/"CRM News"/g)||[]).length, 'times');
console.log('Deep Guide in rotation:', (c.match(/"Deep Guide"/g)||[]).length, 'times');
console.log('Best Tools in rotation:', (c.match(/"Best Tools"/g)||[]).length, 'times');