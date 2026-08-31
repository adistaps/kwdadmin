-- ============================================================
-- Migration: Homepage CMS — manual curation flags
-- Run this in Supabase SQL Editor (safe on top of schema.sql +
-- migration_homepage_integration.sql)
-- ============================================================

alter table articles add column if not exists show_on_home boolean not null default false;
alter table products add column if not exists show_on_home boolean not null default false;
alter table media_items add column if not exists show_on_home boolean not null default false;

-- Optional: pre-select the 3 most recent published articles / 6 products /
-- 2 videos so the homepage isn't empty right after migrating. Safe to skip
-- or adjust manually afterwards from Admin > Homepage.
update articles set show_on_home = true
where id in (
  select id from articles where published = true order by created_at desc limit 3
);

update products set show_on_home = true
where id in (
  select id from products where published = true order by created_at desc limit 6
);

update media_items set show_on_home = true
where id in (
  select id from media_items where type = 'video' and published = true order by created_at desc limit 2
);
