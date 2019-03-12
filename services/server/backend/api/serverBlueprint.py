from flask import Blueprint, jsonify

server_blueprint = Blueprint('server', __name__)

@server_blueprint.route('/')
def index():
    return jsonify({'working': True})
