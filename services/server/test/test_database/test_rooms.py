from test.fixture_base import *
from backend.api.models import Room

def test_is_test_file_working(db):
    assert True == True

def test_create_room(db, session):
    new_room = Room('claires list official')
    session.add(new_room)
    session.commit()

    assert len(Room.query.all()) == 1
    assert Room.query.first().room_name == 'claires list official'
    encoded = Room.query.first().encoded_room_name
    assert len(encoded) > 9
    assert encoded != 'claires list official'

def test_create_two_rooms(session):
    room1 = Room('claires list offical')
    room2 = Room('hudsons hangout')
    session.add(room1)
    session.add(room2)

    rooms = Room.query.all()
    assert len(rooms) == 2
    assert rooms[0].room_name != rooms[1].room_name
    assert rooms[0].encoded_room_name != rooms[1].encoded_room_name
    assert rooms[0].id != rooms[1].id
