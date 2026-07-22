from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from core.deps import get_current_user, get_db
from models import Notification, User

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("")
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .all()
    )

    unread_count = sum(1 for n in notifications if not n.is_read)
    return {"items": notifications, "unread_count": unread_count}


@router.post("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    notif = (
        db.query(Notification)
        .filter(Notification.id == notification_id, Notification.user_id == current_user.id)
        .first()
    )
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")

    notif.is_read = True
    db.commit()
    return {"status": "success"}


@router.post("/read-all")
def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db.query(Notification).filter(
        Notification.user_id == current_user.id, Notification.is_read == False
    ).update({"is_read": True})
    db.commit()
    return {"status": "success"}


@router.post("/seed")
def seed_demo_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    demo_notifs = [
        Notification(
            user_id=current_user.id,
            title="Weather Warning: High Rain Expected",
            message="Heavy rain predicted in Nashik tomorrow. Postpone fertilizer application.",
            type="weather",
        ),
        Notification(
            user_id=current_user.id,
            title="New Buyer Inquiry",
            message="Wholesale buyer Rajesh Kumar expressed interest in your Wheat listing.",
            type="marketplace",
        ),
        Notification(
            user_id=current_user.id,
            title="AI Harvest Recommendation",
            message="Optimal harvest window for your Rice crop starts in 3 days.",
            type="ai",
        ),
        Notification(
            user_id=current_user.id,
            title="Crop Health Update",
            message="Disease scan for Tomato leaf completed with 94% organic treatment score.",
            type="crop",
        ),
    ]
    db.add_all(demo_notifs)
    db.commit()
    return {"status": "success", "message": "Demo notifications created"}
