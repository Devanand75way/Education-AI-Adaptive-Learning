import { PrismaClient } from "@prisma/client";
import { IQuizAttempt } from "./quiz.attempt.dto";
const prisma = new PrismaClient();

export const createQuizAttempt = async (data: IQuizAttempt) => {
  const { userId, quizId } =  data;
  console.log(userId, quizId);
  return await prisma.quizAttempt.create({
    data: { userId, quizId },
  });
};

export const getQuizAttemptsByUser = async (userId: string ) => {
  return await prisma.quizAttempt.findMany({
    where: { userId },
    include: { quiz: true, feedback: true },
  });
};

