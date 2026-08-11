import requests
import json
import os
import random
from datetime import datetime, timedelta, timezone

NEWS_API_KEY = os.environ["NEWS_API_KEY"]
NEWS_API_URL = "https://newsapi.org/v2/everything"

# Larger pool - we randomly pick a subset each run so we're not always
# hitting the exact same 7 queries in the exact same order every time.
SEARCH_QUERY_POOL = [
    "HubSpot OR Salesforce OR Pipedrive",
    "CRM software sales",
    "RevOps GTM strategy",
    "AI sales automation",
    "sales intelligence outreach",
    "B2B SaaS sales tools",
    "Gong OR Clari OR Apollo OR Salesloft",
    "sales pipeline management software",
    "customer relationship management platform",
    "sales enablement technology",
    "revenue operations tools",
    "CRM integration API",
    "lead generation software B2B",
    "sales forecasting software",
]

BLOCKED_DOMAINS = [
    "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk",
    "cnn.com", "nytimes.com", "theguardian.com",
    "washingtonpost.com", "politico.com", "foxnews.com",
    "nbcnews.com", "abcnews.com", "cbsnews.com",
    "espn.com", "sports.yahoo.com", "nfl.com", "nba.com",
    "prtimes.jp", "marketbeat.com", "krones.com",
    # Low-quality aggregators / job boards / content mills that let
    # generic keyword matches (like "sales") through on off-topic content
    "newsbreak.com", "wordupnews.com", "indeed.com", "ziprecruiter.com",
    "glassdoor.com", "linkedin.com/jobs", "simplyhired.com",
    "careerbuilder.com", "monster.com",
]

# Specific CRM/sales-tech terms. If ANY of these appear, the article is
# relevant regardless of anything else.
STRONG_KEYWORDS = [
    "CRM", "HubSpot", "Salesforce", "Pipedrive", "RevOps",
    "Zoho CRM", "Freshsales", "Monday CRM", "Gong.io", "Gong",
    "Clari", "Apollo.io", "Salesloft", "Outreach.io", "Clay",
    "Smartlead", "sales pipeline", "sales automation",
    "sales enablement", "customer relationship management",
    "go-to-market", "GTM strategy", "sales tech", "martech",
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

# Block topics that are overrepresented — update weekly as needed
BLOCKED_TITLE_KEYWORDS = [
    "klue",
    "oauth",
    "klue breach",
    "salesforce oauth",
    "krones",
    "beverage",
    "schneider electric",
    "jim cramer",
]

PUBLISHED_LOG  = "published_titles.json"
PUBLISHED_URLS = "published_urls.json"

MAX_STORED_TITLES = 150
MAX_STORED_URLS   = 300

def load_published_titles():
    """Returns an ORDERED list (oldest first). Kept as list, not set,
    so 'most recent N' actually means most recent."""
    if os.path.exists(PUBLISHED_LOG):
        try:
            with open(PUBLISHED_LOG, "r", encoding="utf-8-sig") as f:
                data = json.load(f)
                if isinstance(data, list):
                    return data
                return list(data)
        except Exception:
            return []
    return []

def load_published_urls():
    """Returns an ORDERED list (oldest first)."""
    if os.path.exists(PUBLISHED_URLS):
        try:
            with open(PUBLISHED_URLS, "r", encoding="utf-8-sig") as f:
                data = json.load(f)
                if isinstance(data, list):
                    return data
                return list(data)
        except Exception:
            return []
    return []

def save_published_title(title):
    titles = load_published_titles()
    clean = title.lower().strip()
    if clean in titles:
        titles.remove(clean)  # move to end (most recent) if re-seen
    titles.append(clean)
    titles = titles[-MAX_STORED_TITLES:]  # now this actually keeps the newest N
    with open(PUBLISHED_LOG, "w", encoding="utf-8") as f:
        json.dump(titles, f)

def save_published_url(url):
    urls = load_published_urls()
    clean = url.strip()
    if clean in urls:
        urls.remove(clean)
    urls.append(clean)
    urls = urls[-MAX_STORED_URLS:]
    with open(PUBLISHED_URLS, "w", encoding="utf-8") as f:
        json.dump(urls, f)

def is_blocked(url):
    if not url:
        return True
    return any(b in url for b in BLOCKED_DOMAINS)

def is_blocked_image(url):
    if not url or not url.startswith("http"):
        return True
    return any(b in url for b in BLOCKED_IMAGE_DOMAINS)

def is_relevant(title, summary=""):
    title   = title or ""
    summary = summary or ""
    text    = (title + " " + summary).lower()

    # A single specific, unambiguous CRM/sales-tech term is enough on its own
    if any(kw.lower() in text for kw in STRONG_KEYWORDS):
        return True

    # Otherwise require at least 2 distinct generic keyword matches -
    # a single generic word like "sales" or "B2B" appearing once is too
    # weak a signal on its own and lets unrelated content (job listings,
    # generic business guides) through.
    matches = sum(1 for kw in REQUIRED_KEYWORDS if kw.lower() in text)
    return matches >= 2

def is_blocked_topic(title):
    title_lower = title.lower()
    return any(kw in title_lower for kw in BLOCKED_TITLE_KEYWORDS)

def is_duplicate_topic(title, published_titles):
    title_lower = title.lower().strip()
    if title_lower in published_titles:
        return True
    title_words = set(w for w in title_lower.split() if len(w) > 4)
    for pub_title in published_titles:
        pub_words = set(w for w in pub_title.split() if len(w) > 4)
        overlap   = title_words & pub_words
        if len(overlap) >= 3:
            return True
    return False

def scrape_news():
    articles         = []
    from_date        = (datetime.now(timezone.utc) - timedelta(days=3)).strftime("%Y-%m-%d")
    published_titles = load_published_titles()
    published_urls   = set(load_published_urls())  # set is fine here, only used for lookup

    # Pick a random subset of queries each run so we're not hammering the
    # exact same narrow set of searches (which kept surfacing the same
    # already-used top-relevancy evergreen articles).
    queries = random.sample(SEARCH_QUERY_POOL, k=min(8, len(SEARCH_QUERY_POOL)))

    print("Fetching news from NewsAPI...")

    for query in queries:
        try:
            response = requests.get(NEWS_API_URL, params={
                "q":        query,
                "from":     from_date,
                "sortBy":   "publishedAt",  # freshest first, instead of relevancy
                "language": "en",
                "pageSize": 15,
                "apiKey":   NEWS_API_KEY,
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
                    if is_blocked_topic(title):
                        print(f"  🚫 Blocked topic: {title[:60]}")
                        continue
                    if url in published_urls:
                        print(f"  🔁 Duplicate URL: {title[:60]}")
                        continue
                    if is_duplicate_topic(title, published_titles):
                        print(f"  ⏭ Skipping duplicate: {title[:60]}")
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
                print(f"  ✗ Error for '{query}': {data.get('message', 'Error')}")

        except Exception as e:
            print(f"  ✗ Error for '{query}': {e}")

    # Remove duplicates within this batch
    seen   = set()
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
        "saastr.com", "globenewswire.com",
    ]

    def score(a):
        img = 2 if a.get("image") else 0
        src = sum(1 for s in GOOD_SOURCES if s in a.get("link", "").lower())
        return img + src

    unique.sort(key=score, reverse=True)
    top = unique[:6]

    if not top:
        print("⚠️ No articles found after filtering — check BLOCKED_TITLE_KEYWORDS")

    images = sum(1 for a in top if a.get("image"))
    print(f"\n✅ Selected {len(top)} articles ({images} with images)")
    for i, a in enumerate(top, 1):
        img = "📸" if a.get("image") else "❌"
        print(f"  {i}. {img} [{a['source']}] {a['title'][:70]}")

    with open("scraped_news.json", "w") as f:
        json.dump(top, f, indent=2, ensure_ascii=False)

    # Save URLs so we never use the same source article twice
    for a in top:
        if a.get("link"):
            save_published_url(a["link"])

    return top

if __name__ == "__main__":
    scrape_news()