<p align="center">
  <img src="public/images/logo-makesta-2.png" alt="Logo MAKESTA" width="180">
</p>

<h1 align="center">MAKESTA — Masa Kesetiaan Anggota</h1>

<p align="center">
  Sistem Informasi Pendataan Masa Kesetiaan Anggota (MAKESTA)<br>
  IPNU & IPPNU Kabupaten Magetan
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MAKESTA-2026-green?style=flat-square" alt="MAKESTA 2026">
  <img src="https://img.shields.io/badge/Laravel-13-red?style=flat-square&logo=laravel" alt="Laravel 13">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL 8">
  <img src="https://img.shields.io/badge/Inertia.js-3-purple?style=flat-square" alt="Inertia.js 3">
</p>

---

## 🖥 Tentang Sistem

Sistem ini adalah aplikasi *Single Page Application* (SPA) untuk mengelola seluruh proses pendataan kegiatan **Masa Kesetiaan Anggota (MAKESTA)** IPNU dan IPPNU di tingkat Pimpinan Cabang Kabupaten Magetan.

Sistem ini memastikan pendataan peserta, input nilai per-materi, perhitungan indeks & predikat otomatis, hingga pembuatan sertifikat `.docx` berjalan secara terpusat, modern, dan sangat cepat tanpa adanya *page reload*.

🔗 **URL Rencana:** [kaderisasi.pelajarnumagetan.or.id/makesta](https://kaderisasi.pelajarnumagetan.or.id/makesta)

---

## ✨ Fitur Utama

- **Multi-Organisasi (IPNU & IPPNU):**
  - Satu sistem untuk dua organisasi, dipisahkan melalui segmen URL (`/ipnu/...` dan `/ippnu/...`).
  - Data kegiatan dan peserta masing-masing organisasi sepenuhnya terpisah.

- **Manajemen Kegiatan:**
  - CRUD kegiatan MAKESTA lengkap (nama, tanggal, penanggung jawab, instruktur).
  - Status pendataan: *Proses Pendataan* ↔ *Pendataan Selesai*.

- **Pendataan Peserta:**
  - Input peserta dengan fitur **Simpan & Tambah Lagi** untuk entri data massal.
  - Data lengkap: biodata, asal sekolah, NIR, NIA, alamat, No HP.

- **Penilaian & Indeks Otomatis:**
  - Input nilai per-materi untuk setiap peserta.
  - Perhitungan indeks otomatis (A/B/C/D/E) berdasarkan rentang nilai.
  - Predikat akhir dihitung dari rata-rata seluruh nilai materi.

- **Sertifikat `.docx` Otomatis:**
  - Generate sertifikat Word (`.docx`) berbasis template menggunakan PHPWord.
  - Preview 1 peserta atau generate seluruh peserta sekaligus dalam arsip ZIP.
  - Format nomor surat otomatis 3-digit (001, 002, ...).
  - Kustomisasi: nomor surat, tanggal Masehi/Hijriah, tanda tangan, kop surat.

- **Export Excel:**
  - Export seluruh data peserta beserta nilai ke format Excel (`.xlsx`).

- **Dashboard Ringkasan:**
  - Statistik total kegiatan, peserta, dan progress per organisasi.
  - Tabel kegiatan terbaru dengan status real-time.

---

## 🚀 Rilis Saat Ini

Versi stabil terbaru adalah **v1.0.0 — Rilis Perdana MAKESTA**.

Rilis ini mencakup seluruh fitur inti: manajemen kegiatan, pendataan peserta, penilaian & indeks otomatis, pembuatan sertifikat `.docx`, export Excel, dan dashboard ringkasan untuk IPNU & IPPNU.

---

## 🧰 Teknologi

- **PHP 8.3** dan **Laravel 13**
- **React 19**, **TypeScript 5**, **Inertia.js 3**, dan **Tailwind CSS 4**
- **MySQL 8** untuk basis data
- **shadcn/ui** dan **Radix UI** untuk komponen antarmuka
- **PHPWord** untuk pembuatan sertifikat `.docx`
- **Maatwebsite Excel** untuk export data ke `.xlsx`
- **Laravel Fortify** untuk autentikasi

Ekstensi PHP `zip` diperlukan untuk menghasilkan arsip ZIP sertifikat.

---

## ⚙️ Instalasi & Pengembangan

```bash
# 1. Clone repositori
git clone https://github.com/Inur123/web-makesta.git
cd web-makesta

# 2. Install dependensi
composer install
pnpm install   # atau: npm install

# 3. Konfigurasi environment
cp .env.example .env
php artisan key:generate

# 4. Sesuaikan koneksi database di .env
# DB_CONNECTION=mysql
# DB_DATABASE=makesta
# ...

# 5. Jalankan migrasi & seeder
php artisan migrate --seed

# 6. Build frontend
pnpm run build   # atau: npm run build

# 7. Jalankan server
php artisan serve
```

---

## 📁 Struktur Proyek

```
web-makesta/
├── app/
│   ├── Helpers/          # NilaiHelper (logika indeks A-E)
│   ├── Http/Controllers/ # KegiatanController, PesertaController, dll.
│   └── Models/           # Kegiatan, Peserta, Materi, Nilai (UUID)
├── database/migrations/  # Skema tabel dengan UUID
├── resources/js/
│   ├── components/       # shadcn/ui components
│   ├── layouts/          # App layout (sidebar)
│   └── pages/            # Dashboard, Kegiatan, Peserta, dll.
├── storage/app/templates/ # Template sertifikat .docx
└── public/images/         # Logo MAKESTA
```

---

## 👥 Kontributor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Inur123">
        <img src="https://github.com/Inur123.png" width="80" style="border-radius:50%"><br>
        <sub><b>M. Zainur Roziqin</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 📄 Lisensi

Proyek ini bersifat **privat** dan dikembangkan untuk keperluan internal **PC IPNU & IPPNU Kabupaten Magetan**.
