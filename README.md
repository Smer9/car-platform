# Car Platform – Web Technologies Final Project

## 📌 Project Description
Car Platform is a full-stack web application developed as a final project for the **Web Technologies** course.  
The system allows users to view cars available for **sale** or **rent**, register and log in using JWT authentication, and interact with a RESTful API connected to a MongoDB database.

The project demonstrates CRUD operations, authentication, authorization, and deployment of a Node.js application.

---

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- dotenv
- CORS

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API

### Deployment
- Backend & Frontend: **Render**
- Database: **MongoDB Atlas**
- Version Control: **Git & GitHub**

---

## ⚙️ Features

- User registration and login
- JWT-based authentication
- Protected API routes
- CRUD operations for cars
- Filtering cars by:
  - Sale / Rent
  - Brand
  - Price
- Responsive frontend UI
- Deployed and accessible online

---

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)**:
- After login, the server returns a token
- The token must be sent in the `Authorization` header:

Authorization: Bearer <token>

- Protected routes cannot be accessed without a valid token

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login user

### Cars
- `GET /api/cars` – Get all cars
- `POST /api/cars` – Add a car (protected)
- `PUT /api/cars/:id` – Update car (protected)
- `DELETE /api/cars/:id` – Delete car (protected)

### Filters
- `GET /api/cars/sale`
- `GET /api/cars/rent`
- `GET /api/cars/brand/:brand`
- `GET /api/cars/price?min=50&max=150`

---

## 🧪 Testing

All API endpoints were tested using **Postman**:
- Registration
- Login
- Token-based authorization
- CRUD operations
- Filters

---

## 🚀 Deployment

The project is deployed and available online:

- **Live URL:**  
https://car-platform-sepe.onrender.com

---

## ▶️ How to Run Locally

1. Clone the repository:
 ```bash
 git clone https://github.com/Smer9/car-platform.git
```
 Install backend dependencies:
```bash
cd backend
npm install
```

Create .env file:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:
```bash
npm run dev
```

Open in browser:

http://localhost:3000

## 📁 Project Structure

## 📁 Project Structure

```text
car-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   └── cars.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── showroom.html
│   └── wiki.html
│
└── README.md
```



👨‍🎓 Author Kuanysh Asaubaev

