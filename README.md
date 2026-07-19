# 🌾 AgriConnect AI

<div align="center">

### 🚀 AI-Powered Smart Agriculture Platform

A modern full-stack web application that empowers farmers and buyers through AI-driven crop management, marketplace services, analytics, and intelligent farming assistance.

**Built with React, FastAPI, PostgreSQL, and JWT Authentication**

---

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-yellow?logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Status](https://img.shields.io/badge/Status-Under_Development-success)

</div>

---

# 📖 About

AgriConnect AI is a production-oriented agriculture platform designed to bridge the gap between farmers and buyers using Artificial Intelligence.

The application helps users manage crops, monitor agricultural data, analyze market trends, and leverage AI-powered insights for better farming decisions.

This project is being developed following modern software engineering principles, scalable architecture, and clean coding practices.

---

# ✨ Current Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing
- Protected Routes
- User Roles
- Logout

---

## 🌾 Crop Management API

- Create Crop
- View All Crops
- View Single Crop
- Update Crop
- Delete Crop
- Search Crops

---

## 🎨 Frontend

- Premium Responsive Landing Page
- Modern Hero Section
- Responsive Navbar
- Responsive Footer
- Dark / Light Theme
- Dashboard
- About Page
- Login & Register UI
- Reusable UI Components
- Component Library

---

## ⚙️ Backend

- FastAPI
- SQLAlchemy ORM
- PostgreSQL (Supabase)
- JWT Authentication
- Environment Configuration
- RESTful APIs
- CORS Support

---

# 🚀 Upcoming Features

- 🤖 AI Chat Assistant
- 🌿 Disease Detection using Image Upload
- 🌦 Weather Intelligence
- 📈 Crop Price Prediction
- 🛒 Marketplace for Farmers & Buyers
- 📊 Interactive Analytics Dashboard
- 👤 User Profile Management
- 🔔 Notifications
- 🐳 Docker Support
- ☁️ Deployment
- 🔄 CI/CD Pipeline
- 🧪 Automated Testing

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

## Backend

- Python
- FastAPI
- SQLAlchemy
- Uvicorn
- Passlib
- Python-Jose

## Database

- PostgreSQL
- Supabase

---

# 📂 Project Structure

```
AgriConnectAI
│
├── backend
│   ├── core
│   ├── routers
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── config.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── src
│   ├── components
│   ├── context
│   ├── pages
│   ├── providers
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── public
├── package.json
├── vite.config.js
└── README.md
```

---

# 🔗 REST API

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

---

## Crop APIs

```
GET    /api/crops
GET    /api/crops/{id}
POST   /api/crops
PUT    /api/crops/{id}
DELETE /api/crops/{id}
GET    /api/crops/search
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/manishachoudhary11/Agriconnect-Ai.git
```

---

## Frontend

```bash
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Runs on

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ACCESS_TOKEN_EXPIRE_MINUTES=60

CORS_ORIGINS=http://localhost:5173
```

> **Never commit your real `.env` file to GitHub.**

---

# 🏗 Architecture

```
React Frontend
        │
        ▼
Axios API Calls
        │
        ▼
FastAPI Backend
        │
        ▼
SQLAlchemy ORM
        │
        ▼
PostgreSQL (Supabase)
```

---

# 📈 Project Roadmap

- ✅ Backend Development
- ✅ Authentication
- ✅ Crop CRUD APIs
- ✅ Premium Landing Page
- 🚧 Dashboard Improvements
- ⏳ Marketplace
- ⏳ AI Assistant
- ⏳ Disease Detection
- ⏳ Weather Intelligence
- ⏳ Price Prediction
- ⏳ Docker
- ⏳ CI/CD
- ⏳ Deployment

---

# 📸 Screenshots

Coming Soon

- Landing Page
- Dashboard
- Authentication
- Marketplace
- AI Assistant

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a Pull Request.

---

# 📄 License

This project is developed for learning, portfolio, and educational purposes.

---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

**Made with ❤️ using React + FastAPI + AI**

</div>
