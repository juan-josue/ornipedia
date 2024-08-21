from flask import jsonify
import os

def retrieve_species_image(species_class):
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
    
    return image_path