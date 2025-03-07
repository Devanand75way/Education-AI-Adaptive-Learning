import { Request , Response } from "express";
import { CreateResponse } from "../comman/helper/helper.reponse";
import * as courseEnrollmentService from "./enroll.services"
export const enrollUser = async (req : Request, res: Response) => {
    const { userId, courseId } = req.body;
    const result = await courseEnrollmentService.enrollUserInCourse(userId, courseId);
    res.send(CreateResponse(result, "User enrolled successfully"));

};

export const getUserCourses = async (req : Request, res: Response) => {
    const { userId } = req.params;
    const enrollments = await courseEnrollmentService.getUserEnrollments(userId);
    res.send(CreateResponse(enrollments , "Course enrollment successfully returned"));
};