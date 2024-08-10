from io import BytesIO
from pathlib import Path
import requests
from PIL import Image
import tensorflow as tf
import json
import numpy as np

from app.utils.retrieve_species_data import retrieve_species_data
from app.utils.text_to_audio import text_to_audio

def predict_species_from_url(image_url):
    # Retrieve image data
    response = requests.get(image_url)
    image_data = Image.open(BytesIO(response.content))
    image_data = image_data.resize((180, 180))

    # Convert the image to a NumPy array
    img_array = tf.keras.utils.img_to_array(image_data)
    img_array = tf.expand_dims(img_array, 0) # Create a batch
    
    # Define model and class names file paths
    base_dir = Path(__file__).resolve().parent
    model_path = base_dir / '../../ml_models/bird_classifier.keras'
    class_names_path = base_dir / '../../ml_models/bird_classes.json'
    
    # Retrieve model
    model = tf.keras.models.load_model(model_path)
    
    # Retrieve class names
    class_names = []
    with open(class_names_path, 'r') as f:
        class_names = json.load(f)

    # Use model to make predictions
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    # Get the top 5 predictions and confidence scores
    top_5_indices = np.argsort(score)[-5:][::-1]
    top_5_predictions = [{"class": class_names[i], "confidence": 100 * score[i].numpy()} for i in top_5_indices]

    # Return the result as a JSON response
    return top_5_predictions