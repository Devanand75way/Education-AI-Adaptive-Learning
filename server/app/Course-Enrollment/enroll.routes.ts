import { Router } from "express";
import * as enrollControler from "../Course-Enrollment/enroll.controller";

const router = Router();

router
  .post("/enroll", enrollControler.enrollUser)
  .get("/:userId", enrollControler.getUserCourses);



  export default router;