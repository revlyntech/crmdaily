import anthropic
import json
import os
import re
from datetime import datetime

def load_news():
    with open("scraped_news.json", "r") as f:
        return json.load(f)

def generate_article(news_items):
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    # Pick best image from news items
    featured_image_url = ""
    for item in news_items:
        if item.get("image") and item["image"].startswith("http"):
            featured_image_url = item["image"]
            break

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
- Reference real tools where relevant
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
    article["featured_image_url"] = featured_image_url

    print(f"✅ Generated: {article['title']}")
    print(f"   Category: {article['category']}")
    print(f"   Image: {featured_image_url or 'None found'}")

    with open("generated_article.json", "w") as f:
        json.dump(article, f, indent=2, ensure_ascii=False)

    return article

if __name__ == "__main__":
    news = load_news()
    article = generate_article(news)