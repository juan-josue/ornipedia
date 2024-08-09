from flask import Flask
from app.views.predict import predict as predict_blueprint # type: ignore

app = Flask(__name__)

# Import and register the Blueprints
app.register_blueprint(predict_blueprint, url_prefix='/predict')