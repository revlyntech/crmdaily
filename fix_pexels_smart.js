const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

const oldFn = `def get_pexels_image(title, category):
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
    return get_relevant_image(category)`;

const newFn = `# ── Category-based fallback query pools ──
# Each category has multiple concrete, photographable search terms
CATEGORY_IMAGE_QUERIES = {
    "CRM News": [
        "business meeting office team",
        "sales team laptop discussion",
        "corporate office technology",
        "business professionals conference",
        "team collaboration workspace",
        "office technology dashboard",
    ],
    "GTM Strategy": [
        "business strategy whiteboard planning",
        "sales team meeting discussion",
        "marketing team office growth",
        "business planning charts analytics",
        "team brainstorming office",
        "executive meeting boardroom",
    ],
    "Tool Reviews": [
        "laptop software workspace desk",
        "computer screen dashboard analytics",
        "technology workspace modern office",
        "software developer laptop coding",
        "business tools laptop coffee",
        "clean desk workspace monitor",
    ],
    "RevOps Intelligence": [
        "data analytics dashboard charts",
        "business intelligence graphs office",
        "revenue analytics team meeting",
        "data visualization screen monitor",
        "business metrics performance charts",
        "analytics dashboard professional",
    ],
    "Sales Tech": [
        "sales team technology office",
        "crm software laptop sales",
        "business technology automation",
        "sales meeting presentation team",
        "digital marketing technology screen",
        "sales professional phone laptop",
    ],
    "AI in Sales": [
        "artificial intelligence technology future",
        "robot automation technology",
        "digital transformation business",
        "machine learning data science",
        "technology innovation office",
        "futuristic business technology",
    ],
    "Tool Comparison": [
        "business software comparison laptop",
        "two professionals discussing technology",
        "decision making office meeting",
        "business tools analysis desk",
        "comparing charts graphs office",
        "technology evaluation professional",
    ],
    "Explainer": [
        "business education presentation whiteboard",
        "team learning office discussion",
        "professional explaining strategy board",
        "business concept presentation",
        "office teaching training session",
        "business knowledge sharing team",
    ],
    "Deep Guide": [
        "business guide strategy planning",
        "detailed planning office documents",
        "professional reading business report",
        "strategy roadmap planning meeting",
        "business blueprint planning desk",
        "team working detailed project",
    ],
    "Best Tools": [
        "productivity tools workspace organized",
        "best business software laptop",
        "professional tools technology desk",
        "organized workspace productivity",
        "business efficiency technology",
        "top tools professional office",
    ],
}

def get_claude_image_query(title, category, client):
    """Ask Claude to generate 2-3 concrete, photographable Pexels search terms."""
    try:
        prompt = f"""You are helping find a stock photo for a B2B article.

Article title: "{title}"
Article category: "{category}"

Generate exactly ONE short Pexels search query (3-4 words max) that describes a concrete, photographable business scene relevant to this article.

Rules:
- Use only concrete visual nouns (people, objects, places)
- NEVER use abstract terms like "ICP", "RevOps", "GTM", company names, or acronyms
- Think: what would a photographer actually photograph?
- Examples of GOOD queries: "business meeting whiteboard", "sales team laptops", "office analytics dashboard", "handshake business deal"
- Examples of BAD queries: "ideal customer profile", "HubSpot Salesforce comparison", "revenue operations metrics"

Reply with ONLY the search query, nothing else."""

        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=20,
            messages=[{"role": "user", "content": prompt}]
        )
        query = message.content[0].text.strip().strip('"').strip("'").lower()
        print(f"   Claude image query: '{query}'")
        return query
    except Exception as e:
        print(f"   Claude query error: {e}")
        return None

def search_pexels(query, api_key, used_ids, per_page=30):
    """Search Pexels and return an unused photo URL."""
    try:
        headers = {"Authorization": api_key}
        resp = requests.get(
            "https://api.pexels.com/v1/search",
            headers=headers,
            params={"query": query, "per_page": per_page, "orientation": "landscape", "size": "large"},
            timeout=10
        )
        if resp.status_code == 200:
            photos = resp.json().get("photos", [])
            unused = [p for p in photos if str(p["id"]) not in used_ids]
            if not unused:
                unused = photos  # All used - allow reuse
            if unused:
                photo = random.choice(unused)
                url = photo["src"].get("large2x") or photo["src"].get("large") or photo["src"].get("original")
                save_used_image_id(photo["id"])
                print(f"   Pexels image ID {photo['id']}: {url[:70]}...")
                return url
    except Exception as e:
        print(f"   Pexels search error for '{query}': {e}")
    return None

def get_pexels_image(title, category, client=None):
    """Fetch a unique relevant image from Pexels using Claude-generated queries."""
    try:
        api_key = os.environ.get("PEXELS_API_KEY", "")
        if not api_key:
            print("   No PEXELS_API_KEY found, using Unsplash fallback")
            return get_relevant_image(category)

        used_ids = get_used_image_ids()

        # Layer 1: Claude-generated concrete visual query
        if client:
            claude_query = get_claude_image_query(title, category, client)
            if claude_query and len(claude_query) > 3:
                url = search_pexels(claude_query, api_key, used_ids)
                if url:
                    return url

        # Layer 2: Category-based fallback pool (rotate through multiple queries)
        fallback_queries = CATEGORY_IMAGE_QUERIES.get(category, ["business office professional"])
        # Shuffle to get variety
        shuffled = fallback_queries.copy()
        random.shuffle(shuffled)
        for query in shuffled:
            print(f"   Trying category fallback: '{query}'")
            url = search_pexels(query, api_key, used_ids)
            if url:
                return url

        # Layer 3: Generic business fallback
        for query in ["business team office", "professional workspace laptop", "corporate meeting"]:
            url = search_pexels(query, api_key, used_ids)
            if url:
                return url

    except Exception as e:
        print(f"   Pexels error: {e}")

    # Final fallback to Unsplash
    print("   Falling back to Unsplash")
    return get_relevant_image(category)`;

c = c.replace(oldFn, newFn);

// Update the call to get_pexels_image to pass the client
c = c.replace(
    'article["featured_image_url"] = get_pexels_image(article["title"], article["category"])',
    'article["featured_image_url"] = get_pexels_image(article["title"], article["category"], client)'
);

fs.writeFileSync('automation/writer.py', c, 'utf8');
console.log('Done!');
console.log('Has CATEGORY_IMAGE_QUERIES:', c.includes('CATEGORY_IMAGE_QUERIES'));
console.log('Has get_claude_image_query:', c.includes('get_claude_image_query'));
console.log('Has search_pexels:', c.includes('def search_pexels'));
console.log('Passes client:', c.includes('get_pexels_image(article["title"], article["category"], client)'));