/**
 * GreenCorner - chatbot-sederhana.js
 * Logika murni Chatbot Sederhana (tanpa DOM)
 * Berdasarkan algoritma bagian 10.6 dan data intent bagian 10.7 KONTEKS.md
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SimpleChatbot = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function normalize(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Definisi Topik Tanaman & Template Tombol Saran
  const PLANT_TOPIC_CONFIG = {
    ciri: {
      buttonLabel: 'Ciri-ciri {X}',
      related: ['rawat', 'manfaat']
    },
    rawat: {
      buttonLabel: 'Cara merawat {X}',
      related: ['siram', 'hama']
    },
    cahaya: {
      buttonLabel: 'Kebutuhan cahaya {X}',
      related: ['siram', 'tanah']
    },
    siram: {
      buttonLabel: 'Cara menyiram {X}',
      related: ['tanah', 'pupuk']
    },
    tanah: {
      buttonLabel: 'Tanah untuk {X}',
      related: ['pupuk', 'siram']
    },
    pupuk: {
      buttonLabel: 'Cara memupuk {X}',
      related: ['pangkas', 'hama']
    },
    pangkas: {
      buttonLabel: 'Cara memangkas {X}',
      related: ['berbunga', 'hama']
    },
    hama: {
      buttonLabel: 'Hama pada {X}',
      related: ['kuning', 'rawat']
    },
    kuning: {
      buttonLabel: 'Kenapa daun {X} menguning',
      related: ['siram', 'hama']
    },
    berbunga: {
      buttonLabel: 'Kenapa {X} tidak berbunga',
      related: ['cahaya', 'pupuk']
    },
    manfaat: {
      buttonLabel: 'Manfaat {X}',
      related: ['ciri', 'rawat']
    },
    perbanyak: {
      buttonLabel: 'Cara memperbanyak {X}',
      related: ['rawat', 'tanah']
    }
  };

  const PLANT_DATA = {
    asoka: {
      name: 'Asoka',
      rawat: 'Ringkasan merawat Asoka: beri matahari penuh, siram saat tanah mulai kering (jangan sampai becek), pakai tanah gembur yang sedikit asam, beri kompos tiap 1 sampai 2 bulan, dan pangkas ringan setelah bunga layu.',
      ciri: 'Asoka (Ixora) adalah semak kecil hijau sepanjang tahun dengan daun hijau mengilap. Bunganya kecil berbentuk bintang dan tersusun bergerombol; warnanya bisa merah, oranye, kuning, merah muda, atau putih. Asoka yang mekar di kebun kami berwarna putih.',
      cahaya: 'Asoka paling suka matahari penuh, kira-kira 4 sampai 6 jam sehari, supaya rajin berbunga. Di tempat terlalu teduh daunnya tetap hijau tetapi bunganya sedikit.',
      siram: 'Jaga tanah Asoka tetap lembap tetapi tidak becek. Sebagai pedoman, siram saat permukaan tanah mulai kering: bisa sekali sehari saat cuaca panas, dan lebih jarang saat sejuk. Air yang menggenang bisa membusukkan akar.',
      tanah: 'Asoka suka tanah gembur yang kaya bahan organik, drainasenya baik, dan sedikit asam (pH sekitar 5,5 sampai 6,5). Campur tanah dengan kompos atau pupuk kandang matang.',
      pupuk: 'Beri Asoka kompos atau pupuk organik setiap 1 sampai 2 bulan. Jangan berlebihan, dan siram setelah memupuk.',
      pangkas: 'Pangkas Asoka secara ringan setelah bunga layu untuk merapikan bentuk dan memancing tunas serta bunga baru. Buang juga ranting kering dan daun yang sakit.',
      hama: 'Hama yang sering menyerang Asoka adalah kutu putih dan kutu daun. Bersihkan dengan air mengalir atau semprotan air sabun encer, dan jaga agar tanaman tidak terlalu rapat.',
      kuning: 'Daun Asoka menguning biasanya karena tanah terlalu basah, tanah kurang asam sehingga kekurangan zat besi, atau kurang hara. Cek drainase, kurangi penyiraman, dan tambahkan kompos.',
      berbunga: 'Kalau Asoka sulit berbunga, biasanya penyebabnya kurang matahari, kurang pupuk, atau belum dipangkas. Pastikan mendapat sinar lebih banyak, beri pupuk organik, dan pangkas ringan.',
      manfaat: 'Asoka dipakai sebagai tanaman hias bedeng dan pagar karena bunganya awet dan cerah, serta menarik kupu-kupu dan lebah. Untuk soal khasiat obat tradisional, tanyakan ke sumber yang terpercaya.',
      perbanyak: 'Asoka bisa diperbanyak dengan stek batang atau cangkok. Untuk stek, pilih ranting sehat sepanjang sekitar 15 cm, tanam di media lembap, dan taruh di tempat teduh terang sampai bertunas.'
    },
    aster: {
      name: 'Aster',
      rawat: 'Ringkasan merawat Aster: beri matahari penuh atau teduh sebagian, siram teratur ke pangkal tanaman, pakai tanah subur dan gembur, beri kompos tiap 3 sampai 4 minggu, dan buang bunga yang layu.',
      ciri: 'Aster (aster Cina, Callistephus chinensis) adalah tanaman berbunga mirip daisy dengan kelopak berlapis, warna ungu, biru, merah muda, atau putih. Tingginya sekitar 30 sampai 80 cm. Nama "aster" dipakai untuk banyak jenis, jadi jenis yang kami tanam sebaiknya dicek lagi.',
      cahaya: 'Aster butuh matahari penuh atau teduh sebagian, sekitar 5 sampai 6 jam sehari. Terlalu teduh membuat batang lemas dan bunga sedikit.',
      siram: 'Siram Aster secara teratur agar tanah lembap, tetapi jangan sampai tergenang. Arahkan air ke pangkal tanaman, bukan ke bunga dan daun, supaya tidak muncul jamur.',
      tanah: 'Aster suka tanah subur, gembur, dan drainasenya baik, dengan pH sekitar 6 sampai 7. Tambahkan kompos sebelum menanam.',
      pupuk: 'Beri Aster pupuk organik atau kompos tiap 3 sampai 4 minggu selama masa tumbuh. Nitrogen yang terlalu banyak membuat daun lebat tetapi bunga sedikit.',
      pangkas: 'Buang bunga Aster yang sudah layu agar muncul kuncup baru, dan pangkas batang yang terlalu panjang supaya tanaman bercabang dan rimbun.',
      hama: 'Aster bisa diserang kutu daun dan embun tepung (bercak putih seperti bedak di daun) saat terlalu lembap. Jaga sirkulasi udara, jangan menyiram daun, dan buang bagian yang terserang.',
      kuning: 'Aster layu atau menguning biasanya karena akar tergenang, kurang air saat panas terik, atau jamur. Cek kelembapan tanah dulu: kalau becek kurangi siraman, kalau kering siram pagi atau sore.',
      berbunga: 'Kalau Aster sedikit berbunga: mungkin kurang matahari, terlalu banyak nitrogen, atau bunga layu tidak dibuang. Beri cahaya cukup, pupuk seimbang, dan rutin buang bunga layu.',
      manfaat: 'Aster dipakai sebagai tanaman hias dan bunga potong yang awet di vas. Bunganya juga menarik lebah dan kupu-kupu.',
      perbanyak: 'Aster diperbanyak dari biji. Semai dulu di media halus, lalu pindahkan ke bedeng saat sudah punya beberapa helai daun.'
    }
  };

  // Daftar Intent 1 sampai 33 (Non-Tanaman)
  const GENERAL_INTENTS = [
    {
      id: 'sapa',
      keywords: ['halo', 'hai', 'hi', 'hello', 'hallo', 'hei', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'assalamualaikum', 'permisi'],
      answer: 'Halo! Aku asisten GreenCorner. Mau tanya soal proyek kami, bunga Asoka dan Aster, atau tips kebun mini?',
      suggestions: ['Apa itu GreenCorner?', 'Cara merawat Asoka', 'Cara merawat Aster', 'Alat dan bahan apa saja?', 'Kenapa daun menguning?', 'Siapa anggota kelompok?']
    },
    {
      id: 'terimakasih',
      keywords: ['terima kasih', 'terimakasih', 'makasih', 'thanks', 'thank you', 'trims', 'matur nuwun'],
      answer: 'Sama-sama! Kalau masih ada yang ingin ditanyakan soal GreenCorner, tanya saja.',
      suggestions: ['Apa itu GreenCorner?', 'Cara merawat Asoka', 'Cara merawat Aster']
    },
    {
      id: 'pamit',
      keywords: ['sampai jumpa', 'dadah', 'bye', 'selamat tinggal'],
      answer: 'Sampai jumpa! Semoga kebunmu selalu hijau.'
    },
    {
      id: 'siapa',
      keywords: ['kamu siapa', 'siapa kamu', 'kamu itu apa', 'nama kamu', 'namamu', 'kamu bisa apa', 'bisa apa saja', 'asisten ini', 'bot ini'],
      answer: 'Aku asisten GreenCorner. Aku bisa menjawab soal proyek kelompok kami, bunga Asoka dan Aster, alat dan bahan, serta tips merawat kebun mini.',
      suggestions: ['Apa itu GreenCorner?', 'Cara merawat Asoka', 'Cara merawat Aster', 'Alat dan bahan apa saja?', 'Kenapa daun menguning?', 'Siapa anggota kelompok?']
    },
    {
      id: 'aibot',
      keywords: ['ai atau chatbot', 'beda ai', 'kenapa chatbot', 'kenapa jawaban', 'izin ai', 'claude', 'kuota', 'batas pemakaian', 'ai aktif', 'limit', 'pakai ai'],
      answer: 'Asisten ini mencoba memakai AI lebih dulu. Kalau AI tidak tersedia, belum diizinkan, atau kena batas pemakaian, jawaban otomatis dialihkan ke chatbot sederhana yang sudah dibekali pengetahuan tentang proyek ini.'
    },
    {
      id: 'greencorner',
      keywords: ['greencorner', 'green corner', 'proyek ini', 'proyek kalian', 'proyek kelompok', 'tentang website', 'website ini tentang'],
      answer: 'GreenCorner adalah proyek kebun mini kelompok kami dari kelas X-TE 3, SMK Negeri 2 Purwokerto. Kami memanfaatkan bedeng sempit di sepanjang dinding menjadi sudut hijau yang ditanami bunga Asoka dan Aster.',
      suggestions: ['Apa tujuan proyek ini?', 'Alat dan bahan apa saja?', 'Siapa anggota kelompok?'],
      pageLink: { text: 'Buka halaman Tentang', url: 'tentang.html' }
    },
    {
      id: 'tujuan',
      keywords: ['apa tujuan', 'tujuan proyek', 'tujuan', 'manfaat proyek', 'manfaat proyek ini', 'manfaat dari proyek', 'latar belakang', 'kenapa membuat', 'mengapa membuat', 'alasan membuat'],
      answer: 'Tujuan GreenCorner:\n- Memanfaatkan lahan sempit menjadi kebun mini.\n- Belajar mengukur lahan dan merencanakan penanaman.\n- Berlatih bekerja sama dalam kelompok.\n- Mempercantik lingkungan dengan tanaman berbunga.',
      suggestions: ['Apa itu GreenCorner?', 'Langkah menanam'],
      pageLink: { text: 'Buka halaman Tentang', url: 'tentang.html' }
    },
    {
      id: 'kebunmini',
      keywords: ['kebun mini', 'taman mini', 'apa itu kebun'],
      answer: 'Kebun mini adalah kebun berskala kecil di lahan sempit atau wadah, cocok untuk tanaman hias, bunga, atau sayur. Kelebihannya mudah dirawat, hemat tempat, dan membuat lingkungan lebih asri.',
      suggestions: ['Tips media tanam dan drainase', 'Tanaman apa saja yang ditanam?']
    },
    {
      id: 'anggota',
      keywords: ['anggota', 'kelompok', 'siapa saja', 'siapa yang membuat', 'pembuat', 'pelaksana', 'absen', 'berapa orang', 'jumlah anggota', 'tim'],
      answer: 'Kelompok kami terdiri dari 6 anggota kelas X-TE 3:\n- Kukuh Dwi Aditya (absen 31)\n- Levandra Fulvian Haidar (absen 32)\n- Lilin Revalina Afriliani (absen 33)\n- Marissa Adelia Putri (absen 34)\n- Marwa Ananta Rizqullah (absen 35)\n- Maulana Dzaefa Ibrahim (absen 36)',
      suggestions: ['Kelas dan sekolah mana?'],
      pageLink: { text: 'Buka halaman Kelompok', url: 'kelompok.html' }
    },
    {
      id: 'peran',
      keywords: ['peran', 'pembagian tugas', 'tugas masing', 'jobdesk', 'siapa yang menyiram'],
      answer: 'Pembagian tugas tiap anggota belum dicatat di website ini.',
      suggestions: ['Siapa anggota kelompok?']
    },
    {
      id: 'sekolah',
      keywords: ['sekolah', 'kelas', 'smk', 'purwokerto', 'jurusan', 'x te 3', 'te 3'],
      answer: 'Kami dari kelas X-TE 3, SMK Negeri 2 Purwokerto.',
      suggestions: ['Siapa anggota kelompok?']
    },
    {
      id: 'alatbahan',
      keywords: ['alat dan bahan', 'alat bahan', 'alat & bahan', 'yang dibutuhkan', 'yang disiapkan'],
      answer: '**Alat:** skop mini untuk menggali dan menggemburkan tanah.\n**Bahan:** bunga Asoka dan bunga Aster.',
      suggestions: ['Langkah menanam', 'Kenapa perlu mengukur lahan?'],
      pageLink: { text: 'Buka halaman Alat dan Bahan', url: 'alat-bahan.html' }
    },
    {
      id: 'alat',
      keywords: ['=alat', 'skop', 'sekop', 'peralatan', 'perlengkapan'],
      answer: 'Alat yang kami pakai adalah skop mini, untuk menggali lubang tanam dan menggemburkan tanah.',
      suggestions: ['Bahan apa yang dipakai?', 'Langkah menanam'],
      pageLink: { text: 'Buka halaman Alat dan Bahan', url: 'alat-bahan.html' }
    },
    {
      id: 'bahan',
      keywords: ['bahan', 'bibit'],
      answer: 'Bahan yang kami pakai adalah bunga Asoka dan bunga Aster.',
      suggestions: ['Ciri-ciri Asoka', 'Ciri-ciri Aster'],
      pageLink: { text: 'Buka halaman Alat dan Bahan', url: 'alat-bahan.html' }
    },
    {
      id: 'langkah',
      keywords: ['langkah', 'cara menanam', 'cara tanam', 'menanam', 'penanaman', 'proses', 'tahap', 'cara membuat', 'prosedur'],
      answer: 'Langkah kerja kami:\n1. Ukur lahan dan catat di lembar kerja.\n2. Gemburkan tanah dengan skop mini.\n3. Buat lubang tanam sesuai jarak.\n4. Tanam bibit, lalu padatkan tanah di sekitarnya.\n5. Siram secukupnya dan tutup tanah dengan sekam.',
      suggestions: ['Kenapa perlu mengukur lahan?', 'Apa fungsi sekam?'],
      pageLink: { text: 'Buka halaman Alat dan Bahan', url: 'alat-bahan.html' }
    },
    {
      id: 'ukur',
      keywords: ['ukur', 'pengukuran', 'lkpd', 'meteran', 'luas lahan', 'panjang bedeng'],
      answer: 'Sebelum menanam, kami mengukur bedeng dan mengisi lembar kerja Pengukuran Lahan (LKPD). Hasil ukuran dipakai untuk merencanakan jarak tanam dan jumlah bibit. Fotonya ada di halaman Dokumentasi.',
      pageLink: { text: 'Buka halaman Dokumentasi', url: 'dokumentasi.html' }
    },
    {
      id: 'sekam',
      keywords: ['sekam', 'mulsa', 'jerami'],
      answer: 'Pada foto dokumentasi tampak sekam di sekitar Asoka. Sekam berfungsi sebagai mulsa: menjaga tanah tetap lembap, menekan rumput liar, dan melindungi tanah dari hujan deras atau terik.',
      pageLink: { text: 'Buka halaman Dokumentasi', url: 'dokumentasi.html' }
    },
    {
      id: 'daftar',
      keywords: ['tanaman apa', 'jenis tanaman', 'tanaman yang ditanam', 'bunga apa', 'ditanam apa', 'apa saja tanaman'],
      answer: 'Tanaman utama proyek kami adalah bunga Asoka dan bunga Aster.',
      suggestions: ['Ciri-ciri Asoka', 'Ciri-ciri Aster'],
      pageLink: { text: 'Buka halaman Tanaman', url: 'tanaman.html' }
    },
    {
      id: 'dok',
      keywords: ['dokumentasi', 'foto', 'galeri', '=gambar', 'video'],
      answer: 'Halaman Dokumentasi berisi 7 foto: berdiskusi mengisi lembar kerja, mengukur bedeng, proses penanaman, sampai hasil akhir. Ketuk foto untuk memperbesar.',
      pageLink: { text: 'Buka halaman Dokumentasi', url: 'dokumentasi.html' }
    },
    {
      id: 'lokasi',
      keywords: ['lokasi', 'di mana', 'dimana', 'tempatnya'],
      answer: 'Kebun mini kami berada di bedeng memanjang di sepanjang dinding bangunan, seperti terlihat pada foto dokumentasi.',
      pageLink: { text: 'Buka halaman Dokumentasi', url: 'dokumentasi.html' }
    },
    {
      id: 'waktu',
      keywords: ['kapan proyek', 'kapan dibuat', 'kapan dikerjakan', 'kapan mulai', 'kapan', 'tanggal', 'waktu pelaksanaan', 'hari apa'],
      answer: 'Tanggal pelaksanaan belum dicatat di website ini.'
    },
    {
      id: 'biaya',
      keywords: ['harga bibit', 'berapa harga', 'berapa biaya', 'biaya', 'harga', 'modal', 'anggaran'],
      answer: 'Rincian biaya belum dicatat di website ini.'
    },
    {
      id: 'hasil',
      keywords: ['hasil', 'panen', 'perkembangan'],
      answer: 'Kondisi terbaru kebun bisa dilihat pada foto hasil di halaman Dokumentasi. Bunga Asoka putih sudah terlihat mekar.',
      pageLink: { text: 'Buka halaman Dokumentasi', url: 'dokumentasi.html' }
    },
    {
      id: 'kendala',
      keywords: ['kendala', 'kesulitan', 'tantangan'],
      answer: 'Catatan kendala belum ditulis di website ini.'
    },
    {
      id: 'penutup',
      keywords: ['kesimpulan', 'penutup', 'saran', 'simpulan'],
      answer: 'Kesimpulan kami: lahan sempit pun bisa menjadi kebun mini yang cantik lewat perencanaan, penanaman, dan perawatan bersama. Sarannya: siram dan periksa tanaman rutin, buang bunga layu, tambah jenis tanaman, dan jaga kebersihan kebun.',
      pageLink: { text: 'Buka halaman Penutup', url: 'penutup.html' }
    },
    {
      id: 'drainase',
      keywords: ['drainase', 'becek', 'genangan', 'tergenang', 'media tanam'],
      answer: 'Bedeng perlu drainase yang baik: campur tanah dengan kompos atau sedikit pasir, dan jangan biarkan air menggenang berjam-jam. Akar yang terendam mudah busuk.'
    },
    {
      id: 'jarak',
      keywords: ['jarak tanam', 'berapa jarak', 'jarak antar'],
      answer: 'Sebagai pedoman, jarak tanam Asoka sekitar 30 sampai 50 cm dan Aster sekitar 20 sampai 30 cm, supaya tidak berdesakan dan udara mengalir baik.'
    },
    {
      id: 'waktusiram',
      keywords: ['pagi atau sore', 'jam berapa', 'kapan siram', 'waktu siram', 'waktu menyiram', 'siang hari'],
      answer: 'Waktu terbaik menyiram adalah pagi sebelum terik atau sore hari. Menyiram siang hari boros karena air cepat menguap.'
    },
    {
      id: 'alami',
      keywords: ['ramah lingkungan', 'alami', 'organik', 'pestisida', 'air sabun'],
      answer: 'Cara ramah lingkungan mengendalikan hama: ambil hama dengan tangan, semprot air sabun encer untuk kutu, dan jaga tanaman tetap sehat dengan cahaya, air, dan pupuk organik yang cukup. Hindari pestisida kimia berlebihan.'
    },
    {
      id: 'musim',
      keywords: ['hujan', 'kemarau', 'musim', 'banjir'],
      answer: 'Musim hujan: pastikan drainase lancar dan kurangi siraman. Musim kemarau: siram lebih sering dan tutup tanah dengan mulsa seperti sekam agar tidak cepat kering.'
    },
    {
      id: 'tanamanlain',
      keywords: ['tanaman lain', 'tambah tanaman', 'rekomendasi tanaman', 'bunga lain', 'saran tanaman'],
      answer: 'Bunga lain yang cocok untuk kebun mini yang terkena matahari: marigold, portulaka, zinnia, dan bunga kertas. Sesuaikan dengan cahaya dan luas bedengnya.'
    },
    {
      id: 'website',
      keywords: ['cara pakai', 'cara menggunakan', 'navigasi', '=menu', 'halaman apa', 'ada halaman'],
      answer: 'Website ini punya 9 halaman: Indeks, Home, Tentang, Kelompok, Alat dan Bahan, Tanaman, Dokumentasi, FAQ, dan Penutup. Pakai menu di atas atau tombol Sebelumnya dan Berikutnya di bawah tiap halaman.',
      pageLink: { text: 'Buka halaman Home', url: 'home.html' }
    },
    {
      id: 'gelap',
      keywords: ['mode gelap', 'dark mode', 'tema gelap', 'ganti tema', 'mode terang'],
      answer: 'Ketuk tombol bulan atau matahari di bar atas untuk berganti antara mode terang dan gelap.'
    }
  ];

  // Daftar Intent 34 sampai 45 (Topik Tanaman)
  const PLANT_TOPIC_INTENTS = [
    {
      id: 'p-rawat',
      topic: 'rawat',
      keywords: ['merawat', 'rawat', 'perawatan', 'memelihara', 'pelihara']
    },
    {
      id: 'p-ciri',
      topic: 'ciri',
      keywords: ['ciri', 'seperti apa', 'bentuk', 'warna bunga', 'nama ilmiah', 'nama latin', 'asal usul', 'tinggi tanaman', 'famili', '=suku']
    },
    {
      id: 'p-cahaya',
      topic: 'cahaya',
      keywords: ['cahaya', 'matahari', 'sinar', 'panas', 'teduh', '=terang', 'jemur', 'naungan']
    },
    {
      id: 'p-siram',
      topic: 'siram',
      keywords: ['siram', 'nyiram', 'menyiram', 'penyiraman', 'disiram', 'air', 'berapa kali', 'kekurangan air', 'kelebihan air']
    },
    {
      id: 'p-tanah',
      topic: 'tanah',
      keywords: ['tanah', 'substrat', 'ph', 'gembur', 'asam', 'media']
    },
    {
      id: 'p-pupuk',
      topic: 'pupuk',
      keywords: ['pupuk', 'memupuk', 'mupuk', 'kompos', 'nutrisi', 'npk', 'unsur hara', 'vitamin']
    },
    {
      id: 'p-pangkas',
      topic: 'pangkas',
      keywords: ['pangkas', 'memangkas', 'mangkas', 'pemangkasan', 'potong', 'bunga layu', 'rapikan']
    },
    {
      id: 'p-hama',
      topic: 'hama',
      keywords: ['hama', 'kutu', '=ulat', 'serangga', 'jamur', 'penyakit', 'embun tepung', 'bercak', 'belalang', 'siput', 'semut', 'tungau']
    },
    {
      id: 'p-kuning',
      topic: 'kuning',
      keywords: ['menguning', 'kuning', 'layu', '=mati', 'kering', 'cokelat', 'coklat', 'rontok', 'busuk', 'merana', '=sakit']
    },
    {
      id: 'p-berbunga',
      topic: 'berbunga',
      keywords: ['berbunga', 'tidak mekar', 'belum mekar', 'mekar', 'kuncup', 'bunga sedikit', 'rajin berbunga']
    },
    {
      id: 'p-manfaat',
      topic: 'manfaat',
      keywords: ['manfaat', 'kegunaan', 'khasiat', 'berguna', '=obat']
    },
    {
      id: 'p-perbanyak',
      topic: 'perbanyak',
      keywords: ['memperbanyak', 'perbanyak', '=stek', 'cangkok', 'biji', 'benih', 'bibit baru', 'okulasi']
    }
  ];

  // Algoritma Penilaian Kecocokan Keyword
  function scoreIntent(intentKeywords, normalizedInput, wordsList) {
    let highestMatch = 0;
    let matchCount = 0;

    for (let kw of intentKeywords) {
      let isExactWord = false;
      let cleanKw = kw;
      if (kw.startsWith('=')) {
        isExactWord = true;
        cleanKw = kw.slice(1);
      } else if (cleanKw.length <= 3 && !cleanKw.includes(' ')) {
        isExactWord = true;
      }

      let matched = false;
      let val = 0;

      if (isExactWord) {
        if (wordsList.includes(cleanKw)) {
          matched = true;
          val = cleanKw.length >= 5 ? 3 : 2;
        }
      } else if (cleanKw.includes(' ')) {
        // Frasa (mengandung spasi)
        if (normalizedInput.includes(cleanKw)) {
          matched = true;
          val = 4;
        }
      } else {
        // Kata tunggal > 3 huruf
        if (normalizedInput.includes(cleanKw)) {
          matched = true;
          val = cleanKw.length >= 5 ? 3 : 2;
        }
      }

      if (matched) {
        matchCount++;
        if (val > highestMatch) {
          highestMatch = val;
        }
      }
    }

    if (highestMatch === 0) return 0;
    return highestMatch + 0.5 * Math.min(matchCount - 1, 2);
  }

  // Kelas Chatbot Sederhana
  class SimpleChatbot {
    constructor() {
      this.contextPlant = null; // 'asoka' | 'aster' | null
    }

    resetContext() {
      this.contextPlant = null;
    }

    getContext() {
      return this.contextPlant;
    }

    processMessage(rawInput) {
      const normalized = normalize(rawInput);
      if (!normalized) {
        return {
          text: 'Silakan ketik pertanyaan seputar proyek GreenCorner atau tanaman Asoka dan Aster.',
          suggestions: ['Apa itu GreenCorner?', 'Cara merawat Asoka', 'Cara merawat Aster'],
          source: 'Chatbot sederhana'
        };
      }

      const words = normalized.split(/\s+/);

      // 1. Deteksi Tanaman yang disebut
      const hasAsoka = /\b(asoka|soka|ixora)\b/.test(normalized);
      const hasAster = /\b(aster|callistephus)\b/.test(normalized);

      let targetPlant = null;
      let bothPlants = false;

      if (hasAsoka && hasAster) {
        bothPlants = true;
        this.contextPlant = null; // bila keduanya disebut, jawab keduanya dan hapus konteks
      } else if (hasAsoka) {
        targetPlant = 'asoka';
        this.contextPlant = 'asoka';
      } else if (hasAster) {
        targetPlant = 'aster';
        this.contextPlant = 'aster';
      } else {
        // Tidak ada nama tanaman disebut
        targetPlant = this.contextPlant; // bisa 'asoka', 'aster', atau null
      }

      // 2. Evaluasi Intent Umum (1 s/d 33)
      let bestGeneralIntent = null;
      let maxGeneralScore = 0;

      for (let intent of GENERAL_INTENTS) {
        const score = scoreIntent(intent.keywords, normalized, words);
        if (score >= 2 && score > maxGeneralScore) {
          maxGeneralScore = score;
          bestGeneralIntent = intent;
        }
      }

      // 3. Evaluasi Intent Topik Tanaman (34 s/d 45)
      let bestPlantTopic = null;
      let maxPlantTopicScore = 0;

      for (let intent of PLANT_TOPIC_INTENTS) {
        const score = scoreIntent(intent.keywords, normalized, words);
        if (score >= 2 && score > maxPlantTopicScore) {
          maxPlantTopicScore = score;
          bestPlantTopic = intent;
        }
      }

      // Kasus Khusus: Bila HANYA nama tanaman disebut tanpa topik (misal "apa itu asoka", "bunga aster", "asoka")
      if ((hasAsoka || hasAster) && !bestPlantTopic && !bestGeneralIntent) {
        bestPlantTopic = { id: 'p-ciri', topic: 'ciri' };
        maxPlantTopicScore = 3;
      }

      // Kasus perbedaan: "asoka dan aster beda apa"
      if (bothPlants && (normalized.includes('beda') || normalized.includes('perbedaan') || !bestPlantTopic)) {
        bestPlantTopic = { id: 'p-ciri', topic: 'ciri' };
        maxPlantTopicScore = 4;
      }

      // 4. Putuskan pemenang antara Intent Umum vs Intent Topik Tanaman
      // Catatan: Jika keduanya cocok dengan skor sama, intent yang lebih dulu di daftar menang.
      let finalChoice = null;
      let isPlantTopic = false;

      if (maxGeneralScore >= 2 && maxGeneralScore >= maxPlantTopicScore) {
        finalChoice = bestGeneralIntent;
        isPlantTopic = false;
      } else if (maxPlantTopicScore >= 2) {
        finalChoice = bestPlantTopic;
        isPlantTopic = true;
      }

      // 5. Generate Jawaban
      if (isPlantTopic && finalChoice) {
        const topicKey = finalChoice.topic;
        const topicCfg = PLANT_TOPIC_CONFIG[topicKey];

        let replyText = '';
        let suggestions = [];

        if (bothPlants || !targetPlant) {
          // Jawab kedua tanaman (judul Asoka lalu Aster)
          replyText = `**Asoka**\n${PLANT_DATA.asoka[topicKey]}\n\n**Aster**\n${PLANT_DATA.aster[topicKey]}`;
          suggestions = [
            topicCfg.buttonLabel.replace('{X}', 'Asoka'),
            topicCfg.buttonLabel.replace('{X}', 'Aster'),
            'Buka halaman Tanaman'
          ];
        } else {
          // Jawab satu tanaman
          const pData = PLANT_DATA[targetPlant];
          const otherPlant = targetPlant === 'asoka' ? 'aster' : 'asoka';
          const otherName = targetPlant === 'asoka' ? 'Aster' : 'Asoka';

          replyText = pData[topicKey];

          // Tombol saran:
          // 1. Pertanyaan yang sama untuk tanaman lain
          suggestions.push(topicCfg.buttonLabel.replace('{X}', otherName));

          // 2 & 3. Dua topik terkait
          if (topicCfg.related) {
            for (let relTopic of topicCfg.related) {
              if (PLANT_TOPIC_CONFIG[relTopic]) {
                suggestions.push(PLANT_TOPIC_CONFIG[relTopic].buttonLabel.replace('{X}', pData.name));
              }
            }
          }
        }

        return {
          text: replyText,
          suggestions: suggestions.slice(0, 3),
          pageLink: { text: 'Buka halaman Tanaman', url: 'tanaman.html' },
          source: 'Chatbot sederhana'
        };
      }

      if (finalChoice) {
        return {
          text: finalChoice.answer,
          suggestions: finalChoice.suggestions ? finalChoice.suggestions.slice(0, 3) : [],
          pageLink: finalChoice.pageLink || null,
          source: 'Chatbot sederhana'
        };
      }

      // 6. Tidak Paham (Fallback)
      return {
        text: 'Maaf, chatbot sederhana belum punya jawaban untuk itu. Coba tanya soal proyek GreenCorner, bunga Asoka atau Aster, alat dan bahan, atau tips merawat kebun mini.',
        suggestions: [
          'Apa itu GreenCorner?',
          'Cara merawat Asoka',
          'Cara merawat Aster',
          'Alat dan bahan apa saja?'
        ],
        pageLink: null,
        source: 'Chatbot sederhana'
      };
    }
  }

  return SimpleChatbot;
});
