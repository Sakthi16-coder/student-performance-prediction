from flask import Flask, request, jsonify
from flask_cors import CORS

from ml.inference import predict_one

app = Flask(__name__)
CORS(app)

@app.route("/health", methods=["GET"])
def health():
    return {"status": "Backend running"}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    required_fields = [
        "gender",
        "parental level of education",
        "lunch",
        "test preparation course"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        result = predict_one(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
