import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import pandas as pd
import numpy as np

#  Load Processed Data
X_train = pd.read_csv("Modal/Quiz_mapping/Processed Data/X_train.csv")
X_test = pd.read_csv("Modal/Quiz_mapping/Processed Data/X_test.csv")
y_train = pd.read_csv("Modal/Quiz_mapping/Processed Data/y_train.csv")
y_test = pd.read_csv("Modal/Quiz_mapping/Processed Data/y_test.csv")

# Convert Labels to Categorical (One-Hot Encoding)
y_train = keras.utils.to_categorical(y_train, num_classes=3)
y_test = keras.utils.to_categorical(y_test, num_classes=3)

# Build Neural Network Model
model = Sequential([
    Dense(64, activation="relu", input_shape=(X_train.shape[1],)),  # Input Layer
    Dropout(0.3),  # Dropout to prevent overfitting
    Dense(32, activation="relu"),  # Hidden Layer 1
    Dense(16, activation="relu"),  # Hidden Layer 2
    Dense(3, activation="softmax")  # Output Layer (3 classes: easy, medium, hard)
])

# Compile Model
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

#  Train Model
history = model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100, batch_size=32)

#  Save the Model
model.save("/Users/75way65/Desktop/Education Figma/Modal/Trained_modal/quiz_difficulty_predictor.h5")

print(" Model Training Complete!  Model Saved as quiz_difficulty_predictor.h5")
