# 🚀 AgriConnect AI – Production Deployment Guide

This guide details how to deploy **AgriConnect AI** to production using **Render** (Backend API + PostgreSQL) and **Vercel** (Frontend React SPA).

---

## 🏗️ Architecture Overview

- **Frontend**: React 19 + Vite deployed on **Vercel** Global Edge CDN.
- **Backend API**: FastAPI deployed on **Render** (Web Service).
- **Database**: Managed PostgreSQL on **Render** (or Supabase / Neon).
- **AI Engine**: Google Gemini 1.5 Flash API.

---

## 🛠️ Step 1: Deploy Backend on Render

### Option A: 1-Click Blueprint (Recommended)
1. Push your latest code to your GitHub repository.
2. Go to [dashboard.render.com](https://dashboard.render.com/) and click **New +** → **Blueprint**.
3. Select your repository `Agriconnect-Ai`.
4. Render will automatically read `render.yaml` and configure:
   - `agriconnect-db` (PostgreSQL Database)
   - `agriconnect-backend` (FastAPI Web Service)
5. Fill in the required environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
   - `OPENWEATHER_API_KEY`: (Optional) Your OpenWeather API key.
   - `CORS_ORIGINS`: Leave blank for now (or set to `*`).
6. Click **Apply**.
7. Once deployed, note down your backend URL (e.g., `https://agriconnect-backend.onrender.com`).

### Option B: Manual Web Service Setup
1. On Render, click **New +** → **Web Service**.
2. Connect your GitHub repo.
3. Settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables:
   - `DATABASE_URL`: `postgresql://...` (from Render Postgres or Supabase)
   - `SECRET_KEY`: A long random secret string (e.g., `openssl rand -hex 32`)
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: `60`
   - `REFRESH_TOKEN_EXPIRE_DAYS`: `7`
   - `AI_PROVIDER`: `gemini`
   - `GEMINI_API_KEY`: `your_gemini_api_key`
   - `OPENWEATHER_API_KEY`: `your_openweather_key`
   - `CORS_ORIGINS`: `https://your-frontend.vercel.app`

---

## 🌐 Step 2: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** → **Project**.
3. Import your `Agriconnect-Ai` repository.
4. Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (Project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://agriconnect-backend.onrender.com` (Your Render backend URL from Step 1)
6. Click **Deploy**.
7. Once deployed, Vercel will assign you a live URL (e.g. `https://agriconnect-ai.vercel.app`).

---

## 🔄 Step 3: Final Link & Verification

1. Go back to Render Dashboard → `agriconnect-backend` → **Environment**.
2. Set `CORS_ORIGINS` to your exact Vercel URL:
   ```text
   CORS_ORIGINS=https://agriconnect-ai.vercel.app
   ```
3. Open your Vercel URL in your browser:
   - Test user registration / login.
   - Test AI Assistant chat.
   - Test disease detection leaf scan.
   - Test crop management and marketplace listings.

---

## 💡 Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Page Refresh 404 on Vercel** | React Router SPA deep link | Ensured by `vercel.json` rewrites. |
| **CORS Blocked Error in Console** | Backend rejecting frontend origin | Add your Vercel URL to Render `CORS_ORIGINS` env var. |
| **First request takes ~40s** | Render free tier instance sleep | Normal for free tier; service stays warm during active usage. |
| **Database connection error** | Missing SSL or wrong URL format | `database.py` automatically converts `postgres://` to `postgresql://`. |
