#!/usr/bin/python3
""" API Blueprint"""
import smtplib
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger
from api.v1.views import views, mail
from models import storage


app = Flask(__name__)
app.url_map.strict_slashes = False
app.register_blueprint(views)
mail.init_app(app)

cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['SWAGGER'] = {
    'title': "Academy Haven Hostel Management System",
    'version': 1
}
# Configure Flask-Mail

Swagger(app)


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


@app.errorhandler(smtplib.SMTPAuthenticationError)
def handle_smtp_authentication_error(error):
    return jsonify({'error': str(error)}), 500


if __name__ == "__main__":
    """ Main function"""
    app.run(debug=True, port=5003)
