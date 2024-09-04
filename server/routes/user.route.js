import express from "express";
import {
  getUsers,
  handleVerifyLink,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/users.controller.js";
import { registerValidation } from "../validations/user.validation.js";
import { handleValidationResult } from "../middlewares/handleValidation.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();

router
  .route("/register")
  .post(registerValidation, handleValidationResult, register);
router.route("/confirm/:token/:uid").get(handleVerifyLink);
router.route("/login").post(login);
router.route("/:uid").put(updateUser);
router.route("/logout").post(logout);

router.route("/").get(protect, getUsers);

export default router;
