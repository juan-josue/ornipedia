from flask import Blueprint, request, jsonify, send_file

species_data = Blueprint('species_data', __name__)

from app.utils.retrieve_species_data import retrieve_species_data
from app.utils.retrieve_species_image import retrieve_species_image

@species_data.route('/description', methods=['GET'])
def get_species_description():    
    # Retrieve species class from request
    species_class = request.args.get('species_class')
    
    # Retrieve species data
    species_data = retrieve_species_data(species_class)
    
    response = jsonify(species_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response;

@species_data.route('/image', methods=['GET'])
def get_species_image():
    # Retrieve species class from request
    species_class = request.args.get('species_class')
    
    # Retrieve species image
    image_path = retrieve_species_image(species_class)
    
    return send_file(image_path, mimetype='image/jpeg')
    