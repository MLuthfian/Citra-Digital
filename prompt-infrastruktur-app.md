# PROMPT UNTUK AGENT AI — APLIKASI KLASIFIKASI KERUSAKAN INFRASTRUKTUR

---

Buatkan aplikasi web lengkap menggunakan **Full Next.js (App Router, TypeScript, Tailwind CSS)** untuk sistem klasifikasi citra kerusakan infrastruktur berbasis deep learning. Aplikasi ini merupakan implementasi frontend dari hasil penelitian perbandingan model CNN, MobileNetV2, dan ResNet50 dengan pendekatan transfer learning dan fine-tuning.

---

## DESAIN UI (WAJIB IKUTI REFERENSI GAMBAR)

Desain harus mengikuti referensi UI berikut secara ketat:

- **Background**: Full dark/near-black (`#080808` hingga `#0d0d0d`), bukan putih atau abu-abu
- **Efek visual**: Radial gradient blur halus berwarna hijau muda/teal (`rgba(120,180,120,0.15)`) di pojok kanan atas, dan blur abu-abu gelap di sisi kiri — menciptakan efek "glow" ambient yang elegan
- **Typography**: Font display besar (bold, putih bersih) untuk heading utama; subtitle warna `rgba(255,255,255,0.55)`
- **Navbar**: Transparan dengan backdrop blur, item navigasi putih tipis, tombol CTA dengan border tipis di kanan
- **Card & komponen**: Border tipis `rgba(255,255,255,0.08)`, background `rgba(255,255,255,0.04)`, border-radius 12–16px, efek glassmorphism ringan
- **Tombol primer**: Background putih, teks hitam, border-radius penuh (pill shape)
- **Tombol sekunder**: Transparan, border putih tipis, teks putih, dengan ikon panah `↗`
- **Node/badge floating**: Bulat kecil dengan label nama dan angka di bawahnya, tersebar di hero section — mewakili nama model dan nilai metrik akurasi
- **Garis koneksi**: SVG line tipis putih `opacity: 0.15` menghubungkan antar node (seperti grafik neural network)
- **Scroll indicator**: Tombol bulat kecil kiri bawah dengan label "Scroll down" dan nomor halaman (misal: `01/04`)
- **Logo bar**: Bar bawah dengan logo-logo mitra/teknologi dalam warna abu-abu muted (opacity rendah)
- **Responsive**: Wajib responsif di semua device (mobile 375px, tablet 768px, desktop 1280px+)
- **Animasi**: Subtle fade-in saat mount, floating animation pada node, smooth scroll antar section

---

## FITUR-FITUR APLIKASI (DARI JURNAL)

### 1. HALAMAN UTAMA / HERO SECTION (`/`)

Komponen hero section persis seperti referensi gambar:

```
- Navbar: Logo + menu navigasi (Home | Upload Citra | Model Comparison | Hasil Analisis | Tentang) + tombol "Mulai Analisis ↗"
- Floating nodes di sekitar hero (mewakili 3 model dengan akurasi mereka):
    • Node "ResNet50" — 98.63 (pojok kanan atas)
    • Node "CNN" — 97.08 (pojok kiri atas)  
    • Node "MobileNetV2" — 95.53 (pojok kiri bawah)
    • Node "F1-Score" — 98.63 (pojok kanan bawah)
  Setiap node: lingkaran kecil putih + label nama + nilai akurasi di bawah
  Hubungkan antar node dengan SVG line tipis (seperti jaringan)
- Badge pill di tengah atas: "🔬 Analisis Kerusakan Infrastruktur →"
- Heading utama besar: "Deteksi Otomatis Kerusakan Infrastruktur"
  (kata "Infrastruktur" berwarna sedikit lebih muted/gray)
- Subtitle: "Sistem klasifikasi citra berbasis deep learning yang membandingkan CNN, MobileNetV2, dan ResNet50 dengan transfer learning dan fine-tuning"
- Dua tombol CTA:
    • "Upload Citra ↗" (tombol gelap dengan border)
    • "Lihat Perbandingan Model" (tombol putih solid)
- Scroll indicator kiri bawah: tombol bulat + "01/04 · Scroll down"
- Label kanan bawah: "AI Horizons" + garis dekoratif pendek
- Logo bar di paling bawah: PyTorch | TensorFlow | Kaggle | ImageNet | Python | Keras
  (semua muted, opacity 40%)
```

---

### 2. HALAMAN UPLOAD & KLASIFIKASI (`/upload`)

Fitur utama: user upload foto infrastruktur → sistem mengklasifikasi sebagai **Rusak** atau **Tidak Rusak**

```
Layout dark card terpusat dengan komponen:

UPLOAD ZONE:
- Drag & drop area besar dengan border dashed tipis putih opacity-20
- Icon upload + teks "Seret foto infrastruktur ke sini"
- Sub-teks: "atau klik untuk memilih file (JPG, PNG, WEBP — maks 10MB)"
- Preview thumbnail setelah upload dengan overlay info (nama file, ukuran)
- Tombol "Hapus" (X) di pojok thumbnail

PILIH MODEL:
- Tiga card model yang bisa dipilih (single select, selected = border putih terang):
    • Card "CNN" — Custom CNN — Accuracy: 97.08%
    • Card "MobileNetV2" — Transfer Learning — Accuracy: 95.53%
    • Card "ResNet50" — Transfer Learning + Fine-tuning — Accuracy: 98.63% + badge "Terbaik"
  Setiap card memiliki: nama model, deskripsi singkat, badge akurasi, dan chip arsitektur

TOMBOL ANALISIS:
- Tombol besar "Analisis Citra →" (aktif hanya jika ada gambar + model dipilih)
- Loading state: shimmer/pulse animation + teks "Menganalisis..."

HASIL KLASIFIKASI (muncul setelah analisis):
- Badge besar hasil: 
    "✓ TIDAK RUSAK" (warna hijau teal) ATAU "⚠ RUSAK" (warna merah/oranye)
- Confidence bar: progress bar dengan persentase keyakinan model
- Breakdown dua kelas:
    • dmg_infrastructure: XX%
    • no_dmg_infrastructure: XX%
- Info model yang digunakan + waktu inferensi (simulasi)
- Tombol "Analisis Ulang" + "Upload Gambar Baru"
```

Catatan: Karena tidak ada backend ML, gunakan **simulasi hasil** dengan random confidence yang realistis (70–99%) berdasarkan akurasi model yang dipilih, dengan sedikit delay 1.5–2.5 detik untuk simulasi inferensi.

---

### 3. HALAMAN PERBANDINGAN MODEL (`/model-comparison`)

Visualisasi interaktif perbandingan kinerja tiga model dari hasil penelitian.

```
SUB-NAVBAR TABS:
- Tabs horizontal: [Akurasi & Metrik] [Grafik Training] [Confusion Matrix] [Arsitektur Model]

TAB 1 — AKURASI & METRIK:
- Tabel perbandingan (desain dark table):
    | Model       | Accuracy | Precision | Recall | F1-Score |
    | CNN         | 97.08%   | 0.97      | 0.97   | 0.97     |
    | MobileNetV2 | 95.53%   | 0.96      | 0.95   | 0.95     |
    | ResNet50    | 98.63%   | 0.97      | 0.98   | 0.98     |
  Row ResNet50 di-highlight dengan border kiri putih atau background sedikit lebih terang
- 4 Card metrik di atas tabel (best model highlight):
    Best Accuracy: 98.63% (ResNet50)
    Best Precision: 98.65% (ResNet50)
    Best Recall: 98.63% (ResNet50)
    Best F1-Score: 98.63% (ResNet50)
- Bar chart horizontal per metrik (menggunakan recharts atau custom SVG/CSS):
  3 bar per grup (CNN=biru, MobileNetV2=orange, ResNet50=hijau-teal)

TAB 2 — GRAFIK TRAINING:
- Toggle: [Accuracy] [Loss]
- Line chart (recharts) menampilkan kurva training vs epoch:
  Accuracy chart: 3 garis (CNN fluktuatif, MobileNetV2 stabil, ResNet50 stabil+tinggi)
  Loss chart: 3 garis (CNN fluktuatif tinggi, dua lainnya konvergen lebih halus)
- Sumbu X: Epoch (0–20), Sumbu Y: nilai metrik
- Legend: warna per model + keterangan
- Tooltip interaktif saat hover titik data

TAB 3 — CONFUSION MATRIX:
- Selector model: 3 tombol pill (CNN | MobileNetV2 | ResNet50)
- Visualisasi confusion matrix 2×2 sebagai grid berwarna:
    CNN:         TP=280, FN=11, FP=6, TN=285
    MobileNetV2: TP=265, FN=26, FP=0, TN=291
    ResNet50:    TP=284, FN=7,  FP=1, TN=290
  Cell TP & TN: warna teal/hijau gelap
  Cell FP & FN: warna merah gelap
  Setiap cell: angka besar + label (True Positive, dll)
- Label sumbu: Actual (kiri, vertikal) | Predicted (bawah, horizontal)
- Kelas: dmg_infrastructure | no_dmg_infrastructure
- Summary card di bawah: Total benar, Total salah, Akurasi

TAB 4 — ARSITEKTUR MODEL:
- 3 card per model (accordion/expandable):
  CNN:
    - Layer: Input(224×224×3) → Conv2D → MaxPool → Conv2D → MaxPool → Flatten → Dense → Output
    - Dilatih dari awal (training from scratch)
    - Keunggulan: adaptif terhadap dataset spesifik
    - Keterbatasan: fluktuasi training lebih tinggi
  MobileNetV2:
    - Pre-trained ImageNet → Feature extraction → Fine-tuning layer akhir
    - Depthwise separable convolution
    - Keunggulan: ringan, efisien komputasi
    - Layer di-freeze: awal | Di-unfreeze: beberapa layer akhir
  ResNet50:
    - Pre-trained ImageNet → Fine-tuning ±40 layer terakhir
    - Residual connection (skip connection)
    - Keunggulan: mengatasi vanishing gradient, fitur kompleks
    - Terbaik: akurasi 98.63%
```

---

### 4. HALAMAN HASIL ANALISIS / DASHBOARD (`/hasil`)

Dashboard ringkasan hasil penelitian dengan data statis dari jurnal.

```
HERO STATS BAR (4 card metric di atas):
- Total Model Diuji: 3
- Akurasi Tertinggi: 98.63%
- Dataset: Disaster Images (Kaggle)
- Total Epoch Training: 20

SECTION — PARAMETER TRAINING:
Card info parameter:
- Epoch: 20
- Batch Size: 32
- Optimizer: Adam
- Learning Rate: 0.001
- Loss Function: Binary Crossentropy
- Input Size: 224 × 224 px
- Train/Val/Test Split: 70% / 15% / 15%

SECTION — PREPROCESSING PIPELINE:
Timeline/step visual horizontal:
① Dataset Kaggle → ② Resize 224×224 → ③ Normalisasi (0–1) → ④ Augmentasi Data → ⑤ Training

Augmentasi card detail:
- Rotasi: hingga 30°
- Horizontal Flipping: aktif
- Zoom: hingga 30%
- Brightness Adjustment: aktif

SECTION — KESIMPULAN PENELITIAN:
3 card ranking:
🥇 ResNet50 — 98.63% — Transfer Learning + Fine-tuning — Rekomendasi Terbaik
🥈 CNN — 97.08% — Training from Scratch — Kompetitif
🥉 MobileNetV2 — 95.53% — Transfer Learning — Efisien

Paragraph kesimpulan singkat dari jurnal.

SECTION — SARAN PENGEMBANGAN:
4 card saran penelitian lanjutan:
- Dataset lebih besar & beragam
- Eksplorasi EfficientNet / Vision Transformer
- Augmentasi data lebih kompleks
- Integrasi Grad-CAM untuk interpretasi model
```

---

### 5. HALAMAN TENTANG (`/tentang`)

```
Info penelitian:
- Judul jurnal lengkap
- Nama 4 peneliti + institusi (Universitas Dian Nuswantoro)
- Program Studi Informatika, Fakultas Ilmu Komputer
- Deskripsi singkat tujuan penelitian
- Stack teknologi yang digunakan dalam penelitian:
  Python | TensorFlow/Keras | CNN | MobileNetV2 | ResNet50 | Kaggle Dataset | Adam Optimizer
- Card referensi/daftar pustaka (collapsed list, bisa expand)
```

---

## STRUKTUR FILE NEXT.JS

```
src/
├── app/
│   ├── layout.tsx              # Root layout + navbar + font
│   ├── page.tsx                # Hero section (halaman utama)
│   ├── upload/
│   │   └── page.tsx            # Upload & klasifikasi
│   ├── model-comparison/
│   │   └── page.tsx            # Perbandingan model + tabs
│   ├── hasil/
│   │   └── page.tsx            # Dashboard hasil penelitian
│   └── tentang/
│       └── page.tsx            # Halaman tentang
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navbar transparan + blur
│   │   └── Footer.tsx          # Footer minimal
│   ├── home/
│   │   ├── HeroSection.tsx     # Hero dengan floating nodes
│   │   ├── FloatingNode.tsx    # Komponen node model
│   │   └── LogoBar.tsx         # Bar logo teknologi
│   ├── upload/
│   │   ├── DropZone.tsx        # Area drag & drop
│   │   ├── ModelSelector.tsx   # 3 card pemilih model
│   │   └── ResultCard.tsx      # Card hasil klasifikasi
│   ├── comparison/
│   │   ├── MetricsTable.tsx    # Tabel perbandingan
│   │   ├── TrainingChart.tsx   # Line chart recharts
│   │   ├── ConfusionMatrix.tsx # Grid confusion matrix
│   │   └── ModelArchitecture.tsx
│   ├── hasil/
│   │   ├── StatsBar.tsx        # 4 metric cards
│   │   ├── TrainingParams.tsx  # Parameter training
│   │   └── RankingCards.tsx    # Ranking model
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── ProgressBar.tsx
│       └── TabGroup.tsx
├── lib/
│   ├── constants.ts            # Data statis dari jurnal (metrik, params)
│   └── utils.ts
└── types/
    └── index.ts
```

---

## DATA STATIS (HARDCODE DARI JURNAL)

```typescript
// lib/constants.ts
export const MODEL_METRICS = [
  { name: "CNN", accuracy: 97.08, precision: 0.97, recall: 0.97, f1: 0.97, type: "Training from Scratch" },
  { name: "MobileNetV2", accuracy: 95.53, precision: 0.96, recall: 0.95, f1: 0.95, type: "Transfer Learning" },
  { name: "ResNet50", accuracy: 98.63, precision: 0.97, recall: 0.98, f1: 0.98, type: "Transfer Learning + Fine-tuning", best: true },
]

export const CONFUSION_MATRICES = {
  CNN:         { tp: 280, fn: 11, fp: 6,  tn: 285 },
  MobileNetV2: { tp: 265, fn: 26, fp: 0,  tn: 291 },
  ResNet50:    { tp: 284, fn: 7,  fp: 1,  tn: 290 },
}

export const TRAINING_PARAMS = {
  epoch: 20, batchSize: 32, optimizer: "Adam",
  learningRate: 0.001, lossFunction: "Binary Crossentropy",
  inputSize: "224×224", split: { train: 70, val: 15, test: 15 },
}
```

---

## DEPENDENCIES YANG DIPERLUKAN

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "typescript": "5.x",
    "tailwindcss": "4.x",
    "recharts": "latest",
    "framer-motion": "latest",
    "react-dropzone": "latest",
    "clsx": "latest",
    "lucide-react": "latest"
  }
}
```

---

## ATURAN IMPLEMENTASI WAJIB

1. **Dark theme global**: Background `#080808`, tidak ada white background di seluruh halaman
2. **Glassmorphism card**: Semua card gunakan `bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm`
3. **Ambient glow effect**: Di hero section, implementasikan radial gradient dengan CSS atau div blur absolut:
   ```css
   /* pojok kanan atas — warna hijau-teal muda */
   background: radial-gradient(ellipse at 85% 10%, rgba(120,180,130,0.18) 0%, transparent 60%);
   /* pojok kiri — abu gelap subtle */
   background: radial-gradient(ellipse at 5% 50%, rgba(80,80,80,0.12) 0%, transparent 50%);
   ```
4. **SVG connector lines**: Di hero, buat SVG fullscreen absolut dengan `<line>` antar titik node, stroke putih opacity 0.1
5. **Floating node animation**: CSS keyframe `@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }` dengan delay berbeda tiap node
6. **Recharts dark theme**: Semua chart pakai `background="transparent"`, `stroke="rgba(255,255,255,0.1)"` untuk grid, warna garis: CNN=`#6B9FFF`, MobileNetV2=`#F59E0B`, ResNet50=`#34D399`
7. **Responsive breakpoints**: mobile-first, gunakan Tailwind `sm:` `md:` `lg:` `xl:` secara konsisten
8. **Smooth page transition**: Gunakan Framer Motion `AnimatePresence` + `motion.div` fade-in di setiap page
9. **Font**: Gunakan `next/font/google` — display: `Inter` atau `DM Sans` weight 300/400/500/700
10. **No backend**: Semua data statis dari `constants.ts`, klasifikasi menggunakan simulasi JavaScript

---

## CATATAN PENTING UNTUK AGENT

- Jangan gunakan `create-react-app` atau Vite — wajib **Next.js App Router**
- Buat semua halaman dalam satu project, bukan terpisah
- Pastikan `tailwind.config.ts` mengaktifkan dark mode dengan `darkMode: 'class'` dan set class `dark` di `html` tag secara default
- Seluruh warna custom definisikan di `tailwind.config.ts` extend colors
- Gunakan `"use client"` hanya pada komponen yang membutuhkan interaktivitas (upload, chart, tabs)
- Server components untuk halaman statis seperti `/tentang` dan `/hasil`
- Buat `loading.tsx` di setiap route untuk skeleton loading state
- Tambahkan `metadata` di setiap `page.tsx` untuk SEO

---

*Prompt ini dibuat berdasarkan jurnal: "Analisis Perbandingan Kinerja Model Deep Learning CNN, MobileNetV2, dan ResNet50 dengan Pendekatan Transfer Learning dan Fine-Tuning untuk Klasifikasi Citra Kerusakan Infrastruktur" — Universitas Dian Nuswantoro*
