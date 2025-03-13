import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Load Datasets
students_df = pd.read_csv("Modal/Dataset/student_performance_dataset.csv")  # Student dataset
quiz_df = pd.read_json("Modal/Dataset/java_quiz_dataset.json")  # Quiz dataset

# Encode Difficulty Levels (easy = 0, medium = 1, hard = 2)
difficulty_mapping = {'easy': 0, 'medium': 1, 'hard': 2}
quiz_df["Difficulty_Label"] = quiz_df["difficulty"].map(difficulty_mapping)
students_df["Last_Difficulty_Label"] = students_df["last_difficulty"].map(difficulty_mapping)
students_df["Next_Suggested_Difficulty_Label"] = students_df["next_suggested_difficulty"].map(difficulty_mapping)

# One-Hot Encoding for Preferred Topic
preferred_topic_encoded = pd.get_dummies(students_df["preferred_topic"], prefix="Topic")

# Expand Topic-Wise Accuracy Dictionary
# NaN ko 0 se replace karna
topic_accuracy_df = students_df["topic_accuracy"].apply(eval).apply(pd.Series)
topic_accuracy_df.fillna(0, inplace=True)  

# Merge Encoded Features with Students Data
students_final_df = pd.concat([students_df, preferred_topic_encoded, topic_accuracy_df], axis=1)

# Select Features (X) and Target (y)
features = [
    "total_attempts", "correct_answers", "accuracy",  # General performance
    "Last_Difficulty_Label",  # Last difficulty attempted
] + list(preferred_topic_encoded.columns) + list(topic_accuracy_df.columns)  # One-hot & accuracy features

X = students_final_df[features]
y = students_final_df["Next_Suggested_Difficulty_Label"]  # Target variable

# Train-Test Split (80% Training, 20% Testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save Processed Data for Model Training
X_train.to_csv("Modal/Quiz_mapping/Processed Data/X_train.csv", index=False)
X_test.to_csv("Modal/Quiz_mapping/Processed Data/X_test.csv", index=False)
y_train.to_csv("Modal/Quiz_mapping/Processed Data/y_train.csv", index=False)
y_test.to_csv("Modal/Quiz_mapping/Processed Data/y_test.csv", index=False)

print(" Data Preprocessing Complete! Ready for Model Training ")
