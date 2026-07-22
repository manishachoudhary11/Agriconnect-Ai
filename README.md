# 🌾 AgriConnect AI

<h3 align="center">
AI-Powered Smart Agriculture Platform
</h3>

<p align="center">
A modern full-stack web application that empowers farmers with AI-driven crop management, weather intelligence, disease detection, price prediction, and an agricultural marketplace.
</p>

<p align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-Supabase-336791?logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-Authentication-success"/>
<img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Active-success"/>

</p>

---

# 📖 About

**AgriConnect AI** is a modern AI-powered Smart Agriculture platform that helps farmers and buyers manage agricultural activities using Artificial Intelligence and modern web technologies.

The platform provides crop management, intelligent farming assistance, weather monitoring, disease detection, price analytics, and an agriculture marketplace within a single application.

This project demonstrates full-stack development using **React, FastAPI, PostgreSQL, SQLAlchemy, JWT Authentication**, and modern UI/UX principles.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing
- Protected Routes
- Session Management

---

## 🎨 Landing Page

- Modern Responsive UI
- Premium Hero Section
- Feature Highlights
- Statistics Section
- Dark / Light Theme
- Responsive Navigation
- Responsive Footer

---

## 📊 Dashboard

- Analytics Cards
- Crop Statistics
- Production Overview
- Crop Health Metrics
- Interactive Charts
- Weather Widget
- AI Insights
- Activity Timeline

---

## 🌾 Crop Management

- Create Crops
- Update Crops
- Delete Crops
- Search Crops
- Category Filters
- Status Filters
- Pagination
- Crop Image Upload

---

## 🛒 Marketplace

- Browse Listings
- Farmer Listings
- Buyer Marketplace
- Product Categories
- Search & Filters
- Order Inquiry

---

## 🤖 AI Farming Assistant

- Chat-based AI Interface
- Agricultural Guidance
- Crop Recommendations
- Fertilizer Suggestions
- Disease Guidance
- Weather Advice
- Farming Best Practices

---

## 🌿 Disease Detection

- Upload Crop Images
- Disease Prediction
- Confidence Score
- Disease Description
- Organic Treatment
- Chemical Treatment
- Prevention Tips

---

## 🌦 Weather Intelligence

- Live Weather Data
- Temperature
- Humidity
- Wind Speed
- Weekly Forecast
- Weather Insights

---

## 📈 Price Prediction

- Historical Crop Prices
- Trend Analysis
- Predicted Prices
- Market Insights
- Hold / Sell Suggestions

---

## 👤 User Profile

- Edit Profile
- Change Password
- Avatar Support
- Account Settings

---

## 🔔 Notifications

- Weather Alerts
- Marketplace Alerts
- Crop Alerts
- AI Recommendations
- Notification Center

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- React Icons

## Backend

- Python
- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic
- Uvicorn

## Database

- PostgreSQL
- Supabase

## AI & APIs

- Gemini API
- Weather API

## DevOps

- Docker
- GitHub Actions

---

# 📂 Project Structure

```text
AgriConnectAI
│
├── .github
│   └── workflows
│
├── backend
│   ├── core
│   ├── routers
│   ├── services
│   ├── tests
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── public
│
├── src
│   ├── components
│   ├── pages
│   ├── providers
│   ├── context
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── README.md
└── vite.config.js
```

---

# 🏗 Architecture

```text
React Frontend
        │
        ▼
Axios REST API
        │
        ▼
FastAPI Backend
        │
        ▼
SQLAlchemy ORM
        │
        ▼
PostgreSQL (Supabase)
        │
        ├── Gemini AI
        └── Weather API
```

---

# 🔗 REST APIs

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Crops

```
GET    /api/crops
GET    /api/crops/{id}
POST   /api/crops
PUT    /api/crops/{id}
DELETE /api/crops/{id}
```

## Dashboard

```
GET /api/dashboard
```

## Marketplace

```
GET  /api/marketplace/listings
POST /api/marketplace/listings
PUT  /api/marketplace/listings/{id}
```

## AI Assistant

```
POST /api/ai/chat
```

## Disease Detection

```
POST /api/disease/predict
```

## Weather

```
GET /api/weather
```

## Price Prediction

```
GET /api/price/predict
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/manishachoudhary11/Agriconnect-Ai.git
```

## Frontend

```bash
npm install

npm run dev
```

Runs at:

```
http://localhost:5173
```

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Runs at:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 🔐 Environment Variables

Example:

```env
DATABASE_URL=

SECRET_KEY=

ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=

WEATHER_API_KEY=
```

> Never commit your real `.env` file.

---

# 🐳 Docker

Docker support has been prepared for containerized deployment.

---

# 🔄 Continuous Integration

GitHub Actions are configured to automate:

- Frontend build
- Backend testing
- Continuous Integration workflow

---

# 🗺 Roadmap

### ✅ Completed

- Authentication
- Premium Landing Page
- Dashboard
- Crop Management
- Marketplace
- AI Assistant
- Disease Detection
- Weather Intelligence
- Price Prediction
- User Profile
- Notifications

### 🚀 Future Enhancements

- Mobile Application
- Multi-language Support
- IoT Sensor Integration
- Satellite Crop Monitoring
- Voice-based AI Assistant
- Government Scheme Recommendations

---

# 👩‍💻 Author

**Manisha Choudhary**

B.Tech Computer Science Engineering

AI-Assisted Full Stack Development Project

---

# 📄 License

This project is developed for learning, educational, internship, and portfolio purposes.
