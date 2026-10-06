// Supabase Edge Function: upload-image
// Only a signed-in Firebase ADMIN can upload. The browser sends its Firebase
// ID token; we verify it against Google's public keys, check the UID, then
// upload with the service-role key (which never leaves the server).
//
// Secrets to set (see SUPABASE_SETUP.md):
//   ADMIN_UIDS       comma-separated Firebase UIDs allowed to upload
//   ALLOWED_ORIGINS  comma-separated site origins (CORS), optional
// Auto-injected by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "npm:@supabase/supabase-js@2";
import { createRemoteJWKSet, jwtVerify } from "npm:jose@5";

const FIREBASE_PROJECT_ID = "tyt-cafe-8c2ae";
const BUCKET = "menu-images";
const MAX_BYTES = 5 * 1024 * 1024;

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

const ADMIN_UIDS = (Deno.env.get("ADMIN_UIDS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ??
  "https://tyt-cafe.github.io,http://localhost:8080").split(",").map((s) => s.trim());

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

function corsHeaders(origin: string | null) {
  const ok = origin && ALLOWED_ORIGINS.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

// Decide the real file type from the first bytes, never from the client.
function sniffImage(b: Uint8Array): { ext: string; mime: string } | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { ext: "png", mime: "image/png" };
  if (
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) return { ext: "webp", mime: "image/webp" };
  return null;
}

function stem(name: string) {
  return String(name || "item").toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 40) || "item";
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: "Origin not allowed" }, 403, origin);
  if (ADMIN_UIDS.length === 0) return json({ error: "Server not configured" }, 500, origin);

  // 1) Verify Firebase ID token + admin UID
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Missing token" }, 401, origin);
  let uid: string;
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });
    uid = String(payload.sub);
  } catch {
    return json({ error: "Invalid token" }, 401, origin);
  }
  if (!ADMIN_UIDS.includes(uid)) return json({ error: "Forbidden" }, 403, origin);

  // 2) Validate the file
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES + 64 * 1024) return json({ error: "File too large (max 5MB)" }, 413, origin);
  let form: FormData;
  try { form = await req.formData(); } catch { return json({ error: "Bad request" }, 400, origin); }
  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "No file" }, 400, origin);
  if (file.size === 0 || file.size > MAX_BYTES) return json({ error: "File too large (max 5MB)" }, 413, origin);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return json({ error: "Only JPG, PNG or WEBP images are allowed" }, 415, origin);

  // 3) Upload with a server-generated, unguessable name (no overwrite)
  const rand = crypto.randomUUID().slice(0, 8);
  const path = `${stem(String(form.get("keyHint") ?? ""))}-${Date.now()}-${rand}.${kind.ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType: kind.mime,
    upsert: false,
  });
  if (error) return json({ error: "Upload failed" }, 500, origin);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return json({ url: data.publicUrl }, 200, origin);
});
