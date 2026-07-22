# 🌾 AgriConnect AI

> **An AI-powered Smart Agriculture Platform built with React, FastAPI, PostgreSQL, and Artificial Intelligence to help farmers make data-driven decisions through crop management, disease detection, weather intelligence, price prediction, and an online marketplace.**

---

## 🚀 Overview

AgriConnect AI is a modern full-stack web application that connects farmers and buyers through an intelligent agriculture ecosystem.

The platform enables users to:

- 🌾 Manage crop inventory
- 🤖 Get AI-powered farming assistance
- 🌿 Detect crop diseases from images
- 🌦 Monitor real-time weather conditions
- 📈 Analyze crop price trends
- 🛒 Buy and sell agricultural products
- 📊 Track farm analytics using interactive dashboards

The project follows modern software engineering principles with a scalable architecture and production-ready technologies.

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

## 🎨 Modern Landing Page

- Premium Hero Section
- Gradient Background
- Feature Cards
- Statistics Section
- Responsive Design
- Dark / Light Theme
- Mobile Friendly UI

---

## 📊 Dashboard

- Interactive Analytics Cards
- Crop Statistics
- Production Metrics
- Health Index
- Weather Widget
- AI Insights
- Activity Timeline
- Recharts Visualizations

---

## 🌾 Crop Management

- Add Crops
- Edit Crops
- Delete Crops
- Search Crops
- Category Filters
- Status Filters
- Pagination
- Crop Image Upload

---

## 🛒 Marketplace

- Farmer Listings
- Buyer Marketplace
- Search & Filters
- Product Categories
- Order Inquiry
- Listing Management

---

## 🤖 AI Farming Assistant

- Chat-based AI Assistant
- Agricultural Recommendations
- Fertilizer Suggestions
- Disease Guidance
- Weather Advice
- Market Insights
- Conversation Interface

---

## 🌿 Disease Detection

- Upload Crop Images
- Disease Identification
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
- Weather Alerts
- AI Farming Recommendations

---

## 📈 Price Prediction

- Historical Crop Prices
- Price Trend Charts
- Predicted Prices
- Confidence Score
- Market Insights
- Hold / Sell Recommendations

---

## 👤 User Profile

- Profile Management
- Avatar Upload
- Change Password
- Notification Preferences
- Account Settings

---

## 🔔 Notifications

- Weather Alerts
- Marketplace Alerts
- Crop Alerts
- AI Notifications
- Mark as Read
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

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- JWT Authentication

---

## Database

- PostgreSQL
- Supabase

---

## AI & APIs

- Gemini API
- Weather API
- Image Upload Support

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- CI/CD
- Vercel
- Render

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
│   ├── config.py
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
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
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
├── render.yaml
└── vercel.json
```

---

# 🏗 System Architecture

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
     ┌──────────────┴──────────────┐
     ▼                             ▼
 Gemini AI API              Weather API
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

## Crop Management

```
GET    /api/crops
GET    /api/crops/{id}
POST   /api/crops
PUT    /api/crops/{id}
DELETE /api/crops/{id}
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Marketplace

```
GET  /api/marketplace/listings
POST /api/marketplace/listings
PUT  /api/marketplace/listings/{id}
```

---

## AI Assistant

```
POST /api/ai/chat
```

---

## Disease Detection

```
POST /api/disease/predict
POST /api/disease/upload
```

---

## Weather

```
GET /api/weather
```

---

## Price Prediction

```
GET /api/price/predict
```

---

## Notifications

```
GET /api/notifications
PUT /api/notifications/{id}/read
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

Runs at:

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

Backend:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=your_gemini_api_key

WEATHER_API_KEY=your_weather_api_key

CORS_ORIGINS=http://localhost:5173
```

> Never commit your actual `.env` file.

---

# 🐳 Docker

Run the application using Docker.

```bash
docker-compose up --build
```

---

# 🧪 Testing

### Backend

```bash
pytest
```

### Frontend

```bash
npm run build
```

---

# 🔄 Continuous Integration

GitHub Actions automatically:

- Install project dependencies
- Build the frontend
- Execute backend tests
- Validate application before merging

---

# 🚀 Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- Supabase PostgreSQL

---

# 📸 Screenshots

Add screenshots after deployment.

- Landing Page
- Dashboard
- Crop Management
- Marketplace
- AI Assistant
- Disease Detection
- Weather Intelligence
- Price Prediction

---

# 🗺 Roadmap

### ✅ Completed

- Authentication
- Landing Page
- Dashboard
- Crop Management
- Marketplace
- AI Assistant
- Disease Detection
- Weather Intelligence
- Price Prediction
- User Profile
- Notifications
- Docker
- GitHub Actions
- Responsive UI

### 🔜 Future Improvements

- IoT Sensor Integration
- Satellite Crop Monitoring
- Mobile Application
- Voice-Based AI Assistant
- Multi-language Support
- Government Scheme Recommendations

---

# 👩‍💻 Author

**Manisha Choudhary**

B.Tech Computer Science Engineering

AI-Assisted Full Stack Web Development Project

---

# 📄 License

This project is developed for educational, learning, internship, and portfolio purposes.
