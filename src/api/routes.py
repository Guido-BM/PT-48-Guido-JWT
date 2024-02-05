"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/user", methods=["GET"])
def get_user_list():
    users = User.query.all()

    return jsonify({ "users": [user.serialize() for user in users] }), 200

@api.route("/user", methods=["POST"])
def create_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", True)

    if email is None or password is None:
        return jsonify({"msg": "Bad request"}), 400

    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()

    return jsonify({ "user": user.serialize() }), 201

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    print(email)
    password = request.json.get("password", None)
    print(password)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/identify", methods=['POST', 'GET'])
@jwt_required()
def identify():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id}), 200