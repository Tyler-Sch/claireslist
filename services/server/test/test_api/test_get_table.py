from test.fixture_base import app, db, session
from flask import url_for
from backend.api.models import Room, Item, BorrowHistory
import json


def create_basic_room(session, room_name='basic room', private=False):
    new_room = Room(room_name)
    session.add(new_room)
    session.commit()
    if private:
        new_room.private = True
        new_room.password = 'testPassword'
        session.commit()
    return new_room

def add_item_to_room(session, room, name='truck toy', who_owns='hudson'):
    new_item = Item(room, name, who_owns)
    session.add(new_item)
    session.commit()
    return new_item

def add_history_to_item(session, item, who_borrowed='Luca'):
    new_history = BorrowHistory(item, who_borrowed)
    session.add(new_history)
    session.commit()
    return new_history

def test_request_for_non_private_room_gets_to_function(session, client):
    room = create_basic_room(session)
    item = add_item_to_room(session, room)
    item2 = add_item_to_room(session, room, name='boat toy', who_owns='Luca')
    hist1 = add_history_to_item(session, item)
    hist2 = add_history_to_item(session, item2)
    assert Room.query.count() == 1
    assert Item.query.count() == 2
    assert BorrowHistory.query.count() == 2
    assert item in room.items
    assert item2 in room.items

    data = {'requestedRoom': room.encoded_room_name}
    response = client.post(
        url_for('server.getTable'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response == 200

    data = response.json
    assert data['status'] == 'success'
    assert data['message'] == 'here is the info you requested'
    assert 'roomInfo' in data

    room_data = data['roomInfo']
    assert room_data['room_name'] == 'basic room'
    assert room_data['id'] == room.id
    assert len(room_data['items']) == 2

    item_data = room_data['items'][0]
    assert item_data['name'] == 'truck toy'
    assert item_data['who_owns'] == 'hudson'
    assert len(item_data['history']) == 1
    assert item_data['history'][0]['who_borrowed'] == 'Luca'
