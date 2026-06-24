import requests
import json
import os
from datetime import datetime, timedelta, timezone

NEWS_API_KEY = os.environ["NEWS_API_KEY"]
NEWS_API_URL = "https://newsapi.org/v2/everything"

SEARCH_QUERIES = [
    "HubSpot OR Salesforce OR Pipedrive",
    "CRM software sales",
    "RevOps GTM strategy",
    "AI sales automation",
    "sales intelligence outreach",
    "B2B SaaS sales tools",
    "Gong OR Clari OR Apollo OR Salesloft",
]

BLOCKED_DOMAINS = [
    "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk",
    "cnn.com", "nytimes.com", "theguardian.com",
    "washingtonpost.com", "politico.com", "foxnews.com",
    "nbcnews.com", "abcnews.com", "cbsnews.com",
    "espn.com", "sports.yahoo.com", "nfl.com", "nba.com",
]

BLOCKED_IMAGE_DOMAINS = [
    "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk",
    "cnn.com", "nytimes.com", "theguardian.com",
    "washingtonpost.com", "static01.nyt.com",
    "media.cnn.com", "ichef.bbci.co.uk", "s.abcnews.com",
]

REQUIRED_KEYWORDS = [
    "CRM", "HubSpot", "Salesforce", "Pipedrive", "sales",
    "RevOps", "GTM", "revenue", "Outreach", "Gong", "Clari",
    "Apollo", "Salesloft", "automation", "SaaS", "B2B",
    "pipeline", "lead generation", "prospect", "customer success",
    "marketing automation", "email campaign", "LinkedIn sales",
    "Clay", "Smartlead", "sales tech", "sales tool", "sales AI",
    "artificial intelligence sales", "AI CRM", "sales software",
]

PUBLISHED_LOG = "published_titles.json"

def load_published_titles():
    if os.path.exists(PUBLISHED_LOG):
        try:
            with open(PUBLISHED_LOG, "r", encoding="utf-8-sig") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def save_published_title(title):
    titles = load_published_titles()
    titles.add(title.lower().strip())
    titles_list = list(titles)[-100:]
    with open(PUBLISHED_LOG, "w", encoding="utf-8") as f:
        json.dump(titles_list, f)

def is_blocked(url):
    if not url:
        return True
    return any(b in url for b in BLOCKED_DOMAINS)

def is_blocked_image(url):
    if not url or not url.startswith("http"):
        return True
    return any(b in url for b in BLOCKED_IMAGE_DOMAINS)

def is_relevant(title, summary=""):
    title = title or ""
    summary = summary or ""
    text = (title + " " + summary).lower()
    return any(kw.lower() in text for kw in REQUIRED_KEYWORDS)

def is_duplicate_topic(title, published_titles):
    title_lower = title.lower().strip()
    if title_lower in published_titles:
        return True
    title_words = set(w for w in title_lower.split() if len(w) > 4)
    for pub_title in published_titles:
        pub_words = set(w for w in pub_title.split() if len(w) > 4)
        overlap = title_words & pub_words
        if len(overlap) >= 3:
            return True
    return False

def scrape_news():
    articles = []
    from_date = (datetime.now(timezone.utc) - timedelta(days=3)).strftime("%Y-%m-%d")
    published_titles = load_published_titles()

    print("Fetching news from NewsAPI...")

    for query in SEARCH_QUERIES:
        try:
            response = requests.get(NEWS_API_URL, params={
                "q": query,
                "from": from_date,
                "sortBy": "relevancy",
                "language": "en",
                "pageSize": 10,
                "apiKey": NEWS_API_KEY,
            })

            data = response.json()

            if data.get("status") == "ok":
                count = 0
                for article in data.get("articles", []):
                    title       = article.get("title") or ""
                    description = article.get("description") or ""
                    url         = article.get("url") or ""
                    image_url   = article.get("urlToImage") or ""

                    if not title or title == "[Removed]":
                        continue
                    if is_blocked(url):
                        continue
                    if not is_relevant(title, description):
                        continue
                    if is_duplicate_topic(title, published_titles):
                        print(f"  ⏭ Skipping duplicate topic: {title[:60]}")
                        continue

                    clean_image = "" if is_blocked_image(image_url) else image_url

                    articles.append({
                        "title":     title,
                        "summary":   description[:600],
                        "link":      url,
                        "source":    article.get("source", {}).get("name", ""),
                        "published": article.get("publishedAt", ""),
                        "image":     clean_image,
                    })
                    count += 1

                print(f"  ✓ '{query}': {count} relevant articles")
            else:
                print(f"  ✗ '{query}': {data.get('message', 'Error')}")

        except Exception as e:
            print(f"  ✗ Error for '{query}': {e}")

    seen = set()
    unique = []
    for a in articles:
        key = a["title"].lower().strip()
        if key not in seen:
            seen.add(key)
            unique.append(a)

    GOOD_SOURCES = [
        "techcrunch.com", "venturebeat.com", "forbes.com",
        "businessinsider.com", "zdnet.com", "inc.com",
        "entrepreneur.com", "wired.com", "fastcompany.com",
        "thenextweb.com", "businesswire.com", "prnewswire.com",
    ]

    def score(a):
        img = 2 if a.get("image") else 0
        src = sum(1 for s in GOOD_SOURCES if s in a.get("link", "").lower())
        return img + src

    unique.sort(key=score, reverse=True)
    top = unique[:6]

    images = sum(1 for a in top if a.get("image"))
    print(f"\n✅ Selected {len(top)} articles ({images} with images)")
    for i, a in enumerate(top, 1):
        img = "📸" if a.get("image") else "❌"
        print(f"  {i}. {img} [{a['source']}] {a['title'][:70]}")

    with open("scraped_news.json", "w") as f:
        json.dump(top, f, indent=2, ensure_ascii=False)

    return top

if __name__ == "__main__":
    scrape_news()