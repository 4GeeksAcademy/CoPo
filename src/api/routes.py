"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Show
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from models import db, User, Favorites, Show

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/show', methods=['POST'])
def post_show():

    showTitle = request.json.get('showTitle')
    favoriteId = request.json.get('favoriteId')


    new_show = Show (

        showTitle = showTitle,
        favoriteId = favoriteId

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
        password = password, 
        name = name, 
        age = age, 
    )
    db.session.add(new_signup)
    db.session.commit()

    return jsonify("user signedup"), 200


# POST method for Favorites// still working on this... very similar to routes
@app.route('/show', methods=['POST'])
def post_favorites():
    data = request.json
    new_show= Show(
        showTitle = data["showTitle"],
        favorite_id = data["favorites_id"]
    )
    db.session.add(post_favorites)
    db.session.commit()
    return jsonify(post_favorites.serialize()), 200

