# TYT – Take Your Time | Website

A production-ready one-page site for the TYT coffee lounge: hero, brand
experience, about, a full interactive digital menu (search + category
filters), location, contact and footer.

## Why plain HTML/CSS/JS instead of React + Vite

The original spec asked for React/TypeScript/Vite. This build was produced
in a sandboxed environment with no network access, which means `npm
install` can't reach the npm registry there — so a React/Vite project
couldn't actually be installed or verified here. A dependency-free
HTML/CSS/JS site was built instead: it needs no build step, deploys to
Vercel/Netlify as-is, loads faster, and every line was written by hand
(no Tailwind defaults, no component library). If you'd like this rebuilt
as a React + TypeScript + Vite project, that's a very doable follow-up —
just ask, and it can be built and you can `npm install` it on your own
machine where you do have network access.

## Project structure

```
tyt-site/
├── index.html          → all page sections (semantic HTML, SEO/OG tags)
├── css/
│   └── style.css        → design tokens (dark/purple/gold) + all styling
├── js/
│   ├── menu-data.js      → ALL menu content lives here (edit this file only)
│   ├── offers-data.js     → OFFERS content — currently placeholder/demo data, see below
│   └── main.js             → navbar, mobile menu, menu render/search, offers render, scroll reveal
├── images/
│   ├── bean.svg           → decorative hero graphic (already included)
│   ├── logo.png            → your café logo, background removed (already included)
│   ├── favicon.png          → browser tab icon, cropped from the logo (already included)
│   └── about.jpg            → OPTIONAL: add a real photo for the About section
├── admin.html            → Admin Panel (menu/category/offer management, image uploads)
├── firestore.rules       → Firestore database security rules
├── storage.rules         → Firebase Storage security rules (needed for image uploads)
└── README.md
```

## Run it locally

No install needed. From the `tyt-site` folder, run either:

```bash
# Python (built in on most systems)
python3 -m http.server 8080
# then open http://localhost:8080

# or, if you have Node:
npx serve .
```

## Edit the menu

Open `js/menu-data.js`. Every category is an object with a `name` and an
`items` array. To change a price or name, edit the value directly:

```js
{ name: "Latte", price: 65 }
```

To add a new item, add another object to that category's `items` array.
To add a whole new category, copy an existing category block and give it
a unique `id`. The page rebuilds itself from this file automatically —
no other file needs to change.

A few items in the file carry a `note` field. Those flag words on the
original menu photo that weren't fully legible — see "What to double
check" below.

## ⚠️ Edit the offers (placeholder data)

The project files had no existing offers or promo pricing, so `js/offers-data.js`
currently ships with **three temporary sample offers** — clearly marked in
that file's comments as demo data, not real promotions. Before you publish,
open `js/offers-data.js` and either:

- replace the sample entries with your real offers (every field is plain
  text/numbers, no code knowledge needed), or
- delete entries you don't want, or
- set `const OFFERS_DATA = [];` to hide the section's cards entirely (the
  section will show a "No current offers" message instead).

Each offer supports a badge (`SPECIAL OFFER` / `LIMITED TIME`), an old and
new price, a discount tag, an emoji icon or a real photo (`image` field —
drop photos into `/images/offers/` and point to them), and a button label.

## Add images

Your logo (`logo.png`, background removed) and a matching favicon are
already in `/images` and wired up in the navbar, hero, and footer. The only
optional image left is `about.jpg` for the About section — if it's missing,
a tasteful purple gradient placeholder shows instead of a broken image, so
the site is ready to ship without it.

## Menu item photos (Admin Panel uploads)

Every menu item can have its own photo, uploaded straight from the Admin
Panel — no code editing needed. Open `admin.html`, search for or add the
item, click **📤 رفع صورة (Upload Image)**, choose a photo from your
device, and press **حفظ (Save)**. The photo uploads to Firebase Storage,
its URL is saved on that one item's document, and it appears on that
item's card in the live Menu automatically. Each item keeps its own
separate photo — uploading one never affects any other item or category.

**One-time setup required:** Storage needs its own security rules before
uploads will work (separate from `firestore.rules`, which only covers the
database). This repo includes `storage.rules` — publish it once via the
Firebase Console (Storage → Rules → paste contents → Publish) or with the
Firebase CLI (`firebase deploy --only storage`). Until these rules are
published, uploads from the Admin Panel will fail with a permissions
error.

## Update contact info

Open `index.html` and search for the bracketed placeholders — nothing
was invented for these, since none were confirmed:

- `[ADD OPENING HOURS]` — appears twice (contact card + footer). This is the only placeholder left — opening hours were never provided.

Phone numbers (010 9026 4649 / 010 9292 3000), the address (10th of
Ramadan – Neighborhood 32 – Mobil Station), the Facebook profile, the
Instagram profile, and the exact Google Maps pin are all filled in with
real values, in both the contact card and the footer where applicable.

### The "الموقع على الخريطة" (map) button

Points directly at the exact Google Maps place link you provided
(`index.html`, the `directionsBtn` link in the Location section) — not a
text search, the precise pinned location.

## Deploy to Vercel

1. Push this folder to a GitHub repo (or drag-and-drop it into Vercel's dashboard).
2. In Vercel, click **New Project** → import the repo.
3. Framework preset: **Other** (it's static — no build command needed).
4. Deploy. Done.

## Deploy to Netlify

1. Drag the `tyt-site` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop), **or**
2. Connect the GitHub repo → build command: *(leave blank)* → publish directory: `.`

## Connect a custom domain (later)

Both Vercel and Netlify have a **Domains** tab in the project settings —
add your domain there and follow the DNS records they give you (usually
one A record or CNAME, and it's live in a few minutes to a few hours).

---

## What to double-check on the menu

A handful of words on the printed menu photo weren't fully legible. Rather
than guess, these were flagged in `js/menu-data.js` (search for `note:`)
and are listed here too:

1. **TYT Caffè** (Hot Coffee, 85 EGP) — its description was split across
   two lines on the menu; the ingredient order shown is a best-effort read.
2. **Cake Shake** (Milkshakes, 105 EGP) — menu says it includes "a dessert
   of your choice" but doesn't list which desserts are options.
3. **TYT Frappé** (Coffee Frappé, 105 EGP) — one flavor word in the
   description wasn't clearly legible, so it was left out rather than
   guessed.
4. **Cherry Cola** (Soda, 85 EGP) — the second ingredient word was
   unclear; shown as "cola," the most likely reading.

Everything else — every name, description, and price across all 12
categories — was transcribed directly from the menu photo with nothing
added, removed, or invented.
