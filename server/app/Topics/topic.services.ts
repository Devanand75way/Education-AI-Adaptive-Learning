import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createTopic = (title: string, content : string) =>{
     return   prisma.topic.create({
          data : {
               title : title,
               content : content,
          }
     })
}

export const getAllTopics = () => {
     return prisma.topic.findMany()
}

export const getTopicById = (id : number) => {
     return prisma.topic.findUnique({
          where : {
               id : id,
          }
     })
}

export const updateContent = (id : number, content : string) => {
     return prisma.topic.update({
          where : {
               id : id,
          },
          data : {
               content : content,
          }
     })
}