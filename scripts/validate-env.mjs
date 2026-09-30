// Validates the env vars required to build the site. Fails with a clear
// message listing every invalid variable. Run: npm run validate
// CI runs it automatically before `npm run generate`.
import fs from "node:fs";

// Minimal .env fallback for local runs (plain `node` does not load .env;
// real environment values always take precedence).
try {
  const raw = fs.readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
} catch {
  // No .env (CI): values must come from the environment.
}

const get = (key) => (process.env[key] || "").trim();
const errors = [];
const warnings = [];

// --- Storyblok token -------------------------------------------------------
const token = get("ACCESSTOKEN");
if (!token) {
  errors.push("ACCESSTOKEN is empty (site renders blank: Storyblok module cannot init).");
}

// --- Region ----------------------------------------------------------------
const region = (get("REGION") || "eu").toLowerCase();
if (!["eu", "us", "cn"].includes(region)) {
  errors.push(`REGION="${get("REGION")}" is invalid (use eu, us or cn, lowercase).`);
}

// --- Base URL ---------------------------------------------------------------
const baseURL = get("BASEURL") || "/";
if (!baseURL.startsWith("/") || !baseURL.endsWith("/")) {
  errors.push(`BASEURL="${get("BASEURL")}" must start and end with "/".`);
}

// --- Contact worker ----------------------------------------------------------
const contactUrl = get("CONTACT_API_URL");
if (!contactUrl) {
  errors.push("CONTACT_API_URL is empty (production form would only simulate sends).");
} else {
  try {
    const url = new URL(contactUrl);
    if (url.protocol !== "https:") {
      errors.push(`CONTACT_API_URL="${contactUrl}" must use https.`);
    }
  } catch {
    errors.push(`CONTACT_API_URL="${contactUrl}" is not a valid URL.`);
  }
}

// --- Live checks (only when static checks pass) -------------------------------
if (errors.length === 0) {
  const host =
    region === "us"
      ? "api-us.storyblok.com"
      : region === "cn"
        ? "app.storyblokchina.cn"
        : "api.storyblok.com";
  try {
    const res = await fetch(`https://${host}/v2/cdn/spaces/me?token=${token}`);
    if (res.status === 401) {
      errors.push(`ACCESSTOKEN rejected by Storyblok (401) for region "${region}".`);
    } else if (!res.ok) {
      errors.push(`Storyblok API check failed (HTTP ${res.status}).`);
    }
  } catch (e) {
    errors.push(`Cannot reach Storyblok API: ${e.message}`);
  }

  // Worker reachability is best-effort: it must answer 405 to GET when alive.
  try {
    const res = await fetch(contactUrl, { method: "GET" });
    if (res.status !== 405) {
      warnings.push(`worker GET returned HTTP ${res.status} (expected 405 when alive).`);
    }
  } catch (e) {
    warnings.push(`worker unreachable: ${e.message}`);
  }
}

for (const w of warnings) console.warn(`warn: ${w}`);
if (errors.length > 0) {
  console.error("ENV validation failed:");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}
console.log("ENV OK: ACCESSTOKEN, REGION, BASEURL, CONTACT_API_URL");
