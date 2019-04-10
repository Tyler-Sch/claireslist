from test.fixture_base import app, db, session
from flask import url_for
from backend.api.models import Room
import json

def test_testing(client):
    response = client.get(url_for('server.index'))
    assert response.status_code == 200
    assert 'working' in response.json
    assert response.json['working'] == True


def test_create_new_group(client, session):
    data = {'roomName': 'test room', 'private': False, 'password': None}
    response = client.post(
        url_for('server.create_table'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 200
    data = response.json
    assert 'status' in data
    assert data['status'] == 'success'

def  test_create_private_room(client, session):
    data = {
        'roomName': 'new Room',
        'private': True,
        'password': 'potatoes'
    }
    response = client.post(
        url_for('server.create_table'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 200
    room = Room.query.first()
    assert room.room_name == 'new Room'
    assert room.private == True
    assert room.password == 'potatoes'

    response_data = response.json
    assert response_data['status'] == 'success'

def test_create_room_already_exists(client, session):
    newRoom = Room('new Room')
    session.add(newRoom)
    session.commit()

    post_data = {
        'roomName': 'new Room',
        'private': False,
        'password': None
    }
    response = client.post(
        url_for('server.create_table'),
        data=json.dumps(post_data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 200
    response_data = response.json

    assert response_data['url'] != newRoom.encoded_room_name
    assert response_data['status'] == 'success'

def test_create_room_invalid_data(client, session):
    post_data = {
        'roomName': None,
        'private': None,
        'password': 'splat'
    }
    response = client.post(
        url_for('server.create_table'),
        data=json.dumps(post_data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert response.json['status'] == 'error'
    assert response.json['message'] == 'invalid room name'

    post_data = {
        'roomName': 'abc',
        'private': True,
        'password': 'splat'
    }
    response = client.post(
        url_for('server.create_table'),
        data=json.dumps(post_data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert response.json['status'] == 'error'
    assert response.json['message'] == 'invalid room name'

    post_data = {
        'roomName': '',
        'private': True,
        'password': 'splat'
    }
    response = client.post(
        url_for('server.create_table'),
        data=json.dumps(post_data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert response.json['status'] == 'error'
    assert response.json['message'] == 'invalid room name'
