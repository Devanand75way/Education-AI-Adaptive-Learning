import {PrismaClient} from "@prisma/client";
import { IFeedbackReport } from "./feedbackReport.dto";
const prisma = new PrismaClient();

export const create = async (data: IFeedbackReport) => {
  return await prisma.feedbackReport.create({ data });
};

