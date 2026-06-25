# Project Context Prompt — Aplikasi Klasifikasi Citra Bencana (Banjir & Kebakaran)

Gunakan teks di bawah ini sebagai prompt awal/system context saat memulai sesi dengan AI coding agent kamu (Cursor, Windsurf, Lovable, v0, Claude Code, dll). Tempel seluruh isi di bawah judul ini.

---

## 1. Konteks Proyek

Saya sedang membangun aplikasi web yang merupakan **implementasi praktis dari hasil riset skripsi/jurnal saya** berjudul:

> "Analisis Performa Model Deep Learning Dalam Klasifikasi Citra Banjir dan Kebakaran Menggunakan CNN, VGG16, dan ResNet50"

Ringkasan riset:
- Tujuan riset: membandingkan performa 3 arsitektur deep learning (CNN kustom, VGG16, ResNet50) untuk klasifikasi citra bencana ke dalam 2 kelas: **Banjir (Flood)** dan **Kebakaran (Fire)**.
- Dataset: 1.600 citra (800 banjir, 800 kebakaran) dari Kaggle, dibagi 70:15:15 (train:val:test), resize ke 224x224, dengan augmentasi pada data training.
- Hasil performa model:

| Model | Accuracy | Precision | Recall | F1-Score |
|---|---|---|---|---|
| **CNN Kustom** | **92.08%** | 92.16% | 92.08% | 92.08% |
| VGG16 | 91.67% | 91.77% | 91.67% | 91.66% |
| ResNet50 | 73.33% | 73.35% | 73.33% | 72.32% |

- Kesimpulan riset: CNN kustom yang dirancang sederhana justru mengungguli model pretrained (VGG16, ResNet50) pada dataset terbatas. Riset ini ditujukan untuk berkontribusi pada **pengembangan sistem deteksi bencana otomatis berbasis citra digital** guna mendukung mitigasi dan pengambilan keputusan cepat saat darurat.

Saya **sudah membangun tampilan UI/UX** aplikasinya (web app, kemungkinan React/Next.js — sebutkan stack pastinya ke agent), tapi **belum ada logika/fungsi apapun** yang berjalan di baliknya. Tugas Anda adalah membantu saya mengubah UI ini menjadi aplikasi yang benar-benar berfungsi.

## 2. Tujuan Aplikasi

Aplikasi ini adalah **prototipe sistem deteksi bencana otomatis**, dengan dua fungsi utama:

1. **Fungsi inti (user-facing)**: pengguna mengunggah sebuah citra (foto lokasi/kondisi tertentu), sistem mengklasifikasikan citra tersebut sebagai **Banjir** atau **Kebakaran** menggunakan model CNN kustom (model terbaik dari riset), lalu menampilkan hasil klasifikasi beserta tingkat keyakinan (confidence score).
2. **Fungsi pendukung (showcase riset)**: menampilkan perbandingan performa ketiga model (CNN, VGG16, ResNet50) sebagai bukti/transparansi bahwa CNN kustom adalah model dengan performa terbaik — bisa berupa halaman "Tentang Model" atau dashboard metrik.

Target pengguna: petugas penanggulangan bencana, relawan, atau masyarakat umum yang ingin melaporkan/memverifikasi kondisi bencana secara cepat lewat foto.

## 3. Fitur yang Perlu Dibangun (logika di balik UI)

Tolong bantu saya identifikasi halaman UI yang sudah ada, lalu sambungkan dengan logika berikut:

- **Upload citra**: form/drag-drop untuk mengunggah gambar (jpg/png).
- **Proses klasifikasi**: kirim gambar ke model (lihat opsi arsitektur backend di bagian 4), terima hasil prediksi kelas (Banjir/Kebakaran) + confidence score.
- **Tampilan hasil**: tampilkan label prediksi, confidence score, dan idealnya badge warna berbeda (misal biru untuk banjir, merah/oranye untuk kebakaran).
- **(Opsional) Perbandingan model**: halaman statis/dinamis yang menampilkan tabel metrik accuracy/precision/recall/F1 ketiga model di atas, sebagai bentuk dokumentasi riset.
- **(Opsional) Riwayat klasifikasi**: menyimpan histori gambar yang pernah diklasifikasikan beserta hasilnya (bisa pakai local storage/database sederhana).
- **(Opsional) Halaman "Tentang"**: ringkasan metodologi riset (dataset, arsitektur, hasil) untuk konteks akademik.

## 4. Opsi Arsitektur Backend (pilih sesuai kebutuhan saya)

Karena model dilatih dengan deep learning (kemungkinan TensorFlow/Keras berdasarkan istilah "batch normalization", "fully connected layer" di metodologi), ada beberapa cara menghubungkan model ke web app:

- **Opsi A — Backend Python terpisah**: serve model (`.h5`/`SavedModel`) lewat API (FastAPI/Flask), web app React memanggil endpoint tersebut via REST API.
- **Opsi B — Model di sisi client**: convert model ke TensorFlow.js, jalankan inferensi langsung di browser (cocok kalau model CNN kustom relatif kecil).
- **Opsi C — Cloud inference**: deploy model ke layanan seperti Hugging Face Spaces / Replicate / cloud function, lalu web app memanggil API tersebut.

> Catatan untuk saya isi sebelum mulai: saya **punya file model hasil training** (.h5/.pt) atau **belum**? Jika belum, agent perlu bantu saya export model dari notebook training terlebih dahulu.

## 5. Instruksi untuk Agent

1. Pelajari struktur UI yang sudah saya buat terlebih dahulu (komponen, halaman, routing) sebelum menambah logika apapun.
2. Identifikasi halaman/komponen mana yang berfungsi sebagai form upload, hasil prediksi, dan (jika ada) halaman perbandingan model.
3. Sarankan arsitektur backend yang paling sesuai dengan tech stack saya saat ini (tanyakan jika perlu informasi tambahan, seperti format model atau platform hosting).
4. Bangun logika upload → inferensi → tampilkan hasil, sambil mempertahankan desain UI yang sudah ada.
5. Jangan ubah keputusan desain visual tanpa konfirmasi — fokus pada fungsi, bukan ubah tampilan.
6. Jika ada bagian UI yang ambigu tujuannya, tanyakan ke saya alih-alih berasumsi.

---

**Catatan tambahan untuk saya isi sebelum kirim ke agent:**
- Tech stack pasti (Next.js? Vite + React? dll): ______
- Apakah sudah punya file model hasil training: ______
- Folder/struktur project saat ini (boleh paste hasil `tree` atau screenshot struktur folder): ______
