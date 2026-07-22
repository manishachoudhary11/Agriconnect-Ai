from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from core.deps import get_current_user, get_db
from models import Crop, User, Listing, Notification, DiseaseScan

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    crops = db.query(Crop).filter(Crop.user_id == current_user.id).all()
    listings = db.query(Listing).filter(Listing.seller_id == current_user.id).all()
    notifications = db.query(Notification).filter(Notification.user_id == current_user.id).all()
    scans = db.query(DiseaseScan).filter(DiseaseScan.user_id == current_user.id).all()

    total = len(crops)
    qty = sum(c.quantity for c in crops) if crops else 0
    avg = sum(c.market_price for c in crops) / total if total else 0
    health_score = 88 if total > 0 else 100

    # Crop Distribution
    crop_distribution = []
    if crops:
        crop_counts = {}
        for c in crops:
            crop_counts[c.name] = crop_counts.get(c.name, 0) + (c.quantity or 1)
        crop_distribution = [{"name": name, "value": val} for name, val in crop_counts.items()]
    else:
        crop_distribution = [
            {"name": "Wheat", "value": 45},
            {"name": "Rice", "value": 30},
            {"name": "Corn", "value": 15},
            {"name": "Soybean", "value": 10},
        ]

    # Price Trends (Last 6 Months)
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    price_trends = [
        {"month": "Jan", "Wheat": 2100, "Rice": 3100, "Corn": 1850},
        {"month": "Feb", "Wheat": 2150, "Rice": 3150, "Corn": 1900},
        {"month": "Mar", "Wheat": 2200, "Rice": 3200, "Corn": 1920},
        {"month": "Apr", "Wheat": 2180, "Rice": 3250, "Corn": 1950},
        {"month": "May", "Wheat": 2250, "Rice": 3300, "Corn": 1980},
        {"month": "Jun", "Wheat": 2300, "Rice": 3350, "Corn": 2020},
    ]

    # Weather summary
    user_location = current_user.location or "Nashik, Maharashtra"
    weather = {
        "location": user_location,
        "temperature": 28,
        "condition": "Sunny",
        "humidity": 64,
        "wind_speed": 12,
        "rain_forecast": "10% chance today",
        "uv_index": "Moderate (5)",
    }

    # AI Insights
    ai_insights = [
        {
            "id": 1,
            "title": "Optimal Harvest Window",
            "description": "Wheat crop price predicted to peak by 5% next week due to high regional demand.",
            "type": "opportunity",
            "tag": "Market AI",
        },
        {
            "id": 2,
            "title": "Irrigation Recommendation",
            "description": "Temperatures expected to rise to 32°C. Increase watering schedule by 15%.",
            "type": "warning",
            "tag": "Weather AI",
        },
        {
            "id": 3,
            "title": "Disease Risk Advisory",
            "description": "Humidity at 64% presents low risk for leaf spot. Ensure optimal air circulation.",
            "type": "info",
            "tag": "Health AI",
        },
    ]

    # Recent activity synthesis
    recent_activity = []
    for c in sorted(crops, key=lambda x: getattr(x, 'id', 0), reverse=True)[:3]:
        recent_activity.append({
            "id": f"crop-{c.id}",
            "title": f"Crop Added: {c.name}",
            "description": f"Quantity: {c.quantity} units · Market Price: ₹{c.market_price}",
            "timestamp": "Recently",
            "type": "crop",
        })
    for l in sorted(listings, key=lambda x: getattr(x, 'id', 0), reverse=True)[:3]:
        recent_activity.append({
            "id": f"listing-{l.id}",
            "title": f"Market Listing: {l.title}",
            "description": f"Price: ₹{l.price_per_unit}/{l.unit} · Location: {l.location}",
            "timestamp": "Recently",
            "type": "listing",
        })
    for s in sorted(scans, key=lambda x: getattr(x, 'id', 0), reverse=True)[:2]:
        recent_activity.append({
            "id": f"scan-{s.id}",
            "title": f"Leaf Diagnosis: {s.disease_name}",
            "description": f"Confidence: {int(s.confidence * 100)}%",
            "timestamp": "Recently",
            "type": "scan",
        })
    
    if not recent_activity:
        recent_activity = [
            {
                "id": "act-1",
                "title": "Welcome to AgriConnect AI",
                "description": "Your AI-powered farm management system is ready.",
                "timestamp": "Just now",
                "type": "system",
            }
        ]

    unread_notifications = sum(1 for n in notifications if not n.is_read)

    return {
        "total_crops": total,
        "total_quantity": qty,
        "average_market_price": avg,
        "crop_health_score": health_score,
        "active_listings_count": len(listings),
        "unread_notifications": unread_notifications,
        "crop_distribution": crop_distribution,
        "price_trends": price_trends,
        "weather": weather,
        "ai_insights": ai_insights,
        "recent_activity": recent_activity,
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "role": current_user.role,
            "location": current_user.location,
        },
    }

