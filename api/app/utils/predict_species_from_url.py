from io import BytesIO
from pathlib import Path
import requests
from PIL import Image, UnidentifiedImageError
import tensorflow as tf
import json
import numpy as np

def predict_species_from_url(image_url):
    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/91.0.4472.124 Safari/537.36'
        )
    }
    
    response = requests.get(image_url, headers=headers)

    if response.status_code != 200:
        raise Exception(f"Failed to retrieve image from URL: {response.status_code}")

    if not response.headers.get('Content-Type', '').startswith('image/'):
        raise Exception("The URL does not point to a valid image.")

    try:
        image_data = Image.open(BytesIO(response.content))
        if image_data.mode != 'RGB':
            image_data = image_data.convert('RGB')
    except UnidentifiedImageError:
        raise Exception("The retrieved content is not a valid image.")

    image_data = image_data.resize((180, 180))
    img_array = tf.keras.utils.img_to_array(image_data)
    img_array = tf.expand_dims(img_array, 0)
    
    base_dir = Path(__file__).resolve().parent
    model_path = base_dir / '../../ml_models/bird_classifier.keras'
    class_names_path = base_dir / '../../ml_models/bird_classes.json'
    
    model = tf.keras.models.load_model(model_path)

    with open(class_names_path, 'r') as f:
        class_names = json.load(f)

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    top_5_indices = np.argsort(score)[-5:][::-1]
    top_5_predictions = [
        {"class": class_names[i], "confidence": 100 * score[i].numpy()} 
        for i in top_5_indices
    ]

    return top_5_predictions
