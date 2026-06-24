import sys
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

from scraper import scrape_news, save_published_title
from writer import generate_article
from publisher import publish_article
from emailer import run as send_newsletter

def run():
    print("=" * 50)
    print("CRM Daily - Automation Engine")
    print("=" * 50)

    # Step 1 - Scrape news
    print("\n📰 Step 1: Fetching today's CRM news...")
    news = scrape_news()

    if not news:
        print("❌ No relevant news found. Skipping today.")
        sys.exit(0)

    # Step 2 - Write article
    print("\n✍️  Step 2: Writing article with Claude AI...")
    article = generate_article(news)

    # Step 3 - Publish to WordPress
    print("\n🚀 Step 3: Publishing to WordPress...")
    success = publish_article(article)

    if not success:
        print("\n❌ Publishing failed")
        sys.exit(1)

    # Log the published title so it's never repeated
    save_published_title(article["title"])
    print(f"   📝 Logged title to dedup list")

    # Step 4 - Newsletter via Beehiiv RSS (handled automatically)
    send_newsletter(article)

    print("\n✅ Done! Article live + newsletter sent to subscribers.")

if __name__ == "__main__":
    run()