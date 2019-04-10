from test.fixture_base import app, db, session
from flask import url_for
import json
from backend.api.models import Room

def create_basic_room(session, room_name='basic room', private=False):
    new_room = Room(room_name)
    session.add(new_room)
    session.commit()
    if private:
        new_room.private = True
        new_room.password = 'testPassword'
        session.commit()
    return new_room

def basic_get_request(client, data, url):
    response = client.get(
        url_for(url),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    return response

def test_request_for_non_private_room(session, client):
    room = create_basic_room(session)
    assert room.private == False

    request_data = {'requestedRoom': room.encoded_room_name, 'password': None}
    response = basic_get_request(client, request_data, 'server.testDecorator')
    assert response.status_code == 200

    response_data = response.json
    assert response_data['status'] == 'success'
    assert response_data['requestedRoomName'] == 'basic room'
    assert response_data['message'] == 'greetings from testDecorator function'

def test_request_for_private_room_no_password(session, client):
    room = create_basic_room(session, private=True)
    assert room.private == True

    request_data = {
        'requestedRoom': room.encoded_room_name,
        'password': None
    }
    response = basic_get_request(client, request_data, 'server.testDecorator')
    assert response.status_code == 206

    data = response.json
    assert data['status'] == 'password needed'
    assert data['message'] == 'please supply a password'
    assert len(data) == 2

def test_request_for_private_room_wrong_password(session, client):
    room = create_basic_room(session, private=True)
    assert room.private == True
    assert room.password == 'testPassword'

    request_data = {'requestedRoom': room.encoded_room_name, 'password': 'aag'}
    response = basic_get_request(client, request_data, 'server.testDecorator')
    assert response.status_code == 400

    response_data = response.json
    assert response_data['status'] == 'error'
    assert response_data['message'] == 'invalid password'
    assert len(response_data) == 2

def test_request_for_private_room_correct_password(client, session):
    room = create_basic_room(session, private=True)
    assert room.private == True
    assert room.password == 'testPassword'

    request_data = {
        'requestedRoom': room.encoded_room_name,
        'password': 'testPassword'
    }
    response = basic_get_request(client, request_data, 'server.testDecorator')
    assert response.status_code == 200

    response_data = response.json
    assert response_data['status'] == 'success'
    assert response_data['message'] == 'greetings from testDecorator function'
    assert response_data['requestedRoomName'] == room.room_name

def test_request_wrong_room_name(session, client):
    room = create_basic_room(session, private=True)
    assert room.private == True
    assert room.password == 'testPassword'

    request_data = {
        'requestedRoom': room.encoded_room_name + 'a',
        'password': 'testPassword'
    }
    response = basic_get_request(client, request_data, 'server.testDecorator')
    assert response.status_code == 400

    response_data = response.json
    assert response_data['status'] == 'error'
    assert response_data['message'] == 'unknown group'

def test_request_no_room_name(session, client):
    room = create_basic_room(session, private=True)
    assert room.private == True
    assert room.password == 'testPassword'

    request_data = {
        'password': 'testPassword'
    }
    response = basic_get_request(client, request_data, 'server.testDecorator')
    assert response.status_code == 400

def test_two_rooms_kept_seperately(session, client):
    room1 = create_basic_room(session, private=True)
    room2 = create_basic_room(session, room_name='room2', private=False)

    request_data1 = {
        'requestedRoom': room1.encoded_room_name,
        'password': 'testPassword'
    }
    response1 = basic_get_request(client, request_data1, 'server.testDecorator')
    assert response1.status_code == 200
    request_data2 = {
        'requestedRoom': room2.encoded_room_name,
        'password': None
    }
    response2 = basic_get_request(client, request_data2, 'server.testDecorator')
    assert response2.status_code == 200

    data1 = response1.json
    data2 = response2.json

    assert data1['requestedRoomName'] != data2['requestedRoomName']
    assert data1['status'] == data2['status']
