import { body }  from "express-validator";

export const uservalidator = [
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("username").isString().withMessage("Name is required"),
    body("password").notEmpty().isLength({ min: 4 }),
    body("role").isString().isIn(["Student", "Teacher"]),
]

export const loginvalidator = [
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").notEmpty().isLength({ min: 4 }),
]