from flask import Flask
from flask_cors import CORS # type: ignore
from supabase import create_client, Client # type: ignore
import os

from app.views.predict import predict as predict_blueprint # type: ignore
from app.views.species_data import species_data  as species_data_blueprint # type: ignore

app = Flask(__name__)
CORS(app)

# Connect db
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
app.supabase: Client = create_client(url, key) # type: ignore

# Import and register the Blueprints
app.register_blueprint(predict_blueprint, url_prefix='/predict')
app.register_blueprint(species_data_blueprint, url_prefix='/species-data')