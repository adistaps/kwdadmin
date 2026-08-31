-- ============================================================
-- Migration: Social Links for Homepage "Follow Us" section
-- Run this in Supabase SQL Editor AFTER schema.sql
-- (safe to run even on a fresh database that already has schema.sql applied)
-- ============================================================

alter table site_settings add column if not exists social_links jsonb not null default '[]'::jsonb;

-- Pre-fill with the platforms already used on the site (edit freely from
-- Admin > Contact Us afterwards). Only runs once — if social_links has
-- already been customized, this does nothing.
update site_settings
set social_links = '[
  {"name": "TikTok", "handle": "@kwd official", "href": "https://www.tiktok.com/@kwdofficialstore"},
  {"name": "Instagram", "handle": "@kwd official", "href": "https://www.instagram.com/kwdpurifiedofficial/?hl=en"},
  {"name": "Facebook", "handle": "@kwd official", "href": "https://www.facebook.com/share/18tMJbwp1F/"},
  {"name": "Threads", "handle": "@kwd official", "href": "https://www.facebook.com/share/18tMJbwp1F/"},
  {"name": "YouTube", "handle": "@kwd official", "href": "https://www.facebook.com/share/18tMJbwp1F/"}
]'::jsonb
where id = 1 and social_links = '[]'::jsonb;

-- Optional label for videos (e.g. "3:45"). Not required — the homepage
-- video card simply omits the duration badge if this is left blank.
alter table media_items add column if not exists duration text;
