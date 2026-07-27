# SwagLabs Playwright Automation

Automation testing project untuk website **SauceDemo** menggunakan **Playwright** dengan JavaScript.

## Prerequisites

Pastikan sudah menginstall:

- Node.js 
- npm
- Git

Cek versi:

```bash
node -v
npm -v
git --version
```

---

## Clone Repository

Clone project dari GitHub:

```bash
https://github.com/VindiSovia/SwagLabs-Playwright.git
```

Masuk ke folder project:

```bash
cd <repository>
```

---

## Setup Environment

Copy file `.env.example` menjadi `.env`.

### Windows

```bash
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```
---

## Install Dependencies

Install seluruh package yang dibutuhkan:

```bash
npm install
```

Kemudian install browser Playwright:

```bash
npx playwright install --with-deps chromium
```

---

## Menjalankan Automation Test

### Jalankan seluruh test

```bash
npm test
```

### Jalankan hanya End-to-End Test

```bash
npm run test:e2e
```

### Jalankan Login Test

```bash
npm run test:login
```

### Jalankan Cart & Checkout Test

```bash
npm run test:cart
```

### Jalankan hanya Checkout Test

```bash
npx playwright test tests/checkout
```

---

## Melihat Test Report

Setelah proses testing selesai, buka HTML Report:

```bash
npm run report
```

atau

```bash
npx playwright show-report
```

---

## Project Configuration

Project menggunakan konfigurasi berikut:

- Environment variables melalui `.env`
- `dotenv` untuk membaca konfigurasi
- `BASE_URL` dibaca dari `.env`
- Username dan password dibaca melalui `process.env`
- Tidak ada kredensial yang di-hardcode di dalam source code

Contoh isi `.env`:

```env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
```
Isi username dan password sesuai dengan default yang disediakan oleh SauceDemo atau menggunakan yang lain jika ingin membuat test case yang lebih bervariasi

---

## Project Structure

```text
.
├── tests/                 # Test cases
├── helpers/                 # Page Object Model            
├── playwright.config.js   # Playwright configuration
├── package.json
├── .env.example
└── README.md
```

---

## Notes

- Pastikan file `.env` sudah dibuat sebelum menjalankan test.
- HTML Report hanya tersedia setelah minimal satu kali test berhasil dijalankan.
- Browser yang digunakan pada project ini adalah **Chromium**. Bisa menggunakan Browser yang lain asal sudah terinstall
