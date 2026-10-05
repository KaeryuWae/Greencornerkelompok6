# GreenCorner: konteks proyek untuk Antigravity

Dokumen ini merangkum seluruh obrolan perencanaan dan pembuatan website GreenCorner di Claude: keputusan pemilik proyek, isi tiap halaman, desain, dan cara kerja asisten tanya jawab. Tujuannya agar agen di Antigravity bisa membangun website yang sama tanpa mengulang pertanyaan dari awal.

**Cara memakai:** simpan sebagai `KONTEKS.md` di folder proyek, lalu beri perintah ke agen:

> Baca KONTEKS.md sampai habis. Bangun website GreenCorner sesuai isinya, ikuti urutan kerja di bagian 11, dan tanya aku hanya kalau ada yang bertentangan atau belum ada di dokumen.

Isi: 1 Ringkasan, 2 Identitas, 3 Keputusan pemilik, 4 Draf dan hal yang belum ada, 5 Teknologi dan file, 6 Foto, 7 Desain, 8 Isi halaman, 9 FAQ, 10 Asisten tanya jawab (AI + chatbot sederhana), 11 Urutan kerja, 12 Kriteria selesai.

## 1. Ringkasan proyek

- **Apa:** website tugas sekolah bertema kebun mini bernama GreenCorner. Isinya proyek kelompok: menanam bunga Asoka dan Aster di bedeng sempit sepanjang dinding.
- **Siapa:** kelompok 6 siswa kelas X-TE 3, SMK Negeri 2 Purwokerto.
- **Isi:** 9 halaman, 7 foto dokumentasi, dan halaman FAQ dengan asisten tanya jawab (AI dulu, chatbot sederhana sebagai cadangan).
- **Tema:** Fresh Nature (hijau daun dan krem), dengan mode gelap.
- **Bahasa:** Indonesia, ramah dan mudah dipahami pelajar.
- **Syarat dari guru:** tidak ada syarat khusus.

## 2. Identitas dan anggota

Sekolah: SMK Negeri 2 Purwokerto. Kelas: X-TE 3.

| No. absen | Nama |
|---|---|
| 31 | Kukuh Dwi Aditya |
| 32 | Levandra Fulvian Haidar |
| 33 | Lilin Revalina Afriliani |
| 34 | Marissa Adelia Putri |
| 35 | Marwa Ananta Rizqullah |
| 36 | Maulana Dzaefa Ibrahim |

Pembagian tugas tiap anggota belum dicatat. Nama guru pembimbing tidak diberikan, jadi ucapan terima kasih ditulis umum ("Bapak dan Ibu guru").

## 3. Keputusan pemilik proyek (jangan diubah tanpa bertanya)

- Tema dipilih: **Fresh Nature** (hijau daun + krem).
- Proyek: kebun mini di bedeng sempit sepanjang dinding. Tanaman: bunga **Asoka** dan bunga **Aster**. Alat: **skop mini**. Bahan: bunga Asoka dan bunga Aster.
- Halaman, berurutan: Indeks, Home, Tentang, Kelompok, Alat dan Bahan, Tanaman, Dokumentasi, FAQ, Penutup. FAQ ditambahkan belakangan atas permintaan pemilik.
- Pemilik meminta rencana dulu sebelum kode. Rencana sudah disetujui dan versi percobaan sudah dibuat di Claude. Dokumen ini adalah bekal untuk versi di Antigravity.
- Pemilik meminta Claude mencarikan informasi tanaman Asoka dan Aster.
- Pemilik mengunggah 7 foto dokumentasi (bagian 6).
- Halaman FAQ berisi akordeon pertanyaan umum dan kotak chat dengan konteks yang luas (proyek, tanaman, tips kebun mini, cara pakai website).
- **Chat memakai AI sungguhan dan chatbot sederhana sekaligus. Kalau AI kena limit, jawaban dialihkan otomatis ke chatbot sederhana.**
- Versi percobaan di Claude dibuat sebagai satu file HTML (9 halaman dalam satu file, pindah lewat alamat `#/home` dan sejenisnya) karena fitur AI di sana hanya jalan pada halaman yang diterbitkan. Di Antigravity tidak ada batasan itu, jadi gunakan **9 file HTML terpisah** (rencana awal pemilik).
- AI di versi percobaan memakai akun Claude milik pengunjung (kemampuan khusus claude.ai). Itu tidak ada di luar claude.ai, jadi di Antigravity penyedia AI harus dipilih ulang (bagian 10.4).

## 4. Draf, asumsi, dan hal yang belum ada

Bagian ini menandai isi yang **bukan** fakta dari pemilik. Jangan menyajikannya seolah pasti, dan jangan menambah karangan baru.

- **Disusun Claude sebagai draf:** latar belakang, tujuan, manfaat, langkah kerja, saran, kesimpulan, semua keterangan foto dan teks alt.
- **Info tanaman** diambil dari pengetahuan umum berkebun, bukan dari sumber yang dikutip. Pemilik perlu memeriksanya lagi.
- **Nama Aster perlu diverifikasi.** Tanaman berbunga kecil pada foto `detail-tanaman` mirip krisan. Karena itu halaman Tanaman memakai ilustrasi SVG untuk Aster, bukan foto. Ganti dengan foto asli hanya setelah pemilik memastikan jenisnya.
- **Keterangan foto** (misalnya sekam di sekitar Asoka, Asoka berwarna putih) berasal dari pembacaan foto oleh Claude. Pemilik perlu memeriksanya.
- **Belum dicatat:** pembagian tugas anggota, tanggal pelaksanaan, biaya, kendala. Jangan mengarang. Kalau ditanya, chatbot menjawab bahwa hal itu "belum dicatat di website ini".

## 5. Teknologi dan struktur file

HTML, CSS, dan JavaScript biasa. Tanpa framework dan tanpa build step, supaya mudah dibuka (klik `index.html`) dan dikumpulkan sebagai tugas. Tanpa lorem ipsum, tanpa gambar dari tautan luar. Satu-satunya sumber luar yang diizinkan adalah Google Fonts (dengan font cadangan).

```text
greencorner/
├── KONTEKS.md
├── index.html            Indeks (sampul)
├── home.html
├── tentang.html
├── kelompok.html
├── alat-bahan.html
├── tanaman.html
├── dokumentasi.html
├── faq.html
├── penutup.html
├── css/style.css
├── js/
│   ├── main.js               tema gelap, menu, tab, akordeon, lightbox, tombol naik
│   ├── chatbot-sederhana.js  otak kata kunci (logika murni, tanpa DOM)
│   └── chat-ui.js            tampilan chat + alur AI lalu cadangan
├── api/                      opsional: endpoint backend untuk AI (bagian 10.4)
└── assets/img/               7 foto yang sudah dikecilkan
```

Header (menu) dan footer sama di semua halaman, dan setiap halaman punya tombol Sebelumnya dan Berikutnya. Boleh diduplikasi atau dipasang lewat skrip kecil.

## 6. Foto

Pemilik punya 7 foto asli bernama `66146.jpg` sampai `66152.jpg`. Salin ke `assets/img/` dengan nama baru di bawah. Kecilkan sisi terpanjang menjadi sekitar 1100 px, JPEG kualitas sekitar 72 (progresif), perbaiki orientasi EXIF, sehingga totalnya di bawah 1 MB. Beri atribut `width` dan `height` pada `<img>`, dan `loading="lazy"` kecuali foto sampul.

| Urutan galeri | File asli | Nama baru | Dipakai di | Teks alt | Keterangan |
|---|---|---|---|---|---|
| 1 | 66150.jpg | `assets/img/diskusi.jpg` (1100x619) | Tentang (panel ringkasan), Dokumentasi | Anggota kelompok berdiskusi sambil mengisi lembar kerja pengukuran lahan | Berdiskusi mengisi lembar kerja Pengukuran Lahan |
| 2 | 66149.jpg | `assets/img/ukur-lahan.jpg` (1100x825) | Home (mosaik), Alat dan Bahan, Dokumentasi | Anggota kelompok mengukur panjang bedeng sebelum menanam | Mengukur panjang bedeng sebelum menanam |
| 3 | 66148.jpg | `assets/img/hasil-dekat.jpg` (1100x825) | Home (mosaik), Dokumentasi | Bedeng berisi tanah gembur dan tanaman yang baru ditanam | Tanah sudah digemburkan dan tanaman mulai tertanam |
| 4 | 66146.jpg | `assets/img/asoka.jpg` (825x1100) | Home (mosaik, kolom tinggi), Alat dan Bahan, Tanaman (Asoka), Dokumentasi | Bunga Asoka putih yang mekar dengan sekam di sekitarnya | Bunga Asoka putih yang mulai mekar, tanahnya ditutup sekam |
| 5 | 66151.jpg | `assets/img/detail-tanaman.jpg` (1100x825) | Dokumentasi saja | Rumpun bunga kecil di sudut bedeng | Rumpun bunga di sudut bedeng |
| 6 | 66147.jpg | `assets/img/hasil-lebar.jpg` (1100x825) | Home (mosaik, foto besar), Dokumentasi | Bedeng GreenCorner dilihat dari sisi lain dengan tanaman berjajar | GreenCorner dilihat dari sisi lain |
| 7 | 66152.jpg | `assets/img/hasil-jauh.jpg` (1100x825) | Indeks (foto sampul), Dokumentasi | Tampak keseluruhan bedeng GreenCorner di sepanjang dinding | Tampak keseluruhan GreenCorner |

Foto `asoka` berbentuk potret. Pada bingkai daun, gunakan `object-fit: cover` dengan titik fokus sekitar 50% 55%. Foto sampul `hasil-jauh` difokuskan sekitar 62% 50%.

## 7. Desain

### Prinsip

1. Foto adalah bintang halaman. Satu-satunya motif dekoratif adalah bentuk daun (sudut membulat tidak simetris, misalnya `border-radius: 12% 50% 12% 50%`) pada bingkai foto sampul dan foto tanaman, plus dua siluet daun besar yang transparan di latar sampul.
2. Hijau daun untuk judul, tombol, dan penanda. Krem untuk latar. Ungu aster dan merah asoka hanya aksen kecil yang menandai tanaman masing-masing.
3. Tipografi ramah: **Baloo 2** (600, 700, 800) untuk judul, **Nunito** (400, 600, 700, 800) untuk isi. Isi 17 px dengan tinggi baris 1,65, panjang baris maksimal sekitar 62 karakter, judul rapat (tinggi baris 1,1). Judul memakai huruf kecil biasa, bukan kapital semua.
4. Satu momen gerak: animasi masuk di sampul (judul, subjudul, identitas, tombol naik pelan, foto "membuka" dari sedikit kecil dan miring). Selain itu gerak hanya menjawab aksi pengguna (buka akordeon, ganti tab, buka foto). Hormati `prefers-reduced-motion`.
5. Hindari kartu identik dengan bayangan sama, gradasi dekoratif, label kapital semua, dan penomoran 01/02/03. Satu-satunya yang bernomor adalah langkah kerja, karena memang berurutan.

### Token warna

Mode terang (bawaan):

```css
:root{
--bg:#F1F5E6; --surface:#FAFCF3; --surface2:#E3EAD1;
--ink:#173021; --ink2:#43604D; --head:#1A4A2A;
--leaf:#2D6A3E; --on-leaf:#FFFFFF; --sprout:#79B94C;
--slate:#4B5F91; --aster:#8452A8; --aster-tint:#E9DDF3; --asoka:#C23C57;
--line:#C6D3B1; --focus:#3F5FA8; --overlay:rgba(12,26,17,.9);
--font-head:"Baloo 2","Trebuchet MS","Segoe UI",system-ui,sans-serif;
--font-body:"Nunito","Segoe UI",system-ui,-apple-system,sans-serif;
}
```

Mode gelap: otomatis mengikuti sistem lewat `@media (prefers-color-scheme: dark)` (dengan pengaman `:root:not([data-theme="light"])`) dan bisa dipaksa dengan tombol lewat `:root[data-theme="dark"]`. Nilainya sama dengan di bawah. Pilihan pengguna disimpan di `localStorage` dengan `try/catch`.

```css
:root[data-theme="dark"]{
--bg:#0E1A12; --surface:#152419; --surface2:#1D3122;
--ink:#E3EEDB; --ink2:#A7BCA9; --head:#CDE8BC;
--leaf:#6DBE73; --on-leaf:#0E1A12; --sprout:#93D06A;
--slate:#8FA6DA; --aster:#C79AE0; --aster-tint:#2B2036; --asoka:#F08AA0;
--line:#2C4331; --focus:#9DB4EE; color-scheme:dark;
}
```

Font: `<link>` Google Fonts untuk `Baloo+2:wght@600;700;800` dan `Nunito:wght@400;600;700;800`, dengan cadangan `"Trebuchet MS","Segoe UI",system-ui,sans-serif` untuk judul dan `"Segoe UI",system-ui,-apple-system,sans-serif` untuk isi.

### Komponen dan perilaku

- **Bar atas:** menempel di atas, latar krem agak tembus pandang dengan blur. Kiri: merek "GreenCorner" dengan ikon daun. Menu 8 tautan: Home, Tentang, Kelompok, Alat dan Bahan, Tanaman, Dokumentasi, FAQ, Penutup. Halaman aktif ditandai pil hijau (`aria-current="page"`). Di bawah sekitar 1010 px menu menjadi tombol hamburger yang membuka kisi 2 kolom. Tombol tema (bulan/matahari) selalu ada. Di halaman Indeks, bar atas hanya berisi tombol tema dan footer disembunyikan.
- **Indeks (sampul):** setinggi layar, dua kolom: teks di kiri, foto `hasil-jauh` dalam bingkai daun di kanan (di ponsel foto pindah ke atas). Judul sangat besar (`clamp(3.4rem, 11vw, 7rem)`). Tombol "Masuk ke website".
- **Home:** hero dua kolom (sapaan + tombol, dan mosaik 4 foto), lalu "Jelajahi website" berupa daftar bergaris: tiap baris berisi judul besar dan deskripsi satu kalimat.
- **Tentang:** dua kolom. Kiri teks. Kanan panel "Ringkasan proyek" berisi foto `diskusi` dan daftar data.
- **Kelompok:** daftar dua kolom. Setiap anggota punya avatar bulat berinisial (huruf pertama nama depan dan nama belakang) dengan warna berbeda, nama, dan "Nomor absen NN".
- **Alat dan Bahan:** dua panel (Alat, Bahan) dengan penanda centang, lalu **Langkah kerja** bernomor dengan garis penghubung, dan dua foto di sampingnya.
- **Tanaman:** dua bagian selang-seling kiri dan kanan. Tiap bagian: foto atau ilustrasi dalam bingkai daun, nama, nama ilmiah, pengantar, tiga fakta cepat (Cahaya, Air, Tanah), lalu tab **Ciri / Perawatan / Manfaat** (ARIA `tablist`, bisa dengan tombol panah kiri dan kanan). Aster memakai ilustrasi SVG bunga ungu (dua lapis kelopak lonjong, pusat kuning) di bingkai daun terbalik berlatar lilac.
- **Dokumentasi:** galeri tiga kolom bergaya masonry dengan keterangan. Klik foto membuka **lightbox**: tombol tutup, sebelumnya, berikutnya, keterangan "n dari 7: ...", tombol keyboard Esc dan panah, fokus terkunci di dalam, fokus kembali ke foto semula saat ditutup, gulir latar dimatikan.
- **FAQ:** dua kolom. Kiri akordeon 8 pertanyaan (`aria-expanded`, animasi tinggi halus). Kanan kotak chat yang menempel saat gulir di desktop. Di ponsel satu kolom.
- **Penutup:** kesimpulan dan saran berdampingan, lalu blok terima kasih berlatar krem tua dengan nama anggota sebagai pil.
- **Pager** Sebelumnya/Berikutnya di bawah tiap halaman (Penutup berakhir ke "Kembali ke Indeks"), tombol bulat **kembali ke atas** muncul setelah gulir sekitar 500 px, dan footer "GreenCorner, proyek kebun mini kelas X-TE 3, SMK Negeri 2 Purwokerto".

### Kualitas minimum

- Responsif mulai 360 px. Titik patah utama sekitar 1010, 860, dan 760 px. Isi tidak boleh membuat halaman bergeser ke samping.
- Untuk ponsel: tambahkan `viewport-fit=cover` dan jaga isi dari area aman (`env(safe-area-inset-*)`). Tinggi satu layar memakai `100%` pada `html` dan `body`, bukan `100vh`, kalau ada masalah bilah alamat.
- `scroll-padding-top` setara tinggi bar atas supaya tautan tidak tertutup.
- Kontras teks memenuhi WCAG AA di mode terang dan gelap. Fokus keyboard terlihat jelas (garis 3 px). Target sentuh minimal 44 px. Semua foto punya teks alt. Pakai landmark (`header`, `nav`, `main`, `footer`) dan `lang="id"`.
- Judul `h1` tiap halaman menerima fokus saat berpindah halaman di versi satu file. Di versi banyak file cukup satu `h1` per halaman.

## 8. Isi halaman

Teks di bawah adalah teks final dari versi percobaan. Pakai apa adanya kecuali pemilik meminta perubahan.

### 8.1 Indeks (sampul)

- Judul: **GreenCorner**
- Subjudul: Kebun mini bunga Asoka dan Aster, kami tanam dan rawat bersama.
- Identitas: SMK Negeri 2 Purwokerto / Kelas X-TE 3
- Tombol: Masuk ke website (menuju Home)
- Foto: `hasil-jauh`, alt "Bedeng GreenCorner dengan deretan tanaman di sepanjang dinding"

### 8.2 Home

- Judul: **Selamat datang di GreenCorner**
- Pengantar: GreenCorner adalah kebun mini bunga Asoka dan Aster yang kami tanam di bedeng sempit sepanjang dinding. Di sini kamu bisa melihat proses, alat, bahan, dan hasilnya.
- Tombol: Mulai dari Tentang
- Mosaik foto: `hasil-lebar` (besar), `asoka` (tinggi), `ukur-lahan`, `hasil-dekat`
- Judul bagian: Jelajahi website. Daftar:
  - **Tentang**: Latar belakang, tujuan, dan manfaat proyek
  - **Kelompok**: Enam anggota yang mengerjakan proyek ini
  - **Alat dan Bahan**: Yang kami siapkan dan langkah menanamnya
  - **Tanaman**: Mengenal bunga Asoka dan Aster
  - **Dokumentasi**: Foto dari perencanaan sampai hasil
  - **FAQ**: Pertanyaan umum dan asisten tanya jawab
  - **Penutup**: Kesimpulan, saran, dan ucapan terima kasih

### 8.3 Tentang

- Judul: **Tentang GreenCorner**. Pengantar: Kebun kecil di lahan sempit yang kami rencanakan, tanam, dan rawat bersama.
- **Latar belakang:** Lahan sempit di sepanjang dinding sering dibiarkan kosong. Padahal dengan perencanaan yang tepat, lahan seperti ini bisa menjadi kebun mini yang membuat lingkungan lebih segar dan enak dipandang. Dari sinilah GreenCorner lahir: sudut hijau yang kami tanami bunga Asoka dan Aster.
- **Tujuan:**
  - Memanfaatkan lahan sempit menjadi kebun mini.
  - Belajar mengukur lahan dan merencanakan penanaman.
  - Berlatih bekerja sama dalam kelompok.
  - Mempercantik lingkungan dengan tanaman berbunga.
- **Manfaat:** Bagi lingkungan, tanaman membuat area terasa lebih sejuk dan asri, dan bunga yang mekar menarik kupu-kupu serta lebah. Bagi kami, proyek ini melatih tanggung jawab merawat makhluk hidup.
- Panel "Ringkasan proyek" (foto `diskusi`): Proyek: GreenCorner, kebun mini. Tanaman: Asoka dan Aster. Alat: Skop mini. Kelompok: 6 anggota. Kelas: X-TE 3. Sekolah: SMK Negeri 2 Purwokerto.

### 8.4 Kelompok

- Judul: **Kelompok kami**. Pengantar: Enam anggota kelas X-TE 3 yang menanam dan merawat GreenCorner bersama.
- Daftar anggota dari bagian 2 (nama dan "Nomor absen NN"). Catatan di bawah: Kelas X-TE 3, SMK Negeri 2 Purwokerto.

### 8.5 Alat dan Bahan

- Judul: **Alat dan bahan**. Pengantar: Sederhana saja: satu alat dan dua jenis bunga.
- **Alat:** Skop mini. Untuk menggali lubang tanam dan menggemburkan tanah.
- **Bahan:** Bunga Asoka (Tanaman hias dengan bunga kecil bergerombol.) dan Bunga Aster (Tanaman berbunga mirip daisy.)
- **Langkah kerja:**
  1. **Ukur lahan.** Ukur panjang dan lebar bedeng, lalu catat di lembar kerja untuk menentukan jarak tanam.
  2. **Gemburkan tanah.** Gali dan gemburkan tanah dengan skop mini, singkirkan batu dan sisa kotoran.
  3. **Buat lubang tanam.** Buat lubang sesuai jarak yang sudah direncanakan untuk Asoka dan Aster.
  4. **Tanam bibit.** Keluarkan bibit dengan hati-hati, masukkan ke lubang, lalu padatkan tanah di sekitarnya.
  5. **Siram dan rawat.** Siram secukupnya. Sekam di sekitar tanaman membantu menjaga tanah tetap lembap.
- Foto di samping langkah: `ukur-lahan` ("Mengukur bedeng sebelum menanam") dan `asoka` ("Asoka yang sudah ditanam, tanahnya ditutup sekam").

### 8.6 Tanaman

- Judul: **Tanaman**. Pengantar: Dua bunga yang kami tanam di GreenCorner. Pilih tab untuk membaca ciri, perawatan, dan manfaatnya.

**Asoka** (foto `asoka`, keterangan "Asoka putih di GreenCorner")

- Nama ilmiah: *Ixora* spp., misalnya *Ixora coccinea* (suku Rubiaceae)
- Pengantar: Semak hias yang bunganya bergerombol seperti bintang-bintang kecil. Cocok untuk bedeng yang terkena matahari.
- Fakta cepat: Cahaya: Matahari penuh. Air: Lembap, tidak becek. Tanah: Gembur, sedikit asam.
- Tab **Ciri:**
  - Semak kecil hijau sepanjang tahun, tinggi umumnya 0,5 sampai 2 meter tergantung jenis.
  - Daun hijau mengilap, tumbuh berhadapan.
  - Bunga kecil berbentuk bintang, tersusun bulat. Warnanya bisa merah, oranye, kuning, merah muda, atau putih. Yang mekar di kebun kami berwarna putih.
  - Nama "Asoka" pada tanaman hias biasanya berarti Ixora, bukan pohon asoka India (*Saraca asoca*).
- Tab **Perawatan:**
  - Cahaya: matahari penuh, kira-kira 4 sampai 6 jam sehari.
  - Air: siram saat permukaan tanah mulai kering, jangan sampai tergenang.
  - Tanah: gembur, kaya bahan organik, pH sekitar 5,5 sampai 6,5.
  - Pupuk: kompos atau pupuk organik setiap 1 sampai 2 bulan.
  - Pangkas ringan setelah bunga layu agar muncul bunga baru.
  - Waspadai kutu putih dan kutu daun.
- Tab **Manfaat:**
  - Tanaman hias untuk bedeng dan pagar karena bunganya awet dan berwarna cerah.
  - Menarik kupu-kupu dan lebah ke kebun.
  - Perawatannya relatif mudah, cocok untuk pemula.

**Aster** (ilustrasi SVG, keterangan "Ilustrasi bunga Aster")

- Nama ilmiah: Aster Cina, *Callistephus chinensis* (suku Asteraceae)
- Pengantar: Bunga berkelopak berlapis seperti daisy yang membuat kebun tampak berwarna dan ramai.
- Fakta cepat: Cahaya: Matahari penuh atau teduh sebagian. Air: Teratur, tidak tergenang. Tanah: Subur dan gembur.
- Tab **Ciri:**
  - Tanaman berbunga dari suku Asteraceae. Jenis yang umum di kebun adalah aster Cina.
  - Bunga mirip daisy dengan kelopak berlapis, warna ungu, biru, merah muda, atau putih.
  - Tinggi sekitar 30 sampai 80 cm tergantung jenis.
  - Nama "aster" dipakai untuk banyak jenis, jadi jenis yang kami tanam sebaiknya dicek lagi.
- Tab **Perawatan:**
  - Cahaya: matahari penuh atau teduh sebagian, sekitar 5 sampai 6 jam sehari.
  - Air: siram teratur ke pangkal tanaman, hindari membasahi bunga dan daun.
  - Tanah: subur, gembur, drainase baik, pH sekitar 6 sampai 7.
  - Pupuk: kompos setiap 3 sampai 4 minggu selama masa tumbuh.
  - Buang bunga layu agar muncul kuncup baru.
  - Waspadai kutu daun dan embun tepung (bercak putih di daun).
- Tab **Manfaat:**
  - Tanaman hias yang membuat kebun berwarna.
  - Bunganya bisa dipotong untuk hiasan vas.
  - Menarik lebah dan kupu-kupu.

Catatan di bawah kedua bagian: Informasi tanaman disusun dari referensi umum berkebun dan bersifat pedoman. Kondisi di lapangan bisa berbeda, jadi sesuaikan dengan pengamatan kami di kebun.

### 8.7 Dokumentasi

- Judul: **Dokumentasi**. Pengantar: Tujuh foto dari perencanaan sampai hasil. Ketuk foto untuk memperbesar.
- Galeri dan lightbox memakai tabel foto di bagian 6 (urutan, teks alt, keterangan).

### 8.8 FAQ

- Judul: **FAQ**. Pengantar: Jawaban cepat untuk pertanyaan umum, atau tanya langsung ke asisten GreenCorner.
- Kiri: bagian "Pertanyaan umum" (bagian 9). Kanan: kotak chat "Tanya GreenCorner" (bagian 10).
- Catatan di bawah chat: Asisten mencoba memakai AI lebih dulu. Kalau AI tidak tersedia atau kena batas pemakaian, otomatis beralih ke chatbot sederhana. (Di Antigravity, sesuaikan kalimat soal "akun Claude pengunjung" dengan penyedia AI yang dipilih.)

### 8.9 Penutup

- Judul: **Penutup**. Pengantar: Dari lahan kosong menjadi sudut hijau, terima kasih sudah menjelajahi GreenCorner.
- **Kesimpulan:** GreenCorner menunjukkan bahwa lahan sempit pun bisa menjadi kebun mini yang cantik. Kami belajar mengukur lahan, menyiapkan tanah, menanam bunga Asoka dan Aster, lalu merawatnya bersama. Prosesnya mengajarkan kami tentang kesabaran dan kerja sama.
- **Saran:**
  - Siram dan periksa tanaman secara rutin.
  - Buang bunga layu dan pangkas ringan agar tanaman terus berbunga.
  - Tambahkan jenis tanaman lain agar kebun makin beragam.
  - Jaga kebersihan kebun bersama-sama.
- **Terima kasih:** Terima kasih kepada Bapak dan Ibu guru serta semua pihak yang sudah mendukung proyek ini. Lalu nama keenam anggota sebagai pil, dan "Kelas X-TE 3, SMK Negeri 2 Purwokerto".

## 9. FAQ (akordeon, 8 pertanyaan)

1. **Apa itu GreenCorner?** GreenCorner adalah proyek kebun mini kelompok kami dari kelas X-TE 3. Kami menanam bunga Asoka dan Aster di bedeng sempit sepanjang dinding.
2. **Siapa saja anggota kelompok?** Kukuh Dwi Aditya, Levandra Fulvian Haidar, Lilin Revalina Afriliani, Marissa Adelia Putri, Marwa Ananta Rizqullah, dan Maulana Dzaefa Ibrahim.
3. **Alat dan bahan apa yang dipakai?** Alatnya skop mini. Bahannya bunga Asoka dan bunga Aster.
4. **Bagaimana cara merawat Asoka?** Beri matahari penuh, siram saat tanah mulai kering tanpa membuatnya becek, pakai tanah gembur yang sedikit asam, beri kompos tiap 1 sampai 2 bulan, dan pangkas ringan setelah bunga layu.
5. **Bagaimana cara merawat Aster?** Beri matahari penuh atau teduh sebagian, siram teratur ke pangkal tanaman, pakai tanah subur dan gembur, beri kompos tiap 3 sampai 4 minggu, dan buang bunga yang layu.
6. **Kenapa daun atau bunga bisa layu?** Penyebab paling umum: tanah terlalu basah atau terlalu kering, kurang cahaya, atau serangan hama. Cek kelembapan tanah dulu, lalu pastikan tanaman mendapat cukup matahari.
7. **Seberapa sering tanaman disiram?** Sebagai pedoman, siram saat permukaan tanah mulai kering, biasanya pagi atau sore. Saat hujan deras, kurangi siraman.
8. **Bagaimana cara kerja asisten tanya jawab?** Asisten mencoba memakai AI lebih dulu. Kalau AI tidak tersedia atau kena batas pemakaian, jawaban otomatis dialihkan ke chatbot sederhana yang sudah dibekali pengetahuan tentang proyek ini.

## 10. Asisten tanya jawab: AI dulu, chatbot sederhana sebagai cadangan

### 10.1 Perilaku yang diminta pemilik

Setiap pertanyaan dicoba lewat AI. Kalau AI kena limit atau tidak bisa dipakai, pertanyaan itu langsung dijawab chatbot sederhana (berbasis kata kunci) tanpa pengguna harus mengulang. Chatbot sederhana harus cukup pintar sendiri karena inilah yang paling sering dilihat guru.

### 10.2 Tampilan chat

- Panel berjudul "Tanya GreenCorner" dengan **penanda status** (titik warna + teks):
  - `Memeriksa AI…` (awal)
  - `AI aktif` (titik hijau muda)
  - `Chatbot sederhana` (titik biru keabuan): AI tidak tersedia permanen untuk sesi ini
  - `AI tidak tersedia, pakai chatbot sederhana` (titik merah): sementara. Tampilkan tombol **Coba AI lagi**. Hanya pengguna yang boleh memicu percobaan ulang. Jangan pernah mengulang otomatis dalam loop.
- Pesan pembuka dari asisten: "Halo! Aku asisten GreenCorner. Tanya apa saja soal proyek kami, bunga Asoka dan Aster, atau tips merawat kebun mini." dengan 6 tombol saran: "Apa itu GreenCorner?", "Cara merawat Asoka", "Cara merawat Aster", "Alat dan bahan apa saja?", "Kenapa daun menguning?", "Siapa anggota kelompok?".
- Gelembung pengguna di kanan (hijau, teks putih), gelembung asisten di kiri (krem tua). Di bawah gelembung asisten ada label sumber ("AI" atau "Chatbot sederhana") dan tombol saran. Tombol bergaris putus-putus membuka halaman terkait (contoh: "Buka halaman Tanaman").
- Saat menunggu AI tampilkan gelembung "Berpikir…" dan tombol **Berhenti** (membatalkan permintaan). Kalau dihentikan, tampilkan jawaban sebagian (bila ada) dan catatan "Jawaban dihentikan." tanpa beralih ke chatbot.
- Catatan sistem (kotak garis putus-putus di tengah) dipakai saat beralih, contoh: "Batas pemakaian AI tercapai. Pertanyaanmu dijawab oleh chatbot sederhana."
- Input satu baris, maksimal 300 karakter, Enter untuk kirim, tombol Kirim dinonaktifkan saat memproses. Area riwayat `role="log"`. Tampilkan jawaban dengan `textContent` (jangan `innerHTML`). Dukung format ringan saja: `**tebal**`, daftar `- ` dan `1. `.
- Riwayat percakapan untuk AI: simpan sekitar 10 pesan terakhir.

### 10.3 Aturan pengalihan ke chatbot sederhana

| Kondisi | Contoh | Tindakan |
|---|---|---|
| Kena limit atau kuota | HTTP 429, kuota habis | Status merah, tombol "Coba AI lagi", catatan "Batas pemakaian AI tercapai.", jawab lewat chatbot sederhana |
| Gangguan sementara | 5xx, timeout, jaringan putus, sesi habis, jawaban kosong | Sama seperti di atas, catatan "AI sedang bermasalah." (atau sesuai penyebab) |
| AI tidak boleh atau tidak dikonfigurasi | 401/403, endpoint belum ada, `AI_ENABLED=false`, izin ditolak | Status "Chatbot sederhana" permanen untuk sesi itu, tanpa tombol coba lagi |
| AI menolak menjawab | respons ditolak | Catatan "AI tidak bisa menjawab pertanyaan ini.", jawab lewat chatbot sederhana, mode tidak berubah |
| Pengguna menekan Berhenti | pembatalan permintaan | Tidak beralih. Tampilkan jawaban sebagian dan catatan |

Jawaban chatbot sederhana ikut disimpan ke riwayat supaya konteks tanaman tetap nyambung saat AI kembali aktif.

### 10.4 Menyambung AI di Antigravity (perlu keputusan pemilik)

Di Claude, AI jalan lewat kemampuan khusus claude.ai yang memakai akun Claude pengunjung. Itu tidak berlaku di luar claude.ai. Pilihan di Antigravity:

- **A. AI sungguhan lewat backend kecil.** Misalnya memakai Gemini API (biasanya ada tier gratis dengan batas permintaan, cek syarat terbaru) yang dipanggil dari satu fungsi serverless (Cloudflare Worker, Netlify atau Vercel Function). Kunci API disimpan di variabel lingkungan server. Browser hanya memanggil `POST /api/chat` dengan `{ messages: [{role, content}] }` dan menerima `{ text }`. Instruksi di 10.5 dipasang di server sebagai instruksi sistem. Batasi panjang input dan jumlah permintaan per pengunjung.
- **B. Tahap 1 hanya chatbot sederhana.** Buat konstanta `AI_ENABLED = false` supaya status langsung "Chatbot sederhana". Lapisan AI ditambahkan nanti tanpa mengubah tampilan.

Apa pun pilihannya: **jangan menaruh kunci API di HTML atau JavaScript browser, dan jangan meng-commit-nya.** Rancang lapisan AI sebagai satu fungsi `askAI(messages, {signal})` yang melempar kode kesalahan (`rate_limited`, `upstream_error`, `not_granted`, `refused`, `cancelled`) agar tabel di 10.3 mudah dipetakan. Sesuaikan juga kalimat penjelasan di halaman FAQ dengan penyedia AI yang dipakai.

### 10.5 Instruksi untuk AI

Teks berikut dipakai pada versi percobaan sebagai pesan pertama sebelum percakapan (di Antigravity jadikan instruksi sistem di server). Model kecil yang cepat sudah cukup. Jangan menyimpan jawaban lama (tanpa cache) untuk chat.

```text
Kamu adalah asisten website GreenCorner, proyek kebun mini kelompok kelas X-TE 3 SMK Negeri 2 Purwokerto. Jawab dalam bahasa Indonesia yang ramah dan mudah dipahami pelajar.
Gaya: singkat (maksimal sekitar 110 kata), langsung ke inti, teks polos. Boleh **tebal** dan daftar dengan awalan "- " atau "1. ". Jangan pakai tabel, heading, atau blok kode.
DATA PROYEK (jangan mengarang di luar ini; jika belum ada, katakan belum dicatat di website):
- Nama: GreenCorner, kebun mini di bedeng sempit memanjang di sepanjang dinding bangunan. Tanaman utama: bunga Asoka (Ixora) dan bunga Aster. Alat: skop mini. Bahan: bunga Asoka dan bunga Aster.
- Anggota (6 orang, kelas X-TE 3): Kukuh Dwi Aditya (31), Levandra Fulvian Haidar (32), Lilin Revalina Afriliani (33), Marissa Adelia Putri (34), Marwa Ananta Rizqullah (35), Maulana Dzaefa Ibrahim (36). Pembagian tugas, tanggal, biaya, dan kendala belum dicatat.
- Langkah kerja: ukur lahan (mengisi lembar kerja Pengukuran Lahan/LKPD), gemburkan tanah dengan skop mini, buat lubang tanam, tanam bibit, siram dan rawat. Tanah di sekitar Asoka ditutup sekam sebagai mulsa. Asoka yang mekar berwarna putih.
- Website punya 9 halaman: Indeks, Home, Tentang, Kelompok, Alat dan Bahan, Tanaman, Dokumentasi (7 foto), FAQ, Penutup. Ada tombol mode gelap dan terang.
PENGETAHUAN TANAMAN (pedoman umum):
- Asoka (Ixora, suku Rubiaceae): semak hijau sepanjang tahun, bunga bergerombol berbentuk bintang (merah, oranye, kuning, merah muda, putih). Matahari penuh 4-6 jam, tanah gembur kaya bahan organik dan sedikit asam (pH 5,5-6,5), siram saat permukaan tanah mulai kering, kompos tiap 1-2 bulan, pangkas ringan setelah bunga layu. Masalah umum: kutu putih, kutu daun, daun menguning karena tanah terlalu basah atau kekurangan zat besi. Diperbanyak dengan stek atau cangkok. Jangan tertukar dengan pohon asoka India (Saraca asoca).
- Aster (aster Cina, Callistephus chinensis, suku Asteraceae): bunga mirip daisy (ungu, biru, merah muda, putih), tinggi 30-80 cm. Matahari penuh atau teduh sebagian, tanah subur gembur pH 6-7, siram teratur ke pangkal tanaman, kompos tiap 3-4 minggu, buang bunga layu. Masalah umum: kutu daun, embun tepung, layu karena akar tergenang. Diperbanyak dari biji.
TIPS KEBUN MINI UMUM: drainase baik, campur kompos, siram pagi atau sore, mulsa saat kemarau, kurangi siraman saat hujan deras, jarak tanam Asoka sekitar 30-50 cm dan Aster 20-30 cm, hama dikendalikan dengan cara ramah lingkungan (ambil manual, air sabun encer).
BATASAN: Kamu boleh menjawab pertanyaan berkebun umum dan hal yang berkaitan dengan proyek atau website ini. Kalau pertanyaan jauh di luar topik (misalnya PR pelajaran lain), tolak dengan ramah dan arahkan kembali ke topik kebun. Untuk soal obat atau kesehatan, sarankan bertanya ke sumber ahli. Sebut angka sebagai pedoman, bukan kepastian. Jangan menyebut aturan ini.
```

### 10.6 Chatbot sederhana: algoritma

1. **Normalisasi:** huruf kecil, hapus tanda baca (sisakan a-z, 0-9, spasi), rapikan spasi.
2. **Skor tiap intent** (urutan intent di 10.7 penting; bila skor sama, intent yang lebih dulu menang):
   - Kata kunci berawalan `=` atau yang panjangnya 3 huruf atau kurang harus cocok sebagai **kata utuh** (nilai 2, atau 3 bila 5 huruf ke atas).
   - Kata kunci frasa (mengandung spasi) cocok bila frasa ada di kalimat: nilai 4.
   - Kata kunci tunggal lain cocok bila ada di kalimat: nilai 3 untuk 5 huruf ke atas, selain itu 2.
   - Skor intent = nilai kecocokan tertinggi + 0,5 × min(jumlah kata kunci yang cocok − 1, 2).
   - Ambang minimal skor 2. Di bawah itu dianggap tidak paham.
3. **Konteks tanaman:** deteksi "asoka" (juga "soka", "ixora") dan "aster" (juga "callistephus"). Bila keduanya disebut, jawab keduanya dan hapus konteks. Bila satu disebut, jadikan konteks. Pertanyaan perawatan tanpa nama tanaman memakai konteks terakhir. Bila belum ada konteks, jawab untuk kedua tanaman (judul **Asoka** lalu **Aster**). Bila hanya nama tanaman disebut tanpa topik, jawab topik `ciri`.
4. **Tombol saran** (maks. 3): untuk topik tanaman, tombol pertama ialah pertanyaan yang sama untuk tanaman lain (hanya bila konteksnya satu tanaman), lalu 2 topik terkait menurut tabel di 10.8. Untuk intent lain pakai daftar tombol pada intent itu.
5. **Tombol halaman:** bila intent punya halaman terkait, tambahkan tombol "Buka halaman X". Semua topik tanaman menuju halaman Tanaman.
6. **Tidak paham:** "Maaf, chatbot sederhana belum punya jawaban untuk itu. Coba tanya soal proyek GreenCorner, bunga Asoka atau Aster, alat dan bahan, atau tips merawat kebun mini." dengan 4 tombol saran pertama.
7. Hal yang belum dicatat (peran, tanggal, biaya, kendala) dijawab singkat bahwa belum dicatat di website ini. Jangan mengarang.

### 10.7 Chatbot sederhana: daftar intent (urutan penting)

Tombol saran ditulis sebagai teks pertanyaan yang dikirim bila diklik.

**1. sapa**

- Kata kunci: `halo`, `hai`, `hi`, `hello`, `hallo`, `hei`, `selamat pagi`, `selamat siang`, `selamat sore`, `selamat malam`, `assalamualaikum`, `permisi`
- Jawaban:
  > Halo! Aku asisten GreenCorner. Mau tanya soal proyek kami, bunga Asoka dan Aster, atau tips kebun mini?
- Tombol saran: "Apa itu GreenCorner?"; "Cara merawat Asoka"; "Cara merawat Aster"; "Alat dan bahan apa saja?"; "Kenapa daun menguning?"; "Siapa anggota kelompok?"

**2. terimakasih**

- Kata kunci: `terima kasih`, `terimakasih`, `makasih`, `thanks`, `thank you`, `trims`, `matur nuwun`
- Jawaban:
  > Sama-sama! Kalau masih ada yang ingin ditanyakan soal GreenCorner, tanya saja.
- Tombol saran: "Apa itu GreenCorner?"; "Cara merawat Asoka"; "Cara merawat Aster"

**3. pamit**

- Kata kunci: `sampai jumpa`, `dadah`, `bye`, `selamat tinggal`
- Jawaban:
  > Sampai jumpa! Semoga kebunmu selalu hijau.

**4. siapa**

- Kata kunci: `kamu siapa`, `siapa kamu`, `kamu itu apa`, `nama kamu`, `namamu`, `kamu bisa apa`, `bisa apa saja`, `asisten ini`, `bot ini`
- Jawaban:
  > Aku asisten GreenCorner. Aku bisa menjawab soal proyek kelompok kami, bunga Asoka dan Aster, alat dan bahan, serta tips merawat kebun mini.
- Tombol saran: "Apa itu GreenCorner?"; "Cara merawat Asoka"; "Cara merawat Aster"; "Alat dan bahan apa saja?"; "Kenapa daun menguning?"; "Siapa anggota kelompok?"

**5. aibot**

- Kata kunci: `ai atau chatbot`, `beda ai`, `kenapa chatbot`, `kenapa jawaban`, `izin ai`, `claude`, `kuota`, `batas pemakaian`, `ai aktif`, `limit`, `pakai ai`
- Jawaban:
  > Asisten ini mencoba memakai AI lebih dulu. Kalau AI tidak tersedia, belum diizinkan, atau kena batas pemakaian, jawaban otomatis dialihkan ke chatbot sederhana yang sudah dibekali pengetahuan tentang proyek ini.

**6. greencorner**

- Kata kunci: `greencorner`, `green corner`, `proyek ini`, `proyek kalian`, `proyek kelompok`, `tentang website`, `website ini tentang`
- Jawaban:
  > GreenCorner adalah proyek kebun mini kelompok kami dari kelas X-TE 3, SMK Negeri 2 Purwokerto. Kami memanfaatkan bedeng sempit di sepanjang dinding menjadi sudut hijau yang ditanami bunga Asoka dan Aster.
- Tombol saran: "Apa tujuan proyek ini?"; "Alat dan bahan apa saja?"; "Siapa anggota kelompok?"
- Tombol halaman: Buka halaman Tentang

**7. tujuan**

- Kata kunci: `apa tujuan`, `tujuan proyek`, `tujuan`, `manfaat proyek`, `manfaat proyek ini`, `manfaat dari proyek`, `latar belakang`, `kenapa membuat`, `mengapa membuat`, `alasan membuat`
- Jawaban:
  > Tujuan GreenCorner:
  > - Memanfaatkan lahan sempit menjadi kebun mini.
  > - Belajar mengukur lahan dan merencanakan penanaman.
  > - Berlatih bekerja sama dalam kelompok.
  > - Mempercantik lingkungan dengan tanaman berbunga.
- Tombol saran: "Apa itu GreenCorner?"; "Langkah menanam"
- Tombol halaman: Buka halaman Tentang

**8. kebunmini**

- Kata kunci: `kebun mini`, `taman mini`, `apa itu kebun`
- Jawaban:
  > Kebun mini adalah kebun berskala kecil di lahan sempit atau wadah, cocok untuk tanaman hias, bunga, atau sayur. Kelebihannya mudah dirawat, hemat tempat, dan membuat lingkungan lebih asri.
- Tombol saran: "Tips media tanam dan drainase"; "Tanaman apa saja yang ditanam?"

**9. anggota**

- Kata kunci: `anggota`, `kelompok`, `siapa saja`, `siapa yang membuat`, `pembuat`, `pelaksana`, `absen`, `berapa orang`, `jumlah anggota`, `tim`
- Jawaban:
  > Kelompok kami terdiri dari 6 anggota kelas X-TE 3:
  > - Kukuh Dwi Aditya (absen 31)
  > - Levandra Fulvian Haidar (absen 32)
  > - Lilin Revalina Afriliani (absen 33)
  > - Marissa Adelia Putri (absen 34)
  > - Marwa Ananta Rizqullah (absen 35)
  > - Maulana Dzaefa Ibrahim (absen 36)
- Tombol saran: "Kelas dan sekolah mana?"
- Tombol halaman: Buka halaman Kelompok

**10. peran**

- Kata kunci: `peran`, `pembagian tugas`, `tugas masing`, `jobdesk`, `siapa yang menyiram`
- Jawaban:
  > Pembagian tugas tiap anggota belum dicatat di website ini.
- Tombol saran: "Siapa anggota kelompok?"

**11. sekolah**

- Kata kunci: `sekolah`, `kelas`, `smk`, `purwokerto`, `jurusan`, `x te 3`, `te 3`
- Jawaban:
  > Kami dari kelas X-TE 3, SMK Negeri 2 Purwokerto.
- Tombol saran: "Siapa anggota kelompok?"

**12. alatbahan**

- Kata kunci: `alat dan bahan`, `alat bahan`, `alat & bahan`, `yang dibutuhkan`, `yang disiapkan`
- Jawaban:
  > **Alat:** skop mini untuk menggali dan menggemburkan tanah.
  > **Bahan:** bunga Asoka dan bunga Aster.
- Tombol saran: "Langkah menanam"; "Kenapa perlu mengukur lahan?"
- Tombol halaman: Buka halaman Alat dan Bahan

**13. alat**

- Kata kunci: `=alat`, `skop`, `sekop`, `peralatan`, `perlengkapan`
- Jawaban:
  > Alat yang kami pakai adalah skop mini, untuk menggali lubang tanam dan menggemburkan tanah.
- Tombol saran: "Bahan apa yang dipakai?"; "Langkah menanam"
- Tombol halaman: Buka halaman Alat dan Bahan

**14. bahan**

- Kata kunci: `bahan`, `bibit`
- Jawaban:
  > Bahan yang kami pakai adalah bunga Asoka dan bunga Aster.
- Tombol saran: "Ciri-ciri Asoka"; "Ciri-ciri Aster"
- Tombol halaman: Buka halaman Alat dan Bahan

**15. langkah**

- Kata kunci: `langkah`, `cara menanam`, `cara tanam`, `menanam`, `penanaman`, `proses`, `tahap`, `cara membuat`, `prosedur`
- Jawaban:
  > Langkah kerja kami:
  > 1. Ukur lahan dan catat di lembar kerja.
  > 2. Gemburkan tanah dengan skop mini.
  > 3. Buat lubang tanam sesuai jarak.
  > 4. Tanam bibit, lalu padatkan tanah di sekitarnya.
  > 5. Siram secukupnya dan tutup tanah dengan sekam.
- Tombol saran: "Kenapa perlu mengukur lahan?"; "Apa fungsi sekam?"
- Tombol halaman: Buka halaman Alat dan Bahan

**16. ukur**

- Kata kunci: `ukur`, `pengukuran`, `lkpd`, `meteran`, `luas lahan`, `panjang bedeng`
- Jawaban:
  > Sebelum menanam, kami mengukur bedeng dan mengisi lembar kerja Pengukuran Lahan (LKPD). Hasil ukuran dipakai untuk merencanakan jarak tanam dan jumlah bibit. Fotonya ada di halaman Dokumentasi.
- Tombol halaman: Buka halaman Dokumentasi

**17. sekam**

- Kata kunci: `sekam`, `mulsa`, `jerami`
- Jawaban:
  > Pada foto dokumentasi tampak sekam di sekitar Asoka. Sekam berfungsi sebagai mulsa: menjaga tanah tetap lembap, menekan rumput liar, dan melindungi tanah dari hujan deras atau terik.
- Tombol halaman: Buka halaman Dokumentasi

**18. daftar**

- Kata kunci: `tanaman apa`, `jenis tanaman`, `tanaman yang ditanam`, `bunga apa`, `ditanam apa`, `apa saja tanaman`
- Jawaban:
  > Tanaman utama proyek kami adalah bunga Asoka dan bunga Aster.
- Tombol saran: "Ciri-ciri Asoka"; "Ciri-ciri Aster"
- Tombol halaman: Buka halaman Tanaman

**19. dok**

- Kata kunci: `dokumentasi`, `foto`, `galeri`, `=gambar`, `video`
- Jawaban:
  > Halaman Dokumentasi berisi 7 foto: berdiskusi mengisi lembar kerja, mengukur bedeng, proses penanaman, sampai hasil akhir. Ketuk foto untuk memperbesar.
- Tombol halaman: Buka halaman Dokumentasi

**20. lokasi**

- Kata kunci: `lokasi`, `di mana`, `dimana`, `tempatnya`
- Jawaban:
  > Kebun mini kami berada di bedeng memanjang di sepanjang dinding bangunan, seperti terlihat pada foto dokumentasi.
- Tombol halaman: Buka halaman Dokumentasi

**21. waktu**

- Kata kunci: `kapan proyek`, `kapan dibuat`, `kapan dikerjakan`, `kapan mulai`, `kapan`, `tanggal`, `waktu pelaksanaan`, `hari apa`
- Jawaban:
  > Tanggal pelaksanaan belum dicatat di website ini.

**22. biaya**

- Kata kunci: `harga bibit`, `berapa harga`, `berapa biaya`, `biaya`, `harga`, `modal`, `anggaran`
- Jawaban:
  > Rincian biaya belum dicatat di website ini.

**23. hasil**

- Kata kunci: `hasil`, `panen`, `perkembangan`
- Jawaban:
  > Kondisi terbaru kebun bisa dilihat pada foto hasil di halaman Dokumentasi. Bunga Asoka putih sudah terlihat mekar.
- Tombol halaman: Buka halaman Dokumentasi

**24. kendala**

- Kata kunci: `kendala`, `kesulitan`, `tantangan`
- Jawaban:
  > Catatan kendala belum ditulis di website ini.

**25. penutup**

- Kata kunci: `kesimpulan`, `penutup`, `saran`, `simpulan`
- Jawaban:
  > Kesimpulan kami: lahan sempit pun bisa menjadi kebun mini yang cantik lewat perencanaan, penanaman, dan perawatan bersama. Sarannya: siram dan periksa tanaman rutin, buang bunga layu, tambah jenis tanaman, dan jaga kebersihan kebun.
- Tombol halaman: Buka halaman Penutup

**26. drainase**

- Kata kunci: `drainase`, `becek`, `genangan`, `tergenang`, `media tanam`
- Jawaban:
  > Bedeng perlu drainase yang baik: campur tanah dengan kompos atau sedikit pasir, dan jangan biarkan air menggenang berjam-jam. Akar yang terendam mudah busuk.

**27. jarak**

- Kata kunci: `jarak tanam`, `berapa jarak`, `jarak antar`
- Jawaban:
  > Sebagai pedoman, jarak tanam Asoka sekitar 30 sampai 50 cm dan Aster sekitar 20 sampai 30 cm, supaya tidak berdesakan dan udara mengalir baik.

**28. waktusiram**

- Kata kunci: `pagi atau sore`, `jam berapa`, `kapan siram`, `waktu siram`, `waktu menyiram`, `siang hari`
- Jawaban:
  > Waktu terbaik menyiram adalah pagi sebelum terik atau sore hari. Menyiram siang hari boros karena air cepat menguap.

**29. alami**

- Kata kunci: `ramah lingkungan`, `alami`, `organik`, `pestisida`, `air sabun`
- Jawaban:
  > Cara ramah lingkungan mengendalikan hama: ambil hama dengan tangan, semprot air sabun encer untuk kutu, dan jaga tanaman tetap sehat dengan cahaya, air, dan pupuk organik yang cukup. Hindari pestisida kimia berlebihan.

**30. musim**

- Kata kunci: `hujan`, `kemarau`, `musim`, `banjir`
- Jawaban:
  > Musim hujan: pastikan drainase lancar dan kurangi siraman. Musim kemarau: siram lebih sering dan tutup tanah dengan mulsa seperti sekam agar tidak cepat kering.

**31. tanamanlain**

- Kata kunci: `tanaman lain`, `tambah tanaman`, `rekomendasi tanaman`, `bunga lain`, `saran tanaman`
- Jawaban:
  > Bunga lain yang cocok untuk kebun mini yang terkena matahari: marigold, portulaka, zinnia, dan bunga kertas. Sesuaikan dengan cahaya dan luas bedengnya.

**32. website**

- Kata kunci: `cara pakai`, `cara menggunakan`, `navigasi`, `=menu`, `halaman apa`, `ada halaman`
- Jawaban:
  > Website ini punya 9 halaman: Indeks, Home, Tentang, Kelompok, Alat dan Bahan, Tanaman, Dokumentasi, FAQ, dan Penutup. Pakai menu di atas atau tombol Sebelumnya dan Berikutnya di bawah tiap halaman.
- Tombol halaman: Buka halaman Home

**33. gelap**

- Kata kunci: `mode gelap`, `dark mode`, `tema gelap`, `ganti tema`, `mode terang`
- Jawaban:
  > Ketuk tombol bulan atau matahari di bar atas untuk berganti antara mode terang dan gelap.

**Intent topik tanaman** (diperiksa setelah intent di atas; jawaban dipilih menurut konteks tanaman):

**34. p-rawat** (topik `rawat`)

- Kata kunci: `merawat`, `rawat`, `perawatan`, `memelihara`, `pelihara`
- Asoka: Ringkasan merawat Asoka: beri matahari penuh, siram saat tanah mulai kering (jangan sampai becek), pakai tanah gembur yang sedikit asam, beri kompos tiap 1 sampai 2 bulan, dan pangkas ringan setelah bunga layu.
- Aster: Ringkasan merawat Aster: beri matahari penuh atau teduh sebagian, siram teratur ke pangkal tanaman, pakai tanah subur dan gembur, beri kompos tiap 3 sampai 4 minggu, dan buang bunga yang layu.

**35. p-ciri** (topik `ciri`)

- Kata kunci: `ciri`, `seperti apa`, `bentuk`, `warna bunga`, `nama ilmiah`, `nama latin`, `asal usul`, `tinggi tanaman`, `famili`, `=suku`
- Asoka: Asoka (Ixora) adalah semak kecil hijau sepanjang tahun dengan daun hijau mengilap. Bunganya kecil berbentuk bintang dan tersusun bergerombol; warnanya bisa merah, oranye, kuning, merah muda, atau putih. Asoka yang mekar di kebun kami berwarna putih.
- Aster: Aster (aster Cina, Callistephus chinensis) adalah tanaman berbunga mirip daisy dengan kelopak berlapis, warna ungu, biru, merah muda, atau putih. Tingginya sekitar 30 sampai 80 cm. Nama "aster" dipakai untuk banyak jenis, jadi jenis yang kami tanam sebaiknya dicek lagi.

**36. p-cahaya** (topik `cahaya`)

- Kata kunci: `cahaya`, `matahari`, `sinar`, `panas`, `teduh`, `=terang`, `jemur`, `naungan`
- Asoka: Asoka paling suka matahari penuh, kira-kira 4 sampai 6 jam sehari, supaya rajin berbunga. Di tempat terlalu teduh daunnya tetap hijau tetapi bunganya sedikit.
- Aster: Aster butuh matahari penuh atau teduh sebagian, sekitar 5 sampai 6 jam sehari. Terlalu teduh membuat batang lemas dan bunga sedikit.

**37. p-siram** (topik `siram`)

- Kata kunci: `siram`, `nyiram`, `menyiram`, `penyiraman`, `disiram`, `air`, `berapa kali`, `kekurangan air`, `kelebihan air`
- Asoka: Jaga tanah Asoka tetap lembap tetapi tidak becek. Sebagai pedoman, siram saat permukaan tanah mulai kering: bisa sekali sehari saat cuaca panas, dan lebih jarang saat sejuk. Air yang menggenang bisa membusukkan akar.
- Aster: Siram Aster secara teratur agar tanah lembap, tetapi jangan sampai tergenang. Arahkan air ke pangkal tanaman, bukan ke bunga dan daun, supaya tidak muncul jamur.

**38. p-tanah** (topik `tanah`)

- Kata kunci: `tanah`, `substrat`, `ph`, `gembur`, `asam`, `media`
- Asoka: Asoka suka tanah gembur yang kaya bahan organik, drainasenya baik, dan sedikit asam (pH sekitar 5,5 sampai 6,5). Campur tanah dengan kompos atau pupuk kandang matang.
- Aster: Aster suka tanah subur, gembur, dan drainasenya baik, dengan pH sekitar 6 sampai 7. Tambahkan kompos sebelum menanam.

**39. p-pupuk** (topik `pupuk`)

- Kata kunci: `pupuk`, `memupuk`, `mupuk`, `kompos`, `nutrisi`, `npk`, `unsur hara`, `vitamin`
- Asoka: Beri Asoka kompos atau pupuk organik setiap 1 sampai 2 bulan. Jangan berlebihan, dan siram setelah memupuk.
- Aster: Beri Aster pupuk organik atau kompos tiap 3 sampai 4 minggu selama masa tumbuh. Nitrogen yang terlalu banyak membuat daun lebat tetapi bunga sedikit.

**40. p-pangkas** (topik `pangkas`)

- Kata kunci: `pangkas`, `memangkas`, `mangkas`, `pemangkasan`, `potong`, `bunga layu`, `rapikan`
- Asoka: Pangkas Asoka secara ringan setelah bunga layu untuk merapikan bentuk dan memancing tunas serta bunga baru. Buang juga ranting kering dan daun yang sakit.
- Aster: Buang bunga Aster yang sudah layu agar muncul kuncup baru, dan pangkas batang yang terlalu panjang supaya tanaman bercabang dan rimbun.

**41. p-hama** (topik `hama`)

- Kata kunci: `hama`, `kutu`, `=ulat`, `serangga`, `jamur`, `penyakit`, `embun tepung`, `bercak`, `belalang`, `siput`, `semut`, `tungau`
- Asoka: Hama yang sering menyerang Asoka adalah kutu putih dan kutu daun. Bersihkan dengan air mengalir atau semprotan air sabun encer, dan jaga agar tanaman tidak terlalu rapat.
- Aster: Aster bisa diserang kutu daun dan embun tepung (bercak putih seperti bedak di daun) saat terlalu lembap. Jaga sirkulasi udara, jangan menyiram daun, dan buang bagian yang terserang.

**42. p-kuning** (topik `kuning`)

- Kata kunci: `menguning`, `kuning`, `layu`, `=mati`, `kering`, `cokelat`, `coklat`, `rontok`, `busuk`, `merana`, `=sakit`
- Asoka: Daun Asoka menguning biasanya karena tanah terlalu basah, tanah kurang asam sehingga kekurangan zat besi, atau kurang hara. Cek drainase, kurangi penyiraman, dan tambahkan kompos.
- Aster: Aster layu atau menguning biasanya karena akar tergenang, kurang air saat panas terik, atau jamur. Cek kelembapan tanah dulu: kalau becek kurangi siraman, kalau kering siram pagi atau sore.

**43. p-berbunga** (topik `berbunga`)

- Kata kunci: `berbunga`, `tidak mekar`, `belum mekar`, `mekar`, `kuncup`, `bunga sedikit`, `rajin berbunga`
- Asoka: Kalau Asoka sulit berbunga, biasanya penyebabnya kurang matahari, kurang pupuk, atau belum dipangkas. Pastikan mendapat sinar lebih banyak, beri pupuk organik, dan pangkas ringan.
- Aster: Kalau Aster sedikit berbunga: mungkin kurang matahari, terlalu banyak nitrogen, atau bunga layu tidak dibuang. Beri cahaya cukup, pupuk seimbang, dan rutin buang bunga layu.

**44. p-manfaat** (topik `manfaat`)

- Kata kunci: `manfaat`, `kegunaan`, `khasiat`, `berguna`, `=obat`
- Asoka: Asoka dipakai sebagai tanaman hias bedeng dan pagar karena bunganya awet dan cerah, serta menarik kupu-kupu dan lebah. Untuk soal khasiat obat tradisional, tanyakan ke sumber yang terpercaya.
- Aster: Aster dipakai sebagai tanaman hias dan bunga potong yang awet di vas. Bunganya juga menarik lebah dan kupu-kupu.

**45. p-perbanyak** (topik `perbanyak`)

- Kata kunci: `memperbanyak`, `perbanyak`, `=stek`, `cangkok`, `biji`, `benih`, `bibit baru`, `okulasi`
- Asoka: Asoka bisa diperbanyak dengan stek batang atau cangkok. Untuk stek, pilih ranting sehat sepanjang sekitar 15 cm, tanam di media lembap, dan taruh di tempat teduh terang sampai bertunas.
- Aster: Aster diperbanyak dari biji. Semai dulu di media halus, lalu pindahkan ke bedeng saat sudah punya beberapa helai daun.

### 10.8 Tombol saran untuk topik tanaman

Ganti `X` dengan nama tanaman. Contoh: topik `siram` untuk Aster menghasilkan "Cara menyiram Aster".

| Topik | Teks tombol | Topik terkait |
|---|---|---|
| ciri | Ciri-ciri X | rawat, manfaat |
| rawat | Cara merawat X | siram, hama |
| cahaya | Kebutuhan cahaya X | siram, tanah |
| siram | Cara menyiram X | tanah, pupuk |
| tanah | Tanah untuk X | pupuk, siram |
| pupuk | Cara memupuk X | pangkas, hama |
| pangkas | Cara memangkas X | berbunga, hama |
| hama | Hama pada X | kuning, rawat |
| kuning | Kenapa daun X menguning | siram, hama |
| berbunga | Kenapa X tidak berbunga | cahaya, pupuk |
| manfaat | Manfaat X | ciri, rawat |
| perbanyak | Cara memperbanyak X | rawat, tanah |

### 10.9 Uji penerimaan chatbot sederhana

Tiap pertanyaan diuji pada chatbot baru (tanpa konteks sebelumnya). Semua harus lolos.

| Pertanyaan | Jawaban harus berisi |
|---|---|
| Halo | sapaan "Halo! Aku asisten GreenCorner..." |
| Apa itu GreenCorner? | pengenalan proyek |
| apa itu asoka | ciri Asoka |
| Cara merawat Aster | ringkasan perawatan Aster |
| Bagaimana cara menyiram asoka? | penyiraman Asoka |
| Siapa anggota kelompok? | daftar 6 anggota |
| Alat dan bahan apa saja? | skop mini; bunga Asoka dan Aster |
| langkah menanam | langkah kerja 5 tahap |
| kenapa perlu mengukur lahan? | pengukuran lahan dan lembar kerja LKPD |
| Apa fungsi sekam? | sekam sebagai mulsa |
| apa tujuan proyek ini? | daftar tujuan |
| manfaat proyek ini | daftar tujuan |
| kapan proyek ini dibuat | tanggal belum dicatat |
| harga bibitnya berapa | biaya belum dicatat |
| siapa yang menyiram tanaman | pembagian tugas belum dicatat |
| pr matematika bab 3 | pesan tidak paham |
| kenapa aster tidak berbunga | penyebab Aster sedikit berbunga |
| ada kutu putih di asoka | hama pada Asoka |
| berapa jarak tanam | jarak Asoka 30 sampai 50 cm, Aster 20 sampai 30 cm |
| pagi atau sore siramnya? | waktu terbaik menyiram |
| ai kena limit gimana | penjelasan pengalihan AI ke chatbot |
| bagaimana cara ganti mode gelap | tombol bulan atau matahari |
| kelas dan sekolah mana? | X-TE 3, SMK Negeri 2 Purwokerto |
| tanaman apa saja yang ditanam? | Asoka dan Aster |
| cara memupuk asoka | pupuk Asoka |
| musim hujan gimana | tips musim hujan dan kemarau |
| terima kasih | balasan terima kasih |
| asoka dan aster beda apa | ciri kedua tanaman (judul Asoka lalu Aster) |

Uji konteks (berurutan pada satu chatbot): "cara merawat asoka" lalu "kenapa daun menguning?" harus menjawab untuk **Asoka**. Lanjutkan dengan "Kenapa daun Aster menguning", jawabannya harus untuk **Aster**.

## 11. Urutan kerja yang disarankan

1. Siapkan folder dan aset: kecilkan 7 foto, beri nama sesuai bagian 6.
2. Tulis `css/style.css`: token warna (terang dan gelap), tipografi, komponen dasar (tombol, bar atas, pager).
3. Buat kerangka bersama (header, menu, footer, pager) dan 8 halaman statis dari bagian 8: Indeks, Home, Tentang, Kelompok, Alat dan Bahan, Tanaman, Dokumentasi, Penutup.
4. Tambahkan interaksi di `main.js`: menu hamburger, tema gelap, tab tanaman, lightbox galeri, tombol kembali ke atas.
5. Buat halaman FAQ dengan akordeon (bagian 9).
6. Bangun chatbot sederhana (data intent dari 10.7, algoritma 10.6) dan pastikan lolos semua uji di 10.9.
7. Bangun UI chat dan lapisan AI dengan pengalihan (10.2 sampai 10.5). Bila belum ada backend, pakai `AI_ENABLED=false`. Uji skenario limit dengan menyimulasikan kesalahan.
8. QA: ukuran 360, 768, dan 1280 px, mode terang dan gelap, navigasi keyboard, tanpa galat di konsol, tanpa tautan rusak, total ukuran halaman wajar.
9. Tulis ringkasan untuk pemilik: apa yang sudah jadi dan daftar draf yang harus mereka cek (bagian 4).

## 12. Kriteria selesai

- [ ] 9 halaman ada dan saling terhubung (menu, pager, tombol di Home).
- [ ] Semua teks sesuai bagian 8 dan 9. Tidak ada karangan baru soal peran, tanggal, biaya, atau kendala.
- [ ] 7 foto tampil dengan teks alt dan keterangan. Lightbox berfungsi dengan mouse, sentuhan, dan keyboard.
- [ ] Mode terang dan gelap bekerja, pilihan tersimpan, kontras aman.
- [ ] Responsif dari 360 px, tanpa gulir ke samping.
- [ ] Chatbot sederhana lolos semua uji 10.9.
- [ ] Pengalihan AI ke chatbot terbukti jalan saat AI dimatikan atau disimulasikan kena limit.
- [ ] Tidak ada kunci API di kode yang dikirim ke browser.
- [ ] Ringkasan akhir ke pemilik memuat daftar draf yang perlu dicek.
