import { Request , Response } from "express";
import * as userServices from "./user.services"
import { CreateResponse } from "../comman/helper/helper.reponse";

export const create = async (req: Request, res: Response) => {
    const result = await userServices.create(req.body);
    res.send(CreateResponse(result, "User created successfully"))
}

export const login = async (req: Request, res: Response) => {
     const result = await userServices.login(req.body);
     res.send(CreateResponse(result, "User logged in successfully"))
}

export const getEnrolledCourses = async (req : Request, res: Response) => {
    const { userId } = req.params;
    const enrolledCourses = await userServices.getEnrolledCourses(userId);
    res.send(CreateResponse(enrolledCourses, "User's enrolled courses retrieved successfully"))
}

export const logoutUser = async (req : Request, res: Response) => {
    res.send(CreateResponse({}, "User logged out successfully"))
}