# Nazil & Tiara — panduan musik dan Vercel

## Musik
1. Siapkan lagu MP3 yang memiliki hak penggunaan untuk website publik.
2. Simpan sebagai `public/audio/wedding.mp3`.
3. Musik dicoba diputar saat pengunjung menekan **Buka Undangan**; tombol ♪ / ♫ muncul di pojok kanan bawah dan bisa digunakan untuk play/pause.
4. Jika file belum ada, website tetap bisa dibuka. Tombol musik tidak bisa memainkan audio sebelum MP3 ditambahkan.

## Pengujian sebelum deploy
```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
```
Pastikan `.env.local` berisi `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` agar RSVP dan Wishes berfungsi. Di Vercel, atur kedua nilai lewat Project Settings > Environment Variables. Jangan commit kunci rahasia.

## Perbaikan build
- Menyamakan komponen lama dengan `wedding.ts` (`dateISO`, `groomFull`, `brideFull`, `location`).
- Menghilangkan `setState` sinkron dalam effect untuk membaca nama tamu, memakai `useSyncExternalStore`.
- Menghindari efek setState sinkron pada countdown.
- Menghapus loader Turbopack CSS custom; Tailwind tetap dari `@import "tailwindcss"`.
- Tidak mengubah routes API, Supabase schema, foto, animasi atau galeri.

**Tanggal 20 Juni 2027 dan lokasi masih placeholder.** Ganti sebelum publish.
