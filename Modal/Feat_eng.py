#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Mar  6 10:49:26 2025

@author: 75way65
"""

import pandas as pd

# Load Dataset
df = pd.read_csv("Dataset/synthetic_learning_data.csv")

# Convert Difficulty Level to Numeric Values
difficulty_map = {"Easy": 1, "Medium": 2, "Hard": 3}
df["Difficulty_Numeric"] = df["Difficulty_Level"].map(difficulty_map)

# Calculate Accuracy per Student
student_accuracy = df.groupby("Student_ID")["Correct"].mean().reset_index()
student_accuracy.rename(columns={"Correct": "Accuracy"}, inplace=True)

# Calculate Average Time Spent per Student
avg_time_spent = df.groupby("Student_ID")["Time_Spent"].mean().reset_index()
avg_time_spent.rename(columns={"Time_Spent": "Avg_Time_Spent"}, inplace=True)

# Merge New Features with Main Dataset
df = df.merge(student_accuracy, on="Student_ID", how="left")
df = df.merge(avg_time_spent, on="Student_ID", how="left")

# Save Processed Data
df.to_csv("processed_learning_data.csv", index=False)

# Display first 5 rows
print(df.head())
