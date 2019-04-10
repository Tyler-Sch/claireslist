from sqlalchemy.sql import func
from backend.server import db
import datetime
import base64
import hashlib


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    room_name = db.Column(db.Text, nullable=False)
    encoded_room_name = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=func.now(), nullable=False)
    private = db.Column(db.Boolean, default=False)
    password = db.Column(db.Text)
    items = db.relationship('Item', cascade='all, delete-orphan')


    def __init__(self, room_name):
        self.room_name = room_name
        self.encoded_room_name = self.encode_room(room_name)

    def encode_room(self, room_name):
        rooms_with_same_name = Room.query.filter_by(room_name=room_name)
        if rooms_with_same_name.count() >= 1:
            room_name = "".join([room_name, str(rooms_with_same_name.count())])
        hashed_room_name = hashlib.md5(room_name.encode()).digest()
        room_encoding = base64.urlsafe_b64encode(hashed_room_name).decode()
        return room_encoding.strip('=')

    def get_items(self):
        d = {}
        for i in self.__table__.columns:
            if i.name in ['encoded_room_name', 'password']:
                continue
            else:
                d[i.name] = getattr(self, i.name)
        d['items'] = [j.get_info() for j in self.items]
        return d



class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    associated_room = db.Column(
        db.Integer,
        db.ForeignKey('room.id',ondelete='CASCADE')
    )
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    who_owns = db.Column(db.Text, nullable=False)
    who_has_current = db.Column(db.Text)
    how_long_can_borrow = db.Column(db.Text)
    due_back = db.Column(db.DateTime)
    date_posted = db.Column(db.DateTime, default=func.now(), nullable=False)
    active = db.Column(db.Boolean, default=True)
    history = db.relationship('BorrowHistory', cascade='all, delete-orphan')

    def __init__(self, room, name, who_owns):
        self.associated_room = room.id
        self.name = name
        self.who_owns = who_owns

    def get_info(self):
        d = {}
        for i in self.__table__.columns:
            d[i.name] = getattr(self, i.name)

        d['history'] = [j.get_history_info() for j in self.history]
        return d


class BorrowHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    associated_item = db.Column(db.Integer,
        db.ForeignKey('item.id', ondelete='CASCADE'),
        nullable=False
    )
    who_borrowed = db.Column(db.Text, nullable=False)
    date_borrowed = db.Column(db.DateTime, nullable=False, default=func.now())
    due_back = db.Column(db.DateTime)
    returned = db.Column(db.Boolean, default=False)
    date_returned = db.Column(db.DateTime)
    notes = db.Column(db.Text)

    def __init__(self, associated, who_borrowed):
        self.associated_item = associated.id
        self.who_borrowed = who_borrowed

    def get_history_info(self):
        d = {}
        for i in self.__table__.columns:
            d[i.name] = getattr(self, i.name)
        return d
