import { Request, Response } from "express";
import { CreateResponse } from "../comman/helper/helper.reponse";
import * as courseService  from "./course.services"
export const createCourse = async (req : Request, res : Response) => {
    const { name, instructor, description } = req.body;
    const result = await courseService.createCourse({ name, instructor, description });
    res.send(CreateResponse(result, "Successfully created the course."));
}

export const getCourses = async (req : Request, res : Response) => {
    const courses = await courseService.getAllCourses();
    res.send(CreateResponse(courses, "Successfully fetched all courses.")); 
}
