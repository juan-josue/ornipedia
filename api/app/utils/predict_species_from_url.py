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

    # Retrieve most likely prediction, confidence score, and description
    predicted_class = class_names[np.argmax(score)]
    confidence = 100 * np.max(score)
    description = retrieve_species_data(predicted_class)
    
    # Save audio transcript to file
    text_to_audio(description)

    # Return the result as a JSON response
    return {
        "predicted_class": predicted_class,
        "confidence": confidence,
        "description": description
    }