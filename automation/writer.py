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
    "CRM News",
    "GTM Strategy",
    "Tool Reviews",
    "RevOps Intelligence",
    "Sales Tech",
    "AI in Sales",
]

# Internal pages for linking — Claude will pick relevant ones
INTERNAL_PAGES = [
    { "url": "https://www.crmdaily.co/crm-tools", "label": "CRM Tools Directory" },
    { "url": "https://www.crmdaily.co/news",      "label": "CRM News" },
    { "url": "https://www.crmdaily.co/guides",    "label": "CRM Guides" },
    { "url": "https://www.crmdaily.co/tools",     "label": "Tool Reviews" },
    { "url": "https://www.crmdaily.co/newsletter","label": "CRM Daily Newsletter" },
]

CATEGORY_LOG = "category_log.json"

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

def save_category_log(category):
    if category in CATEGORY_ROTATION:
        index = CATEGORY_ROTATION.index(category)
        with open(CATEGORY_LOG, "w", encoding="utf-8") as f:
            json.dump({"last_index": index}, f)

def get_relevant_image(category, index=0):
    images = TOPIC_IMAGES.get(category, TOPIC_IMAGES["default"])
    chosen = images[index % len(images)]
    print(f"   📸 Image selected for '{category}': {chosen[:50]}...")
    return chosen

def load_news():
    with open("scraped_news.json", "r") as f:
        return json.load(f)

def generate_article(news_items):
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    news_context = "\n\n".join([
        f"Source: {item['source']}\nTitle: {item['title']}\nSummary: {item['summary']}\nURL: {item['link']}"
        for item in news_items
    ])

    today       = datetime.now().strftime("%B %d, %Y")
    hour_index  = datetime.now().hour

    forced_category = get_next_category()
    print(f"   📂 Forced category for this run: {forced_category}")

    # Internal links to include naturally in the article
    internal_links_text = "\n".join([
        f"- {p['label']}: {p['url']}" for p in INTERNAL_PAGES
    ])

    category_instructions = {
        "CRM News":           "Write a news article about the most significant CRM industry development in the news items.",
        "GTM Strategy":       "Write a strategic guide about go-to-market strategy, pipeline building, or revenue team alignment. Use the news as context but make it a practical strategy piece.",
        "Tool Reviews":       "Write a detailed review or comparison of a CRM/sales tool mentioned in the news. Focus on features, use cases, pros and cons for RevOps teams.",
        "RevOps Intelligence":"Write an analytical piece about revenue operations trends, metrics, or best practices. Use the news as context.",
        "Sales Tech":         "Write about sales technology, automation tools, or the sales tech stack. Use the news as context.",
        "AI in Sales":        "Write about AI applications in sales, CRM automation, or AI-powered GTM. Use the news as context.",
    }

    writing_instruction = category_instructions.get(forced_category, category_instructions["CRM News"])

    prompt = f"""You are a senior editor at CRM Daily, a leading publication for CRM and GTM professionals.

Today is {today}. Based on the following news items, write ONE comprehensive, original article for CRM Daily.

NEWS ITEMS:
{news_context}

WRITING TASK: {writing_instruction}

INTERNAL LINKS TO INCLUDE:
Naturally include 2-3 of these internal links within the article content where relevant. Use them as anchor text inside <a> tags:
{internal_links_text}

Example of how to use them:
- "...visit our <a href="https://www.crmdaily.co/crm-tools">CRM Tools Directory</a> for comparisons..."
- "...read our latest <a href="https://www.crmdaily.co/guides">CRM Guides</a> for step-by-step help..."

IMPORTANT RULES:
- The article MUST be categorised as: {forced_category}
- Always use a simple hyphen (-) instead of an em dash or en dash
- Write in plain, direct English
- No em dashes anywhere
- Include 2-3 internal links naturally — do NOT force them, only add where they make sense

Follow this EXACT format:

TITLE: [Compelling SEO-optimised headline - max 70 characters, use hyphen not em dash]

EXCERPT: [2-3 sentence summary for the article card - max 160 characters]

CATEGORY: {forced_category}

TAGS: [5 comma-separated tags relevant to {forced_category}]

CONTENT:
[Write 700-900 words in HTML format using:
- <p> for paragraphs
- <h2> for section headings (3-4 sections)
- <strong> for key terms
- <ul><li> for bullet points
- <blockquote> for stats or key quotes
- <a href="URL">anchor text</a> for 2-3 internal links

Requirements:
- Strong opening hook paragraph
- 3-4 sections with H2 headings
- Actionable insights for CRM/RevOps professionals
- Reference real tools where relevant
- Professional but engaging tone
- Forward-looking conclusion
- Do NOT include the title in the content
- Do NOT add any markdown, only HTML tags
- Use hyphen (-) not em dash everywhere
- Internal links must be real URLs from the list above]"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )

    response = message.content[0].text
    response = response.replace('\u2014', '-').replace('\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-')

    article        = {}
    title_match   = re.search(r"TITLE:\s*(.+)",          response)
    excerpt_match = re.search(r"EXCERPT:\s*(.+)",         response)
    tags_match    = re.search(r"TAGS:\s*(.+)",            response)
    content_match = re.search(r"CONTENT:\s*([\s\S]+)",   response)

    article["title"]    = title_match.group(1).strip()   if title_match   else f"CRM Intelligence Report - {today}"
    article["excerpt"]  = excerpt_match.group(1).strip() if excerpt_match else ""
    article["category"] = forced_category
    article["tags"]     = [t.strip() for t in tags_match.group(1).split(",")] if tags_match else ["CRM", "GTM"]

    content = content_match.group(1).strip() if content_match else response
    content = content.replace('\u2014', '-').replace('\u2013', '-').replace('&mdash;', '-').replace('&ndash;', '-')
    article["content"] = content

    article["featured_image_url"] = get_relevant_image(article["category"], hour_index)

    save_category_log(article["category"])

    print(f"✅ Generated: {article['title']}")
    print(f"   Category: {article['category']}")
    print(f"   Tags: {article['tags']}")

    with open("generated_article.json", "w") as f:
        json.dump(article, f, indent=2, ensure_ascii=False)

    return article

if __name__ == "__main__":
    news = load_news()
    generate_article(news)