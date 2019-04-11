from flask import Blueprint, jsonify, request, g
from backend.api.models import *
from backend.server import db
from backend.api.decorators import check_private_room

server_blueprint = Blueprint('server', __name__)

@server_blueprint.route('/')
def index():
    return jsonify({'working': True})


@server_blueprint.route('/tables/create_new', methods=['POST'])
def create_table():
    """
        takes json post request in format of
            {
                'roomName': roomName,
                'private': True or False,
                'password': password if private
            }
        returns
            {
                'status': 'success' or 'error'
                'url': encoded url (to be used for accessing)
            }

        NOTE:
            name of room must be greater than 4 chars (4 is arbitary)
    """

    data = request.get_json()
    # check if data is valid
    if not data['roomName'] or len(data['roomName']) < 4:
        return jsonify({'status': 'error', 'message': 'invalid room name'}), 400
    # check if room exists done on database

    new_room = Room(data['roomName'])
    db.session.add(new_room)
    db.session.commit()

    if data['private']:
        new_room.private = True
        new_room.password = data['password']
        db.session.commit()

    response = {'status': 'success', 'url': new_room.encoded_room_name}
    return jsonify(response)

@server_blueprint.route('/tables/fetch', methods=['POST'])
@check_private_room
def getTable():
    """
        input handled by decorator:
            request.json = {
                'requestedRoom': Encoded room name,
                'password': None (if not a private room) otherwise password
            }
        passes on requested room via global context variable

        output:
            json response {
                'status':
                'message':
                'roomInfo':{
                    'roomName':
                    'date_created':
                    'private':
                    'items': [
                        {
                            'name':
                            'description':
                            'who_owns':
                            'who_has_current':
                            'how_long_can_borrow':
                            'due_back':
                            'date_posted':
                            'history': [{
                                id:
                                who_borrowed:
                                date_borrowed:
                                due_back:
                                returned:
                                date_returned:
                                notes:
                            }...]
                        },
                    ...]
                }
            }
    """

    requested_room = g.room

    return jsonify({
        'status': 'success',
        'message': 'here is the info you requested',
        'roomInfo': requested_room.get_items()
    })

@server_blueprint.route('/tables/modify/delete-item')
@check_private_room
def delete_record():
    """
        input: request with json in form of
            {
                requestedRoom:
                password:
                action: {
                    type: delete,
                    target: [item, room, borrowHistory]
                    targetId: targetid
                }
            }
    """
    requested_room = g.room
    data = request.get_json()
    pass

@server_blueprint.route('/tables/modify/update', methods=['POST'])
@check_private_room
def update_record():
    """
        input: request with json
            {
                requestedRoom:
                password:
                action: {
                    type: update,
                    target: [item, room, or borrowHistory]
                    targetId: targetid
                    dataToUpdate: {column: newVal, column2: newVal...}
                }
            }
    """
    requested_room = g.room
    data = request.get_json()

    info = data['action']
    if info['type'] != 'update':
        return jsonify({
            'status': 'error',
            'message': 'invalid action type for endpoint'
        })
    target_dict = {
        'item': Item,
        'room': Room,
        'borrowHistory': BorrowHistory
    }
    target_id = int(info['targetId'])
    target = target_dict[info['target']]
    check = db.session.query(target).filter(target.id == target_id).update(
            {getattr(target,k): v for k,v in info['dataToUpdate'].items()})

    db.session.commit()
    return jsonify({
        'status': 'success',
        'message': 'data modified successfully',
        'dbresponse': check
    })


@server_blueprint.route('/test/check-decorator')
@check_private_room
def testDecorator():
    requested_room = g.room
    return jsonify({
        'status': 'success',
        'message': 'greetings from testDecorator function',
        'requestedRoomName': requested_room.room_name
    })
