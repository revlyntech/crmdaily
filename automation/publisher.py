import requests
import json
import os
import base64

WP_URL = "https://cms.crmdaily.co"
WP_USER = "rishhsoni@gmail.com"

def get_auth_header():
    wp_password = os.environ["WP_APP_PASSWORD"]
    credentials = f"{WP_USER}:{wp_password}"
    token = base64.b64encode(credentials.encode()).decode("utf-8")
    return {"Authorization": f"Basic {token}"}

def get_or_create_category(name, headers):
    response = requests.get(f"{WP_URL}/wp-json/wp/v2/categories", params={"search": name}, headers=headers)
    categories = response.json()
    if categories and isinstance(categories, list) and len(categories) > 0:
        return categories[0]["id"]
    response = requests.post(f"{WP_URL}/wp-json/wp/v2/categories", headers={**headers, "Content-Type": "application/json"}, json={"name": name, "slug": name.lower().replace(" ", "-")})
    return response.json().get("id", 1)

def get_or_create_tags(tag_names, headers):
    tag_ids = []
    for name in tag_names:
        response = requests.get(f"{WP_URL}/wp-json/wp/v2/tags", params={"search": name}, headers=headers)
        tags = response.json()
        if tags and isinstance(tags, list) and len(tags) > 0:
            tag_ids.append(tags[0]["id"])
        else:
            response = requests.post(f"{WP_URL}/wp-json/wp/v2/tags", headers={**headers, "Content-Type": "application/json"}, json={"name": name, "slug": name.lower().replace(" ", "-")})
            new_tag = response.json()
            if "id" in new_tag:
                tag_ids.append(new_tag["id"])
    return tag_ids

def upload_featured_image(image_url, title, headers):
    try:
        img_response = requests.get(image_url, timeout=10)
        if img_response.status_code != 200:
            print(f"   ⚠️ Could not download image: {image_url}")
            return None
        content_type = img_response.headers.get("Content-Type", "image/jpeg")
        ext = "jpg" if "jpeg" in content_type else content_type.split("/")[-1]
        filename = f"{title[:50].replace(' ', '-').lower()}.{ext}"
        upload_headers = {**headers, "Content-Type": content_type, "Content-Disposition": f'attachment; filename="{filename}"'}
        upload_response = requests.post(f"{WP_URL}/wp-json/wp/v2/media", headers=upload_headers, data=img_response.content, timeout=30)
        if upload_response.status_code in [200, 201]:
            media_id = upload_response.json().get("id")
            print(f"   ✅ Image uploaded — ID: {media_id}")
            return media_id
        else:
            print(f"   ⚠️ Image upload failed: {upload_response.status_code}")
            return None
    except Exception as e:
        print(f"   ⚠️ Image error: {e}")
        return None

def publish_article(article):
    headers = get_auth_header()
    category_id = get_or_create_category(article["category"], headers)
    tag_ids = get_or_create_tags(article["tags"], headers)

    featured_media_id = None
    if article.get("featured_image_url"):
        print(f"   📸 Uploading featured image...")
        featured_media_id = upload_featured_image(article["featured_image_url"], article["title"], headers)

    post_data = {
        "title":      article["title"],
        "content":    article["content"],
        "excerpt":    article["excerpt"],
        "status":     "publish",
        "categories": [category_id],
        "tags":       tag_ids,
    }
    if featured_media_id:
        post_data["featured_media"] = featured_media_id

    response = requests.post(
        f"{WP_URL}/wp-json/wp/v2/posts",
        headers={**headers, "Content-Type": "application/json"},
        json=post_data
    )

    result = response.json()

    if response.status_code in [200, 201]:
        # Extract slug from WordPress response and add to article
        wp_slug = result.get("slug", "")
        article["slug"] = wp_slug  # ← this fixes the email URL

        print(f"✅ Published: {article['title']}")
        print(f"   URL: {result.get('link', 'N/A')}")
        print(f"   ID: {result.get('id', 'N/A')}")
        print(f"   Slug: {wp_slug}")
        return True
    else:
        print(f"❌ Failed: {result}")
        return False

if __name__ == "__main__":
    with open("generated_article.json", "r") as f:
        article = json.load(f)
    publish_article(article)