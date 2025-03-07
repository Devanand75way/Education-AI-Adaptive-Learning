import { Router } from "express"
import { loginvalidator, uservalidator } from "./user.validator";
import * as usercontroller from "./user.controller";
import { catchError } from "../comman/middleware/catch-error";
const router = Router();

router
    .post('/', uservalidator, catchError, usercontroller.create)
    .post('/auth',loginvalidator, catchError, usercontroller.login)

export default router;