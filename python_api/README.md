# Python Flask API — Klasifikasi Bencana

Backend inferensi untuk project **DetectAnalisis** yang menggunakan model `.keras` untuk klasifikasi gambar bencana (BANJIR vs KEBAKARAN) secara nyata.

## Setup & Jalankan

### 1. Install Python dependencies

```powershell
cd python_api
pip install -r requirements.txt
```

### 2. Jalankan Flask server

```powershell
python app.py
```

Server akan berjalan di **http://127.0.0.1:5000**

---

## Endpoints

### `GET /health`
Cek status API.

```json
{ "status": "ok", "models_available": ["CNN Kustom", "VGG16", "ResNet50"] }
```

### `POST /classify`
Klasifikasi gambar bencana.

**Form Data:**
- `image` (file) — gambar JPG/PNG
- `model` (string) — salah satu dari: `CNN Kustom`, `VGG16`, `ResNet50`

**Response:**
```json
{
  "label": "BANJIR",
  "confidence": 94.5,
  "floodProbability": 94.5,
  "fireProbability": 5.5,
  "inferenceTime": 0.312,
  "modelUsed": "CNN Kustom"
}
```

---

## Catatan

- Model di-load secara **lazy** (hanya saat pertama kali dipanggil) untuk menghemat RAM
- Preprocessing: resize ke 224×224, normalisasi ke [0,1]
- Mendukung binary sigmoid output (1 neuron) dan softmax 2-class
