import requests
import json
import os
from datetime import datetime, timedelta, timezone

NEWS_API_KEY = os.environ["NEWS_API_KEY"]
NEWS_API_URL = "https://newsapi.org/v2/everything"

# Tightly focused queries — only B2B CRM/sales tech topics
SEARCH_QUERIES = [
    "HubSpot CRM update 2026",
    "Salesforce AI sales feature",
    "Pipedrive sales automation",
    "RevOps revenue operations strategy",
    "AI sales tools outreach automation",
    "Gong Clari sales intelligence",
    "Apollo Outreach Salesloft cold email",
    "CRM software B2B sales",
]

# Only trusted tech/business sources
ALLOWED_DOMAINS = [
    "techcrunch.com",
    "venturebeat.com",
    "forbes.com",
    "businessinsider.com",
    "theverge.com",
    "zdnet.com",
    "inc.com",
    "entrepreneur.com",
    "hbr.org",
    "salesforce.com",
    "hubspot.com",
    "blog.hubspot.com",
    "g2.com",
    "getapp.com",
    "capterra.com",
    "marketingweek.com",
    "adweek.com",
    "digiday.com",
    "thenextweb.com",
    "wired.com",
    "fastcompany.com",
    "businesswire.com",
    "prnewswire.com",
]

# Block these domains completely — political/general news
BLOCKED_DOMAINS = [
    "reuters.com", "apnews.com", "bbc.com", "cnn.com",
    "nytimes.com", "theguardian.com", "washingtonpost.com",
    "politico.com", "axios.com", "bloomberg.com",
    "wsj.com", "ft.com", "economist.com",
    "yahoo.com", "msn.com", "foxnews.com",
    "nbcnews.com", "abcnews.com", "cbsnews.com",
]

# Block image URLs from these domains
BLOCKED_IMAGE_DOMAINS = [
    "reuters.com", "apnews.com", "bbc.com", "cnn.com",
    "nytimes.com", "theguardian.com", "washingtonpost.com",
    "politico.com", "bloomberg.com", "wsj.com",
    "static01.nyt.com", "media.cnn.com", "ichef.bbci.co.uk",
]

# Must contain at least one of these in title to be included
REQUIRED_TITLE_KEYWORDS = [
    "CRM", "HubSpot", "Salesforce", "Pipedrive", "sales", "Sales",
    "RevOps", "GTM", "revenue", "outreach", "Outreach", "Gong",
    "Clari", "Apollo", "Salesloft", "automation", "AI tool",
    "SaaS", "B2B", "pipeline", "lead", "prospect", "customer",
    "marketing", "email", "LinkedIn", "Clay", "Smartlead",
]

def is_blocked_domain(url):
    if not url:
        return True
    return any(blocked in url for blocked in BLOCKED_DOMAINS)

def is_blocked_image(url):
    if not url:
        return True
    return any(blocked in url for blocked in BLOCKED_IMAGE_DOMAINS)

def has_required_keyword(title, summary=""):
    text = title + " " + summary
    return any(kw.lower() in text.lower() for kw in REQUIRED_TITLE_KEYWORDS)

def scrape_news():
    articles = []
    yesterday = (datetime.now(timezone.utc) - timedelta(days=2)).strftime("%Y-%m-%d")

    print("Fetching news from NewsAPI...")

    for query in SEARCH_QUERIES:
        try:
            response = requests.get(NEWS_API_URL, params={
                "q": query,
                "from": yesterday,
                "sortBy": "relevancy",
                "language": "en",
                "pageSize": 5,
                "apiKey": NEWS_API_KEY,
            })

            data = response.json()

            if data.get("status") == "ok":
                count = 0
                for article in data.get("articles", []):
                    title = article.get("title", "")
                    description = article.get("description", "")
                    url = article.get("url", "")
                    image_url = article.get("urlToImage", "")

                    # Skip blocked domains
                    if is_blocked_domain(url):
                        continue

                    # Skip if title doesn't contain relevant keywords
                    if not has_required_keyword(title, description):
                        continue

                    # Skip removed articles
                    if title == "[Removed]" or not title:
                        continue

                    # Clean image URL — skip blocked image sources
                    clean_image = image_url if image_url and not is_blocked_image(image_url) else ""

                    articles.append({
                        "title": title,
                        "summary": description[:600] if description else "",
                        "link": url,
                        "source": article.get("source", {}).get("name", ""),
                        "published": article.get("publishedAt", ""),
                        "image": clean_image,
                    })
                    count += 1

                print(f"  ✓ '{query}': {count} relevant articles")
            else:
                print(f"  ✗ '{query}': {data.get('message', 'Error')}")

        except Exception as e:
            print(f"  ✗ Error for '{query}': {e}")

    # Remove duplicates by title
    seen_titles = set()
    unique_articles = []
    for a in articles:
        clean_title = a["title"].lower().strip()
        if clean_title not in seen_titles:
            seen_titles.add(clean_title)
            unique_articles.append(a)

    # Prioritise articles with clean images first
    def article_score(article):
        has_image = 2 if article.get("image") else 0
        source = article.get("link", "").lower()
        source_score = 0
        for i, allowed in enumerate(ALLOWED_DOMAINS):
            if allowed in source:
                source_score = len(ALLOWED_DOMAINS) - i
                break
        return has_image + source_score

    unique_articles.sort(key=article_score, reverse=True)
    top_articles = unique_articles[:6]

    images_found = sum(1 for a in top_articles if a.get("image"))
    print(f"\n✅ Selected {len(top_articles)} articles ({images_found} with clean images)")

    for i, a in enumerate(top_articles, 1):
        img = "📸" if a.get("image") else "❌"
        print(f"  {i}. {img} [{a['source']}] {a['title'][:60]}")

    with open("scraped_news.json", "w") as f:
        json.dump(top_articles, f, indent=2, ensure_ascii=False)

    return top_articles

if __name__ == "__main__":
    scrape_news()