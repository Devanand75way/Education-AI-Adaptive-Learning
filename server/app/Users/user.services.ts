import { generateAccessToken, generateRefreshToken } from "../comman/helper/helper.token";
import { IAuthResponse, IUser } from "./user.dto";
import bcrypt, { hashSync } from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (data: IUser) => {
  const { username, email, password , role } = data;
  
  let user = await prisma.user.findFirst({
    where: {
      email: email.toString(),
    },
  });
  if (user) {
    return ("User already exists");
  }
  user = await prisma.user.create({
    data: {
      username : username,
      email: email.toString(),
      password: hashSync(password.toString(), 10), 
      role  : role,
    },
  });
  // if(user){
  //   sender.sendMail({
  //     from : "sender.example@example.com",
  //     to : String(email),
  //     subject : "Welcome to our website",
  //     text : `Hello ${name},\n\nWelcome to our website! Your account has been created successfully. Your login credentials are as follows:\nEmail: ${email}\nPassword: ${password}\n\nThank you for joining us.\n\nBest regards,\nYour website team`
  //   })
  // }
  return user;
};


export const login = async (data: IUser) => {
     const { email, password } = data;
     const user = await prisma.user.findUnique({ where: { email } });
     if (!user) throw new Error("Invalid email or password");
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) throw new Error("Invalid email or password");
     const accessToken = generateAccessToken({ userid: user.id, email: user.email });
     const refreshToken = generateRefreshToken({ userid: user.id, email: user.email });
     return { accessToken, refreshToken };
}