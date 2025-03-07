import { ICourses } from "./course.dto";
import { PrismaClient }  from "@prisma/client";
const prisma = new PrismaClient();

export const createCourse = async (courseData: ICourses) => {
  return await prisma.course.create({
    data: courseData,
  });
};

export const getAllCourses = async () => {
  return await prisma.course.findMany();
};

