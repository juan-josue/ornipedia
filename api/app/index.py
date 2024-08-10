from flask import Flask
from flask_cors import CORS # type: ignore

from app.views.predict import predict as predict_blueprint # type: ignore
from app.views.species_data import species_data  as species_data_blueprint # type: ignore

app = Flask(__name__)
CORS(app)

# Import and register the Blueprints
app.register_blueprint(predict_blueprint, url_prefix='/predict')
app.register_blueprint(species_data_blueprint, url_prefix='/species-data')