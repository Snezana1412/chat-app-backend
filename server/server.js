import cors from "cors";

import path from "path";
import express from "express";
import { connectToDB } from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

import userRoutes from "./routes/user.route.js";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "public")));

await connectToDB();

// error handling
app.use((req, res, next) => {
  const err = new Error("Route not defined!");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  if (error) {
    res
      .status(error.status || 500)
      .json({ msg: error.message, status: error.status });
  }
});

server.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
