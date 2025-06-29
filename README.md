# 🌍 Travel Booking Fullstack App

This is a fullstack travel booking web application built with **Flask** (Python) for the backend and **React** for the frontend. Users can browse destinations, make bookings, and manage their trips. Admins can manage destinations and view messages.

---

## ✨ Features

### Users
- Sign up / Log in / Logout
- Browse and filter destinations
- Book a destination
- View, edit, confirm or delete own bookings

### Admins
- Add, edit, delete destinations
- View all confirmed bookings
- View user messages

---

## 🗂 Project Structure

project-root/

├── client/ # React frontend

│ ├── public/

│ └── src/

│ ├── Components/

│ ├── Pages/

│ └── App.jsx

│

├── server/ # Flask backend

│ ├── app.py

│ ├── models.py

│ ├── config.py

│ └── seed.py

│

└── README.md





---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Toastify  
- **Backend**: Flask, Flask-RESTful, SQLAlchemy, SQLite  
- **Auth**: Flask sessions (no JWT)

---

## 🔧 Setup Instructions

### Backend (Flask)
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed.py
python app.py
Frontend (React)

cd client
npm install
npm run dev
```


🧩 Database Schema


```
🧍 User

Field	Type	Description

id	Integer	Primary key

username	String	Unique, required

email	String	Unique, required

password	String	Hashed

admin	Boolean	Admin status
```

```
🏝 Destination

Field	Type	Description

id	Integer	Primary key

name	String	Destination name

country	String	Country name

description	Text	Info about location

image	String	Image URL

price	Float	Price per person

activities	String	Optional

message	String	Optional
```

```
📆 Booking

Field	Type	Description

id	Integer	Primary key

user_id	Foreign	Linked to User

destination_id	Foreign	Linked to Destination

people_count	Integer	Number of people

confirmed	Boolean	Booking confirmed
```

```
✉️ Message

Field	Type	Description

id	Integer	Primary key

name	String	User's name

email	String	User's email

message	Text	Message content
```

🔌 API Endpoints
```
🧍 Auth Routes

Method	Endpoint	Description

POST	/signup	Register new user

POST	/login	Log in user

DELETE	/logout	Log out user (session)
```

```
🏝 Destination Routes

Method	Endpoint	Description

GET	/destinations	Get all destinations

POST	/destinations	Create destination (admin only)

GET	/destinations/<id>	Get a destination by ID

PATCH	/destinations/<id>	Update a destination (admin only)

DELETE	/destinations/<id>	Delete destination (admin only)

```
```
📆 Booking Routes

Method	Endpoint	Description

GET	/bookings	Get current user's bookings

GET	/bookings?confirmed=true	Get confirmed bookings

GET	/bookings?confirmed=false	Get unconfirmed bookings

POST	/bookings	Create a booking (logged-in users only)

PATCH	/bookings/<id>	Update (confirm or edit) a booking

DELETE	/bookings/<id>	Delete a booking

```
```
✉️ Messages Routes

Method	Endpoint	Description

GET	/messages	Get all messages

POST	/messages	Submit a new message

```

✅ Notes

Bookings and destinations are protected with session-based auth.

Admin-only actions are restricted via session checks and backend validation.

Users only see and manage their own bookings.

📬 Contact

Feel free to open an issue or contribute via a pull request. Happy coding!

