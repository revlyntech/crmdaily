const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

// Replace get_extra_context with version that tracks used topics
const oldGetExtraContext = `def get_extra_context(category):
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
    return "", ""`;

const newGetExtraContext = `USED_TOPICS_LOG = "used_topics.json"

def get_used_topics():
    try:
        with open(USED_TOPICS_LOG, "r") as f:
            return json.load(f)
    except Exception:
        return {}

def save_used_topic(category, topic_name):
    used = get_used_topics()
    if category not in used:
        used[category] = []
    if topic_name not in used[category]:
        used[category].append(topic_name)
    # Keep last 50 used topics per category
    used[category] = used[category][-50:]
    with open(USED_TOPICS_LOG, "w") as f:
        json.dump(used, f)

def pick_unused_topic(topics, category, name_fn):
    used = get_used_topics()
    used_for_cat = used.get(category, [])
    unused = [t for t in topics if name_fn(t) not in used_for_cat]
    if not unused:
        # All used - reset and start fresh
        used[category] = []
        with open(USED_TOPICS_LOG, "w") as f:
            json.dump(used, f)
        unused = topics
    chosen = random.choice(unused)
    save_used_topic(category, name_fn(chosen))
    return chosen

def get_extra_context(category):
    if category == "Tool Comparison":
        topic = pick_unused_topic(
            COMPARISON_TOPICS, "Tool Comparison",
            lambda t: t[0] + " vs " + t[1]
        )
        return f"Write a detailed comparison of {topic[0]} vs {topic[1]} for {topic[2]}. Compare features, pricing, integrations and use cases. Be objective and fair to both tools.", topic[0] + " vs " + topic[1]
    elif category == "Explainer":
        topic = pick_unused_topic(
            EXPLAINER_TOPICS, "Explainer",
            lambda t: t[0]
        )
        return f"Write a clear, practical explainer on: {topic[0]}. Define the term, explain why it matters, give real examples and actionable takeaways.", topic[0]
    elif category == "Deep Guide":
        topic = pick_unused_topic(
            GUIDE_TOPICS, "Deep Guide",
            lambda t: t[0]
        )
        return f"Write a detailed, actionable guide on: {topic[0]}. Include frameworks, steps, examples and common mistakes to avoid. This should be genuinely useful, not generic.", topic[0]
    elif category == "Best Tools":
        topic = pick_unused_topic(
            BEST_TOOLS_TOPICS, "Best Tools",
            lambda t: t[0]
        )
        return f"Write a best tools article: {topic[0]}. Give honest, specific opinions on each tool. Include pros, cons, pricing and who each tool is best for.", topic[0]
    return "", ""`;

if (c.includes('def get_extra_context(category):')) {
  c = c.replace(oldGetExtraContext, newGetExtraContext);
  console.log('Replaced get_extra_context with topic tracking version');
} else {
  // Append before generate_article function
  c = c.replace(
    'def generate_article(news_items):',
    newGetExtraContext + '\n\ndef generate_article(news_items):'
  );
  console.log('Added get_extra_context with topic tracking');
}

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done!');
console.log('Has pick_unused_topic:', c.includes('pick_unused_topic'));
console.log('Has used_topics.json:', c.includes('used_topics.json'));
console.log('Has save_used_topic:', c.includes('save_used_topic'));