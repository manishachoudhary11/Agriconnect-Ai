# 🌾 AgriConnect AI 2.0 – Production-Grade Smart Agriculture SaaS Platform

[![CI/CD Pipeline](https://github.com/agriconnect/agriconnect-ai/actions/workflows/ci.yml/badge.svg)](https.github.com/agriconnect/agriconnect-ai/actions)
[![React 19](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-8E44AD?logo=google)](https://deepmind.google/technologies/gemini/)

**AgriConnect AI 2.0** is an enterprise-scale, AI-powered Smart Agriculture platform designed to empower farmers, agronomists, and wholesale buyers. By combining **Google Gemini 1.5 AI**, **computer vision leaf disease diagnostics**, **openweather microclimate intelligence**, and **predictive mandi price analytics**, AgriConnect AI transforms raw agricultural data into actionable decisions.

---

## 🚀 Key Modules & Features

### 1. 📊 Professional Command Dashboard
- Real-time farm analytics counters (Active Crops, Total Volume, Average Market Rate, AI Health Index).
- Interactive **Recharts** price trend lines with dark-mode gradient fills & crop inventory distribution donut charts.
- Weather intelligence card & prioritized Gemini AI recommendation feed.

### 2. 🌱 Crop Management Engine
- Full CRUD lifecycle management for crops with category & status tagging (`growing`, `harvested`, `stored`, `sold`).
- Debounced search, category filters, responsive Grid vs Data Table views, and server-side pagination.
- Image attachment & upload integration.

### 3. 🏪 B2B Produce Marketplace
- **Farmer Portal**: Create, edit, publish, and delete wholesale produce listings.
- **Buyer Portal**: Filter produce by category, region, price per unit, and stock availability.
- **Order & Inquiry Hub**: Direct buyer-seller trade inquiry system with automated total price math (Quantity × Unit Price).

### 4. 🤖 ChatGPT-Style AI Assistant (Gemini 1.5)
- Conversational interface with context history persistence (`/api/ai/conversations`).
- Markdown rendering (`react-markdown` + `remark-gfm`) for structured agronomy advice.
- Suggested prompt pills, typing animation indicator, and auto-scroll to bottom.

### 5. 🔬 Computer Vision Disease Detection
- Drag-and-Drop leaf photo diagnostic tool.
- Disease match identification with confidence percentages.
- Actionable treatment breakdown covering **Organic Solutions**, **Chemical Treatments**, and **Preventive Tips**.

### 6. 🌦️ Microclimate Weather Intelligence
- Live weather metrics (Temperature, Feels Like, Humidity, Wind Speed, 1h Rain risk).
- 7-day agricultural forecast grid.
- Dynamic Gemini AI weather advice tailoring irrigation and fertilizer scheduling.

### 7. 📈 Price Prediction & Market Analytics
- 30-Day predictive price forecasting with model confidence scores.
- Trading recommendation badges (**HOLD STOCK** / **SELL NOW**).
- 12-Month historical trend charts.

### 8. 👤 Profile & Notification Settings
- User credentials management, phone/location editing, and password updates.
- Notification Preference toggles (Weather Alerts, Marketplace Inquiries, AI Tips).
- Real-time Notifications Center with unread badges and single-click read markers.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 19, Vite, Tailwind CSS v4, Recharts, React Icons, React Markdown |
| **Backend API** | FastAPI, Python 3.11, Uvicorn, Pydantic v2 |
| **Database & ORM** | PostgreSQL / Supabase, SQLAlchemy ORM |
| **AI & ML Integration** | Google Gemini 1.5 Flash API, Computer Vision Service |
| **DevOps & Containers** | Docker, Docker Compose, Nginx, GitHub Actions CI/CD |
| **Deployment Targets** | Vercel (Frontend), Render (Backend), Supabase (Database) |

---

## 📂 Folder Architecture

```text
AgriConnectAI/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD Pipeline
├── backend/
│   ├── core/                      # Auth, Security, Dependencies, File Uploads
│   ├── routers/                   # FastAPI Endpoints (auth, crops, dashboard, marketplace, ai, disease, weather, price, notifications)
│   ├── services/                  # Business Logic (AI, Disease, Price, Weather services)
│   ├── tests/                     # Pytest Backend Unit Tests
│   ├── config.py                  # Environment Configuration
│   ├── database.py                # SQLAlchemy Engine Setup
│   ├── Dockerfile                 # Backend Container Spec
│   ├── main.py                    # FastAPI Entrypoint
│   ├── models.py                  # SQLAlchemy Database Schemas
│   ├── requirements.txt           # Python Dependencies
│   └── schemas.py                 # Pydantic Schemas
├── public/                        # Static Assets
├── src/
│   ├── components/
│   │   ├── dashboard/             # Dashboard Widgets & Recharts Components
│   │   ├── ui/                    # Reusable Design System Components
│   │   ├── Footer.jsx             # App Footer
│   │   ├── Navbar.jsx             # Navigation Header with Dark Mode & Links
│   │   └── ProtectedRoute.jsx     # Auth Route Guard
│   ├── context/                   # Auth & Theme Context Providers
│   ├── lib/                       # Axios API Client & Utility Helpers
│   ├── pages/                     # Application Pages (Dashboard, Crops, Marketplace, AIAssistant, DiseaseDetection, WeatherIntelligence, PricePrediction, Profile, Notifications)
│   ├── App.jsx                    # React Router Setup
│   └── main.jsx                   # React Entrypoint
├── docker-compose.yml             # Local Multi-Container Orchestration
├── Dockerfile                     # Frontend Multi-stage Docker Spec
├── nginx.conf                     # Nginx Reverse Proxy Config
├── render.yaml                    # Render Production Backend Manifest
├── vercel.json                    # Vercel Production Frontend Manifest
└── README.md                      # Production Documentation
```

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
- Node.js (v18+ or v20+)
- Python (v3.11+)
- PostgreSQL (or Supabase URL)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Create .env file with your credentials:
# DATABASE_URL=sqlite:///./agriconnect.db (or PostgreSQL URL)
# JWT_SECRET=your_secret_key
# GEMINI_API_KEY=your_gemini_api_key

uvicorn main:app --reload --port 8000
```
Backend Swagger API Documentation: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
# In project root:
npm install
npm run dev
```
Frontend App: `http://localhost:5173`

---

## 🐳 Docker Deployment

To spin up PostgreSQL, Backend API, and Nginx Frontend in containers:
```bash
docker-compose up --build -d
```

---

## 🧪 Automated Testing

### Backend Unit Tests
```bash
cd backend
pytest
```

### Frontend Production Build Test
```bash
npm run build
```

---

## 🌐 Production Deployment Guide

1. **Database**: Provision a PostgreSQL instance on **Supabase**.
2. **Backend**: Deploy the `backend/` directory to **Render** using the included `render.yaml`. Set environment variables `DATABASE_URL` and `GEMINI_API_KEY`.
3. **Frontend**: Deploy the repository to **Vercel** using `vercel.json`. Set `VITE_API_URL` pointing to your Render backend domain.

---

## 📜 License
Developed under the MIT License as part of AgriConnect AI 2.0.
