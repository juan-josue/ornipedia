from flask import Blueprint, request, jsonify, send_file

species_data = Blueprint('species_data', __name__)

from app.utils.retrieve_species_data import retrieve_species_data
from app.utils.retrieve_species_image import retrieve_species_image

@species_data.route('/description', methods=['GET'])
def get_species_description():    
    # Retrieve species class from request
    species_class = request.args.get('species_class')
    if not species_class:
        return jsonify({"error": "No species class provided"}), 400
    
    # Retrieve species data
    species_data = retrieve_species_data(species_class)
    if species_data is None:
        return jsonify({"error": "Species data could not be retrieved"}), 404
    
    response = jsonify(species_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response;

@species_data.route('/image', methods=['GET'])
def get_species_image():
    # Retrieve species class from request
    species_class = request.args.get('species_class')
    if not species_class:
        return jsonify({"error": "No species class provided"}), 400
    
    # Retrieve species image
    image_path = retrieve_species_image(species_class)
    if not image_path:
        return jsonify({"error": "No species image could be retrieved"}), 404
    
    return send_file(image_path, mimetype='image/jpeg')
    