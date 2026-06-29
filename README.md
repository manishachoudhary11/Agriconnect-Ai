🌾 AgriConnect AI

AgriConnect AI is an AI-assisted full-stack web platform designed to support smart agriculture by helping farmers and users monitor crops, manage agricultural data, and make informed decisions using modern web technologies and intelligent systems.

🚀 Project Tech Stack
Frontend
React JS
Vite
Tailwind CSS
React Router DOM
Backend
Python
FastAPI
Uvicorn
Python Dotenv
📁 Project Structure
AgriConnectAI/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── venv/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
🎯 Frontend Features
Home page
About page
Dashboard page
Login page
Component showcase page
Responsive UI
Reusable UI components
Dark/Light mode toggle
Toast notifications
Loader component
Modal component
⚙️ Backend Features

The backend is built using FastAPI and provides REST API endpoints for managing agricultural data.

🔗 API Endpoints
GET     /                         Backend health check  
GET     /api/crops               Get all crops  
GET     /api/crops/{crop_id}     Get single crop by ID  
POST    /api/crops               Create a new crop  
PUT     /api/crops/{crop_id}     Update crop by ID  
DELETE  /api/crops/{crop_id}     Delete crop by ID  
GET     /api/crops/search        Search crop by name  
▶️ How to Run Frontend Locally
Install dependencies:
npm install
Start development server:
npm run dev
Open in browser:
http://localhost:5173
▶️ How to Run Backend Locally
Navigate to backend folder:
cd backend
Create virtual environment:
python -m venv venv
Activate virtual environment:
venv\Scripts\activate
Install dependencies:
pip install -r requirements.txt
Start backend server:
python -m uvicorn main:app --reload
Open API docs:
http://127.0.0.1:8000/docs
Backend base URL:
http://127.0.0.1:8000
🔐 Environment Variables

Backend uses environment configuration.

Example .env.example:
APP_NAME=AgriConnect AI API
ENVIRONMENT=development
API_HOST=127.0.0.1
API_PORT=8000

⚠️ Actual .env file should NOT be committed to GitHub.

🔗 Frontend–Backend Connection

The frontend dashboard connects to the FastAPI backend using:

http://127.0.0.1:8000/api/crops

It displays live crop data fetched from the backend API.

📌 GitHub Repository

https://github.com/manishachoudhary11/Agriconnect-Ai.git

👤 Intern Details
Intern ID: TBI_26101062
Project Name: AgriConnect AI
Domain: AI Assisted Full Stack Web Development
