# Nazil & Tiara — ornamen sesuai referensi

Versi ini dibuat dari `wedding-invitation(1).zip` milik pengguna, bukan dari template lain. Ornamen vector original tersimpan di `public/ornaments/`: `floral-arch.svg` dan `gunungan.svg`.

Perubahan hanya pada `Cover.tsx`, `OpeningSection.tsx`, `page.tsx`, `layout.tsx` dan file baru `ornaments.css`; data undangan, foto asli, pemutar musik, formulir RSVP/Wishes dan API Supabase dipertahankan.

## Cara menjalankan
1. Ekstrak ZIP ke folder terpisah.
2. `npm install`
3. `npm run dev`
4. Buka `http://localhost:3000/?to=Eva`
5. Sebelum deploy: `npm run build`.

## Catatan
- Jangan mengunggah `.env.local` ke repositori; isi kredensial Supabase di Vercel Project Settings.
- Tanggal, lokasi, dan nama orang tua masih contoh pada `src/data/wedding.ts`.
- Musik dibaca dari `public/audio/wedding.mp3` milik proyek upload.
- Jika ingin ornamen lebih ringan, ubah `opacity` di `src/app/ornaments.css`.
