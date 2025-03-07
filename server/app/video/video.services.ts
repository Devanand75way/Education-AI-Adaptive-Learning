import { PrismaClient }  from "@prisma/client";
import { IVideo } from "./video.dto";
const prisma = new PrismaClient();

export const createVideo = async (data : IVideo) => {
     const { courseId, title, videoUrl, duration } = data;
     return await prisma.video.create({
       data: { courseId, title, videoUrl, duration },
     });
};

export  const getVideosByCourse = async (courseId: string) => {
  return await prisma.video.findMany({
    where: { courseId },
  });
};

export  const getVideoById = async (id: string) => {
  return await prisma.video.findUnique({
    where: { id },
  });
};
