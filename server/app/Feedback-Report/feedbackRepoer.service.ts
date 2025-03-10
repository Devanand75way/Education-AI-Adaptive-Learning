import {PrismaClient} from "@prisma/client";
import { IFeedbackReport } from "./feedbackReport.dto";
const prisma = new PrismaClient();

export const create = async (data: IFeedbackReport) => {
  return await prisma.feedbackReport.create({ data });
};


export const getFeedBackReport = async (userId : string) => {
  const feedbackReports = await prisma.feedbackReport.findMany({
    where: {
      quizAttempt: {
        userId: userId, 
      },
    },
    include: {
      quiz: true,
      quizAttempt: true, 
    },
  });
  
  return feedbackReports
}