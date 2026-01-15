import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.ensemble import RandomForestRegressor
import joblib
from pathlib import Path

DATA_PATH = Path("data/StudentsPerformance.csv")
MODEL_PATH = Path("ml/model.joblib")

def main():
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")

    df = pd.read_csv(DATA_PATH)

    # Target: average score (0-100)
    df["average_score"] = (df["math score"] + df["reading score"] + df["writing score"]) / 3

    X = df[[
        "gender",
        "race/ethnicity",
        "parental level of education",
        "lunch",
        "test preparation course"
    ]]
    y = df["average_score"]

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), X.columns.tolist())
        ]
    )

    model = RandomForestRegressor(
        n_estimators=400,
        random_state=42
    )

    pipeline = Pipeline(steps=[
        ("prep", preprocessor),
        ("model", model)
    ])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    pipeline.fit(X_train, y_train)
    preds = pipeline.predict(X_test)

    mae = mean_absolute_error(y_test, preds)
    r2 = r2_score(y_test, preds)

    print("MAE (lower is better):", round(mae, 2))
    print("R2 (closer to 1 is better):", round(r2, 3))

    joblib.dump(pipeline, MODEL_PATH)
    print(f"Saved model to: {MODEL_PATH}")

if __name__ == "__main__":
    main()
