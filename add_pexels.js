const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

// ── 1. Add requests import if not there ──
if (!c.includes('import requests')) {
  c = c.replace('import random', 'import random\nimport requests');
}

// ── 2. Replace get_relevant_image with Pexels version -
const oldImageFn = `def get_relevant_image(category, index=0):
    images = TOPIC_IMAGES.get(category, TOPIC_IMAGES["default"])
    chosen = images[index % len(images)]
    print(f"   Image selected for '{category}': {chosen[:50]}...")
    return chosen`;

const newImageFn = `def get_pexels_image(title, category):
    """Fetch a unique relevant image from Pexels based on article title."""
    try:
        api_key = os.environ.get("PEXELS_API_KEY", "")
        if not api_key:
            print("   Pexels API key not found, using Unsplash fallback")
            return get_unsplash_fallback(category)

        # Build search query from title keywords
        # Remove common words, keep meaningful ones
        stop_words = {"a","an","the","and","or","but","in","on","at","to","for","of","with","by","from","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","need","dare","ought","used","what","why","how","when","where","who","which","that","this","these","those","its","it","our","your","their","his","her","my","we","you","they","he","she","i","vs","not","no","all","any","both","each","few","more","most","other","some","such"}
        words = [w for w in title.lower().replace('-',' ').replace(':',' ').split() if w not in stop_words and len(w) > 3]
        search_query = " ".join(words[:4]) if words else category

        print(f"   Searching Pexels for: '{search_query}'")

        headers = {"Authorization": api_key}
        params = {
            "query": search_query,
            "per_page": 15,
            "orientation": "landscape",
            "size": "large"
        }
        response = requests.get("https://api.pexels.com/v1/search", headers=headers, params=params, timeout=10)

        if response.status_code == 200:
            data = response.json()
            photos = data.get("photos", [])
            if photos:
                # Pick a random photo from results for variety
                photo = random.choice(photos)
                url = photo["src"]["large2x"] or photo["src"]["large"]
                print(f"   Pexels image found: {url[:60]}...")
                return url

        # If no results with title, try category keyword
        category_queries = {
            "CRM News": "business technology office",
            "GTM Strategy": "business strategy planning",
            "Tool Reviews": "software laptop technology",
            "RevOps Intelligence": "data analytics dashboard",
            "Sales Tech": "sales technology team",
            "AI in Sales": "artificial intelligence technology",
            "Tool Comparison": "software comparison technology",
            "Explainer": "business education learning",
            "Deep Guide": "business guide strategy",
            "Best Tools": "business tools technology",
        }
        fallback_query = category_queries.get(category, "business technology")
        response2 = requests.get("https://api.pexels.com/v1/search", headers=headers, params={"query": fallback_query, "per_page": 15, "orientation": "landscape"}, timeout=10)
        if response2.status_code == 200:
            photos2 = response2.json().get("photos", [])
            if photos2:
                photo = random.choice(photos2)
                url = photo["src"]["large2x"] or photo["src"]["large"]
                print(f"   Pexels fallback image: {url[:60]}...")
                return url

    except Exception as e:
        print(f"   Pexels error: {e}")

    return get_unsplash_fallback(category)

def get_unsplash_fallback(category):
    """Fallback to Unsplash if Pexels fails."""
    images = TOPIC_IMAGES.get(category, TOPIC_IMAGES["default"])
    chosen = random.choice(images)
    print(f"   Unsplash fallback for '{category}': {chosen[:50]}...")
    return chosen

def get_relevant_image(category, index=0):
    images = TOPIC_IMAGES.get(category, TOPIC_IMAGES["default"])
    chosen = images[index % len(images)]
    print(f"   Image selected for '{category}': {chosen[:50]}...")
    return chosen`;

c = c.replace(oldImageFn, newImageFn);

// ── 3. Update generate_article to use Pexels ──
c = c.replace(
  'article["featured_image_url"] = get_relevant_image(article["category"], hour_index)',
  'article["featured_image_url"] = get_pexels_image(article["title"], article["category"])'
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done!');
console.log('Has get_pexels_image:', c.includes('get_pexels_image'));
console.log('Has requests import:', c.includes('import requests'));
console.log('Uses Pexels in generate_article:', c.includes('get_pexels_image(article["title"]'));