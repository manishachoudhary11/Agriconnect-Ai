from services.disease_service import predict_disease
from services.price_service import get_price_prediction


def test_predict_disease():
    res = predict_disease("tomato")
    assert "disease_name" in res
    assert "confidence" in res
    assert res["confidence"] > 0


def test_get_price_prediction():
    res = get_price_prediction("wheat")
    assert res["crop_name"] == "wheat"
    assert "current_price" in res
    assert "predicted_price" in res
