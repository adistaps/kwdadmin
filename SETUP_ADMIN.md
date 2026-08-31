# KWD Purified — Setup Guide (Update: Admin Dashboard + New Pages)

Panduan ini khusus untuk bagian yang baru ditambahkan: Admin Dashboard,
4 halaman publik baru (About, Products, Portfolio, Contact), dan
integrasi Supabase + auto-translate.

## 1. Install dependency baru

Dua package Supabase sudah ditambahkan ke `package.json`. Jalankan:

```bash
npm install
```

## 2. Setup project Supabase

1. Buka project Supabase kamu → **SQL Editor** → **New query**.
2. Copy seluruh isi file `supabase/schema.sql` di repo ini, paste, lalu **Run**.
   Ini akan membuat semua tabel (articles, products, product_images,
   product_categories, media_items, contact_messages, site_settings),
   Row Level Security policy, dan trigger `updated_at`.
3. Buka **Storage** → **Create a new bucket** → beri nama `media` →
   aktifkan **Public bucket**. Ini tempat upload foto/video dari admin
   (upload manual dari Supabase Dashboard, lalu copy Public URL-nya ke
   form admin — tidak ada upload langsung dari UI admin di versi ini).
4. Buat 1 user admin: **Authentication** → **Users** → **Add user** →
   isi email & password. Ini yang dipakai login ke `/admin`.

## 3. Setup translate (opsional, tidak butuh kartu kredit)

Website ini pakai **MyMemory Translation API** — gratis, tanpa daftar
akun, tanpa kartu kredit sama sekali.

- **Tanpa setup apapun**, translate sudah langsung jalan dengan kuota
  5.000 karakter/hari.
- **Opsional:** tambahkan email kamu di `.env.local` (`MYMEMORY_EMAIL`)
  untuk menaikkan kuota jadi ~50.000 karakter/hari. Ini bukan
  pendaftaran — cukup ketik email sebagai parameter, tidak ada proses
  verifikasi apapun.

Untuk pemakaian normal (translate cuma jalan saat admin simpan artikel
atau produk, bukan tiap pengunjung buka halaman), kuota ini biasanya
lebih dari cukup.

## 4. Isi environment variables

Copy `.env.example` menjadi `.env.local`, lalu isi:

```
NEXT_PUBLIC_SUPABASE_URL=          # Project Settings > API > Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Project Settings > API > anon public key
MYMEMORY_EMAIL=                    # opsional — email kamu, untuk kuota lebih besar
```

## 5. Jalankan lokal

```bash
npm run dev
```

- Website publik: `http://localhost:3000/id` (atau `/en`, `/zh`)
- Admin dashboard: `http://localhost:3000/admin/login`

## Yang baru ditambahkan

**Halaman publik baru** (Homepage tidak diubah strukturnya):
- `/about` — About Us
- `/products` — daftar produk + `/products/[slug]` untuk detail
- `/portfolio` — galeri foto & video
- `/contact` — form inquiry + info kontak + peta

**Admin Dashboard** (`/admin`, dilindungi login):
- Kelola Artikel — auto-translate ID → EN/ZH saat disimpan
- Kelola Produk — multi-foto, kategori, auto-translate
- Kelola Foto & Video — untuk galeri Portfolio
- Pesan Masuk — inbox dari form Contact Us
- Contact Us — edit info kontak yang tampil di halaman publik

**Cara kerja auto-translate:** saat artikel/produk disimpan di admin,
sistem otomatis memanggil MyMemory Translation API untuk EN dan ZH,
lalu menyimpan hasilnya permanen ke Supabase. Pengunjung website
**tidak pernah** memicu panggilan API translate — mereka hanya membaca
hasil yang sudah tersimpan sesuai bahasa yang mereka pilih. Ini yang
membuat pemakaian tetap ringan dan gratis.

Teks panjang (isi artikel) otomatis dipecah jadi beberapa bagian kecil
sebelum dikirim ke MyMemory (karena mereka membatasi ±500 karakter per
request), lalu hasilnya digabung kembali otomatis — tidak perlu
campur tangan manual.

Jika translate gagal (API down, dsb), artikel/produk tetap tersimpan
dengan `translation_status: failed` atau `partial` — tinggal centang
"Terjemahkan ulang" di form edit untuk mencoba lagi.

## Catatan teknis

- Upload gambar/video saat ini manual: upload file ke Supabase Storage
  bucket `media` lewat Supabase Dashboard, lalu copy Public URL-nya ke
  form admin. Upload langsung dari UI admin bisa ditambahkan sebagai
  pengembangan lanjutan bila diperlukan.
- Auth admin memakai Supabase Auth (email + password), single user,
  session dikelola otomatis lewat cookie oleh middleware.
- `/admin` route sengaja berada di luar folder `[locale]` — dashboard
  internal, tidak perlu multi-bahasa.
