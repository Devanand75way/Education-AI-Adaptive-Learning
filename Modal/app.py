#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Mar  6 10:17:53 2025

@author: 75way65
"""

import pandas as pd
import numpy as np

# Random Data Generation
np.random.seed(42)  # Reproducibility

num_rows = 100
data = {
    "Student_ID": np.random.randint(1000, 2000, num_rows),
    "Question_ID": np.random.randint(500, 600, num_rows),
    "Time_Spent": np.random.randint(10, 120, num_rows),
    "Attempts": np.random.randint(1, 5, num_rows),
    "Correct": np.random.randint(0, 2, num_rows),
    "Difficulty_Level": np.random.choice(["Easy", "Medium", "Hard"], num_rows),
}

# Create DataFrame
df_synthetic = pd.DataFrame(data)

# Save to CSV
df_synthetic.to_csv("Dataset/synthetic_learning_data.csv", index=False)

# Display first 5 rows
print(df_synthetic.head())
