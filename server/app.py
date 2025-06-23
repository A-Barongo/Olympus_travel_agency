#!/usr/bin/env python3

from flask import request, session,make_response,jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User,Message,Booking,Destination

class Signup(Resource):
    def post(self):
        data = request.get_json()

        try:
            user = User(
                username=data['username'],
                admin=data['admin']
                email=data['email']
            )
            user.password= data['password'] 

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return make_response(jsonify(user.to_dict()), 201)

        except Exception as e:
            db.session.rollback()
            return {'error': 'There was an error while signing you up.'}, 422
        
class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
    
class Destinations(Resource):
    def get(self):
        destinations=[destination.to_dict() for destination in Destination.query.all()]
        return make_response(jsonify(destinations),200)
    def post(self):
        data=request.get_json()
        try:
            destination=Destination(
                name=data['name'],
                country=data['country'],
                description=data['description'],
                image=data['image'],
                price=data['price'],
                activities=data['activities'],
                message=data['message']
            )
            db.session.add(destination)
            db.session.commit()
            
            return make_response(destination.to_dict(),201)
        
        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422
    
class DestinationByID(Resource):
    def get(self,id):
        destination=Destination.query.filter(Destination.id==id).first()
        if destination:
            return make_response(jsonify(destination.to_dict()),200)
        else:
            return {'error':"Destination by that ID not found"},404
    
    def patch(self,id):
        data = request.get_json()
        destination=Destination.query.filter(Destination.id==id).first()
        
        for attr in data:
            setattr(destination,attr,data[attr])
            
        db.session.add(destination)
        db.session.commit()      
        
        return make_response(destination.to_dict(),200)
    
    def delete(self,id):
        destination=Destination.query.filter(Destination.id==id).first()
        
        db.session.delete(destination)
        db.session.commit()
        
class Bookings(Resource):
    def get(self,id=None):
        if id:
            booking = Booking.query.get(id)
            if booking:
                return booking.to_dict(), 200
            return {"error": "Booking not found"}, 404
        else:
            bookings = Booking.query.all()
            return [b.to_dict() for b in bookings], 200
        
    def post(self,id=None):
        data=request.get_json()
        try:
            booking=Booking(
                user_id=data['user_id'],
                destination_id=data['destination_id'],
                people_count=data['people_count']
                confirmed=data['confirmed']
            )
            db.session.add(booking)
            db.session.commit()
            
            return make_response(booking.to_dict(),201)
        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422
        
    def patch(self,id):
        data=request.get_json()
        booking=Booking.query.filter(Booking.id==id)
        
        for attr in data:
            setattr(booking,attr,data[attr])
        db.session.add(booking)
        db.session.commit()      
        
        return make_response(booking.to_dict(),200)
    
    def delete(self,id):
        booking=Booking.query.filter(Destination.id==id).first()
        
        db.session.delete(booking)
        db.session.commit()   
        
class Messages(Resource):
    def get(self):
        messages=[message.to_dict() for message in Message.query.all()]
        return make_response(jsonify(messages),200)
    def post(self):
        data=request.get_json()
        
        try:
            message=Message(
                name=data['name'] 
                email=data['email'] 
                message=data['message'] 
            )
            
            db.session.add(message)
            db.session.commit()
            return make_response(message.to_dict(),201)
        
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
class Logout(Resource):

    def delete(self):

        session['user_id'] = None
        
        return {}, 204
           
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Destinations, "/destinations")
api.add_resource(DestinationByID, "/destinations/<int:id>")
api.add_resource(Bookings, "/Bookings/<int:id>")
api.add_resource(Messages, "/messages")
api.add_resource(Logout, "/logouts")


if __name__ == '__main__':
    app.run(port=5001, debug=True)