from test.fixture_base import *
from backend.api.models import Room, Item, BorrowHistory
import datetime

def add_default_room_and_two_items(session):
    r  = Room('basic room')
    session.add(r)
    session.commit()

    i1 = Item(r, 'toy trucks', 'hudson')
    i2 = Item(r, 'toy boats', 'potato')
    session.add(i1)
    session.add(i2)
    session.commit()

    return (r, [i1, i2])

def test_create_Borrow_History(session):
    room, items = add_default_room_and_two_items(session)
    bh = BorrowHistory(items[0], 'Luca')
    session.add(bh)
    session.commit()


    assert BorrowHistory.query.count() == 1
    assert len(Item.query.first().history) == 1
    assert Item.query.first().history[0].who_borrowed == 'Luca'
    # assert bh.date_borrowed != None

    bh.returned = True
    bh.date_returned = datetime.datetime.utcnow()

    bh2 = BorrowHistory(items[0], 'Frank')
    session.add(bh2)
    session.commit()

    assert BorrowHistory.query.count() == 2
    assert len(Item.query.first().history) == 2
    assert items[0].history[0].returned == True
    assert items[0].history[0].date_returned != None

def test_get_info_methods(session):
    room, items = add_default_room_and_two_items(session)
    bh = BorrowHistory(items[0], 'Luca')
    session.add(bh)
    session.commit()

    item_info = room.get_items()
    assert item_info['id'] == room.id
    assert item_info['room_name'] == room.room_name
    assert 'encoded_room_name' not in item_info
    assert len(item_info['items']) == 2
    assert item_info['items'][0]['name'] == items[0].name
    assert len(item_info['items'][0]['history']) == 1
    assert item_info['items'][0]['history'][0]['who_borrowed'] == 'Luca'
