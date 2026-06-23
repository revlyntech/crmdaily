import os
import json
import requests
from datetime import datetime

BEEHIIV_API_KEY = os.environ["BEEHIIV_API_KEY"]
BEEHIIV_PUB_ID  = os.environ["BEEHIIV_PUB_ID"]

def build_email_content(article):
    """Build branded HTML email content for Beehiiv post"""
    title    = article.get("title", "New Article from CRM Daily")
    excerpt  = article.get("excerpt", "")
    slug     = article.get("slug", "")
    category = article.get("category", "CRM News")
    date     = datetime.now().strftime("%B %d, %Y")
    url      = f"https://www.crmdaily.co/article/{slug}"
    image    = article.get("featured_image_url", "")

    html = f"""
<div style="font-family:'Georgia',serif;max-width:600px;margin:0 auto;background:#F2EDE4;">

  <!-- Top label -->
  <p style="font-family:'Courier New',monospace;font-size:10px;color:#E8521A;letter-spacing:0.18em;margin:0 0 8px;">
    // {category.upper()} &nbsp;·&nbsp; {date.upper()}
  </p>

  <!-- Title -->
  <h1 style="font-family:'Georgia',serif;font-size:32px;color:#0F0E0D;line-height:1.1;letter-spacing:-0.02em;margin:0 0 16px;">
    {title}
  </h1>

  <!-- Divider -->
  <hr style="border:none;border-top:2px solid #E8521A;margin:0 0 20px;">

  <!-- Featured image -->
  {'<img src="' + image + '" alt="' + title + '" style="width:100%;height:auto;margin:0 0 20px;display:block;">' if image else ''}

  <!-- Excerpt -->
  <p style="font-family:'Georgia',serif;font-size:17px;color:#6B6560;line-height:1.75;margin:0 0 28px;">
    {excerpt}
  </p>

  <!-- CTA Button -->
  <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
    <tr>
      <td style="background:#E8521A;padding:14px 28px;">
        <a href="{url}"
          style="font-family:'Courier New',monospace;font-size:12px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;">
          READ FULL ARTICLE →
        </a>
      </td>
    </tr>
  </table>

  <!-- Divider -->
  <hr style="border:none;border-top:1px solid rgba(0,0,0,0.1);margin:0 0 20px;">

  <!-- Footer note -->
  <p style="font-family:'Courier New',monospace;font-size:9px;color:#9B958F;letter-spacing:0.08em;margin:0;">
    CRM DAILY — YOUR DAILY CRM & GTM INTELLIGENCE &nbsp;·&nbsp;
    <a href="https://www.crmdaily.co" style="color:#E8521A;text-decoration:none;">crmdaily.co</a>
  </p>

</div>
"""
    return html

def create_and_send_beehiiv_post(article):
    """Create a post in Beehiiv and send to all subscribers"""

    title   = article.get("title", "New Article from CRM Daily")
    excerpt = article.get("excerpt", "")
    slug    = article.get("slug", "")
    url     = f"https://www.crmdaily.co/article/{slug}"
    html    = build_email_content(article)

    headers = {
        "Authorization": f"Bearer {BEEHIIV_API_KEY}",
        "Content-Type":  "application/json",
    }

    # Step 1 — Create the post
    print("   📝 Creating Beehiiv post...")
    create_url = f"https://api.beehiiv.com/v2/publications/{BEEHIIV_PUB_ID}/posts"

    post_data = {
        "subject_line":    title,
        "preview_text":    excerpt[:150] if excerpt else title,
        "content_json":    {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [{"type": "text", "text": excerpt}]
                }
            ]
        },
        "content_html":    html,
        "content_text":    f"{title}\n\n{excerpt}\n\nRead full article: {url}",
        "status":          "draft",
        "audience":        "free",
        "platform":        "email",
        "send_at":         None,
    }

    response = requests.post(create_url, headers=headers, json=post_data)
    result   = response.json()

    if response.status_code not in [200, 201]:
        print(f"   ❌ Failed to create post: {result}")
        return False

    post_id = result.get("data", {}).get("id")
    print(f"   ✅ Post created — ID: {post_id}")

    # Step 2 — Send the post to all subscribers
    print("   📧 Sending to all subscribers...")
    send_url = f"https://api.beehiiv.com/v2/publications/{BEEHIIV_PUB_ID}/posts/{post_id}/send"

    send_data = {
        "send_to":  "free",   # sends to all free subscribers
        "test":     False,
    }

    send_response = requests.post(send_url, headers=headers, json=send_data)
    send_result   = send_response.json()

    if send_response.status_code in [200, 201, 202]:
        print(f"   ✅ Email sent to all subscribers!")
        return True
    else:
        print(f"   ❌ Failed to send: {send_result}")
        return False

def run(article):
    print("\n📬 Step 4: Sending newsletter via Beehiiv...")
    success = create_and_send_beehiiv_post(article)
    if success:
        print("   ✅ Newsletter delivered to all subscribers")
    else:
        print("   ⚠️ Newsletter send failed — article still published on site")

if __name__ == "__main__":
    with open("generated_article.json", "r") as f:
        article = json.load(f)
    run(article)