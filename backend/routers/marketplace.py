from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from math import ceil

from core.deps import get_current_user, get_db, require_roles
from models import Category, Listing, Order, User
from schemas import CategoryResponse, ListingCreate, ListingResponse, OrderCreate, OrderResponse

router = APIRouter(prefix="/api/marketplace", tags=["marketplace"])


def _listing_response(listing: Listing, db: Session) -> ListingResponse:
    seller = db.query(User).filter(User.id == listing.seller_id).first()
    data = ListingResponse.model_validate(listing)
    data.seller_name = seller.full_name if seller else None
    return data


@router.get("/categories", response_model=list[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


@router.get("/listings", response_model=list[ListingResponse])
def get_listings(
    search: str = Query(default=""),
    category_id: int | None = Query(default=None),
    location: str = Query(default=""),
    db: Session = Depends(get_db),
):
    query = db.query(Listing).filter(Listing.status == "active")

    if search:
        query = query.filter(
            Listing.title.ilike(f"%{search}%") | Listing.crop_name.ilike(f"%{search}%")
        )
    if category_id:
        query = query.filter(Listing.category_id == category_id)
    if location:
        query = query.filter(Listing.location.ilike(f"%{location}%"))

    listings = query.order_by(Listing.created_at.desc()).all()
    return [_listing_response(l, db) for l in listings]


@router.get("/listings/{listing_id}", response_model=ListingResponse)
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return _listing_response(listing, db)


@router.post("/listings", response_model=ListingResponse, status_code=201)
def create_listing(
    payload: ListingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("farmer", "admin")),
):
    listing = Listing(**payload.model_dump(), seller_id=current_user.id)
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return _listing_response(listing, db)


@router.delete("/listings/{listing_id}")
def delete_listing(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("farmer", "admin")),
):
    listing = db.query(Listing).filter(Listing.id == listing_id, Listing.seller_id == current_user.id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    db.delete(listing)
    db.commit()
    return {"status": "success"}


@router.get("/my-listings", response_model=list[ListingResponse])
def my_listings(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("farmer", "admin")),
):
    listings = db.query(Listing).filter(Listing.seller_id == current_user.id).order_by(Listing.created_at.desc()).all()
    return [_listing_response(l, db) for l in listings]


@router.post("/orders", response_model=OrderResponse, status_code=201)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("buyer", "admin")),
):
    listing = db.query(Listing).filter(Listing.id == payload.listing_id, Listing.status == "active").first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    if payload.quantity > listing.quantity:
        raise HTTPException(status_code=400, detail="Quantity exceeds available stock")

    order = Order(
        listing_id=listing.id,
        buyer_id=current_user.id,
        quantity=payload.quantity,
        total_price=payload.quantity * listing.price_per_unit,
        message=payload.message,
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    result = OrderResponse.model_validate(order)
    result.listing_title = listing.title
    return result


@router.get("/orders", response_model=list[OrderResponse])
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role == "buyer":
        orders = db.query(Order).filter(Order.buyer_id == current_user.id).order_by(Order.created_at.desc()).all()
    else:
        orders = (
            db.query(Order)
            .join(Listing)
            .filter(Listing.seller_id == current_user.id)
            .order_by(Order.created_at.desc())
            .all()
        )

    results = []
    for order in orders:
        listing = db.query(Listing).filter(Listing.id == order.listing_id).first()
        item = OrderResponse.model_validate(order)
        item.listing_title = listing.title if listing else None
        results.append(item)
    return results
