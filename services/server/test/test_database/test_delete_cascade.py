from test.fixture_base import *
from backend.api.models import Room, Item, BorrowHistory

def test_delete_cascade(session):
    room = Room('basic room')
    session.add(room)
    session.commit()

    item = Item(room, 'toys', 'hudson')
    session.add(item)
    session.commit()

    h = BorrowHistory(item, 'Luca')
    session.add(h)
    session.commit()

    assert Room.query.first() == room
    assert Item.query.first() == item
    assert BorrowHistory.query.first() == h

    Room.query.filter_by(room_name=room.room_name).delete()
    session.commit()

    assert Room.query.count() == 0
    assert Item.query.count() == 0
    assert BorrowHistory.query.count() == 0

def test_delete_cascade_doesnt_delete_parents(session):
    room = Room('basic room')
    session.add(room)
    session.commit()

    item = Item(room, 'toys', 'hudson')
    session.add(item)
    session.commit()

    h = BorrowHistory(item, 'Luca')
    session.add(h)
    session.commit()

    Item.query.filter_by(id=item.id).delete()
    session.commit()

    assert Room.query.count() == 1
    assert Item.query.count() == 0
    assert BorrowHistory.query.count() == 0
