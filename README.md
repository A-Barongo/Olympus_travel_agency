# 🌍 Travel Booking Fullstack App

A fullstack travel booking web application built with **Flask** (Python) for the backend and **React** for the frontend. Users can browse destinations, make bookings, and manage their trips. Admins can manage destinations and view user messages.

---

## ✨ Features

### 👤 Users
- Sign up, log in, and log out
- Browse and filter destinations
- Book a destination
- View, edit, confirm, or delete own bookings

### 🛠 Admins
- Add, edit, or delete destinations
- View all confirmed bookings
- View user messages

---

## 🗂 Project Structure

```
project-root/
├── client/             # React frontend
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Pages/
│       └── App.jsx
│
├── server/             # Flask backend
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   └── seed.py
│
└── README.md
```

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, React Toastify  
- **Backend**: Flask, Flask-RESTful, SQLAlchemy, SQLite  
- **Authentication**: Flask sessions (session-based auth, no JWT)

---

## 🚀 Setup Instructions

### Backend (Flask)
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed.py
python app.py
```

### Frontend (React)
```bash
cd client
npm install
npm run dev
```

---

## 📁 Environment Variables

Ensure you create a `.env` file in the `server/` directory with the following values:

```
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///db.sqlite3
FLASK_ENV=development
```

---

## 🧩 Database Schema

### 🧍 User
| Field    | Type     | Description           |
|----------|----------|-----------------------|
| id       | Integer  | Primary key           |
| username | String   | Unique, required      |
| email    | String   | Unique, required      |
| password | String   | Hashed                |
| admin    | Boolean  | Admin status          |

### 🏝 Destination
| Field       | Type     | Description            |
|-------------|----------|------------------------|
| id          | Integer  | Primary key            |
| name        | String   | Destination name       |
| country     | String   | Country name           |
| description | Text     | Info about location    |
| image       | String   | Image URL              |
| price       | Float    | Price per person       |
| activities  | String   | Optional               |
| message     | String   | Optional               |

### 📆 Booking
| Field          | Type     | Description               |
|----------------|----------|---------------------------|
| id             | Integer  | Primary key               |
| user_id        | Foreign  | Linked to User            |
| destination_id | Foreign  | Linked to Destination     |
| people_count   | Integer  | Number of people          |
| confirmed      | Boolean  | Booking confirmed status  |

### ✉️ Message
| Field   | Type    | Description         |
|---------|---------|---------------------|
| id      | Integer | Primary key         |
| name    | String  | User's name         |
| email   | String  | User's email        |
| message | Text    | Message content     |

---

## 🔌 API Endpoints

### 🧍 Auth Routes
| Method | Endpoint     | Description          |
|--------|--------------|----------------------|
| POST   | /signup      | Register new user    |
| POST   | /login       | Log in user          |
| DELETE | /logout      | Log out user         |

### 🏝 Destination Routes
| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | /destinations          | Get all destinations                |
| POST   | /destinations          | Create destination (admin only)     |
| GET    | /destinations/<id>     | Get a destination by ID             |
| PATCH  | /destinations/<id>     | Update destination (admin only)     |
| DELETE | /destinations/<id>     | Delete destination (admin only)     |

### 📆 Booking Routes
| Method | Endpoint                | Description                             |
|--------|-------------------------|-----------------------------------------|
| GET    | /bookings               | Get current user's bookings             |
| GET    | /bookings?confirmed=true| Get confirmed bookings                  |
| GET    | /bookings?confirmed=false| Get unconfirmed bookings               |
| POST   | /bookings               | Create a booking (logged-in users only) |
| PATCH  | /bookings/<id>          | Update (confirm or edit) a booking      |
| DELETE | /bookings/<id>          | Delete a booking                        |

### ✉️ Message Routes
| Method | Endpoint     | Description             |
|--------|--------------|-------------------------|
| GET    | /messages    | Get all messages        |
| POST   | /messages    | Submit a new message    |

---


## 🐛 Troubleshooting & Known Issues

- Ensure `venv` is activated before running the Flask app.
- React dev server may conflict on port 5173. Modify `vite.config.js` if needed.
- Database must be seeded before first use with `python seed.py`.

---

## 📦 Deployment Notes

- Use **Gunicorn** or **uWSGI** for deploying the Flask app in production.
- Frontend should be built using:
```bash
cd client
npm run build
```
- Serve built files with a static server or integrate with Flask via `send_from_directory`.

---

## 💬 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License**.  
See `LICENSE` file for details.

---
## Acknowledgement
Created by A-Barongo, Emmanuel Gitau and Paul Ashton
## 📬 Contact

Feel free to open an issue or contribute via a pull request.  
For questions, email [allanbarongo5@gmail.com ]  
Happy coding! 🚀
