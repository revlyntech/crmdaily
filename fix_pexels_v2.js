const fs = require('fs');

let c = fs.readFileSync('automation/writer.py', 'utf8');

const lines = c.split('\n');

let startLine = -1;
let endLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('def get_pexels_image(')) {
    startLine = i;
  }
  if (startLine !== -1 && i > startLine && lines[i].startsWith('def ')) {
    endLine = i;
    break;
  }
}

console.log('Found get_pexels_image at line:', startLine + 1);
console.log('Next function at line:', endLine + 1);

if (startLine === -1) {
  console.log('Function not found!');
  process.exit(1);
}

const newFunction = `def get_claude_image_query(title, category, client):
    """Ask Claude to generate a concrete photographable Pexels search term."""
    try:
        prompt = f"""You are helping find a stock photo for a B2B article.
Article title: "{title}"
Article category: "{category}"
Generate exactly ONE short Pexels search query (3-4 words) describing a concrete photographable business scene.
Rules:
- Only concrete visual nouns (people, objects, places)
- NEVER use abstract terms like ICP, RevOps, GTM, company names, or acronyms
- Good: "business meeting whiteboard", "sales team laptops", "office analytics dashboard"
- Bad: "ideal customer profile", "HubSpot comparison", "revenue operations"
Reply with ONLY the search query, nothing else."""
        msg = client.messages.create(model="claude-sonnet-4-6", max_tokens=15, messages=[{"role":"user","content":prompt}])
        query = msg.content[0].text.strip().strip('"').strip("'").lower()
        print(f"   Claude image query: '{query}'")
        return query
    except Exception as e:
        print(f"   Claude query error: {e}")
        return None

CATEGORY_IMAGE_QUERIES = {
    "CRM News":            ["business meeting office team","sales team laptop discussion","corporate office technology","business professionals conference","team collaboration workspace"],
    "GTM Strategy":        ["business strategy whiteboard planning","sales team meeting discussion","marketing team office growth","business planning charts analytics","team brainstorming office"],
    "Tool Reviews":        ["laptop software workspace desk","computer screen dashboard analytics","technology workspace modern office","software developer laptop coding","clean desk workspace monitor"],
    "RevOps Intelligence": ["data analytics dashboard charts","business intelligence graphs office","revenue analytics team meeting","data visualization screen monitor","business metrics performance charts"],
    "Sales Tech":          ["sales team technology office","crm software laptop sales","business technology automation","sales meeting presentation team","digital marketing technology screen"],
    "AI in Sales":         ["artificial intelligence technology future","robot automation technology","digital transformation business","machine learning data science","technology innovation office"],
    "Tool Comparison":     ["business software comparison laptop","two professionals discussing technology","decision making office meeting","business tools analysis desk","comparing charts graphs office"],
    "Explainer":           ["business education presentation whiteboard","team learning office discussion","professional explaining strategy board","business concept presentation","office teaching training session"],
    "Deep Guide":          ["business guide strategy planning","detailed planning office documents","professional reading business report","strategy roadmap planning meeting","business blueprint planning desk"],
    "Best Tools":          ["productivity tools workspace organized","best business software laptop","professional tools technology desk","organized workspace productivity","business efficiency technology"],
}

def search_pexels_query(query, api_key, used_ids):
    """Search Pexels for one query and return unused photo URL."""
    try:
        headers = {"Authorization": api_key}
        resp = requests.get(
            "https://api.pexels.com/v1/search",
            headers=headers,
            params={"query": query, "per_page": 30, "orientation": "landscape", "size": "large"},
            timeout=10
        )
        if resp.status_code == 200:
            photos = resp.json().get("photos", [])
            unused = [p for p in photos if str(p["id"]) not in used_ids]
            if not unused:
                unused = photos
            if unused:
                photo = random.choice(unused)
                url = photo["src"].get("large2x") or photo["src"].get("large") or photo["src"].get("original")
                save_used_image_id(photo["id"])
                print(f"   Pexels ID {photo['id']}: {url[:60]}...")
                return url
    except Exception as e:
        print(f"   Pexels error for '{query}': {e}")
    return None

def get_pexels_image(title, category, client=None):
    """Fetch unique relevant image using Claude query + category fallback pool."""
    try:
        api_key = os.environ.get("PEXELS_API_KEY", "")
        if not api_key:
            print("   No PEXELS_API_KEY, using Unsplash fallback")
            return get_relevant_image(category)

        used_ids = get_used_image_ids()

        # Layer 1: Claude-generated concrete visual query
        if client:
            claude_query = get_claude_image_query(title, category, client)
            if claude_query and len(claude_query) > 3:
                url = search_pexels_query(claude_query, api_key, used_ids)
                if url:
                    return url

        # Layer 2: Category fallback pool - shuffle for variety
        fallback_queries = CATEGORY_IMAGE_QUERIES.get(category, ["business office professional"])
        shuffled = fallback_queries.copy()
        random.shuffle(shuffled)
        for query in shuffled:
            print(f"   Category fallback: '{query}'")
            url = search_pexels_query(query, api_key, used_ids)
            if url:
                return url

        # Layer 3: Generic business fallback
        for query in ["business team office", "professional workspace laptop", "corporate meeting"]:
            url = search_pexels_query(query, api_key, used_ids)
            if url:
                return url

    except Exception as e:
        print(f"   Pexels error: {e}")

    print("   Falling back to Unsplash")
    return get_relevant_image(category)

`;

// Replace lines from startLine to endLine
const before = lines.slice(0, startLine).join('\n');
const after = lines.slice(endLine).join('\n');
const result = before + '\n' + newFunction + after;

fs.writeFileSync('automation/writer.py', result, 'utf8');

// Verify
const final = fs.readFileSync('automation/writer.py', 'utf8');
console.log('Has CATEGORY_IMAGE_QUERIES:', final.includes('CATEGORY_IMAGE_QUERIES'));
console.log('Has get_claude_image_query:', final.includes('def get_claude_image_query'));
console.log('Has search_pexels_query:', final.includes('def search_pexels_query'));
console.log('Has get_pexels_image:', final.includes('def get_pexels_image'));
console.log('Passes client:', final.includes('get_pexels_image(article["title"], article["category"], client)'));