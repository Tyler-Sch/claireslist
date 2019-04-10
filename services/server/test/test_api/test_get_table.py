from test.fixture_base import app, db, session
from flask import url_for
from backend.api.models import Room, Item
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

def test_request_for_non_private_room_gets_to_function(session, client):
    room = create_basic_room(session)
    item = add_item_to_room(session, room)
    assert Room.query.count() == 1
    assert Item.query.count() == 1
    assert item in room.items

    data = {'requestedRoom': room.encoded_room_name}
    response = client.post(
        url_for('server.getTable'),
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )
    assert response == 200

    # do some more asserts on data when it is finialized

    
