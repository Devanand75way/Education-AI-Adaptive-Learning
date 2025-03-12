import { Request, Response } from "express";

import * as topicServices from "./topic.services"

export const create = async (req: Request, res: Response) => {
     const {title , content } = req.body
     const result = await topicServices.createTopic(title ,content)
     res.send({data: result, message : "Topic Created Successfully"})
}

export const getAllTopics = async (req: Request, res: Response) => {
     const result = await topicServices.getAllTopics()
     res.send({data: result, message : "All Topics"})
}
export const getTopics = async (req: Request, res: Response) => {
     const result = await topicServices.getTopicById(parseInt(req.params.id))
     res.send({data: result, message : "Topic"})
}

export const updateContent = async (req: Request, res: Response) => {
     const {id , content } = req.body
     const result = await topicServices.updateContent(parseInt(req.params.id), content)
     res.send({data: result, message : "Content Updated Successfully"})
}