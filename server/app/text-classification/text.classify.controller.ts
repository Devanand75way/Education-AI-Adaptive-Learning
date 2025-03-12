import { Request, Response } from "express";
import { CreateResponse } from "../comman/helper/helper.reponse";
import axios from "axios";

export const SimplifyText = async (req: Request, res: Response) => {
  const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const HEADERS = { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` };

    const { text } = req.body;
    if (!text) res.send({ error: "Text is required" });
    const response = await axios.post(API_URL, { inputs: text }, { headers: HEADERS });
    // res.send(CreateResponse(response))
    if (response.data && Array.isArray(response.data) && response.data[0]?.summary_text) {
      res.send({ simplifiedText: response.data[0].summary_text });
    } else {
      res.send({ error: "Invalid API response" });
    }
};
