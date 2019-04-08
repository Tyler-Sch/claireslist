from sqlalchemy.sql import func
from backend.server import db
import base64
import hashlib


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    room_name = db.Column(db.Text, nullable=False)
    encoded_room_name = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=func.now(), nullable=False)
    items = db.relationship('Item')

    def __init__(self, room_name):
        self.room_name = room_name
        self.encoded_room_name = self.encode_room(room_name)

    def encode_room(self, room_name):
        hashed_room_name = hashlib.md5(room_name.encode()).digest()
        room_encoding = base64.urlsafe_b64encode(hashed_room_name).decode()
        return room_encoding.strip('=')


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    associated_room = db.Column(db.Integer, db.ForeignKey('room.id'))
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    who_owns = db.Column(db.Text, nullable=False)
    who_has_current = db.Column(db.Text)
    how_long_can_borrow = db.Column(db.Text)
    due_back = db.Column(db.DateTime)
    date_posted = db.Column(db.DateTime, default=func.now(), nullable=False)
    active = db.Column(db.Boolean, default=True)
    history = db.relationship('BorrowHistory')
    def __init__(self, room, name, who_owns):
        self.associated_room = room.id
        self.name = name
        self.who_owns = who_owns


class BorrowHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    associated_item = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    who_borrowed = db.Column(db.Text, nullable=False)
    date_borrowed = db.Column(db.DateTime, nullable=False, default=func.now())
    due_back = db.Column(db.DateTime)
    returned = db.Column(db.Boolean, default=False)
    date_returned = db.Column(db.DateTime)
    notes = db.Column(db.Text)

    def __init__(self, associated, who_borrowed):
        self.associated_item = associated.id
        self.who_borrowed = who_borrowed
