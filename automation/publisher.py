import requests
import json
import os
import base64

WP_URL  = "https://cms.crmdaily.co"
WP_USER = "rishhsoni@gmail.com"

def get_auth_header():
    wp_password  = os.environ["WP_APP_PASSWORD"]
    credentials  = f"{WP_USER}:{wp_password}"
    token        = base64.b64encode(credentials.encode()).decode("utf-8")
    return {"Authorization": f"Basic {token}"}

def get_or_create_category(name, headers):
    response   = requests.get(f"{WP_URL}/wp-json/wp/v2/categories", params={"search": name}, headers=headers)
    categories = response.json()
    if categories and isinstance(categories, list) and len(categories) > 0:
        return categories[0]["id"]
    response = requests.post(
        f"{WP_URL}/wp-json/wp/v2/categories",
        headers={**headers, "Content-Type": "application/json"},
        json={"name": name, "slug": name.lower().replace(" ", "-")}
    )
    return response.json().get("id", 1)

def get_or_create_tags(tag_names, headers):
    tag_ids = []
    for name in tag_names:
        response = requests.get(f"{WP_URL}/wp-json/wp/v2/tags", params={"search": name}, headers=headers)
        tags     = response.json()
        if tags and isinstance(tags, list) and len(tags) > 0:
            tag_ids.append(tags[0]["id"])
        else:
            response = requests.post(
                f"{WP_URL}/wp-json/wp/v2/tags",
                headers={**headers, "Content-Type": "application/json"},
                json={"name": name, "slug": name.lower().replace(" ", "-")}
            )
            new_tag = response.json()
            if "id" in new_tag:
                tag_ids.append(new_tag["id"])
    return tag_ids

def upload_featured_image(image_url, title, alt_text, headers):
    try:
        img_response = requests.get(image_url, timeout=10)
        if img_response.status_code != 200:
            print(f"   Could not download image: {image_url}")
            return None
        content_type = img_response.headers.get("Content-Type", "image/jpeg")
        ext          = "jpg" if "jpeg" in content_type else content_type.split("/")[-1]
        filename     = f"{title[:50].replace(' ', '-').lower()}.{ext}"
        upload_headers = {
            **headers,
            "Content-Type":        content_type,
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
        upload_response = requests.post(
            f"{WP_URL}/wp-json/wp/v2/media",
            headers=upload_headers,
            data=img_response.content,
            timeout=30
        )
        if upload_response.status_code in [200, 201]:
            media_data = upload_response.json()
            media_id   = media_data.get("id")
            print(f"   Image uploaded - ID: {media_id}")

            # Set alt text on the media item
            if alt_text and media_id:
                requests.post(
                    f"{WP_URL}/wp-json/wp/v2/media/{media_id}",
                    headers={**headers, "Content-Type": "application/json"},
                    json={"alt_text": alt_text}
                )
                print(f"   Alt text set: {alt_text[:60]}")

            return media_id
        else:
            print(f"   Image upload failed: {upload_response.status_code}")
            return None
    except Exception as e:
        print(f"   Image error: {e}")
        return None

def set_yoast_seo(post_id, article, headers):
    """Set Yoast SEO meta fields via WP REST API post meta."""
    meta_fields = {}

    if article.get("focus_keyword"):
        meta_fields["_yoast_wpseo_focuskw"]   = article["focus_keyword"]
    if article.get("seo_title"):
        meta_fields["_yoast_wpseo_title"]     = article["seo_title"]
    if article.get("seo_meta_description"):
        meta_fields["_yoast_wpseo_metadesc"]  = article["seo_meta_description"]

    # Also set Rank Math fields as fallback
    if article.get("focus_keyword"):
        meta_fields["rank_math_focus_keyword"] = article["focus_keyword"]
    if article.get("seo_meta_description"):
        meta_fields["rank_math_description"]   = article["seo_meta_description"]

    if not meta_fields:
        return

    response = requests.post(
        f"{WP_URL}/wp-json/wp/v2/posts/{post_id}",
        headers={**headers, "Content-Type": "application/json"},
        json={"meta": meta_fields}
    )

    if response.status_code in [200, 201]:
        print(f"   SEO meta saved - Focus keyword: {article.get('focus_keyword', '')}")
        print(f"   SEO title: {article.get('seo_title', '')[:60]}")
        print(f"   Meta desc: {article.get('seo_meta_description', '')[:60]}...")
    else:
        print(f"   SEO meta save failed: {response.status_code} - {response.text[:100]}")

def publish_article(article):
    headers          = get_auth_header()
    category_id      = get_or_create_category(article["category"], headers)
    tag_ids          = get_or_create_tags(article["tags"], headers)
    featured_media_id = None

    if article.get("featured_image_url"):
        print(f"   Uploading featured image...")
        alt_text = article.get("alt_text", article["title"])
        featured_media_id = upload_featured_image(
            article["featured_image_url"],
            article["title"],
            alt_text,
            headers
        )

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
        post_id  = result.get("id")
        wp_slug  = result.get("slug", "")
        article["slug"] = wp_slug

        print(f"Published: {article['title']}")
        print(f"   WP Post ID: {post_id}")
        print(f"   Slug: {wp_slug}")

        # Save SEO meta fields
        if post_id:
            set_yoast_seo(post_id, article, headers)

        return result
    else:
        print(f"Publish failed: {response.status_code}")
        print(response.text[:300])
        return None

def main():
    print("Loading generated article...")
    with open("generated_article.json", "r", encoding="utf-8") as f:
        article = json.load(f)

    print(f"Publishing: {article['title']}")
    result = publish_article(article)

    if result:
        print("Done! Article published successfully.")
    else:
        print("Failed to publish article.")

if __name__ == "__main__":
    main()