from test.fixture_base import *
from backend.api.models import Room, Item

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

    
