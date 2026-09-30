// Cloudflare Worker: contact form relay for the static portfolio site.
//
// Why: GitHub Pages serves static files only, so there is no server to keep
// the Resend key secret, and nuxt-mail's /api route does not exist there.
// The browser posts JSON here; this worker validates and relays via Resend.
//
// Setup (Cloudflare dashboard > Workers & Pages > Create Worker > paste this):
//   1. Settings > Variables > Secrets: RESEND_API_KEY = re_... (Resend key)
//   2. Settings > Variables > Text: CONTACT_TO = you@example.com
//      (where the messages land), CONTACT_FROM = Portfolio <mail@domain>
//      (must be onboarding@resend.dev on the free plan without a custom
//      domain, or any address of a domain you verified in Resend).
//   3. Deploy, copy the worker URL into the site's CONTACT_API_URL
//      (.env locally, Actions variables for production).

// NOTE: the destination address is intentionally static (CONTACT_TO env).
// Accepting it from the client would turn this worker into an open relay:
// anyone could spend your Resend quota sending mail to arbitrary addresses.
const ALLOWED_ORIGINS = ["https://djom202.github.io"];

const json = (data, status, cors) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });

const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
        ? origin
        : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, cors);
    }

    const name = String(body.name || "").trim().slice(0, 120);
    const from = String(body.from || "").trim().slice(0, 160);
    const subject = String(body.subject || "").trim().slice(0, 160);
    const text = String(body.text || "").trim().slice(0, 5000);

    if (!name || !subject || !text || !isEmail(from)) {
      return json({ error: "Invalid fields" }, 400, cors);
    }
    if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
      return json({ error: "Worker not configured" }, 500, cors);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${from}>\n\n${text}`,
        reply_to: from,
      }),
    });

    if (!res.ok) {
      return json({ error: "Send failed" }, 502, cors);
    }
    return json({ ok: true }, 200, cors);
  },
};
