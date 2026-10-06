# Setting up Supabase Storage for menu image uploads

Firebase Storage now requires the paid Blaze plan even for free-tier usage
(a Google policy change effective February 2026), so image uploads in
`admin.html` have been switched to **Supabase Storage** instead —
genuinely free, no credit card required. Everything else (the menu/offers
database, and the admin login) still runs on Firebase exactly as before;
only the image-upload part moved.

## 1. Create a free Supabase project

1. Go to https://supabase.com and sign up (email or GitHub — no card).
2. Click **New project**. Pick any name (e.g. `tyt-cafe`), set a database
   password (you won't need to remember this — it's not used here), and
   choose the region closest to Egypt (e.g. `eu-central-1` / Frankfurt).
3. Wait ~1–2 minutes while the project is provisioned.

## 2. Create the storage bucket

1. In the left sidebar of your new project, click **Storage**.
2. Click **New bucket**.
3. Name it exactly: `menu-images`
4. Toggle **Public bucket** to ON (so the café website can display the
   photos — this only allows *reading* files, not uploading).
5. Click **Create bucket**.

## 3. Lock the bucket (uploads only through the secure function)

Uploads no longer use the public anon key. They go through the Edge Function
`upload-image`, which checks that you are the signed-in Firebase admin.

In **SQL Editor**, run the contents of `supabase/lock-storage.sql`
(it deletes the old open upload policy and keeps size/type limits).

## 4. Deploy the Edge Function

Needs the Supabase CLI (`npm i -g supabase`) once, from the `tyt-site` folder:

```bash
supabase login
supabase link --project-ref lwboptzpssnvavfoagqq
supabase secrets set ADMIN_UIDS="YOUR_FIREBASE_ADMIN_UID"
supabase secrets set ALLOWED_ORIGINS="https://tyt-cafe.github.io"
supabase functions deploy upload-image --no-verify-jwt
```

- `ADMIN_UIDS`: same UID you put in `firestore.rules`
  (Firebase Console -> Authentication -> Users). Several UIDs: comma-separated.
- `ALLOWED_ORIGINS`: the exact address your site is served from.
- `--no-verify-jwt` is required because the function checks the Firebase
  token itself.

The function checks: Firebase token is valid, UID is an admin, file is
<= 5 MB, real file type (by content) is JPG/PNG/WEBP, and it stores the file
under a random server-made name (no overwriting).

## 5. Test it

Open `admin.html`, log in, upload a photo for a menu item. The image URL
field should fill in automatically. A logged-out request or a non-admin
account gets 401/403.

`admin.html` no longer contains any Supabase key.
