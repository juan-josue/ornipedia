# Ornipedia

*Helping you discover the fascinating birds around you*

## Overview

This project combines the power of computer vision and natural language processing to give you insights into the birds you encounter. Simply upload a photo of a bird, and our system will:

1. **Identify the Bird Species:** A TensorFlow keras model analyzes the image to classify the bird species.
2. **Retrieve Fascinating Facts:**  The large language model (LLM) Llama is used to provide you with interesting and informative details about the identified bird.

## How to Use:

1. **Install Requirements:**
   *  See `requirements.txt` for needed libraries (TensorFlow, etc.)
   *  Use `pip install -r requirements.txt` to install.
2. **Run the App:**
   *  Execute `python app.py` (replace with your main script's name).
3. **Upload Image:**
   *  Select an image file of a bird using the "Choose File" button.
4. **Scan and Discover:**
   *  Click the "Scan" button to trigger the bird identification process.
5. **Learn About the Bird:**
   *  The application will display the identified bird species and provide descriptive information from the LLM.

## Project Structure

*  `app.py`: Main application script
*  `models/`:  Contains the TensorFlow bird identification model.
*  `utils.py`: Utility functions for image processing, text generation, etc. 
*  `requirements.txt`: List of project dependencies.

**Enjoy exploring the world of birds!** 
