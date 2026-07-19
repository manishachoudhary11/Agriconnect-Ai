import random


DISEASE_DATABASE = {
    "tomato": [
        {
            "name": "Early Blight",
            "keywords": ["brown", "spot", "leaf"],
            "treatment": "Remove infected leaves and apply fungicide.",
            "organic": "Neem oil spray every 7 days. Improve air circulation.",
            "chemical": "Chlorothalonil or copper-based fungicide.",
            "preventive": "Crop rotation, avoid overhead watering, use resistant varieties.",
        },
        {
            "name": "Late Blight",
            "keywords": ["water", "soaked", "lesion"],
            "treatment": "Immediate removal of affected plants.",
            "organic": "Bordeaux mixture spray.",
            "chemical": "Metalaxyl-based fungicide.",
            "preventive": "Monitor humidity, ensure proper spacing.",
        },
    ],
    "potato": [
        {
            "name": "Potato Late Blight",
            "keywords": ["dark", "patch"],
            "treatment": "Destroy infected tubers and foliage.",
            "organic": "Copper fungicide spray.",
            "chemical": "Mancozeb application.",
            "preventive": "Use certified seed potatoes, ensure drainage.",
        }
    ],
    "default": [
        {
            "name": "Leaf Spot Disease",
            "keywords": ["spot", "yellow", "brown"],
            "treatment": "Prune affected areas and apply appropriate fungicide.",
            "organic": "Neem oil or baking soda spray (1 tbsp per gallon).",
            "chemical": "Copper oxychloride fungicide as per label.",
            "preventive": "Regular monitoring, balanced fertilization, proper spacing.",
        },
        {
            "name": "Healthy Leaf",
            "keywords": ["green", "healthy"],
            "treatment": "No treatment needed. Continue regular monitoring.",
            "organic": "Maintain organic mulch and compost.",
            "chemical": "Not required.",
            "preventive": "Weekly inspection, balanced NPK, adequate irrigation.",
        },
    ],
}


def predict_disease(crop_type: str = "default") -> dict:
    diseases = DISEASE_DATABASE.get(crop_type.lower(), DISEASE_DATABASE["default"])
    result = random.choice(diseases)
    confidence = round(random.uniform(0.78, 0.97), 2)

    return {
        "disease_name": result["name"],
        "confidence": confidence,
        "treatment": result["treatment"],
        "organic_solution": result["organic"],
        "chemical_solution": result["chemical"],
        "preventive_measures": result["preventive"],
    }
