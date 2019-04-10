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

@server_blueprint.route('/tables/fetch/<tableid>', methods=['POST'])
@check_private_room
def getTable(tableid):
    """
        input:
            request.json = {
                'requestedRoom': Encoded room name,
                'password': None (if not a private room) otherwise password
            }
    """

    requested_room = g.room

    # if requested_room.private:
    #     try:
    #         password = request.get_json()['password']
    #         if password == requested_room.password:
    #             data = [i.__dict__ for i in requested_room.items]
    #             return jsonify({
    #                 requested_room.room_name: data
    #             })
    #         else:
    #             return jsonify({
    #                 'status': 'error',
    #                 'message': 'wrong password'
    #             }), 400
    #     except KeyError:
    #         return jsonify({
    #             'status': 'error',
    #             'message': 'must include password for this group'
    #         })
    # else:
    #     data = [i.__dict__ for i in requested_room.items]
    #     return jsonify({
    #         requested_room.room_name: data
    #     })

@server_blueprint.route('/test/check-decorator')
@check_private_room
def testDecorator():
    requested_room = g.room
    return jsonify({
        'status': 'success',
        'message': 'greetings from testDecorator function',
        'requestedRoomName': requested_room.room_name
    })
