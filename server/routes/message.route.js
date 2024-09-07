import express from "express";

import { protect } from "../middlewares/auth.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/:id").get(protect, getMessages);
router.route("/").post(protect, sendMessage);

export default router;
