from flask import Blueprint, request, jsonify, send_file, url_for
import os

species_data = Blueprint('species_data', __name__)

from app.utils.retrieve_species_data import retrieve_species_data

@species_data.route('/description', methods=['GET'])
def get_species_description():    
    # Retrieve species class from request
    species_class = request.args.get('species_class')
    
    # Retrieve species data
    species_data = retrieve_species_data(species_class)
    
    # Return output as json
    response = jsonify(species_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response;

@species_data.route('/image', methods=['GET'])
def get_species_image():
    species_class = request.args.get('species_class')
    base_dir = os.path.dirname(os.path.abspath(__file__))
    image_folder = os.path.join(base_dir, '..', 'data', 'bird_images', species_class)
    
    if not os.path.exists(image_folder):
        return jsonify({"error": "Species folder not found"}), 404

    # Get the first image in the folder
    image_files = [f for f in sorted(os.listdir(image_folder)) if f.endswith('.jpg')]
    
    if not image_files:
        return jsonify({"error": "No images found for the species"}), 404

    image_file = image_files[0]
    image_path = os.path.join(image_folder, image_file)

    return send_file(image_path, mimetype='image/jpeg')
    