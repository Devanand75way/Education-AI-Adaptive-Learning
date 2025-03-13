import { generateAccessToken, generateRefreshToken } from "../comman/helper/helper.token";
import { IAuthResponse, IUser } from "./user.dto";
import bcrypt, { hashSync } from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (data: IUser) => {
  const { username, email, password, role } = data;
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashSync(password, 10),
        role,
        learningTrack: {
          create: {
            totalAttempts: 0,
            correctAnswers: 0,
            accuracy: 0.0,
            lastDifficultyLabel: 0,
            topicJavaBasics: 0,
            topicJavaCollections: 0,
            topicJavaExceptions: 0,
            topicJavaMultithreading: 0,
            topicJavaOOP: 0,
            javaBasics: 0.5,
            javaOOP: 0.5,
            javaMultithreading: 0.5,
            javaExceptions: 0.5,
            javaCollections: 0.5,
          },
        },
      },
    });
    return { success: true, user: newUser };
};


export const login = async (data: IUser) => {
     const { email, password } = data;
     const user = await prisma.user.findUnique({ where: { email } });
     if (!user) throw new Error("Invalid email or password");
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) throw new Error("Invalid email or password");
     const accessToken = generateAccessToken({ userid: user.id, email: user.email });
     const refreshToken = generateRefreshToken({ userid: user.id, email: user.email });
     return { accessToken, refreshToken , userId : user.id};
}

export const getEnrolledCourses = async (userId: string) => {
  const enrolledCourses = await prisma.courseEnrollment.findMany({
    where: {
      userId: userId,
    },
    include: {
      course: {
        select: {
          name: true,           
          instructor: true,     
        },
      },
    },
  });

  return enrolledCourses;
};
