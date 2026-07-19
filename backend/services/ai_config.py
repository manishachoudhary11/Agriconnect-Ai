import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "")

AI_PROVIDER = os.getenv("AI_PROVIDER", "mock")  # openai | gemini | mock

SYSTEM_PROMPT = """You are AgriConnect AI, an expert agricultural assistant for Indian farmers and buyers.
Provide practical, accurate advice on crops, fertilizers, diseases, weather, and market prices.
Keep responses concise, actionable, and farmer-friendly."""
