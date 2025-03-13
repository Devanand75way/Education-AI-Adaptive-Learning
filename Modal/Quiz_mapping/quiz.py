from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load Trained Model
model = load_model("Modal/Trained_modal/quiz_difficulty_predictor.h5")
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Difficulty Mapping
difficulty_mapping = {0: "easy", 1: "medium", 2: "hard"}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON Data from Request
        user_data = request.get_json()

        # Extract Features from JSON
        student_data = pd.DataFrame([user_data])

        # Convert to NumPy Array
        X_input = student_data.to_numpy()

        # Predict the Next Quiz Difficulty
        predicted_probabilities = model.predict(X_input)
        predicted_class = np.argmax(predicted_probabilities)

        # Map Prediction to Label
        predicted_difficulty = difficulty_mapping[predicted_class]

        return jsonify({"next_suggested_difficulty": predicted_difficulty})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
