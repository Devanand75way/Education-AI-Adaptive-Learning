import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

export const getQuestions = async (topic: string) => {
  const questions = await prisma.question.findMany({
    where: {
      topic: topic
    }
  });
  return questions;
}
export const getUniqueTopics = async () => {
  const topics = await prisma.question.findMany({
    distinct: ['topic'], 
    select: { topic: true } 
  });

  return topics.map(t => t.topic);  
};


export const getQuizQuestions = async (topic: string, userId: string) => {
  const learningAccuracy = await prisma.learningTrack.findUnique({
    where: { userId: userId }
  });

  if (!learningAccuracy) {
    throw new Error("No learning track found for this user");
  }

  const SetLearningAccuracyData = {
    total_attempts: learningAccuracy?.totalAttempts,
    correct_answers: learningAccuracy?.correctAnswers,
    accuracy: learningAccuracy?.accuracy,
    Last_Difficulty_Label: learningAccuracy?.lastDifficultyLabel,
    Topic_Java_Basics: learningAccuracy?.topicJavaBasics,
    Topic_Java_Collections: learningAccuracy?.topicJavaCollections,
    Topic_Java_Exceptions: learningAccuracy?.topicJavaExceptions,
    Topic_Java_Multithreading: learningAccuracy?.topicJavaMultithreading,
    Topic_Java_OOP: learningAccuracy?.topicJavaOOP,
    "Java Basics": learningAccuracy?.javaBasics,
    "Java OOP": learningAccuracy?.javaOOP,
    "Java Multithreading": learningAccuracy?.javaMultithreading,
    "Java Exceptions": learningAccuracy?.javaExceptions,
    "Java Collections": learningAccuracy?.javaCollections
  };

  // MODAL : modal is pridicting the Quiz dificulty level 
  const getDificultyLevel = await axios.post<{ next_suggested_difficulty: string }>(
    "http://127.0.0.1:5002/predict",
    SetLearningAccuracyData
  );

  const difficultyLevel = getDificultyLevel.data.next_suggested_difficulty;
  const questions = await prisma.question.findMany({
    where: {
      topic: topic,
      difficulty: difficultyLevel || undefined
    },
    distinct : ['question']
  });

  return questions;
};  
