"""
Flask API for Disaster Image Classification using Keras models.
Supports: CNN Kustom, VGG16, ResNet50

Run: python app.py
"""

import os
import time
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# ─── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_DIR   = os.path.join(BASE_DIR, "database")

MODEL_PATHS = {
    "CNN Kustom": os.path.join(DB_DIR, "cnn_bencana.keras"),
    "VGG16":      os.path.join(DB_DIR, "vgg16_bencana.keras"),
    "ResNet50":   os.path.join(DB_DIR, "resnet50_bencana.keras"),
}

# ─── Lazy model cache ──────────────────────────────────────────────────────────
_model_cache: dict[str, tf.keras.Model] = {}

def get_model(name: str) -> tf.keras.Model:
    """Load model once and cache it in memory."""
    if name not in _model_cache:
        path = MODEL_PATHS.get(name)
        if not path or not os.path.exists(path):
            raise FileNotFoundError(f"Model file not found: {path}")
        print(f"[INFO] Loading model '{name}' from {path} ...")
        _model_cache[name] = tf.keras.models.load_model(path)
        print(f"[INFO] Model '{name}' loaded successfully.")
    return _model_cache[name]

# ─── Preprocessing ─────────────────────────────────────────────────────────────
IMG_SIZE = (224, 224)

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """Convert uploaded image bytes to model input tensor."""
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE, Image.LANCZOS)
    arr = np.array(img, dtype=np.float32) / 255.0   # normalize to [0,1]
    arr = np.expand_dims(arr, axis=0)                # add batch dim → (1, 224, 224, 3)
    return arr

# ─── Inference helper ─────────────────────────────────────────────────────────
# Class labels — index 0 = BANJIR, index 1 = KEBAKARAN
# (binary: sigmoid output → value closer to 1 means KEBAKARAN)
LABELS = ["BANJIR", "KEBAKARAN"]

def run_inference(model: tf.keras.Model, img_tensor: np.ndarray) -> dict:
    """Run model prediction and return structured result."""
    start = time.perf_counter()
    raw = model.predict(img_tensor, verbose=0)
    elapsed = round(time.perf_counter() - start, 3)

    # Determine output shape
    output_shape = raw.shape  # e.g. (1, 1) binary or (1, 2) softmax

    if output_shape[-1] == 1:
        # Binary sigmoid output
        fire_prob = float(raw[0][0])
        flood_prob = 1.0 - fire_prob
    elif output_shape[-1] == 2:
        # Softmax 2-class: [banjir, kebakaran]
        flood_prob = float(raw[0][0])
        fire_prob  = float(raw[0][1])
    else:
        # Multi-class: take first two as banjir/kebakaran
        flood_prob = float(raw[0][0])
        fire_prob  = float(raw[0][1])

    # Determine label
    if flood_prob >= fire_prob:
        label = "BANJIR"
        confidence = flood_prob
    else:
        label = "KEBAKARAN"
        confidence = fire_prob

    return {
        "label":            label,
        "confidence":       round(confidence * 100, 2),
        "floodProbability": round(flood_prob * 100, 2),
        "fireProbability":  round(fire_prob * 100, 2),
        "inferenceTime":    elapsed,
    }

# ─── Routes ───────────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "models_available": list(MODEL_PATHS.keys())})


@app.route("/classify", methods=["POST"])
def classify():
    # Validate inputs
    if "image" not in request.files:
        return jsonify({"error": "No image file provided. Use field name 'image'."}), 400

    model_name = request.form.get("model", "CNN Kustom")
    if model_name not in MODEL_PATHS:
        return jsonify({
            "error": f"Unknown model '{model_name}'. Choose from: {list(MODEL_PATHS.keys())}"
        }), 400

    image_file = request.files["image"]
    if image_file.filename == "":
        return jsonify({"error": "Empty filename."}), 400

    # Read & preprocess
    try:
        image_bytes = image_file.read()
        img_tensor  = preprocess_image(image_bytes)
    except Exception as e:
        return jsonify({"error": f"Image preprocessing failed: {str(e)}"}), 422

    # Load model & infer
    try:
        model  = get_model(model_name)
        result = run_inference(model, img_tensor)
        result["modelUsed"] = model_name
        return jsonify(result), 200
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"Inference error: {str(e)}"}), 500


# ─── Entry point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("[INFO] Starting Disaster Classification API on http://127.0.0.1:5000")
    print(f"[INFO] Database directory: {DB_DIR}")
    print("[INFO] Models will be loaded on first request (lazy loading).")
    app.run(host="127.0.0.1", port=5000, debug=False)
