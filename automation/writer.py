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
    "CRM Fundamentals": [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    ],
    "default": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    ],
}

# CRM Fundamentals is forced every morning run (see generate_article) and
# picked in exact sequential order (Day 1 -> Day 30, then repeats) rather
# than randomly - see pick_sequential_topic. The other 13 categories below
# still pick randomly and now only advance once/day (evening slot only).
CATEGORY_ROTATION = [
    "CRM News",            # slot 1
    "Tool Comparison",     # slot 2
    "Explainer",           # slot 3
    "GTM Strategy",        # slot 4
    "CRM News",            # slot 5
    "Tool Comparison",     # slot 6
    "Explainer",           # slot 7
    "Tool Reviews",        # slot 8
    "RevOps Intelligence", # slot 9
    "Deep Guide",          # slot 10
    "Sales Tech",          # slot 11
    "Best Tools",          # slot 12
    "AI in Sales",         # slot 13
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
WP_GRAPHQL_URL = "https://cms.crmdaily.co/graphql"

# Categories treated as "evergreen" - preferred when ranking which past
# articles to surface for internal linking, since these are far more
# likely to be genuine long-term search performers than time-sensitive
# news posts. This is a heuristic, NOT real Google Search Console
# ranking data - there's no live analytics feed wired into this script.
EVERGREEN_CATEGORIES = {"Tool Comparison", "Explainer", "CRM Fundamentals", "Deep Guide", "Best Tools"}

# Known high-value terms worth checking for when deciding what to search
# the site for. If any of these appear in today's topic or source news,
# we search the live site for past articles mentioning the same terms.
KNOWN_SEARCH_TERMS = [
    "HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Monday CRM", "Freshsales",
    "Close", "Copper", "Keap", "Insightly", "Nimble", "ActiveCampaign",
    "RevOps", "GTM", "ARR", "MRR", "NRR", "CAC", "LTV", "ICP", "MEDDIC",
    "churn", "pipeline", "forecast", "win rate", "lead scoring", "PLG", "ABM",
]

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
# Note: "What is a Sales Funnel" and "What is Lead Scoring" were removed -
# they're now covered (better, with more specific angles) by the new
# sequential CRM_FUNDAMENTALS_TOPICS list below (Day 14 and Day 15).
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
    ("What is a CRM Audit", "CRM health check basics", "CRM audit"),
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

# ── CRM Fundamentals topics ── forced every morning run, picked in this
# EXACT order (Day 1 -> Day 30) via pick_sequential_topic, then repeats.
CRM_FUNDAMENTALS_TOPICS = [
    ("What Is CRM? A Complete Beginner's Guide to Customer Relationship Management", "what is CRM beginner guide", "CRM basics"),
    ("How Does a CRM Work? The Complete CRM Workflow Explained", "how does a CRM work", "CRM workflow"),
    ("CRM vs ERP: What's the Difference and Which One Does Your Business Need?", "CRM vs ERP difference", "CRM comparison"),
    ("What Are the Different Types of CRM? Operational, Analytical and Collaborative CRM Explained", "types of CRM operational analytical", "CRM types"),
    ("What Are the Core Components of a CRM System?", "CRM system components", "CRM architecture"),
    ("What Is CRM Software? Features, Benefits and How It Works", "CRM software features benefits", "CRM software"),
    ("CRM Database Explained: Contacts, Companies, Deals and Activities", "CRM database structure", "CRM data"),
    ("What Is a Contact in a CRM? Contacts, Leads and Customers Explained", "CRM contact vs lead vs customer", "Contact management"),
    ("What Is an Account in CRM? Companies, Contacts and Account Hierarchy Explained", "CRM account hierarchy", "Accounts"),
    ("What Is a Lead in CRM? Lead Management From Capture to Conversion", "CRM lead management", "Lead management"),
    ("What Is an Opportunity in CRM? A Complete Guide to Sales Opportunities", "CRM sales opportunity", "Opportunities"),
    ("What Is a CRM Pipeline? Stages, Deals and Pipeline Management Explained", "CRM pipeline stages", "Pipeline"),
    ("CRM Pipeline Stages: How to Build the Right Sales Process", "CRM pipeline stage design", "Pipeline design"),
    ("What Is a Sales Funnel? CRM Pipeline vs Sales Funnel Explained", "sales funnel vs CRM pipeline", "Funnel"),
    ("What Is Lead Scoring? How CRM Teams Prioritize the Right Leads", "CRM lead scoring", "Lead scoring"),
    ("What Is Lead Routing? How CRM Systems Assign Leads to Sales Reps", "CRM lead routing", "Lead routing"),
    ("What Is CRM Automation? 15 Processes Every Business Should Automate", "CRM automation processes", "Automation"),
    ("What Is a CRM Workflow? Triggers, Actions and Automation Explained", "CRM workflow triggers actions", "Workflows"),
    ("CRM Data Management: How to Keep Your Customer Data Clean and Accurate", "CRM data management", "Data quality"),
    ("CRM Data Hygiene: 15 Problems That Destroy CRM Data Quality", "CRM data hygiene problems", "Data hygiene"),
    ("What Is CRM Integration? How CRMs Connect With Email, Marketing and Other Tools", "CRM integrations explained", "Integrations"),
    ("CRM Reporting Explained: The Most Important Reports Every Sales Team Needs", "CRM reporting basics", "Reporting"),
    ("CRM Dashboards Explained: What Should Your Sales Dashboard Track?", "CRM dashboard metrics", "Dashboards"),
    ("CRM Metrics and KPIs: 25 Numbers Every Revenue Team Should Track", "CRM metrics KPIs", "Metrics"),
    ("What Is CRM Adoption? Why Employees Stop Using CRMs and How to Fix It", "CRM user adoption problem", "Adoption"),
    ("How to Choose a CRM: The Complete CRM Buying Guide for Businesses", "how to choose a CRM", "CRM selection"),
    ("How to Implement a CRM: Step-by-Step CRM Implementation Guide", "CRM implementation steps", "Implementation"),
    ("CRM Migration Explained: How to Move From One CRM to Another Without Losing Data", "CRM migration guide", "Migration"),
    ("CRM Customization vs CRM Configuration: What Should You Actually Change?", "CRM customization vs configuration", "Configuration"),
    ("CRM Best Practices: The Complete Guide to Building a High-Performing CRM", "CRM best practices guide", "Master guide"),
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
    """Random pick, excluding already-used - used by categories where
    order doesn't matter (Tool Comparison, Explainer, Deep Guide, Best Tools)."""
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

def pick_sequential_topic(topics, category, name_fn):
    """Picks topics IN LIST ORDER (Day 1 -> Day N), not randomly. Used for
    CRM Fundamentals so the deliberately-sequenced curriculum publishes in
    the intended order. Resets to the start once the full list is used."""
    used = get_used_topics()
    used_for_cat = used.get(category, [])
    for t in topics:
        if name_fn(t) not in used_for_cat:
            save_used_topic(category, name_fn(t))
            return t
    # Whole list has been used - reset and restart from Day 1
    used[category] = []
    with open(USED_TOPICS_LOG, "w") as f:
        json.dump(used, f)
    save_used_topic(category, name_fn(topics[0]))
    return topics[0]

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
    elif category == "CRM Fundamentals":
        topic = pick_sequential_topic(
            CRM_FUNDAMENTALS_TOPICS, "CRM Fundamentals",
            lambda t: t[0]
        )
        return f"Write a clear, beginner-friendly, in-depth explainer titled: {topic[0]}. Assume the reader is new to CRM software. Define the concept plainly, explain why it matters day to day, and give a concrete example of it in practice.", topic[0]
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
    "CRM Fundamentals":    ["laptop crm software screen","beginner learning office desk","simple business software interface","new employee training laptop","clean office desk computer"],
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

def get_search_keywords_for_topic(category, extra_topic, news_items):
    """Figure out which known high-value terms are relevant to today's
    article, so we know what to search the live site for."""
    text_pool = (extra_topic or "") + " " + " ".join([
        (n.get("title", "") + " " + n.get("summary", "")) for n in (news_items or [])
    ])
    text_lower = text_pool.lower()
    found = [term for term in KNOWN_SEARCH_TERMS if term.lower() in text_lower]
    return found[:5]  # cap to keep the number of search calls reasonable

def search_site_for_related_articles(keywords):
    """Search the LIVE WordPress site (not a local cache) for existing
    published articles matching today's key terms - e.g. if today's
    article discusses HubSpot and Salesforce, this finds any past
    article already covering that comparison, anywhere in site history,
    not just recently published ones."""
    if not keywords:
        return []

    results = {}
    query = """
    query($search: String!) {
      posts(first: 3, where: {search: $search, status: PUBLISH}) {
        nodes {
          title
          slug
          categories { nodes { name } }
        }
      }
    }
    """
    for kw in keywords:
        try:
            resp = requests.post(
                WP_GRAPHQL_URL,
                json={"query": query, "variables": {"search": kw}},
                timeout=8
            )
            data = resp.json()
            nodes = (data.get("data") or {}).get("posts", {}).get("nodes", []) or []
            for n in nodes:
                slug = n.get("slug")
                if slug and slug not in results:
                    cats = n.get("categories", {}).get("nodes", []) or []
                    cat_name = cats[0].get("name", "") if cats else ""
                    results[slug] = {
                        "title": n.get("title", ""),
                        "slug": slug,
                        "category": cat_name,
                    }
        except Exception as e:
            print(f"   Site search error for '{kw}': {e}")

    # Prefer evergreen categories first (best available proxy for "likely
    # ranks well" without real Search Console data)
    ranked = sorted(
        results.values(),
        key=lambda a: 0 if a.get("category") in EVERGREEN_CATEGORIES else 1
    )
    print(f"   Found {len(ranked)} related past article(s) via live site search")
    return ranked[:8]

def build_related_articles_prompt_block(related):
    if not related:
        return ""
    lines = [
        f'- "{a["title"]}" - https://www.crmdaily.co/article/{a["slug"]}'
        for a in related if a.get("slug") and a.get("title")
    ]
    return "\n".join(lines)

def humanize_pass(content, client):
    """Second-pass edit to break up uniform AI cadence before publishing."""
    try:
        edit_prompt = f"""Do a quick human editor's pass on this HTML article body. Do not summarize or shorten it meaningfully - keep the same length, facts, HTML tags, and internal links exactly as they are.

Your only job is to vary the rhythm so it reads like a person edited it, not a model:
- Break up any run of same-length sentences - combine two short ones or split a long one
- Cut redundant hedging words (somewhat, generally, often, tends to) where they add nothing
- Swap in a contraction here and there if it reads naturally (it's, doesn't, that's)
- If two sentences in a row start the same way (e.g. both start with "This" or both start with "The"), reword one
- Vary explanatory analogies - if the draft leans on an overused CRM cliche (e.g. calling a CRM "a digital filing cabinet" or "a rolodex on steroids"), replace it with something fresher
- Leave all <a href> links, <h2> tags, and <blockquote> content untouched - do not remove or alter any link or URL

Reply with ONLY the revised HTML, no preamble, no explanation.

ARTICLE HTML:
{content}"""
        msg = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=3800,
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
    current_hour   = datetime.now().hour

    # CRM Fundamentals is forced on the morning run (matches emailer.py's
    # own "current_hour < 10" check for the 8am IST / UTC 2:30 slot) so it
    # publishes every single day, in sequence. The evening run keeps
    # consuming the normal 13-category rotation, once a day instead of
    # twice - total articles/day stays at 2.
    if current_hour < 10:
        forced_category = "CRM Fundamentals"
    else:
        forced_category = get_next_category()

    print(f"   Category for this run: {forced_category}")

    internal_links_text = "\n".join([
        f"- {p['label']}: {p['url']}" for p in INTERNAL_PAGES
    ])

    extra_instruction, extra_topic = get_extra_context(forced_category)

    # Search the LIVE site (not a local cache) for existing articles
    # relevant to today's topic, so we can link to genuinely matching
    # past content - regardless of how long ago it was published.
    search_keywords = get_search_keywords_for_topic(forced_category, extra_topic, news_items)
    related_articles = search_site_for_related_articles(search_keywords)
    related_articles_block = build_related_articles_prompt_block(related_articles)

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
        "CRM Fundamentals":    extra_instruction or "Write a beginner-friendly explainer about a core CRM concept. Assume no prior knowledge.",
    }

    writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])
    if extra_instruction and forced_category in ["Tool Comparison", "Explainer", "Deep Guide", "Best Tools", "CRM Fundamentals"]:
        writing_instruction = extra_instruction

    opening_styles = [
        "Open with a short, blunt one-sentence statement (under 10 words) before expanding.",
        "Open with a specific concrete scenario or example, not a general statement.",
        "Open with a direct question the reader is likely asking themselves.",
        "Open by stating the most surprising fact from the news items first.",
        "Open by directly answering the core question in one clear sentence, then explain the reasoning after.",
    ]
    closing_styles = [
        "End on a specific, concrete takeaway or action item - not a generic summary.",
        "End by naming a tradeoff or open question, not a tidy resolution.",
        "End with a short punchy closing line (under 12 words).",
        "End by circling back to the opening example or scenario.",
    ]
    opening_style = random.choice(opening_styles)
    closing_style = random.choice(closing_styles)

    related_articles_section = ""
    if related_articles_block:
        related_articles_section = f"""

EXISTING ARTICLES ON THIS SITE THAT MAY BE RELEVANT (found via live site search on today's topic - link to ONE of these ONLY if it's a genuinely strong match, never force it, never fabricate a URL not listed here):
{related_articles_block}"""

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
- Avoid cliche CRM analogies that have become overused (e.g. "digital filing cabinet," "rolodex on steroids") - find a fresher way to explain the concept.
- {opening_style}
- {closing_style}
- Do NOT invent direct quotes attributed to named people or companies. If the news items don't contain a real quote, describe the development in your own analytical voice instead - do not fabricate attributed statements.
- This article must not repeat the structure, phrasing, or angle of previous articles on this site - if the topic overlaps with something already covered, take a distinct angle rather than restating it.

AEO RULES (important - this content also needs to work well when AI answer engines like ChatGPT, Perplexity, or Google AI Overviews extract and summarize it):
- Answer the exact question posed in the title within the first 1-2 sentences, in plain, direct language, before adding nuance or context.
- Use the FOCUS_KEYWORD naturally in the first paragraph, in at least one H2 heading, and once more later in the article.
- Where the content is naturally a list, comparison, or set of steps, format it as an actual <ul><li> or numbered structure rather than a dense paragraph - AI answer engines and featured snippets favor extractable, well-structured chunks.
- Keep each H2 section focused on one clear sub-question, written so it can be understood on its own if extracted out of context.

INTERNAL LINKS TO INCLUDE:
Naturally include 5-7 of these internal links within the article content where relevant. Use them as anchor text inside <a> tags.
Prioritise glossary links where you mention a CRM/GTM concept. For example if you mention ARR, link it to the ARR glossary page.
{internal_links_text}{related_articles_section}

Example usage:
- "...the company reported strong <a href="https://www.crmdaily.co/glossary/arr">Annual Recurring Revenue (ARR)</a> growth..."
- "...improving your <a href="https://www.crmdaily.co/glossary/win-rate">win rate</a> requires..."
- "...visit our <a href="https://www.crmdaily.co/crm-tools">CRM Tools Directory</a> for comparisons..."
- "...read our <a href="https://www.crmdaily.co/guides">CRM Guides</a> for step-by-step help..."
- "...as we covered in <a href="https://www.crmdaily.co/article/some-real-slug">[real past article title]</a>..."

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
[Write 1300-1500 words in HTML format using:
- <p> for paragraphs
- <h2> for section headings (4-6 sections)
- <strong> for key terms
- <ul><li> for bullet points
- <blockquote> for a real stat or data point from the news items (not an invented quote)
- <a href="URL">anchor text</a> for 5-7 internal links - spread throughout the article
Requirements:
- Vary paragraph length - some 1-2 sentences, some 4-5 sentences
- 4-6 sections with H2 headings
- Actionable insights for CRM/RevOps professionals
- Reference real tools where relevant
- Confident, specific tone with a clear point of view - avoid hedging every claim
- Do NOT include the title in the content
- Do NOT add any markdown, only HTML tags
- Use hyphen (-) not em dash everywhere
- Internal links must be real URLs from the lists above - never invent a URL
- Link glossary terms naturally when you first mention them in the article]"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3800,
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