-- ============================================================
-- KWD Purified — Database Schema
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- Enable UUID generator (usually already on in Supabase)
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- ARTICLES
-- ------------------------------------------------------------
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_id text not null,
  title_en text,
  title_zh text,
  excerpt_id text,
  excerpt_en text,
  excerpt_zh text,
  content_id text not null,
  content_en text,
  content_zh text,
  hero_image text,
  published boolean not null default true,
  show_on_home boolean not null default false,
  translation_status text not null default 'pending', -- pending | done | failed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PRODUCT CATEGORIES (simple, editable via admin later if needed)
-- ------------------------------------------------------------
create table if not exists product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_id text not null,
  name_en text,
  name_zh text,
  sort_order int not null default 0
);

-- ------------------------------------------------------------
-- PRODUCTS
-- ------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_id uuid references product_categories(id) on delete set null,
  name_id text not null,
  name_en text,
  name_zh text,
  description_id text,
  description_en text,
  description_zh text,
  specification_id text,
  specification_en text,
  specification_zh text,
  is_new boolean not null default false,
  published boolean not null default true,
  show_on_home boolean not null default false,
  translation_status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product images (multiple photos per product)
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PORTFOLIO / GALLERY (photos & videos)
-- ------------------------------------------------------------
create table if not exists media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'photo', -- photo | video
  title_id text,
  title_en text,
  title_zh text,
  category text, -- e.g. residential, commercial, hospitality
  media_url text not null,      -- image url, or video url/embed
  thumbnail_url text,           -- for videos
  duration text,                -- e.g. "3:45", videos only, optional
  sort_order int not null default 0,
  published boolean not null default true,
  show_on_home boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- CONTACT MESSAGES (incoming inquiries from the public site)
-- ------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new', -- new | read | replied | archived
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- SITE SETTINGS (contact info, single row)
-- ------------------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  address text,
  phone text,
  email text,
  operational_hours text,
  map_embed_url text,
  whatsapp_number text,
  social_links jsonb not null default '[]'::jsonb,
  constraint single_row check (id = 1)
);

insert into site_settings (id, address, phone, email, operational_hours, whatsapp_number)
values (1, '', '', '', '', '')
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- updated_at auto-update trigger
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_articles_updated_at on articles;
create trigger trg_articles_updated_at before update on articles
  for each row execute function set_updated_at();

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at before update on products
  for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- Public can READ published content. Only authenticated admin can write.
-- ------------------------------------------------------------
alter table articles enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_categories enable row level security;
alter table media_items enable row level security;
alter table contact_messages enable row level security;
alter table site_settings enable row level security;

-- Public read access (published only)
create policy "public read published articles" on articles
  for select using (published = true);
create policy "public read published products" on products
  for select using (published = true);
create policy "public read product images" on product_images
  for select using (true);
create policy "public read categories" on product_categories
  for select using (true);
create policy "public read published media" on media_items
  for select using (published = true);
create policy "public read settings" on site_settings
  for select using (true);

-- Public can INSERT contact messages (submitting the form), but not read/update
create policy "public insert contact messages" on contact_messages
  for insert with check (true);

-- Authenticated admin: full access to everything
create policy "admin full access articles" on articles
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access product_images" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access categories" on product_categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access media" on media_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access contact_messages" on contact_messages
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access settings" on site_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- Storage bucket for images/videos (run once)
-- Go to Storage > Create bucket named "media", set Public = true
-- Or uncomment below if you prefer SQL (requires storage extension, usually enabled by default):
-- insert into storage.buckets (id, name, public) values ('media', 'media', true)
-- on conflict (id) do nothing;

-- ------------------------------------------------------------
-- Seed default product categories (optional, edit as needed)
-- ------------------------------------------------------------
insert into product_categories (slug, name_id, name_en, name_zh, sort_order) values
  ('eps-sandwich-panel', 'Panel Sandwich EPS', 'EPS Sandwich Panel', 'EPS 夹芯板', 1),
  ('rockwool-sandwich-panel', 'Panel Sandwich Rockwool', 'Rockwool Sandwich Panel', '岩棉夹芯板', 2),
  ('prefab', 'Rumah Prefab', 'Prefab House', '预制房屋', 3)
on conflict (slug) do nothing;
