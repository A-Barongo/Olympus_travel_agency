#!/usr/bin/env python3

from app import app, db
from models import User, Destination, Booking, Message
from faker import Faker
import random

fake = Faker()

DESTINATIONS_DATA = [
    {
      
      "name": "Paris",
      "country": "France",
      "description": "The city of lights, known for its art, fashion, and culture.",
      "image": "https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 12000,
      "activities": [
        "Skiing",
        "Cultural Festivals",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Tokyo",
      "country": "Japan",
      "description": "A bustling metropolis known for its modern architecture and rich history.",
      "image": "https://images.pexels.com/photos/14095371/pexels-photo-14095371.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 15000,
      "activities": [
        "Surfing",
        "Temple Visits",
        "Night Markets"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "New York",
      "country": "USA",
      "description": "The city that never sleeps, famous for its skyline and cultural diversity.",
      "image": "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 20000,
      "activities": [
        "Broadway Shows",
        "Museums",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Sydney",
      "country": "Australia",
      "description": "Known for its Sydney Opera House and beautiful beaches.",
      "image": "https://images.pexels.com/photos/1586046/pexels-photo-1586046.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 18000,
      "activities": [
        "Surfing",
        "Beach Parties",
        "Wildlife Tours"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Cairo",
      "country": "Egypt",
      "description": "Famous for its ancient civilization and some of the world's most famous monuments.",
      "image": "https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 13000,
      "activities": [
        "Desert Safari",
        "Historical Tours",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Rio de Janeiro",
      "country": "Brazil",
      "description": "Known for its Copacabana beach and the Christ the Redeemer statue.",
      "image": "https://images.pexels.com/photos/2876407/pexels-photo-2876407.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 16000,
      "activities": [
        "Carnival",
        "Beach Parties",
        "Hiking"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Rome",
      "country": "Italy",
      "description": "Known for its nearly 3,000 years of globally influential art, architecture, and culture.",
      "image": "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 13000,
      "activities": [
        "Historical Tours",
        "Culinary Tours",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Bangkok",
      "country": "Thailand",
      "description": "Known for ornate shrines and vibrant street life.",
      "image": "https://images.pexels.com/photos/1929611/pexels-photo-1929611.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 10000,
      "activities": [
        "Temple Visits",
        "Street Food Tours",
        "Night Markets"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Dubai",
      "country": "UAE",
      "description": "Known for luxury shopping, ultramodern architecture, and a lively nightlife scene.",
      "image": "https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 17000,
      "activities": [
        "Desert Safari",
        "Shopping",
        "Cultural Tours"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Istanbul",
      "country": "Turkey",
      "description": "Known for its historic sites and vibrant culture.",
      "image": "https://images.pexels.com/photos/2159549/pexels-photo-2159549.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 12500,
      "activities": [
        "Historical Tours",
        "Culinary Tours",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Barcelona",
      "country": "Spain",
      "description": "Known for its art and architecture.",
      "image": "https://images.pexels.com/photos/705424/pexels-photo-705424.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 14500,
      "activities": [
        "Cultural Festivals",
        "Shopping",
        "Beach Parties"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "London",
      "country": "UK",
      "description": "Known for its history, culture, and iconic landmarks.",
      "image": "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 15500,
      "activities": [
        "Museums",
        "Theatre Shows",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Moscow",
      "country": "Russia",
      "description": "Known for its historical and architectural landmarks.",
      "image": "https://images.pexels.com/photos/236294/pexels-photo-236294.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 13500,
      "activities": [
        "Historical Tours",
        "Cultural Festivals",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Singapore",
      "country": "Singapore",
      "description": "Known for its cleanliness, safety, and modern architecture.",
      "image": "https://images.pexels.com/photos/1682794/pexels-photo-1682794.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 17500,
      "activities": [
        "Shopping",
        "Culinary Tours",
        "Night Safari"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Seoul",
      "country": "South Korea",
      "description": "Known for its pop culture, technology, and rich history.",
      "image": "https://images.pexels.com/photos/2128042/pexels-photo-2128042.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 16000,
      "activities": [
        "K-Pop Concerts",
        "Culinary Tours",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Los Angeles",
      "country": "USA",
      "description": "Known for its entertainment industry and beautiful beaches.",
      "image": "https://images.pexels.com/photos/8783146/pexels-photo-8783146.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 19000,
      "activities": [
        "Hollywood Tours",
        "Beach Parties",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Hong Kong",
      "country": "China",
      "description": "Known for its skyline and deep natural harbor.",
      "image": "https://images.pexels.com/photos/1337144/pexels-photo-1337144.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 16500,
      "activities": [
        "Shopping",
        "Culinary Tours",
        "Night Markets"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Amsterdam",
      "country": "Netherlands",
      "description": "Known for its artistic heritage, elaborate canal system, and narrow houses.",
      "image": "https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 15000,
      "activities": [
        "Cultural Festivals",
        "Museums",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Buenos Aires",
      "country": "Argentina",
      "description": "Known for its European-style architecture and rich cultural life.",
      "image": "https://images.pexels.com/photos/31731055/pexels-photo-31731055/free-photo-of-colorful-fishing-boats-in-mar-del-plata-harbor.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 14000,
      "activities": [
        "Tango Shows",
        "Culinary Tours",
        "Shopping"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    },
    {
      
      "name": "Mumbai",
      "country": "India",
      "description": "Known for its Bollywood film industry and vibrant culture.",
      "image": "https://images.pexels.com/photos/12460245/pexels-photo-12460245.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "price": 13000,
      "activities": [
        "Cultural Festivals",
        "Shopping",
        "Beach Parties"
      ],
      "message": "Package inclusive of accomodation and tour guides."
    }
    
]

def seed_data():
    with app.app_context():
        print("Clearing database...")
        Booking.query.delete()
        Destination.query.delete()
        User.query.delete()
        Message.query.delete()
        db.session.commit()

        print("Seeding users...")
        users = []
        for i in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                admin=(i == 0)
            )
            user.password = "password123"
            db.session.add(user)
            users.append(user)
        db.session.commit()

        print("Seeding destinations...")
        destinations = []
        for dest_data in DESTINATIONS_DATA:
            destination = Destination(**dest_data)
            db.session.add(destination)
            destinations.append(destination)
        db.session.commit()

        print("Seeding bookings...")
        for _ in range(10):
            booking = Booking(
                user_id=random.choice(users).id,
                destination_id=random.choice(destinations).id,
                people_count=random.randint(1, 5),
                confirmed=random.choice([True, False])
            )
            db.session.add(booking)
        db.session.commit()

        print("Seeding messages...")
        for _ in range(5):
            message = Message(
                name=fake.name(),
                email=fake.email(),
                message=fake.sentence()
            )
            db.session.add(message)
        db.session.commit()

        print("✅ Database seeded successfully.")

if __name__ == '__main__':
    seed_data()
