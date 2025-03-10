from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)  


model = pickle.load(open("Trained_modal/student_model.pkl", "rb"))


@app.route('/predict_feedback', methods=['POST'])
def predict_feedback():
    try:
        data = request.get_json()

        X = pd.DataFrame([data], columns=["Time_Spent", "Attempts", "Difficulty_Numeric", "Accuracy", "Avg_Time_Spent"])

        # Predict Feedback based on model prediction and accuracy level
        prediction = model.predict(X)[0]
        result = int(prediction)

       
        topic = data.get("topic_name", "").capitalize()  # Ensure topic formatting
        accuracy = data.get("Accuracy", 0.0)  # Get Accuracy value

        # Initialize feedback and weak topics
        feedback = "Good Job! Keep Going!"
        weak_topics = []

        # If Accuracy < 50% or Prediction is Incorrect, add topic to weak areas
        if accuracy < 50.0 or result == 0:
            feedback = f"You need to improve on {topic}."
            weak_topics.append(topic)

        return jsonify({
            "prediction": result,
            "feedback": feedback,
            "weak_topics": weak_topics,
            "accuracy": accuracy 
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# Run Flask App
if __name__ == '__main__':
    app.run(debug=False)