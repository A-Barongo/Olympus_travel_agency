from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.types import JSON
from sqlalchemy.ext.hybrid import hybrid_property
from config import  bcrypt,db





class Destination(db.Model,SerializerMixin):
    __tablename__='destinations'
    
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    country=db.Column(db.String, nullable=False)
    description=db.Column(db.String)
    image=db.Column(db.String, nullable=False)
    price=db.Column(db.Integer, nullable=False)
    activities=db.Column(JSON, default=[])
    message=db.Column(db.String)
    
    bookings=db.relationship('Booking', back_populates='destination',cascade='all, delete-orphan')
    users=association_proxy('bookings','user',creator=lambda user_obj:Booking(user=user_obj))
    serialize_rules = ('-bookings.destination',)
    
    
class Booking(db.Model,SerializerMixin):
    __tablename__= 'bookings'
    
    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id=db.Column(db.Integer, db.ForeignKey('destinations.id'))
    people_count=db.Column(db.Integer, nullable=False, default=1)
    confirmed=db.Column(db.Boolean, default=False)
    
    user=db.relationship('User', back_populates='bookings')
    destination=db.relationship('Destination', back_populates='bookings')
    serialize_rules = ('-user.bookings','-destination.bookings',)
    
class User(db.Model,SerializerMixin):
    __tablename__='users'
    
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String, nullable=False,unique=True)
    email=db.Column(db.String)
    _password=db.Column(db.String, nullable=False)
    admin=db.Column(db.Boolean, default=False)
    
    bookings=db.relationship('Booking', back_populates='user',cascade='all, delete-orphan')
    destinations=association_proxy('bookings','destination',creator=lambda destination_obj:Booking(destination=destination_obj))
    serialize_rules = ('-bookings.user',)
    
    @validates('email')
    def validate_email(self, key, value):
        if '@' not in value and '.com' not in value:
            raise ValueError("Email must contain '@' and end with '.com'")
        return value
    
    @hybrid_property
    def password(self):
        raise Exception('Password hashes may not be viewed.')

    @password.setter
    def password(self, password):
        hashed= bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password = hashed.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password, password.encode('utf-8'))
    
class Message(db.Model,SerializerMixin):
    __tablename__='messages'
    
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String)
    email=db.Column(db.String)
    message=db.Column(db.String)
    
