// This route has never existed in the codebase, even though wordpress.js
// and sitemap.js both reference "https://www.crmdaily.co/api/graphql" as
// if it were a real proxy endpoint. Every client-side call to getPosts()
// (Ticker.jsx, and any other 'use client' component) has been failing
// with "TypeError: Failed to fetch" because the browser was making a
// cross-origin request to a URL with no handler behind it - the browser
// blocks reading a response with no CORS headers, which surfaces as
// exactly this error.
//
// This route fixes it at the root: the browser now calls this same-origin
// /api/graphql path (no CORS issue possible), and this server-side
// handler forwards the request on to the real WordPress GraphQL endpoint,
// then returns the result back to the browser.

const WP_GRAPHQL_URL = 'https://cms.crmdaily.co/graphql';

export async function POST(request) {
  try {
    const body = await request.text();

    const wpResponse = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
    });

    const data = await wpResponse.text();

    return new Response(data, {
      status: wpResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('api/graphql proxy error:', err.message);
    return new Response(
      JSON.stringify({ errors: [{ message: 'Failed to reach WordPress' }] }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
