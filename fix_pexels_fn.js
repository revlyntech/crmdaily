const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

// Add requests import if missing
if (!c.includes('import requests')) {
  c = c.replace('import random', 'import random\nimport requests');
}

// Add USED_IMAGES_LOG constant if missing
if (!c.includes('USED_IMAGES_LOG')) {
  c = c.replace(
    'CATEGORY_LOG = "category_log.json"',
    'CATEGORY_LOG = "category_log.json"\nUSED_IMAGES_LOG = "used_images.json"'
  );
}

// Add get_pexels_image function before get_relevant_image
const pexelsFunction = `
def get_used_image_ids():
    """Load list of recently used Pexels image IDs."""
    try:
        with open(USED_IMAGES_LOG, "r") as f:
            data = json.load(f)
            return data.get("pexels_ids", [])
    except Exception:
        return []

def save_used_image_id(image_id):
    """Save a Pexels image ID to prevent reuse."""
    try:
        try:
            with open(USED_IMAGES_LOG, "r") as f:
                data = json.load(f)
        except Exception:
            data = {}
        if "pexels_ids" not in data:
            data["pexels_ids"] = []
        if image_id not in data["pexels_ids"]:
            data["pexels_ids"].append(str(image_id))
        # Keep last 200 used IDs
        data["pexels_ids"] = data["pexels_ids"][-200:]
        with open(USED_IMAGES_LOG, "w") as f:
            json.dump(data, f)
    except Exception as e:
        print(f"   Could not save image ID: {e}")

def get_pexels_image(title, category):
    """Fetch a unique relevant image from Pexels - never repeats."""
    try:
        api_key = os.environ.get("PEXELS_API_KEY", "")
        if not api_key:
            print("   No PEXELS_API_KEY found, using Unsplash fallback")
            return get_relevant_image(category)

        used_ids = get_used_image_ids()

        # Build search query from title keywords
        stop_words = {"a","an","the","and","or","but","in","on","at","to","for","of","with","by","from","is","are","was","were","be","been","have","has","had","do","does","will","would","could","should","what","why","how","when","where","who","which","that","this","vs","not","all","any"}
        words = [w for w in title.lower().replace('-',' ').replace(':',' ').replace('?',' ').split() if w not in stop_words and len(w) > 3]
        search_query = " ".join(words[:4]) if words else category

        # Category fallback queries
        category_queries = {
            "CRM News": "business technology meeting",
            "GTM Strategy": "business strategy growth",
            "Tool Reviews": "software laptop workspace",
            "RevOps Intelligence": "data analytics dashboard",
            "Sales Tech": "sales team technology",
            "AI in Sales": "artificial intelligence future",
            "Tool Comparison": "software comparison technology",
            "Explainer": "business education learning",
            "Deep Guide": "business planning strategy",
            "Best Tools": "productivity tools technology",
        }

        headers = {"Authorization": api_key}

        # Try title-based search first, then category fallback
        for query in [search_query, category_queries.get(category, "business technology")]:
            print(f"   Searching Pexels: '{query}'")
            try:
                resp = requests.get(
                    "https://api.pexels.com/v1/search",
                    headers=headers,
                    params={"query": query, "per_page": 30, "orientation": "landscape", "size": "large"},
                    timeout=10
                )
                if resp.status_code == 200:
                    photos = resp.json().get("photos", [])
                    # Filter out already used images
                    unused = [p for p in photos if str(p["id"]) not in used_ids]
                    if not unused:
                        unused = photos  # All used - reset and reuse
                    if unused:
                        photo = random.choice(unused)
                        url = photo["src"].get("large2x") or photo["src"].get("large") or photo["src"].get("original")
                        save_used_image_id(photo["id"])
                        print(f"   Pexels image ID {photo['id']}: {url[:70]}...")
                        return url
            except Exception as e:
                print(f"   Pexels search error: {e}")
                continue

    except Exception as e:
        print(f"   Pexels error: {e}")

    # Final fallback to Unsplash
    print("   Falling back to Unsplash")
    return get_relevant_image(category)

`;

// Insert before get_relevant_image
c = c.replace(
  'def get_relevant_image(category, index=0):',
  pexelsFunction + 'def get_relevant_image(category, index=0):'
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done!');
console.log('Has get_pexels_image:', c.includes('def get_pexels_image'));
console.log('Has save_used_image_id:', c.includes('save_used_image_id'));
console.log('Has requests import:', c.includes('import requests'));
console.log('Calls get_pexels_image:', c.includes('get_pexels_image(article["title"]'));