from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from core.deps import get_current_user_optional, get_db
from models import User
from services.ai_service import generate_weather_advice
from services.weather_service import get_weather

router = APIRouter(prefix="/api/weather", tags=["weather"])


@router.get("")
async def get_weather_intelligence(
    location: str = Query(default="Nashik"),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    target_city = location or (current_user.location if current_user else None) or "Nashik"
    weather_data = await get_weather(target_city)

    try:
        ai_advice = await generate_weather_advice(weather_data)
    except Exception:
        ai_advice = (
            "• **Irrigation:** Maintain normal morning watering.\n"
            "• **Fertilizer:** Good conditions for foliar spray.\n"
            "• **Disease Alert:** Low humidity minimizes mold risk."
        )

    weather_data["ai_advice"] = ai_advice
    return weather_data
