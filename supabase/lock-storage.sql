-- Run once in Supabase -> SQL Editor.
-- Removes the open "anyone with the anon key can upload" policy.
-- After this, ONLY the upload-image Edge Function (service role) can write.
drop policy if exists "anon can insert menu-images" on storage.objects;

-- If you created the older open policy with a different name, list and drop it:
--   select policyname from pg_policies where tablename = 'objects';
--   drop policy "<that name>" on storage.objects;

-- Keep server-side limits as a second layer:
update storage.buckets
set file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg','image/png','image/webp']
where id = 'menu-images';
