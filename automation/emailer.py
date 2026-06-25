import os
import json
import requests
import resend
from datetime import datetime

DIGEST_LOG = "daily_digest.json"

def build_digest_email(articles):
    """Build a digest email with summaries of all articles for the day"""
    date = datetime.now().strftime("%B %d, %Y")
    day  = datetime.now().strftime("%A")

    # Build article sections
    article_sections = ""
    for i, article in enumerate(articles, 1):
        title    = article.get("title", "")
        excerpt  = article.get("excerpt", "")
        slug     = article.get("slug", "")
        category = article.get("category", "CRM News")
        url      = f"https://www.crmdaily.co/article/{slug}"
        image    = article.get("featured_image_url", "")

        img_html = f'<img src="{image}" alt="{title}" style="width:100%;height:180px;object-fit:cover;margin:0 0 16px;display:block;border-radius:2px;">' if image else ""

        article_sections += f"""
  <!-- Article {i} -->
  <div style="margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid rgba(0,0,0,0.08);">
    <p style="font-family:'Courier New',monospace;font-size:9px;color:#E8521A;letter-spacing:0.18em;margin:0 0 8px;">
      // {category.upper()}
    </p>
    {img_html}
    <h2 style="font-family:Georgia,serif;font-size:22px;color:#0F0E0D;line-height:1.2;letter-spacing:-0.01em;margin:0 0 10px;">
      {title}
    </h2>
    <p style="font-family:Georgia,serif;font-size:15px;color:#6B6560;line-height:1.7;margin:0 0 16px;">
      {excerpt}
    </p>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#E8521A;padding:10px 20px;">
          <a href="{url}" style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;">
            READ ARTICLE {i} →
          </a>
        </td>
      </tr>
    </table>
  </div>
"""

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F2EDE4;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;background:#F2EDE4;padding:32px 24px;">

    <!-- Header -->
    <div style="border-bottom:2px solid #E8521A;padding-bottom:16px;margin-bottom:8px;">
      <span style="font-family:'Courier New',monospace;font-size:20px;color:#0F0E0D;font-weight:bold;">
        crm<span style="color:#E8521A;">daily</span><span style="color:#E8521A;">•</span>
      </span>
      <p style="font-family:'Courier New',monospace;font-size:9px;color:#9B958F;letter-spacing:0.15em;margin:4px 0 0;">
        CRM & GTM INTELLIGENCE DAILY
      </p>
    </div>

    <!-- Digest label -->
    <p style="font-family:'Courier New',monospace;font-size:10px;color:#E8521A;letter-spacing:0.18em;margin:16px 0 4px;">
      // DAILY DIGEST
    </p>
    <h1 style="font-family:Georgia,serif;font-size:26px;color:#0F0E0D;line-height:1.15;letter-spacing:-0.02em;margin:0 0 6px;">
      {day}'s CRM Intelligence
    </h1>
    <p style="font-family:'Courier New',monospace;font-size:10px;color:#9B958F;letter-spacing:0.08em;margin:0 0 28px;">
      {date.upper()} &nbsp;·&nbsp; {len(articles)} NEW ARTICLE{'S' if len(articles) > 1 else ''} TODAY
    </p>

    <!-- Divider -->
    <hr style="border:none;border-top:2px solid #E8521A;margin:0 0 28px;">

    <!-- Articles -->
    {article_sections}

    <!-- View all CTA -->
    <div style="background:#0F0E0D;padding:24px;margin-bottom:24px;text-align:center;">
      <p style="font-family:'Courier New',monospace;font-size:10px;color:rgba(242,237,228,0.6);letter-spacing:0.1em;margin:0 0 12px;">
        MORE CRM INTELLIGENCE AT
      </p>
      <a href="https://www.crmdaily.co/news" style="font-family:Georgia,serif;font-size:18px;color:#E8521A;text-decoration:none;font-weight:bold;">
        crmdaily.co →
      </a>
    </div>

    <!-- Footer -->
    <p style="font-family:'Courier New',monospace;font-size:9px;color:#9B958F;letter-spacing:0.06em;margin:0 0 6px;">
      CRM DAILY — YOUR DAILY CRM & GTM INTELLIGENCE
    </p>
    <p style="font-family:'Courier New',monospace;font-size:8px;color:#9B958F;letter-spacing:0.06em;margin:0;">
      You're receiving this because you subscribed at crmdaily.co.
      No spam. <a href="https://app.beehiiv.com/unsubscribe" style="color:#9B958F;">Unsubscribe anytime.</a>
    </p>

  </div>
</body>
</html>"""


def load_digest_log():
    """Load today's stored articles for digest"""
    if os.path.exists(DIGEST_LOG):
        try:
            with open(DIGEST_LOG, "r", encoding="utf-8-sig") as f:
                data = json.load(f)
            # Only use articles from today
            today = datetime.now().strftime("%Y-%m-%d")
            if data.get("date") == today:
                return data.get("articles", [])
        except Exception:
            pass
    return []


def save_to_digest_log(article):
    """Save article to today's digest log"""
    today    = datetime.now().strftime("%Y-%m-%d")
    articles = load_digest_log()

    # Add this article if not already in log
    existing_titles = [a.get("title") for a in articles]
    if article.get("title") not in existing_titles:
        articles.append({
            "title":             article.get("title", ""),
            "excerpt":           article.get("excerpt", ""),
            "slug":              article.get("slug", ""),
            "category":          article.get("category", ""),
            "featured_image_url":article.get("featured_image_url", ""),
        })

    with open(DIGEST_LOG, "w", encoding="utf-8") as f:
        json.dump({"date": today, "articles": articles}, f, indent=2)

    print(f"   📝 Saved to digest log ({len(articles)} article(s) today)")
    return articles


def get_beehiiv_subscribers():
    """Fetch all active subscribers from Beehiiv"""
    BEEHIIV_API_KEY = os.environ.get("BEEHIIV_API_KEY")
    BEEHIIV_PUB_ID  = os.environ.get("BEEHIIV_PUB_ID")

    if not BEEHIIV_API_KEY or not BEEHIIV_PUB_ID:
        print("   ❌ Beehiiv credentials not set")
        return []

    headers = {
        "Authorization": f"Bearer {BEEHIIV_API_KEY}",
        "Content-Type":  "application/json",
    }

    subscribers = []
    page        = 1
    limit       = 100

    print("   📋 Fetching subscribers from Beehiiv...")

    while True:
        url    = f"https://api.beehiiv.com/v2/publications/{BEEHIIV_PUB_ID}/subscriptions"
        params = {"status": "active", "limit": limit, "page": page}

        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            print(f"   ❌ Failed to fetch subscribers: {response.json()}")
            break

        data  = response.json()
        batch = data.get("data", [])

        for sub in batch:
            email = sub.get("email")
            if email:
                subscribers.append(email)

        print(f"   ✓ Page {page}: {len(batch)} subscribers")

        total = data.get("total_results", 0)
        if page * limit >= total or len(batch) < limit:
            break
        page += 1

    print(f"   ✅ Total subscribers: {len(subscribers)}")
    return subscribers


def send_digest(articles, subscribers):
    """Send daily digest email to all subscribers via Resend"""
    RESEND_API_KEY = os.environ.get("RESEND_API_KEY")

    if not RESEND_API_KEY:
        print("   ❌ RESEND_API_KEY not set")
        return False

    resend.api_key = RESEND_API_KEY

    html    = build_digest_email(articles)
    date    = datetime.now().strftime("%B %d")
    subject = f"CRM Daily Digest — {date}: {len(articles)} new article{'s' if len(articles) > 1 else ''} for you"

    print(f"   📧 Sending digest ({len(articles)} articles) to {len(subscribers)} subscribers...")

    success_count = 0
    fail_count    = 0
    chunk_size    = 50

    for i in range(0, len(subscribers), chunk_size):
        chunk = subscribers[i:i + chunk_size]
        try:
            for email in chunk:
                params = {
                    "from":    "CRM Daily <digest@updates.crmdaily.co>",
                    "to":      [email],
                    "subject": subject,
                    "html":    html,
                    "text":    f"CRM Daily Digest — {date}\n\n" + "\n\n".join([
                        f"{a.get('title','')}\n{a.get('excerpt','')}\nhttps://www.crmdaily.co/article/{a.get('slug','')}"
                        for a in articles
                    ]),
                }
                resend.Emails.send(params)
                success_count += 1

            print(f"   ✓ Sent {min(i + chunk_size, len(subscribers))}/{len(subscribers)}")

        except Exception as e:
            print(f"   ❌ Batch error: {e}")
            fail_count += len(chunk)

    print(f"   ✅ Sent: {success_count} | Failed: {fail_count}")
    return success_count > 0


def run(article):
    print("\n📬 Step 4: Processing newsletter digest...")

    # Save this article to today's digest log
    articles = save_to_digest_log(article)

    current_hour = datetime.now().hour

    # 8am run (UTC 2:30) — just save, don't send yet
    if current_hour < 10:
        print(f"   ⏳ Morning article saved to digest — will send combined digest at 6pm IST")
        print(f"   📰 Digest now has {len(articles)} article(s)")
        return

    # 6pm run (UTC 12:30) — send the full digest with all today's articles
    print(f"   📰 Evening run — sending digest with {len(articles)} article(s)")

    subscribers = get_beehiiv_subscribers()

    if not subscribers:
        print("   ⚠️ No subscribers found — skipping email send")
        return

    success = send_digest(articles, subscribers)

    if success:
        print("   ✅ Daily digest delivered to all subscribers")
        # Clear the digest log after sending
        today = datetime.now().strftime("%Y-%m-%d")
        with open(DIGEST_LOG, "w", encoding="utf-8") as f:
            json.dump({"date": today, "articles": [], "sent": True}, f)
    else:
        print("   ⚠️ Digest send failed — articles still published on site")


if __name__ == "__main__":
    with open("generated_article.json", "r") as f:
        article = json.load(f)
    run(article)