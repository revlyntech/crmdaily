import anthropic
import json
import os
import re
from datetime import datetime

TOPIC_IMAGES = {
    "CRM News": [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80",
    ],
    "GTM Strategy": [
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    ],
    "Tool Reviews": [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    ],
    "RevOps Intelligence": [
        "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1200&q=80",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&q=80",
    ],
    "Sales Tech": [
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    ],
    "AI in Sales": [
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    ],
    "default": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    ],
}

CATEGORY_ROTATION = [
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
]

# Internal pages for linking - Claude will pick relevant ones
INTERNAL_PAGES = [
    { "url": "https://www.crmdaily.co/crm-tools",              "label": "CRM Tools Directory" },
    { "url": "https://www.crmdaily.co/news",                   "label": "CRM News" },
    { "url": "https://www.crmdaily.co/guides",                 "label": "CRM Guides" },
    { "url": "https://www.crmdaily.co/tools",                  "label": "Tool Reviews" },
    { "url": "https://www.crmdaily.co/newsletter",             "label": "CRM Daily Newsletter" },
    { "url": "https://www.crmdaily.co/glossary",               "label": "CRM Glossary" },
    { "url": "https://www.crmdaily.co/glossary/arr",           "label": "Annual Recurring Revenue (ARR)" },
    { "url": "https://www.crmdaily.co/glossary/churn-rate",    "label": "Churn Rate" },
    { "url": "https://www.crmdaily.co/glossary/forecast",      "label": "Sales Forecast" },
    { "url": "https://www.crmdaily.co/glossary/meddic",        "label": "MEDDIC" },
    { "url": "https://www.crmdaily.co/glossary/nrr",           "label": "Net Revenue Retention (NRR)" },
    { "url": "https://www.crmdaily.co/glossary/pipeline",      "label": "Sales Pipeline" },
    { "url": "https://www.crmdaily.co/glossary/revops",        "label": "RevOps" },
    { "url": "https://www.crmdaily.co/glossary/icp",           "label": "Ideal Customer Profile (ICP)" },
    { "url": "https://www.crmdaily.co/glossary/cac",           "label": "Customer Acquisition Cost (CAC)" },
    { "url": "https://www.crmdaily.co/glossary/ltv",           "label": "Customer Lifetime Value (LTV)" },
    { "url": "https://www.crmdaily.co/glossary/sales-cycle",   "label": "Sales Cycle" },
    { "url": "https://www.crmdaily.co/glossary/win-rate",      "label": "Win Rate" },
    { "url": "https://www.crmdaily.co/glossary/plg",           "label": "Product-Led Growth (PLG)" },
    { "url": "https://www.crmdaily.co/glossary/gtm",           "label": "Go-to-Market (GTM)" },
    { "url": "https://www.crmdaily.co/glossary/mrr",           "label": "Monthly Recurring Revenue (MRR)" },
]

CATEGORY_LOG = "category_log.json"
USED_IMAGES_LOG = "used_images.json"

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
    ("Close", "Pipedrive", "small inside sales teams"),
    ("Insightly", "HubSpot", "project-based sales teams"),
    ("Copper", "HubSpot", "Google Workspace-based teams"),
    ("Nimble", "Zoho CRM", "solopreneurs and small teams"),
    ("Keap", "HubSpot", "service-based small businesses"),
    ("Salesforce", "Zoho CRM", "cost-conscious enterprise teams"),
    ("Freshsales", "Zoho CRM", "budget-conscious startups"),
    ("Monday CRM", "Pipedrive", "visual pipeline teams"),
    ("HubSpot", "ActiveCampaign", "marketing-first revenue teams"),
    ("Salesforce", "Freshsales", "scaling sales teams"),
    ("Pipedrive", "Copper", "relationship-driven sales teams"),
    ("Zoho CRM", "Insightly", "teams combining projects and sales"),
    ("Close", "HubSpot", "high-volume inside sales teams"),
    ("Salesforce", "Pipedrive", "enterprise vs SMB needs"),
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
    ("What is CAC", "Customer Acquisition Cost", "CAC"),
    ("What is LTV", "Customer Lifetime Value", "LTV"),
    ("What is Win Rate", "sales win rate calculation", "win rate"),
    ("What is MRR", "Monthly Recurring Revenue", "MRR"),
    ("What is Product-Led Growth", "PLG strategy SaaS", "PLG"),
    ("What is Churn Rate", "customer churn rate SaaS", "churn rate"),
    ("What is a Sales Qualified Lead", "SQL sales qualified lead", "SQL"),
    ("What is CRM Data Hygiene", "CRM data cleaning best practices", "data hygiene"),
    ("What is Lead Scoring", "lead scoring model B2B", "lead scoring"),
    ("What is a Sales Funnel", "sales funnel stages B2B", "sales funnel"),
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
import requests

USED_TOPICS_LOG = "used_topics.json"

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
    return "", ""



def get_next_category():
    try:
        with open(CATEGORY_LOG, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
        last_index = data.get("last_index", -1)
    except Exception:
        last_index = -1
    next_index = (last_index + 1) % len(CATEGORY_ROTATION)
    with open(CATEGORY_LOG, "w", encoding="utf-8") as f:
        json.dump({"last_index": next_index}, f)
    return CATEGORY_ROTATION[next_index]

def get_used_image_ids():
    """Load list of recently used Pexels image IDs."""
    try:
        with open(USED_IMAGES_LOG, "r") as f:
            data = json.load(f)
            return data.get("pexels_ids", [])
    except Exception:
        return []

def save_used_image_id(image_id):
    """Save a Pexels image ID to prevent reuse."""
    try:
        try:
            with open(USED_IMAGES_LOG, "r") as f:
                data = json.load(f)
        except Exception:
            data = {}
        if "pexels_ids" not in data:
            data["pexels_ids"] = []
        if image_id not in data["pexels_ids"]:
            data["pexels_ids"].append(str(image_id))
        # Keep last 200 used IDs
        data["pexels_ids"] = data["pexels_ids"][-200:]
        with open(USED_IMAGES_LOG, "w") as f:
            json.dump(data, f)
    except Exception as e:
        print(f"   Could not save image ID: {e}")

def get_claude_image_query(title, category, client):
    """Ask Claude to generate a concrete photographable Pexels search term."""
    try:
        prompt = f"""You are helping find a stock photo for a B2B article.
Article title: "{title}"
Article category: "{category}"
Generate exactly ONE short Pexels search query (3-4 words) describing a concrete photographable business scene.
Rules:
- Only concrete visual nouns (people, objects, places)
- NEVER use abstract terms like ICP, RevOps, GTM, company names, or acronyms
- Good: "business meeting whiteboard", "sales team laptops", "office analytics dashboard"
- Bad: "ideal customer profile", "HubSpot comparison", "revenue operations"
Reply with ONLY the search query, nothing else."""
        msg = client.messages.create(model="claude-sonnet-4-6", max_tokens=15, messages=[{"role":"user","content":prompt}])
        query = msg.content[0].text.strip().strip('"').strip("'").lower()
        print(f"   Claude image query: '{query}'")
        return query
    except Exception as e:
        print(f"   Claude query error: {e}")
        return None

CATEGORY_IMAGE_QUERIES = {
    "CRM News":            ["business meeting office team","sales team laptop discussion","corporate office technology","business professionals conference","team collaboration workspace"],
    "GTM Strategy":        ["business strategy whiteboard planning","sales team meeting discussion","marketing team office growth","business planning charts analytics","team brainstorming office"],
    "Tool Reviews":        ["laptop software workspace desk","computer screen dashboard analytics","technology workspace modern office","software developer laptop coding","clean desk workspace monitor"],
    "RevOps Intelligence": ["data analytics dashboard charts","business intelligence graphs office","revenue analytics team meeting","data visualization screen monitor","business metrics performance charts"],
    "Sales Tech":          ["sales team technology office","crm software laptop sales","business technology automation","sales meeting presentation team","digital marketing technology screen"],
    "AI in Sales":         ["artificial intelligence technology future","robot automation technology","digital transformation business","machine learning data science","technology innovation office"],
    "Tool Comparison":     ["business software comparison laptop","two professionals discussing technology","decision making office meeting","business tools analysis desk","comparing charts graphs office"],
    "Explainer":           ["business education presentation whiteboard","team learning office discussion","professional explaining strategy board","business concept presentation","office teaching training session"],
    "Deep Guide":          ["business guide strategy planning","detailed planning office documents","professional reading business report","strategy roadmap planning meeting","business blueprint planning desk"],
    "Best Tools":          ["productivity tools workspace organized","best business software laptop","professional tools technology desk","organized workspace productivity","business efficiency technology"],
}

def search_pexels_query(query, api_key, used_ids):
    """Search Pexels for one query and return unused photo URL."""
    try:
        headers = {"Authorization": api_key}
        resp = requests.get(
            "https://api.pexels.com/v1/search",
            headers=headers,
            params={"query": query, "per_page": 30, "page": random.randint(1, 3), "orientation": "landscape", "size": "large"},
            timeout=10
        )
        if resp.status_code == 200:
            photos = resp.json().get("photos", [])
            unused = [p for p in photos if str(p["id"]) not in used_ids]
            if not unused:
                unused = photos
            if unused:
                photo = random.choice(unused)
                url = photo["src"].get("large2x") or photo["src"].get("large") or photo["src"].get("original")
                save_used_image_id(photo["id"])
                print(f"   Pexels ID {photo['id']}: {url[:60]}...")
                return url
    except Exception as e:
        print(f"   Pexels error for '{query}': {e}")
    return None

def get_pexels_image(title, category, client=None):
    """Fetch unique relevant image using Claude query + category fallback pool."""
    try:
        api_key = os.environ.get("PEXELS_API_KEY", "")
        if not api_key:
            print("   No PEXELS_API_KEY, using Unsplash fallback")
            return get_relevant_image(category)

        used_ids = get_used_image_ids()

        # Layer 1: Claude-generated concrete visual query
        if client:
            claude_query = get_claude_image_query(title, category, client)
            if claude_query and len(claude_query) > 3:
                url = search_pexels_query(claude_query, api_key, used_ids)
                if url:
                    return url

        # Layer 2: Category fallback pool - shuffle for variety
        fallback_queries = CATEGORY_IMAGE_QUERIES.get(category, ["business office professional"])
        shuffled = fallback_queries.copy()
        random.shuffle(shuffled)
        for query in shuffled:
            print(f"   Category fallback: '{query}'")
            url = search_pexels_query(query, api_key, used_ids)
            if url:
                return url

        # Layer 3: Generic business fallback
        for query in ["business team office", "professional workspace laptop", "corporate meeting"]:
            url = search_pexels_query(query, api_key, used_ids)
            if url:
                return url

    except Exception as e:
        print(f"   Pexels error: {e}")

    print("   Falling back to Unsplash")
    return get_relevant_image(category)

def get_relevant_image(category, index=0):
    images = TOPIC_IMAGES.get(category, TOPIC_IMAGES["default"])
    chosen = images[index % len(images)]
    print(f"   Image selected for '{category}': {chosen[:50]}...")
    return chosen

def load_news():
    with open("scraped_news.json", "r") as f:
        return json.load(f)

def humanize_pass(content, client):
    """Second-pass edit to break up uniform AI cadence before publishing."""
    try:
        edit_prompt = f"""Do a quick human editor's pass on this HTML article body. Do not summarize or shorten it meaningfully - keep the same length, facts, HTML tags, and internal links exactly as they are.

Your only job is to vary the rhythm so it reads like a person edited it, not a model:
- Break up any run of same-length sentences - combine two short ones or split a long one
- Cut redundant hedging words (somewhat, generally, often, tends to) where they add nothing
- Swap in a contraction here and there if it reads naturally (it's, doesn't, that's)
- If two sentences in a row start the same way (e.g. both start with "This" or both start with "The"), reword one
- Leave all <a href> links, <h2> tags, and <blockquote> content untouched - do not remove or alter any link or URL

Reply with ONLY the revised HTML, no preamble, no explanation.

ARTICLE HTML:
{content}"""
        msg = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2500,
            messages=[{"role": "user", "content": edit_prompt}]
        )
        revised = msg.content[0].text.strip()
        # Safety check: don't accept a pass that dropped links or shrank drastically
        original_links = len(re.findall(r'<a\s+href=', content))
        revised_links = len(re.findall(r'<a\s+href=', revised))
        if revised_links < original_links or len(revised) < len(content) * 0.7:
            print("   Humanize pass looked unsafe (lost links or too short) - keeping original draft")
            return content
        print("   Applied humanize pass")
        return revised
    except Exception as e:
        print(f"   Humanize pass error, keeping original draft: {e}")
        return content

def generate_article(news_items):
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    news_context = "\n\n".join([
        f"Source: {item['source']}\nTitle: {item['title']}\nSummary: {item['summary']}\nURL: {item['link']}"
        for item in news_items
    ])

    today          = datetime.now().strftime("%B %d, %Y")
    hour_index     = datetime.now().hour
    forced_category = get_next_category()
    print(f"   Category for this run: {forced_category}")

    internal_links_text = "\n".join([
        f"- {p['label']}: {p['url']}" for p in INTERNAL_PAGES
    ])

    extra_instruction, extra_topic = get_extra_context(forced_category)

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
    }

    writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])
    if extra_instruction and forced_category in ["Tool Comparison", "Explainer", "Deep Guide", "Best Tools"]:
        writing_instruction = extra_instruction

    opening_styles = [
        "Open with a short, blunt one-sentence statement (under 10 words) before expanding.",
        "Open with a specific concrete scenario or example, not a general statement.",
        "Open with a direct question the reader is likely asking themselves.",
        "Open by stating the most surprising fact from the news items first.",
    ]
    closing_styles = [
        "End on a specific, concrete takeaway or action item - not a generic summary.",
        "End by naming a tradeoff or open question, not a tidy resolution.",
        "End with a short punchy closing line (under 12 words).",
        "End by circling back to the opening example or scenario.",
    ]
    opening_style = random.choice(opening_styles)
    closing_style = random.choice(closing_styles)

    prompt = f"""You are a senior editor at CRM Daily, a leading publication for CRM and GTM professionals.
Today is {today}. Based on the following news items, write ONE comprehensive, original article for CRM Daily.

NEWS ITEMS:
{news_context}

WRITING TASK: {writing_instruction}

HUMAN WRITING STYLE RULES (critical):
- Vary sentence length deliberately: mix short 4-8 word sentences with longer 20-30 word sentences in the same paragraph. Do not let every sentence be roughly the same length.
- Use contractions naturally throughout: it's, don't, you'll, that's, doesn't, can't.
- Never use these overused words/phrases: delve, boast/boasts, robust, seamless, leverage (as a verb), elevate, unlock, game-changer, landscape, realm, tapestry, testament, moreover, furthermore, additionally, in conclusion, it's worth noting, when it comes to, at the end of the day, navigating, dive into, plays a crucial role, cannot be overstated, in today's world.
- Do not use the "X, Y, and Z" triplet list pattern more than once in the entire article.
- Never use "not only X but also Y" constructions.
- Write with a mild, specific point of view rather than neutral encyclopedia tone - it's fine to say what actually matters more and why.
- {opening_style}
- {closing_style}
- Do NOT invent direct quotes attributed to named people or companies. If the news items don't contain a real quote, describe the development in your own analytical voice instead - do not fabricate attributed statements.

INTERNAL LINKS TO INCLUDE:
Naturally include 5-7 of these internal links within the article content where relevant. Use them as anchor text inside <a> tags.
Prioritise glossary links where you mention a CRM/GTM concept. For example if you mention ARR, link it to the ARR glossary page.
{internal_links_text}

Example usage:
- "...the company reported strong <a href="https://www.crmdaily.co/glossary/arr">Annual Recurring Revenue (ARR)</a> growth..."
- "...improving your <a href="https://www.crmdaily.co/glossary/win-rate">win rate</a> requires..."
- "...visit our <a href="https://www.crmdaily.co/crm-tools">CRM Tools Directory</a> for comparisons..."
- "...read our <a href="https://www.crmdaily.co/guides">CRM Guides</a> for step-by-step help..."

HEADLINE DIVERSITY RULES:
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

IMPORTANT RULES:
- The article MUST be categorised as: {forced_category}
- Always use a simple hyphen (-) instead of an em dash or en dash
- Write in plain, direct English
- No em dashes anywhere
- Include 5-7 internal links naturally - do NOT force them, only add where they make sense
- Never describe CRM tools as struggling, failing, under pressure, or in trouble
- Write objectively and neutrally about all vendors

SEO RULES:
- FOCUS_KEYWORD: Pick ONE primary keyword phrase (2-5 words) that best describes what this article is about. It should be something people actually search for.
- SEO_TITLE: Write an SEO-optimised title (50-60 characters) that includes the focus keyword. Can differ slightly from the main TITLE.
- SEO_META_DESCRIPTION: Write a compelling meta description (140-155 characters) that includes the focus keyword and encourages clicks.
- ALT_TEXT: Write a descriptive alt text for the featured image (10-15 words describing what a relevant photo would show).

Follow this EXACT format:

TITLE: [Compelling headline - max 70 characters, use hyphen not em dash]
EXCERPT: [2-3 sentence summary for the article card - max 160 characters]
CATEGORY: {forced_category}
TAGS: [5 comma-separated tags relevant to {forced_category}]
FOCUS_KEYWORD: [primary keyword phrase, 2-5 words]
SEO_TITLE: [SEO title, 50-60 characters, includes focus keyword]
SEO_META_DESCRIPTION: [meta description, 140-155 characters, includes focus keyword]
ALT_TEXT: [featured image alt text, 10-15 words]
CONTENT:
[Write 800-1000 words in HTML format using:
- <p> for paragraphs
- <h2> for section headings (3-4 sections)
- <strong> for key terms
- <ul><li> for bullet points
- <blockquote> for a real stat or data point from the news items (not an invented quote)
- <a href="URL">anchor text</a> for 5-7 internal links - spread throughout the article
Requirements:
- Vary paragraph length - some 1-2 sentences, some 4-5 sentences
- 3-4 sections with H2 headings
- Actionable insights for CRM/RevOps professionals
- Reference real tools where relevant
- Confident, specific tone with a clear point of view - avoid hedging every claim
- Do NOT include the title in the content
- Do NOT add any markdown, only HTML tags
- Use hyphen (-) not em dash everywhere
- Internal links must be real URLs from the list above
- Link glossary terms naturally when you first mention them in the article]"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2500,
        messages=[{"role": "user", "content": prompt}]
    )

    response = message.content[0].text
    response = response.replace('\u2014', '-').replace('\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-').replace('&#8212;', '-').replace('&#8211;', '-')

    article = {}

    title_match        = re.search(r"TITLE:\s*(.+)",                response)
    excerpt_match      = re.search(r"EXCERPT:\s*(.+)",               response)
    tags_match         = re.search(r"TAGS:\s*(.+)",                  response)
    focus_kw_match     = re.search(r"FOCUS_KEYWORD:\s*(.+)",         response)
    seo_title_match    = re.search(r"SEO_TITLE:\s*(.+)",             response)
    seo_meta_match     = re.search(r"SEO_META_DESCRIPTION:\s*(.+)",  response)
    alt_text_match     = re.search(r"ALT_TEXT:\s*(.+)",              response)
    content_match      = re.search(r"CONTENT:\s*([\s\S]+)",          response)

    article["title"]               = title_match.group(1).strip()        if title_match        else f"CRM Intelligence Report - {today}"
    article["excerpt"]             = excerpt_match.group(1).strip()      if excerpt_match      else ""
    article["category"]            = forced_category
    article["tags"]                = [t.strip() for t in tags_match.group(1).split(",")] if tags_match else ["CRM", "GTM"]
    article["focus_keyword"]       = focus_kw_match.group(1).strip()     if focus_kw_match     else ""
    article["seo_title"]           = seo_title_match.group(1).strip()    if seo_title_match    else article["title"]
    article["seo_meta_description"]= seo_meta_match.group(1).strip()     if seo_meta_match     else article["excerpt"]
    article["alt_text"]            = alt_text_match.group(1).strip()     if alt_text_match     else article["title"]

    content = content_match.group(1).strip() if content_match else response
    content = content.replace('\u2014', '-').replace('\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-')

    # Second pass: human editor-style rewrite to break up uniform AI cadence
    content = humanize_pass(content, client)

    article["content"] = content

    article["featured_image_url"] = get_pexels_image(article["title"], article["category"], client)

    print(f"Generated: {article['title']}")
    print(f"   Category: {article['category']}")
    print(f"   Focus Keyword: {article['focus_keyword']}")
    print(f"   SEO Title: {article['seo_title']}")
    print(f"   Tags: {article['tags']}")

    return article

def main():
    print("Loading news...")
    news_items = load_news()
    if not news_items:
        print("No news items found.")
        return
    print(f"Generating article from {len(news_items)} news items...")
    article = generate_article(news_items)
    with open("generated_article.json", "w", encoding="utf-8") as f:
        json.dump(article, f, ensure_ascii=False, indent=2)
    print("Article saved to generated_article.json")

if __name__ == "__main__":
    main()