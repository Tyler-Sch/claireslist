from test.fixture_base import app, db, session
from flask import url_for

def test_testing(client):
    response = client.get(url_for('server.index'))
    assert response.status_code == 200
    assert 'working' in response.json
    assert response.json['working'] == True
