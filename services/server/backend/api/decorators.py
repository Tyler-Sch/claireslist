from functools import wraps
from flask import jsonify, request, g
from backend.api.models import Room


def check_private_room(fn):
    @wraps(fn)
    def wrap(*args, **kwargs):
        data = request.get_json()
        requested_room = Room.query.filter_by(
            encoded_room_name=data.get('requestedRoom')
        ).first()
        g.room = requested_room
        # check if room exists
        if requested_room is None:
            return jsonify({
                'status': 'error',
                'message': 'unknown group'
            }), 400
        else:
            # check if room needs password
            if requested_room.private:
                password = data.get('password')
                if not password:
                    # is password included?
                    return jsonify({
                        'status': 'password needed',
                        'message': 'please supply a password'
                    }), 206
                else:
                    #check is password valid
                    if password == requested_room.password:
                        return fn(*args, **kwargs)
                    else:
                        return jsonify({
                            'status': 'error',
                            'message': 'invalid password'
                        }), 400
            else:
                return fn(*args, **kwargs)
    return wrap
