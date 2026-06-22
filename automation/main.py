import sys
from scraper import scrape_news
from writer import generate_article
from publisher import publish_article

def run():
    print("=" * 50)
    print("CRM Daily — Automation Engine")
    print("=" * 50)

    # Step 1 — Scrape
    print("\n📰 Step 1: Fetching today's CRM news...")
    news = scrape_news()

    if not news:
        print("❌ No relevant news found. Skipping today.")
        sys.exit(0)

    # Step 2 — Write
    print("\n✍️  Step 2: Writing article with Claude AI...")
    article = generate_article(news)

    # Step 3 — Publish
    print("\n🚀 Step 3: Publishing to WordPress...")
    success = publish_article(article)

    if success:
        print("\n✅ Done! Article live on crmdaily.co")
    else:
        print("\n❌ Publishing failed")
        sys.exit(1)

if __name__ == "__main__":
    run()