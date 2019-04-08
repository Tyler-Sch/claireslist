from test.fixture_base import *
from backend.api.models import Room, Item

def add_room_and_default_item(session):
    newRoom = Room('hudsons room')
    session.add(newRoom)
    session.commit()

    item_1 = Item(newRoom, 'toy trucks', 'hudson')
    session.add(item_1)
    session.commit()
    return (newRoom, item_1)

def test_create_item(session):
    newRoom = Room('hudsons room')
    session.add(newRoom)
    session.commit()

    item_1 = Item(newRoom, 'toy trucks', 'hudson')
    session.add(item_1)
    session.commit()

    assert len(Item.query.all()) == 1
    assert newRoom.items[0] == item_1

    item_2 = Item(newRoom, 'toy boats', 'hudson')
    session.add(item_2)
    session.commit()

    assert len(Item.query.all()) == 2
    assert len(newRoom.items) == 2
    assert 'toy boats' in [i.name for i in Item.query.all()]

def test_alter_categories(session):
    newRoom, item_1 = add_room_and_default_item(session)
    item_1.description = 'They are series of toy trucks'
    item_1.who_has_current = 'Luca'

    item_from_db = Item.query.first()
    assert item_from_db.description == 'They are series of toy trucks'
    assert item_from_db.who_has_current == 'Luca'
