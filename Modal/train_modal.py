#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Mar  6 10:50:20 2025

@author: 75way65
"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load Processed Dataset
df = pd.read_csv("Dataset/processed_learning_data.csv")

# Define Features (X) and Target (y)
X = df[["Time_Spent", "Attempts", "Difficulty_Numeric", "Accuracy", "Avg_Time_Spent"]]
y = df["Correct"]  # 1 (Correct) or 0 (Incorrect)

# Split Data into Training and Testing (80% Train, 20% Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on Test Data
y_pred = model.predict(X_test)

# Check Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

import pickle

# Save Trained Model
with open("student_model.pkl", "wb") as file:
    pickle.dump(model, file)

# Load Model for Testing
with open("student_model.pkl", "rb") as file:
    loaded_model = pickle.load(file)

print("Model Successfully Loaded!")

