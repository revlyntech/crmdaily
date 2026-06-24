import os
import json
import requests
import resend
from datetime import datetime

def build_email_html(article):
    title    = article.get("title", "New Article from CRM Daily")
    excerpt  = article.get("excerpt", "")
    slug     = article.get("slug", "")
    category = article.get("category", "CRM News")
    date     = datetime.now().strftime("%B %d, %Y")
    url      = f"https://www.crmdaily.co/article/{slug}"
    image    = article.get("featured_image_url", "")

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F2EDE4;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;background:#F2EDE4;padding:32px 24px;">

    <!-- Header -->
    <div style="border-bottom:2px solid #E8521A;padding-bottom:16px;margin-bottom:24px;">
      <span style="font-family:'Courier New',monospace;font-size:18px;color:#0F0E0D;font-weight:bold;">crm<span style="color:#E8521A;">daily</span><span style="color:#E8521A;">•</span></span>
      <p style="font-family:'Courier New',monospace;font-size:9px;color:#9B958F;letter-spacing:0.15em;margin:4px 0 0;">CRM & GTM INTELLIGENCE DAILY</p>
    </div>

    <!-- Label -->
    <p style="font-family:'Courier New',monospace;font-size:10px;color:#E8521A;letter-spacing:0.18em;margin:0 0 8px;">
      // {category.upper()} &nbsp;·&nbsp; {date.upper()}
    </p>

    <!-- Title -->
    <h1 style="font-family:Georgia,serif;font-size:28px;color:#0F0E0D;line-height:1.15;letter-spacing:-0.02em;margin:0 0 16px;">
      {title}
    </h1>

    <!-- Divider -->
    <hr style="border:none;border-top:2px solid #E8521A;margin:0 0 20px;">

    <!-- Featured image -->
    {f'<img src="{image}" alt="{title}" style="width:100%;height:auto;margin:0 0 20px;display:block;border-radius:2px;">' if image else ''}

    <!-- Excerpt -->
    <p style="font-family:Georgia,serif;font-size:16px;color:#6B6560;line-height:1.75;margin:0 0 28px;">
      {excerpt}
    </p>

    <!-- CTA Button -->
    <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
      <tr>
        <td style="background:#E8521A;padding:14px 28px;">
          <a href="{url}" style="font-family:'Courier New',monospace;font-size:12px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;">
            READ FULL ARTICLE →
          </a>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <hr style="border:none;border-top:1px solid rgba(0,0,0,0.1);margin:0 0 20px;">

    <!-- Footer -->
    <p style="font-family:'Courier New',monospace;font-size:9px;color:#9B958F;letter-spacing:0.08em;margin:0 0 8px;">
      CRM DAILY — YOUR DAILY CRM & GTM INTELLIGENCE &nbsp;·&nbsp;
      <a href="https://www.crmdaily.co" style="color:#E8521A;text-decoration:none;">crmdaily.co</a>
    </p>
    <p style="font-family:'Courier New',monospace;font-size:8px;color:#9B958F;letter-spacing:0.06em;margin:0;">
      You're receiving this because you subscribed at crmdaily.co.
      No spam. <a href="https://app.beehiiv.com/unsubscribe" style="color:#9B958F;">Unsubscribe anytime.</a>
    </p>

  </div>
</body>
</html>"""


def get_beehiiv_subscribers():
    """Fetch all active subscribers from Beehiiv"""
    BEEHIIV_API_KEY = os.environ.get("BEEHIIV_API_KEY")
    BEEHIIV_PUB_ID  = os.environ.get("BEEHIIV_PUB_ID")

    if not BEEHIIV_API_KEY or not BEEHIIV_PUB_ID:
        print("   ❌ Beehiiv credentials not set")
        return []

    headers = {
        "Authorization": f"Bearer {BEEHIIV_API_KEY}",
        "Content-Type": "application/json",
    }

    subscribers = []
    page = 1
    limit = 100

    print("   📋 Fetching subscribers from Beehiiv...")

    while True:
        url = f"https://api.beehiiv.com/v2/publications/{BEEHIIV_PUB_ID}/subscriptions"
        params = {
            "status": "active",
            "limit": limit,
            "page": page,
        }

        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            print(f"   ❌ Failed to fetch subscribers: {response.json()}")
            break

        data = response.json()
        batch = data.get("data", [])

        for sub in batch:
            email = sub.get("email")
            if email:
                subscribers.append(email)

        print(f"   ✓ Page {page}: {len(batch)} subscribers")

        # Check if there are more pages
        total = data.get("total_results", 0)
        if page * limit >= total or len(batch) < limit:
            break

        page += 1

    print(f"   ✅ Total subscribers: {len(subscribers)}")
    return subscribers


def send_via_resend(article, subscribers):
    """Send article email to all subscribers via Resend"""
    RESEND_API_KEY = os.environ.get("RESEND_API_KEY")

    if not RESEND_API_KEY:
        print("   ❌ RESEND_API_KEY not set")
        return False

    resend.api_key = RESEND_API_KEY

    title   = article.get("title", "New Article from CRM Daily")
    excerpt = article.get("excerpt", "")
    html    = build_email_html(article)

    print(f"   📧 Sending to {len(subscribers)} subscribers via Resend...")

    success_count = 0
    fail_count    = 0

    # Resend supports batch sending — send in chunks of 50
    chunk_size = 50
    for i in range(0, len(subscribers), chunk_size):
        chunk = subscribers[i:i + chunk_size]
        try:
            for email in chunk:
                params = {
                    "from": "CRM Daily <digest@updates.crmdaily.co>",
                    "to":   [email],
                    "subject": title,
                    "html": html,
                    "text": f"{title}\n\n{excerpt}\n\nRead full article: https://www.crmdaily.co",
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
    print("\n📬 Step 4: Sending newsletter via Resend...")

    # Get subscribers from Beehiiv
    subscribers = get_beehiiv_subscribers()

    if not subscribers:
        print("   ⚠️ No subscribers found — skipping email send")
        print("   ✅ Article still published on site")
        return

    # Send via Resend
    success = send_via_resend(article, subscribers)

    if success:
        print("   ✅ Newsletter delivered to all subscribers")
    else:
        print("   ⚠️ Newsletter send failed — article still published on site")


if __name__ == "__main__":
    with open("generated_article.json", "r") as f:
        article = json.load(f)
    run(article)