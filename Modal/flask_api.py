from flask import Flask, request, jsonify
import pickle
import pandas as pd
from collections import Counter

app = Flask(__name__)

# Load Trained Model
model = pickle.load(open("Trained_modal/student_model.pkl", "rb"))

# Sample Data (Agar tumhare pass database hai toh waha se le sakte ho)
questions_data = [
    {"question": "Algebra Basics", "topic": "Algebra", "difficulty": 2},
    {"question": "Pythagoras Theorem", "topic": "Geometry", "difficulty": 3},
    {"question": "Simple Interest", "topic": "Finance", "difficulty": 1},
    {"question": "Trigonometry", "topic": "Geometry", "difficulty": 3},
    {"question": "Quadratic Equations", "topic": "Algebra", "difficulty": 2},
]

# API Route for Prediction & Feedback
@app.route('/predict_feedback', methods=['POST'])
def predict_feedback():
    try:
        data = request.get_json()

        # Convert JSON to DataFrame
        df = pd.DataFrame([data])

        # Features Selection
        X = df[["Time_Spent", "Attempts", "Difficulty_Numeric", "Accuracy", "Avg_Time_Spent"]]

        # Predict Answer Correct or Incorrect
        prediction = model.predict(X)
        result = int(prediction[0])  # Convert NumPy output to integer

        # Identify Weak Topics (Assume Data Contains Question ID)
        question_index = data["question_id"]  # Assume question_id is sent from frontend
        question_data = questions_data[question_index]
        topic = question_data["topic"]

        # If Incorrect, Track Weak Topic
        feedback = "Good Job! Keep Going!"
        weak_topics = []

        if result == 0:  # Student made an error
            feedback = f"You need to improve on {topic}."
            weak_topics.append(topic)

        return jsonify({"prediction": result, "feedback": feedback, "weak_topics": weak_topics})

    except Exception as e:
        return jsonify({"error": str(e)})

# Run Flask App
if __name__ == '__main__':
    app.run()
