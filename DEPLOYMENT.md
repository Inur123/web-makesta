# Deployment MAKESTA di `/makesta`

Target produksi:

```text
https://kaderisasi.pelajarnumagetan.or.id/makesta
```

Laravel tetap mendefinisikan route internal seperti `/login` dan
`/dashboard`. Nginx membuang prefix `/makesta` pada request internal ke
Laravel, sedangkan resolver URL Inertia mempertahankan prefix tersebut di
browser. Jangan menambahkan prefix `makesta` lagi ke semua route PHP.

## 1. Kebutuhan server

- PHP 8.3+ dan PHP-FPM
- MySQL 8
- Composer
- Node.js/npm yang kompatibel dengan `package.json`
- Ekstensi PHP standar Laravel serta `zip` untuk arsip sertifikat
- Nginx dengan akses mengubah virtual host

## 2. Penempatan aplikasi

Contoh lokasi:

```text
/var/www/web-makesta
```

Web server hanya boleh melayani direktori `public`. Jangan menjadikan root
proyek sebagai document root.

Salin `.env.production.example` menjadi `.env`, lalu isi `APP_KEY`, database,
dan kredensial Turnstile. Nilai berikut wajib dipertahankan:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://kaderisasi.pelajarnumagetan.or.id/makesta
ASSET_URL=https://kaderisasi.pelajarnumagetan.or.id/makesta
SESSION_COOKIE=makesta_session
SESSION_PATH=/makesta
SESSION_SECURE_COOKIE=true
```

`SESSION_COOKIE` yang khusus dan `SESSION_PATH=/makesta` mencegah bentrok
dengan aplikasi lain pada host yang sama.

## 3. Nginx

Salin isi `deploy/nginx-makesta.conf.example` ke dalam blok `server {}` milik
`kaderisasi.pelajarnumagetan.or.id`. Sesuaikan lokasi proyek dan socket
PHP-FPM, lalu validasi sebelum reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Konfigurasi tersebut mempertahankan request browser `/makesta/...`, tetapi
membuat router Laravel membaca `/...`. Resolver URL Inertia kemudian
menambahkan kembali base path untuk history browser. Dengan begitu route
internal tidak perlu diduplikasi dan URL browser tidak kehilangan `/makesta`.

## 4. Instalasi dan build

Jalankan setelah `.env` produksi selesai dibuat. Hal ini penting karena
Wayfinder membaca `APP_URL` saat build untuk menghasilkan URL ber-prefix.

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan key:generate --force
php artisan migrate --force
php artisan optimize
```

Jika `APP_KEY` sudah digunakan oleh instalasi lama, jangan menjalankan
`key:generate` lagi karena session dan data terenkripsi lama akan tidak bisa
dibaca.

Pastikan proses PHP-FPM dapat menulis ke:

```text
storage/
bootstrap/cache/
```

## 5. Turnstile

Daftarkan hostname berikut pada Cloudflare Turnstile:

```text
kaderisasi.pelajarnumagetan.or.id
```

Turnstile memakai hostname, bukan path `/makesta`. Isi
`VITE_TURNSTILE_SITE_KEY` sebelum `npm run build` dan isi
`TURNSTILE_SECRET_KEY` pada `.env`.

## 6. Pemeriksaan setelah deploy

Uji semua URL dan aksi berikut:

1. `/makesta/` dan `/makesta/login`
2. Login, logout, dan halaman pengaturan
3. `/makesta/dashboard`
4. Daftar kegiatan IPNU dan IPPNU
5. Tambah/edit/hapus kegiatan, materi, peserta, dan nilai
6. Pagination dan perubahan status kegiatan
7. Export Excel
8. Download template serta generate ZIP sertifikat

Jika CSS/JavaScript gagal dimuat, periksa bahwa build dilakukan setelah
`APP_URL` dan `ASSET_URL` produksi diisi, kemudian jalankan ulang
`php artisan optimize`.
