from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

import sys
sys.stdout.reconfigure(encoding='utf-8')

import numpy as np

import tensorflow as tf

import base64

import json

from django.conf import settings

from llamaapi import LlamaAPI

# Load the pre-trained model
model = tf.keras.models.load_model(settings.MODEL_PATH)

key = settings.KEY_PATH

@csrf_exempt
def index(request):
    if request.method == "POST":
        data = json.loads(request.body)
        base_64_encoded_img = data["base_64_encoded_img"]
        classification = classify_bird(base_64_encoded_img)
        
        desc = describe_bird(classification)
        return HttpResponse(desc)
    return HttpResponse("not post req")

def describe_bird(species):
    with open(key, 'r') as file:
        data = json.load(file)
    key_value = data['key']
    llama = LlamaAPI(key_value)

    api_request_json = {
    "messages": [
            {"role": "system", "content": "You are an Ornithologist giving a presentation to students in high school. Pleas provide an analysis of the provided bird species. Make sure the these key topics are covered: Species Name, Scientific Name, Habitat, Migration Patterns, Behaviour, Physical Description, Predators and Prey, A Few Interesting Facts. Do not provide a greeting or farewell."},
            {"role": "user", "content": species},
        ],
    }

    response = llama.run(api_request_json)
    description = response.json()['choices'][0]['message']['content']
    return description

def classify_bird(encoded_img):
    try:
        decoded_image_data = base64.b64decode(encoded_img)

        img_height = 180
        img_width = 180

        class_names = ['ABYSSINIAN GROUND HORNBILL', 'AFRICAN CROWNED CRANE', 'AFRICAN EMERALD CUCKOO', 'AFRICAN FIREFINCH', 'AFRICAN OYSTER CATCHER', 'AFRICAN PIED HORNBILL', 'AFRICAN PYGMY GOOSE', 'ALBATROSS', 'ALBERTS TOWHEE', 'ALEXANDRINE PARAKEET', 'ALPINE CHOUGH', 'ALTAMIRA YELLOWTHROAT', 'AMERICAN AVOCET', 'AMERICAN BITTERN', 'AMERICAN COOT', 'AMERICAN FLAMINGO', 'AMERICAN GOLDFINCH', 'AMERICAN KESTREL']

        # Convert the decoded image data to a TensorFlow tensor
        img = tf.image.decode_jpeg(decoded_image_data, channels=3)
        img = tf.image.resize(img, [img_height, img_width])
        img = tf.expand_dims(img, axis=0)

        # Make predictions on the image
        predictions = model.predict(img)
        predicted_class_index = np.argmax(predictions)
        predicted_class = class_names[predicted_class_index]

        return predicted_class
    except Exception as e:
        # Handle any exceptions gracefully
        return str(e)