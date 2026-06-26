"""
Script untuk memeriksa struktur output layer semua model .keras
Jalankan: python python_api/inspect_models.py
"""

import os
import sys
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_DIR   = os.path.join(BASE_DIR, "database")

MODELS = {
    "CNN Kustom": os.path.join(DB_DIR, "cnn_bencana.keras"),
    "VGG16":      os.path.join(DB_DIR, "vgg16_bencana.keras"),
    "ResNet50":   os.path.join(DB_DIR, "resnet50_bencana.keras"),
}

def inspect_model(name: str, path: str):
    print(f"\n{'='*60}")
    print(f"  MODEL: {name}")
    print(f"  PATH:  {path}")
    print(f"{'='*60}")
    if not os.path.exists(path):
        print("  [ERROR] File tidak ditemukan!")
        return

    model = tf.keras.models.load_model(path)
    last = model.layers[-1]
    output_shape = model.output_shape  # e.g. (None, 1) or (None, 2)
    activation   = getattr(last, 'activation', None)
    act_name     = activation.__name__ if activation else 'unknown'

    print(f"  Input  shape : {model.input_shape}")
    print(f"  Output shape : {output_shape}")
    print(f"  Last layer   : {last.name} ({type(last).__name__})")
    print(f"  Activation   : {act_name}")
    print(f"  Total params : {model.count_params():,}")

    if output_shape[-1] == 1:
        print(f"  >> Binary classification (sigmoid): 0=BANJIR, 1=KEBAKARAN")
    elif output_shape[-1] == 2:
        print(f"  >> 2-class softmax: [BANJIR, KEBAKARAN]")
    else:
        n = output_shape[-1]
        print(f"  >> {n}-class output — perlu sesuaikan label mapping di app.py!")

if __name__ == "__main__":
    for name, path in MODELS.items():
        inspect_model(name, path)

    print("\nDone. Sesuaikan label mapping di python_api/app.py jika perlu.")
