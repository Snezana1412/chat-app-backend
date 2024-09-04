import { body } from "express-validator";

export const registerValidation = [
  body("fullName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Full name is required")
    .matches(/^[a-zA-Z\s\d]+$/)
    .withMessage("invalid fullname value")
    .isLength({ min: 3, max: 100 })
    .withMessage("fullname length is not valid"),
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("username length is not valid"),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password is too short"),
];

export const loginValidation = [
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password is too short"),
];
