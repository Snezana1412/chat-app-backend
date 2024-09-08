import express from "express";

import { protect } from "../middlewares/auth.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").get(protect, getMessages);
//router.route("/").post(protect, sendMessage);
router.post("/send", protect, sendMessage);

export default router;
