from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.types import JSON
from sqlalchemy.ext.hybrid import hybrid_property
from config import  bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Destination(db.model,SerializerMixin):
    __tablename__='destinations'
    
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    country=db.Column(db.String, nullable=False)
    description=db.Column(db.String)
    image=db.Column(db.String, nullable=False)
    price=db.Column(db.Integer, nullable=False)
    activities=db.Column(JSON, default=[])
    message=db.Column(db.String)
    
class Booking(db.model,SerializerMixin):
    __tablename__= 'bookings'
    
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    country=db.Column(db.String, nullable=False)
    price=db.Column(db.Integer, nullable=False)
    description=db.Column(db.String)
    image=db.Column(db.String, nullable=False)
    confirmed=db.Column(db.Boolean, default=False)
    
    
class User(db.model,SerializerMixin):
    __tablename__='users'
    
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String, nullable=False,unique=True)
    _password=db.Column(db.String, nullable=False)
    admin=db.Column(db.Boolean, default=False)
    
    
    @hybrid_property
    def password(self):
        raise Exception('Password hashes may not be viewed.')

    @password.setter
    def password(self, password):
        password= bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password = password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
class Messages(db.model,SerializerMixin):
    __tablename__='messages'
    
    id=db.Column(db.Integer,primary_ket=True)
    name=db.Colum(db.String)
    email=db.Colum(db.String)
    message=db.Colum(db.String)
    
