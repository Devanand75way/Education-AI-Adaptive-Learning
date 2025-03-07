import { PrismaClient }from "@prisma/client";
const prisma = new PrismaClient();

export const recordWatch = async (userId : string, videoId: string) => {
  return await prisma.videoWatch.create({
    data: { userId, videoId },
  });
};

export const getWatchedVideosByUser = async (userId : string) => {
  return await prisma.videoWatch.findMany({
    where: { userId },
  });
};
