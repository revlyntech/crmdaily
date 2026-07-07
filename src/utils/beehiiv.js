// Calls WordPress REST API proxy instead of Beehiiv directly
// This bypasses CORS — WordPress handles the Beehiiv API call server-side
const WP_PROXY_URL = 'https://cms.crmdaily.co/wp-json/crmdaily/v1/subscribe';

export async function subscribeEmail(email) {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Invalid email' };
  }

  try {
    const response = await fetch(WP_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true };
    }

    return { success: false, message: data.message || 'Subscription failed' };

  } catch (error) {
    console.error('Subscribe error:', error);
    return { success: false, message: 'Network error — please try again' };
  }
}