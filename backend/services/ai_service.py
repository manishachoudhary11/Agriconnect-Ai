import json
from typing import AsyncGenerator

import httpx

from services.ai_config import AI_PROVIDER, GEMINI_API_KEY, OPENAI_API_KEY, SYSTEM_PROMPT


async def generate_ai_response(messages: list[dict]) -> str:
    if AI_PROVIDER == "openai" and OPENAI_API_KEY:
        return await _openai_chat(messages)
    if AI_PROVIDER == "gemini" and GEMINI_API_KEY:
        return await _gemini_chat(messages)
    return _mock_response(messages)


async def stream_ai_response(messages: list[dict]) -> AsyncGenerator[str, None]:
    response = await generate_ai_response(messages)
    words = response.split(" ")
    for i, word in enumerate(words):
        chunk = word if i == 0 else f" {word}"
        yield chunk


async def _openai_chat(messages: list[dict]) -> str:
    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}, *messages],
        "max_tokens": 1024,
        "temperature": 0.7,
    }
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            json=payload,
        )
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]


async def _gemini_chat(messages: list[dict]) -> str:
    contents = []
    for msg in messages:
        role = "user" if msg["role"] == "user" else "model"
        contents.append({"role": role, "parts": [{"text": msg["content"]}]})

    payload = {
        "contents": contents,
        "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
    }
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(url, json=payload)
        resp.raise_for_status()
        data = resp.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]


def _mock_response(messages: list[dict]) -> str:
    last = messages[-1]["content"].lower() if messages else ""

    if "disease" in last or "spot" in last or "blight" in last:
        return (
            "**Disease Treatment Advice**\n\n"
            "1. Remove affected leaves immediately\n"
            "2. **Organic:** Apply neem oil spray every 7 days\n"
            "3. **Chemical:** Copper-based fungicide as directed\n"
            "4. Improve air circulation and avoid overhead watering\n\n"
            "Monitor for 2 weeks. Consult a local agronomist for severe cases."
        )
    if "weather" in last or "rain" in last or "irrigation" in last:
        return (
            "**Weather-Based Farming Advice**\n\n"
            "- Rain expected: delay fertilizer application\n"
            "- Good conditions for irrigation early morning\n"
            "- High humidity: watch for fungal diseases\n"
            "- Secure loose equipment before storms"
        )
    if "price" in last or "market" in last or "sell" in last:
        return (
            "**Market Advice**\n\n"
            "- Wheat prices trending up 5% this month\n"
            "- Best time to sell: within 2 weeks before harvest peak\n"
            "- Consider listing on AgriConnect Marketplace for direct buyer access\n"
            "- Track local mandi prices weekly"
        )
    if "fertilizer" in last or "nutrient" in last:
        return (
            "**Fertilizer Recommendation**\n\n"
            "- **NPK 19:19:19** for balanced growth during vegetative stage\n"
            "- Apply urea sparingly during flowering\n"
            "- Organic option: compost + vermicompost mix\n"
            "- Soil test recommended before heavy application"
        )
    if "crop" in last or "grow" in last or "plant" in last:
        return (
            "**Crop Recommendation**\n\n"
            "Based on typical Indian conditions:\n"
            "- **Rabi:** Wheat, mustard, chickpea\n"
            "- **Kharif:** Rice, cotton, soybean\n"
            "- **Horticulture:** Grapes, pomegranate in semi-arid regions\n\n"
            "Share your location and soil type for more specific advice."
        )

    return (
        "I'm AgriConnect AI, your farming assistant. I can help with:\n\n"
        "- Crop recommendations\n"
        "- Disease treatment\n"
        "- Weather & irrigation advice\n"
        "- Fertilizer guidance\n"
        "- Market & price insights\n\n"
        "What would you like to know about your farm today?"
    )


async def generate_weather_advice(weather_data: dict) -> str:
    prompt = f"Based on this weather data, give brief farming advice (3-4 bullet points):\n{json.dumps(weather_data, indent=2)}"
    return await generate_ai_response([{"role": "user", "content": prompt}])
