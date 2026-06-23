import requests
import json
import os
from datetime import datetime, timedelta, timezone

NEWS_API_KEY = os.environ["NEWS_API_KEY"]
NEWS_API_URL = "https://newsapi.org/v2/everything"

SEARCH_QUERIES = [
    "HubSpot OR Salesforce OR Pipedrive CRM",
    "RevOps OR revenue operations OR GTM strategy",
    "AI sales OR sales automation OR sales intelligence",
    "Gong OR Clari OR Outreach OR Salesloft OR Apollo",
    "B2B sales technology 2026",
]

PREFERRED_SOURCES = [
    "techcrunch.com",
    "venturebeat.com",
    "forbes.com",
    "businessinsider.com",
    "theverge.com",
    "zdnet.com",
    "inc.com",
    "entrepreneur.com",
    "hbr.org",
]

def scrape_news():
    articles = []
    yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%d")

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
                for article in data.get("articles", []):
                    if article.get("title") and article.get("description"):
                        # Get image URL — must be a real http URL
                        image_url = article.get("urlToImage", "")
                        if image_url and not image_url.startswith("http"):
                            image_url = ""

                        articles.append({
                            "title": article["title"],
                            "summary": article.get("description", "")[:600],
                            "content": article.get("content", "")[:1000],
                            "link": article.get("url", ""),
                            "source": article.get("source", {}).get("name", ""),
                            "published": article.get("publishedAt", ""),
                            "image": image_url,  # ← store image URL
                        })
                print(f"  ✓ '{query}': {len(data.get('articles', []))} articles")
            else:
                print(f"  ✗ '{query}': {data.get('message', 'Error')}")

        except Exception as e:
            print(f"  ✗ Error for '{query}': {e}")

    # Remove duplicates
    seen_titles = set()
    unique_articles = []
    for a in articles:
        clean_title = a["title"].lower().strip()
        if clean_title not in seen_titles and a["title"] != "[Removed]":
            seen_titles.add(clean_title)
            unique_articles.append(a)

    # Prioritise articles that HAVE images first, then by source
    def article_score(article):
        has_image = 1 if article.get("image") else 0
        source = article.get("link", "").lower()
        source_score = 0
        for i, preferred in enumerate(PREFERRED_SOURCES):
            if preferred in source:
                source_score = len(PREFERRED_SOURCES) - i
                break
        return (has_image * 10) + source_score

    unique_articles.sort(key=article_score, reverse=True)
    top_articles = unique_articles[:6]

    # Log image availability
    images_found = sum(1 for a in top_articles if a.get("image"))
    print(f"\n✅ Selected {len(top_articles)} articles ({images_found} with images)")

    with open("scraped_news.json", "w") as f:
        json.dump(top_articles, f, indent=2, ensure_ascii=False)

    return top_articles

if __name__ == "__main__":
    news = scrape_news()
    print("\nSelected articles:")
    for i, a in enumerate(news, 1):
        img = "📸" if a.get("image") else "❌"
        print(f"{i}. {img} [{a['source']}] {a['title']}")