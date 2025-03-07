import { PrismaClient }  from "@prisma/client";
const prisma = new PrismaClient();

export const enrollUserInCourse = async (userId : string, courseId : string) => {
  return await prisma.courseEnrollment.create({
    data: {
      userId,
      courseId,
    },
  });
};

export const getUserEnrollments = async (userId : string) => {
  return await prisma.courseEnrollment.findMany({
    where: { userId },
    include: {
      course: true, 
    },
  });
};
