from flask import Flask, jsonify

app = Flask(__name__)
app.config.from_object('backend.config.DevelopmentConfig')


@app.route('/')
def test_server():
    return jsonify({'working': True})
