// Cloudflare Pages Function: /api/waitlist
export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const email = data.email?.trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const entry = {
      email,
      tier: data.tier || 'general',
      role: data.role || 'student',
      target: data.target || '',
      submittedAt: new Date().toISOString()
    };

    // Without the KV binding the signup would vanish silently, so refuse instead of faking success.
    if (!env?.WAITLIST_KV) {
      return new Response(JSON.stringify({ error: 'Waitlist storage is not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.WAITLIST_KV.put(`waitlist:${email}`, JSON.stringify(entry));

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully reserved your priority spot in the alpha rollout.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
