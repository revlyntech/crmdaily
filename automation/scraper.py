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
                        articles.append({
                            "title": article["title"],
                            "summary": article.get("description", "")[:600],
                            "content": article.get("content", "")[:1000],
                            "link": article.get("url", ""),
                            "source": article.get("source", {}).get("name", ""),
                            "published": article.get("publishedAt", ""),
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

    # Prioritise preferred sources
    def source_score(article):
        source = article.get("link", "").lower()
        for i, preferred in enumerate(PREFERRED_SOURCES):
            if preferred in source:
                return len(PREFERRED_SOURCES) - i
        return 0

    unique_articles.sort(key=source_score, reverse=True)
    top_articles = unique_articles[:6]

    print(f"\n✅ Selected {len(top_articles)} articles for writing")

    # Save in current directory (automation/)
    with open("scraped_news.json", "w") as f:
        json.dump(top_articles, f, indent=2, ensure_ascii=False)

    return top_articles

if __name__ == "__main__":
    news = scrape_news()
    print("\nSelected articles:")
    for i, a in enumerate(news, 1):
        print(f"{i}. [{a['source']}] {a['title']}")