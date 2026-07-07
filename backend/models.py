from sqlalchemy import Column, Integer, String
from database import Base

class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    quantity = Column(Integer)
    location = Column(String)
    market_price = Column(Integer)