import anthropic
import json
import os
import re
import requests
from datetime import datetime

# Unsplash source — free, no API key needed
# Returns relevant image based on search query
UNSPLASH_TOPICS = {
    "CRM News":             "crm-software",
    "GTM Strategy":         "business-strategy",
    "Tool Reviews":         "software-technology",
    "RevOps Intelligence":  "data-analytics",
    "Sales Tech":           "sales-technology",
    "AI in Sales":          "artificial-intelligence",
    "default":              "business-technology",
}

def get_relevant_image(category, title):
    """Get a relevant, high quality image from Unsplash based on article topic"""
    # Build search term from category and title keywords
    crm_terms = ["crm", "salesforce", "hubspot", "pipedrive", "sales", "revops",
                 "gtm", "revenue", "pipeline", "outreach", "automation", "ai"]

    title_words = title.lower().split()
    matched = [w for w in crm_terms if any(w in t for t in title_words)]

    if "ai" in matched or "artificial" in matched:
        query = "artificial-intelligence-technology"
    elif "salesforce" in matched:
        query = "salesforce-crm"
    elif "hubspot" in matched:
        query = "marketing-technology"
    elif "sales" in matched or "pipeline" in matched:
        query = "sales-business"
    elif "revops" in matched or "revenue" in matched:
        query = "business-analytics"
    elif "automation" in matched:
        query = "automation-technology"
    else:
        query = UNSPLASH_TOPICS.get(category, UNSPLASH_TOPICS["default"])

    # Unsplash source API — completely free, no key needed
    image_url = f"https://source.unsplash.com/1200x630/?{query}"

    # Verify the URL resolves to an actual image
    try:
        r = requests.head(image_url, allow_redirects=True, timeout=5)
        if r.status_code == 200:
            final_url = r.url
            print(f"   📸 Image: {final_url[:60]}...")
            return final_url
    except Exception as e:
        print(f"   ⚠️ Image fetch failed: {e}")

    return ""

def load_news():
    with open("scraped_news.json", "r") as f:
        return json.load(f)

def generate_article(news_items):
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    news_context = "\n\n".join([
        f"Source: {item['source']}\nTitle: {item['title']}\nSummary: {item['summary']}\nURL: {item['link']}"
        for item in news_items
    ])

    today = datetime.now().strftime("%B %d, %Y")

    prompt = f"""You are a senior editor at CRM Daily, a leading publication for CRM and GTM professionals.

Today is {today}. Based on the following news items, write ONE comprehensive, original article for CRM Daily.

NEWS ITEMS:
{news_context}

Pick the MOST interesting and relevant story and write a full article about it.

Follow this EXACT format:

TITLE: [Compelling SEO-optimised headline — max 70 characters]

EXCERPT: [2-3 sentence summary for the article card — max 160 characters]

CATEGORY: [ONE of: CRM News, GTM Strategy, Tool Reviews, RevOps Intelligence, Sales Tech, AI in Sales]

TAGS: [5 comma-separated tags e.g. HubSpot, Salesforce, RevOps, Sales Automation, CRM]

CONTENT:
[Write 700-900 words in HTML format using:
- <p> for paragraphs
- <h2> for section headings (3-4 sections)
- <strong> for key terms
- <ul><li> for bullet points
- <blockquote> for stats or key quotes

Requirements:
- Strong opening hook paragraph
- 3-4 sections with H2 headings
- Actionable insights for CRM/RevOps professionals
- Reference real tools where relevant (HubSpot, Salesforce, Pipedrive, Gong, Clay etc)
- Professional but engaging tone
- Forward-looking conclusion
- Do NOT include the title in the content
- Do NOT add any markdown, only HTML tags]"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )

    response = message.content[0].text

    article = {}
    title_match = re.search(r"TITLE:\s*(.+)", response)
    excerpt_match = re.search(r"EXCERPT:\s*(.+)", response)
    category_match = re.search(r"CATEGORY:\s*(.+)", response)
    tags_match = re.search(r"TAGS:\s*(.+)", response)
    content_match = re.search(r"CONTENT:\s*([\s\S]+)", response)

    article["title"] = title_match.group(1).strip() if title_match else f"CRM Intelligence Report — {today}"
    article["excerpt"] = excerpt_match.group(1).strip() if excerpt_match else ""
    article["category"] = category_match.group(1).strip() if category_match else "CRM News"
    article["tags"] = [t.strip() for t in tags_match.group(1).split(",")] if tags_match else ["CRM", "GTM"]
    article["content"] = content_match.group(1).strip() if content_match else response

    # Get relevant image based on article topic
    print(f"   🔍 Finding relevant image for: {article['category']}")
    article["featured_image_url"] = get_relevant_image(article["category"], article["title"])

    print(f"✅ Generated: {article['title']}")
    print(f"   Category: {article['category']}")
    print(f"   Tags: {article['tags']}")

    with open("generated_article.json", "w") as f:
        json.dump(article, f, indent=2, ensure_ascii=False)

    return article

if __name__ == "__main__":
    news = load_news()
    article = generate_article(news)