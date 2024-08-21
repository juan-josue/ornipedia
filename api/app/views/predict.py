from flask import Blueprint, request, jsonify
import validators

predict = Blueprint('predict', __name__)

from app.utils.predict_species_from_url import predict_species_from_url

@predict.route('/', methods=['POST', 'OPTIONS'])
def predict_image_from_url():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight response'}), 200
        
    # Retrieve image url from request
    data = request.get_json()
    if 'image_url' not in data:
        return jsonify({"error": "No image URL provided"}), 400
    image_url = data['image_url']
    
    # Validate the image URL
    if not validators.url(image_url):
        return jsonify({"error": "Invalid image URL provided"}), 400
    
    # Predict species and obtain species data
    species_data = predict_species_from_url(image_url)
    if species_data is None:
            return jsonify({"error": "Species predictions could not be made from provided url"}), 404
    
    # Return output as json
    response = jsonify(species_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response;
    
    