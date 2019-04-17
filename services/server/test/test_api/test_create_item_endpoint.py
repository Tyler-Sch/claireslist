from test.fixture_base import app, db, session
from flask import url_for
from backend.api.models import Room, Item, BorrowHistory
import json
import datetime

def test_create_room_basic_info_only(session, client):
    r = Room('basic room')
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'create',
            'target': 'item',
            'name': 'test item 1',
            'who_owns': 'Hudson',
        }
    }

    response = client.post(
        url_for('server.create_item'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 200

    resp_data = response.get_json()
    assert resp_data['status'] == 'success'
    assert resp_data['message'] == 'Item added to basic room'
    assert Item.query.count() == 1
    assert Item.query.first().name == 'test item 1'
    assert Item.query.first().who_owns == 'Hudson'

def test_create_room_more_info(session, client):
    r = Room('basic room')
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'create',
            'target': 'item',
            'name': 'test item 1',
            'who_owns': 'Hudson',
            'optional_fields': {
                'description': 'an item, probably a toy',
                'who_has_current': 'Luca',
                'due_back': '3/14/2020'
            }
        }
    }

    response = client.post(
        url_for('server.create_item'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 200
    resp_data = response.get_json()
    assert resp_data['status'] == 'success'
    item = Item.query.first()
    assert item.name == 'test item 1'
    assert item.who_owns == 'Hudson'
    assert item.description == 'an item, probably a toy'
    assert item.who_has_current == 'Luca'
    assert item.due_back == datetime.datetime(2020, 3, 14, 0, 0)

def test_create_room_invalid_action_type(session, client):
    r = Room('basic room')
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'recognize',
            'target': 'item',
            'name': 'test item 1',
            'who_owns': 'Hudson',
            'optional_fields': {
                'description': 'an item, probably a toy',
                'who_has_current': 'Luca',
                'due_back': '3/14/2020'
            }
        }
    }

    response = client.post(
        url_for('server.create_item'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert response.get_json()['status'] == 'error'
    assert response.get_json()['message'] == 'Wrong request data'

def test_create_room_empty_optional_fields(session, client):
        r = Room('basic room')
        session.add(r)
        session.commit()

        data = {
            'requestedRoom': r.encoded_room_name,
            'password': '',
            'action': {
                'type': 'create',
                'target': 'item',
                'name': 'test item 1',
                'who_owns': 'Hudson',
                'optional_fields': {}
            }
        }

        response = client.post(
            url_for('server.create_item'),
            data=json.dumps(data),
            headers={'Content-Type': 'application/json'}
        )
        assert response.status_code == 200
        resp_data = response.get_json()
        assert resp_data['status'] == 'success'
        assert resp_data['message'] == 'Item added to basic room'

def test_create_room_invalid_basic_info(session, client):
    r = Room('basic room')
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'create',
            'target': 'item',
            'name': 't',
            'who_owns': 'Hudson',
            'optional_fields': {}
        }
    }

    response = client.post(
        url_for('server.create_item'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert response.get_json()['status'] == 'error'
    error_string = 'name of new item is too short or data is wrong'
    assert response.get_json()['message'] == error_string

    data['name'] = 'backhoe loader'
    data['who_owns']: ''

    response = client.post(
        url_for('server.create_item'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert response.get_json()['status'] == 'error'
    assert response.get_json()['message'] == error_string
