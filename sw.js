/* TYT service worker — keeps the site's photos on the phone.
   GitHub Pages only lets browsers cache files for 10 minutes, so on every
   later visit the browser had to re-check all ~120 menu photos with the
   server before showing them (slow on mobile data). This worker answers
   photo requests straight from its own cache instead, and only goes to the
   network the first time. Pages, CSS and JS are NOT cached here, so site
   updates still show up normally.
   Changed or replaced a photo but kept the same file name? Bump VERSION. */
const VERSION = "tyt-img-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith("tyt-img-") && k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* The page sends the photo list once the worker is ready, so photos it
   downloaded before the worker existed (first visit) get stored too.
   They come from the browser's normal cache, so this is cheap. */
self.addEventListener("message", (event) => {
  const urls = (event.data && event.data.type === "cache-images" && Array.isArray(event.data.urls)) ? event.data.urls : [];
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    for (const u of urls.slice(0, 400)) {
      try {
        const url = new URL(u, self.location.origin);
        if (url.origin !== self.location.origin || !url.pathname.startsWith("/images/")) continue;
        const key = url.origin + url.pathname;
        if (await cache.match(key)) continue;
        const res = await fetch(key);
        if (res.ok && res.type === "basic") await cache.put(key, res);
      } catch (_) { /* skip */ }
    }
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/images/")) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const key = url.origin + url.pathname; /* ignore ?r=1 retry suffixes */
    const hit = await cache.match(key);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && res.type === "basic") cache.put(key, res.clone()).catch(() => {});
      return res;
    } catch (err) {
      const stale = await cache.match(key);
      if (stale) return stale;
      throw err;
    }
  })());
});
