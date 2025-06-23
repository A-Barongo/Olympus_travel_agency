#!/usr/bin/env python3

from app import app, db
from models import User, Destination, Booking,Message
from faker import Faker
import random

fake = Faker()

def seed_data():
    with app.app_context():
        print("Clearing database...")
        Booking.query.delete()
        Destination.query.delete()
        User.query.delete()
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
        for _ in range(8):
            destination = Destination(
                name=fake.city(),
                country=fake.country(),
                description=fake.text(),
                image=fake.image_url(),
                price=random.randint(100, 1000),
                activities=[fake.word() for _ in range(3)],
                message=fake.sentence()
            )
            db.session.add(destination)
            destinations.append(destination)

        db.session.commit()

        print("Seeding bookings...")
        for _ in range(5):
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
    print("Database seeded successfully.")
if __name__ == '__main__':
    seed_data()
