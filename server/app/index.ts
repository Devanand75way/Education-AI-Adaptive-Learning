import express, { Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./Routes/api";
import morgan from "morgan";
import bodyParser = require("body-parser");
import cors from "cors";
import { setupSwagger } from './comman/helper/swager.helper';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", apiRouter);
setupSwagger(app)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
