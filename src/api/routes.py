"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Show
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/show', methods=['POST'])
def post_show():

    showTitle = request.json.get('showTitle')
    favorite_id = request.json.get('favorite_id')


    new_show = Show (

        showTitle = showTitle,
        favorite_id = favorite_id

    )
    
    db.session.add(new_show)
    db.session.commit()
    
    return jsonify("SHOW CREATED"), 200


    
@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    age = request.json.get("age")

    new_signup = User (
        email = email, 
        password = generate_password_hash(password), 
        name = name, 
        age = age
    )
    db.session.add(new_signup)
    db.session.commit()

    return jsonify("user signedup"), 200


# POST method for Favorites// still working on this... very similar to routes
@api.route('/favorites', methods=['POST'])
def post_favorites():
    data = request.json
    new_favorite= Favorites(
        showTitle = data["showTitle"],
        favorites_id = data["favorites_id"]
    )
    db.session.add(post_favorites)
    db.session.commit()
    return jsonify(post_favorites.serialize()), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    find_user = User.query.filter_by(email = email).first()
    print(find_user.password, "where is my user?!!??!?")

    if not check_password_hash(find_user.password,password):                # <--this will return a true or false about password that was entered-->

        return jsonify("login failed!")

    token = create_access_token(identity = email)
         # ^--this creates 'token' for you,--->  <--- the [identity=email] gives access to the 'User'-->

    return jsonify(token_value = token), 200

