from flask import Blueprint, request, jsonify

predict = Blueprint('predict', __name__)

from app.utils.predict_species_from_url import predict_species_from_url

@predict.route('/', methods=['POST'])
def predict_image_from_url():
    # Retrieve image url from request
    data = request.get_json()
    if 'image_url' not in data:
        return jsonify({"error": "No image URL provided"}), 400
    
    image_url = data['image_url']
    
    # Predict species and obtain species data
    species_data = predict_species_from_url(image_url)
    
    # Return output as json
    return jsonify(species_data)
    
    