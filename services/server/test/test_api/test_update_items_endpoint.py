from test.fixture_base import app, db, session
from flask import url_for
from backend.api.models import Room, Item, BorrowHistory
import json
import datetime


def test_simple_update_room_record(session, client):
    r = Room('basic room')
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'update',
            'target': 'room',
            'targetId': r.id,
            'dataToUpdate': {
                'room_name': 'did it change'
            }
        }
    }
    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response == 200

    assert response.get_json()['status'] == 'success'
    assert Room.query.first().room_name == 'did it change'
    assert response.json['dbresponse'] == 1

def test_update_mutiple_attrs_room(session, client):
    r = Room('basic')
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'update',
            'target': 'room',
            'targetId': r.id,
            'dataToUpdate': {
                'room_name': 'test2',
                'private': True,
                'password': 'testpassword'
            }
        }
    }
    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response == 200
    target_room = Room.query.first()
    assert target_room.room_name == 'test2'
    assert target_room.private == True
    assert target_room.password == 'testpassword'

def test_update_room_info_with_password(session, client):
    r = Room('basic')
    r.private = True
    r.password = 'testpassword'
    session.add(r)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': 'testpassword',
        'action': {
            'type': 'update',
            'target': 'room',
            'targetId': r.id,
            'dataToUpdate': {
                'room_name': 'test2',
                'private': True,
                'password': 'newpassword'
            }
        }
    }
    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 200
    room = Room.query.all()[0]
    assert room.room_name == 'test2'
    assert room.password == 'newpassword'

def test_update_item_with_new_vals(session, client):
    r = Room('basic')
    session.add(r)
    session.commit()
    i = Item(r, 'toy trucks', 'hudson')
    session.add(i)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'update',
            'target': 'item',
            'targetId': i.id,
            'dataToUpdate': {
                'who_has_current': 'Luca',
                'how_long_can_borrow': '3 weeks',
                'due_back': datetime.date(2019, 11,14).__str__(),
            }
        }
    }

    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 200
    item = Item.query.first()
    assert item.who_has_current == 'Luca'
    assert item.how_long_can_borrow == '3 weeks'
    assert item.due_back == datetime.datetime(2019, 11, 14, 0, 0)

def test_update_borrow_history(session, client):
    r = Room('basic')
    session.add(r)
    session.commit()
    i = Item(r, 'toy trucks', 'hudson')
    session.add(i)
    session.commit()
    bh = BorrowHistory(i, 'Luca')
    session.add(bh)
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': '',
        'action': {
            'type': 'update',
            'target': 'borrowHistory',
            'targetId': bh.id,
            'dataToUpdate': {
                'date_borrowed': datetime.date(2019, 11, 14).__str__(),
                'due_back': datetime.date(2019, 11,18).__str__(),
                'notes': 'yuck, it smelled funny'
            }
        }
    }

    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 200
    assert response.json['status'] == 'success'
    assert response.json['dbresponse'] == 1
    bhist = BorrowHistory.query.first()
    assert bhist.date_borrowed == datetime.datetime(2019, 11, 14, 0, 0)
    assert bhist.notes == 'yuck, it smelled funny'
    assert bhist.due_back == datetime.datetime(2019, 11, 18, 0, 0)

def add_basic_room_item_and_borrowhistory(session):
    r = Room('basic')
    session.add(r)
    session.commit()
    i = Item(r, 'toy trucks', 'hudson')
    session.add(i)
    session.commit()
    bh = BorrowHistory(i, 'Luca')
    session.add(bh)
    session.commit()
    return (r, i, bh)

def test_update_room_wrong_attributes(session, client):
    r, item, bh = add_basic_room_item_and_borrowhistory(session)
    data = {
        'requestedRoom': r.encoded_room_name,
        'password': 'testpassword',
        'action': {
            'type': 'update',
            'target': 'room',
            'targetId': r.id,
            'dataToUpdate': {
                'notacolumn': 'I like italian ice'
            }
        }
    }
    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 400

    assert response.json['status'] == 'error'
    assert response.json['message'] == 'invalid columns for this update'


def test_try_update_with_wrong_password(session, client):
    r, item, bh = add_basic_room_item_and_borrowhistory(session)
    r.private = True
    r.password = 'noonewillguessmypassword'
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': 'testpassword',
        'action': {
            'type': 'update',
            'target': 'room',
            'targetId': r.id,
            'dataToUpdate': {
                'room_name': 'test2',
                'private': True,
                'password': 'newpassword'
            }
        }
    }
    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response.status_code == 400
    assert Room.query.first().room_name != 'test2'

    assert response.json['status'] == 'error'
    assert response.json['message'] == 'invalid password'


def test_try_update_missing_action_info(session, client):
    r, item, bh = add_basic_room_item_and_borrowhistory(session)
    r.private = True
    r.password = 'testpassword'
    session.commit()

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': 'testpassword',
    }

    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 400
    data = response.json
    assert data['status'] == 'error'


def test_try_update_unknown_target(session, client):
    r, item, bh = add_basic_room_item_and_borrowhistory(session)

    data = {
        'requestedRoom': r.encoded_room_name,
        'password': 'testpassword',
        'action': {
            'type': 'update',
            'target': 'roo',
            'targetId': r.id,
            'dataToUpdate': {
                'room_name': 'test2',
                'private': True,
                'password': 'newpassword'
            }
        }
    }
    response = client.post(
        url_for('server.update_record'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    assert response.status_code == 400
    data = response.json
    assert data['status'] == 'error'
    assert data['message'] == 'unknown key'
