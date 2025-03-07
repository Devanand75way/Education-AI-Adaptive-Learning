import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createQuiz = async (courseId: string, topicName : string, difficulty: string) => {
  return await prisma.quiz.create({
    data: { courseId, topicName, difficulty },
  });
};

export const getQuizzesByCourse = async (courseId : string) => {
  console.log(courseId)
  return await prisma.quiz.findMany({
    where: { courseId },
  });
};

