import joblib
import pandas as pd
from pathlib import Path

MODEL_PATH = Path("ml/model.joblib")

def score_to_label(score: float) -> str:
    if score < 60:
        return "Low"
    elif score < 80:
        return "Medium"
    return "High"

def predict_one(input_dict: dict) -> dict:
    if not MODEL_PATH.exists():
        raise FileNotFoundError("Model not found. Train it first: python ml/train_model.py")

    model = joblib.load(MODEL_PATH)
    df = pd.DataFrame([input_dict])

    score = float(model.predict(df)[0])
    score = max(0.0, min(100.0, score))  # clamp 0-100

    return {
        "predicted_average_score": round(score, 2),
        "performance_level": score_to_label(score)
    }
