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
                admin=data.get('admin', False),
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
                session['admin'] = user.admin
                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
        
    
    

    
class Destinations(Resource):
    def get(self):
        destinations=[destination.to_dict() for destination in Destination.query.all()]
        return make_response(jsonify(destinations),200)
    def post(self):
        data=request.get_json()
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized access. Please log in."}, 401
        
        user = User.query.get(user_id)
        if not user or not user.admin:
            return {"error": "Forbidden: Admins only."}, 403

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
        destination=Destination.query.get(id)
        if destination:
            return make_response(jsonify(destination.to_dict()),200)
        else:
            return {'error':"Destination by that ID not found"},404
    
    def patch(self,id):
        data = request.get_json()
        
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized access. Please log in."}, 401
        
        user = User.query.get(user_id)
        if not user or not user.admin:
            return {"error": "Forbidden: Admins only."}, 403

        destination=Destination.query.get(id)
        if not destination:
            return {'error': 'Destination not found'}, 404
        for attr in data:
            setattr(destination,attr,data[attr])
            
        db.session.commit()      
        
        return make_response(destination.to_dict(),200)
    
    def delete(self,id):
        destination=Destination.query.get(id)
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized access. Please log in."}, 401
        
        user = User.query.get(user_id)
        if not user or not user.admin:
            return {"error": "Forbidden: Admins only."}, 403
        
        if not destination:
            return {'error': 'Destination not found'}, 404
        db.session.delete(destination)
        db.session.commit()
        
class Bookings(Resource):
    def get(self, id=None):
        user_id = session.get('user_id')
        is_admin = session.get('admin')  # ← Add this logic

        if not user_id and not is_admin:
            return {"error": "Unauthorized access. Please log in."}, 401

        if id:
            booking = Booking.query.get(id)
            if booking and (booking.user_id == user_id or is_admin):
                return {
                    "id": booking.id,
                    "people_count": booking.people_count,
                    "confirmed": booking.confirmed,
                    "destination": booking.destination.to_dict(),
                    "user": {
                        "id": booking.user.id,
                        "username": booking.user.username,
                        "email": booking.user.email
                    }
                }, 200
            return {"error": "Booking not found"}, 404

        confirmed_param = request.args.get("confirmed")
        
        query = Booking.query

        # Filter by user if not admin
        if not is_admin:
            query = query.filter_by(user_id=user_id)

        # Filter by confirmed status if provided
        if confirmed_param == "true":
            query = query.filter_by(confirmed=True)
        elif confirmed_param == "false":
            query = query.filter_by(confirmed=False)

        bookings = query.all()

        #bookings = Booking.query.all()
        results = []

        for b in bookings:
            results.append({
                "id": b.id,
                "people_count": b.people_count,
                "confirmed": b.confirmed,
                "destination": b.destination.to_dict(),
                "user": {
                    "id": b.user.id,
                    "username": b.user.username,
                    "email": b.user.email
                }
            })
            
        #session["results"] = results 

        return results, 200

        
    def post(self):
        data = request.get_json()
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized access. Please log in."}, 401

        try:
            booking = Booking(
                user_id=user_id,
                destination_id=data['destination_id'],
                people_count=data.get('people_count', 1),
                confirmed=False
            )
            db.session.add(booking)
            db.session.commit()
            return booking.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422

            
    def patch(self,id):
        data=request.get_json()
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized access. Please log in."}, 401
        
        booking = Booking.query.filter_by(id=id, user_id=user_id).first()

        if not booking:
            return {'error': 'Booking not found'}, 404
        for attr in data:
            setattr(booking,attr,data[attr])
        
        db.session.commit()      
        
        return make_response(booking.to_dict(),200)
    
    def delete(self, id):
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "Unauthorized access. Please log in."}, 401
        
        booking = Booking.query.filter_by(id=id, user_id=user_id).first()
        if not booking:
            return {'error': 'Booking not found'}, 404
        
        if booking.user_id != user_id:
            return {'error': 'Forbidden: You can only delete your own bookings'}, 403
        
        db.session.delete(booking)
        db.session.commit()
        print(f"Attempting to delete booking ID {id} for user ID {user_id}")


        return {}, 204  # indicate success with no content
    

        
class Messages(Resource):
    def get(self):
        messages=[message.to_dict() for message in Message.query.all()]
        return make_response(jsonify(messages),200)
    def post(self):
        data=request.get_json()
        
        try:
            message=Message(
                name=data['name'], 
                email=data['email'],
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
        session["results"] = None
        return {}, 204
           
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Destinations, "/destinations")
api.add_resource(DestinationByID, "/destinations/<int:id>")
api.add_resource(Bookings, "/bookings", "/bookings/<int:id>")
api.add_resource(Messages, "/messages")
api.add_resource(Logout, "/logout")


if __name__ == '__main__':
    app.run(port=5001, debug=True)