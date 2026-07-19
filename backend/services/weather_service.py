import httpx

from services.ai_config import OPENWEATHER_API_KEY


async def get_weather(city: str = "Nashik") -> dict:
    if not OPENWEATHER_API_KEY:
        return _mock_weather(city)

    async with httpx.AsyncClient(timeout=15) as client:
        current_resp = await client.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={"q": city, "appid": OPENWEATHER_API_KEY, "units": "metric"},
        )
        current_resp.raise_for_status()
        current = current_resp.json()

        forecast_resp = await client.get(
            "https://api.openweathermap.org/data/2.5/forecast",
            params={"q": city, "appid": OPENWEATHER_API_KEY, "units": "metric"},
        )
        forecast_resp.raise_for_status()
        forecast = forecast_resp.json()

    return _format_weather(current, forecast, city)


def _format_weather(current: dict, forecast: dict, city: str) -> dict:
    daily = {}
    for item in forecast.get("list", []):
        day = item["dt_txt"].split(" ")[0]
        if day not in daily:
            daily[day] = {
                "date": day,
                "temp_min": item["main"]["temp_min"],
                "temp_max": item["main"]["temp_max"],
                "humidity": item["main"]["humidity"],
                "description": item["weather"][0]["description"],
                "rain_chance": round((item.get("pop", 0) or 0) * 100),
            }

    return {
        "city": current.get("name", city),
        "country": current.get("sys", {}).get("country", "IN"),
        "current": {
            "temp": current["main"]["temp"],
            "feels_like": current["main"]["feels_like"],
            "humidity": current["main"]["humidity"],
            "wind_speed": current["wind"]["speed"],
            "description": current["weather"][0]["description"],
            "icon": current["weather"][0]["icon"],
            "rain": current.get("rain", {}).get("1h", 0),
        },
        "forecast": list(daily.values())[:7],
    }


def _mock_weather(city: str) -> dict:
    return {
        "city": city,
        "country": "IN",
        "current": {
            "temp": 28,
            "feels_like": 30,
            "humidity": 65,
            "wind_speed": 3.5,
            "description": "partly cloudy",
            "icon": "02d",
            "rain": 0,
        },
        "forecast": [
            {"date": f"Day {i+1}", "temp_min": 22 + i, "temp_max": 30 + i, "humidity": 60 + i, "description": "partly cloudy", "rain_chance": 10 + i * 5}
            for i in range(7)
        ],
    }
