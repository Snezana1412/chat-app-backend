import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"], // frontend url (angular) to allow cors requests

    //methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // socket new message private

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send online users to all clients

  global.onlineUsers = new Map();
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("message", (message) => {
    const sendUserSocket = onlineUsers.get(message.receiverId);
    console.log("🚀 ~ socket.on ~ data", message);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", message);
    }
    //  io.emit("message", message);
  });

  // io.emit("message", "Hello from server");
  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.id);
    await User.findByIdAndUpdate(userId, { lastOnline: new Date() });
    delete userSocketMap[userId];
  });

  // socket.on("sendPrivateMessage", (data) => {
  //   console.log("🚀 ~ socket.on ~ data:", data);

  //   const receiverSocketId = getReceiverSocketId(data.receiverId);
  //   io.to(receiverSocketId).emit("message", data);
  // });

  // socket.on("news", function (data) {
  //   console.log("🚀 ~ data:", data);

  //   var msg = data + "world";
  //   socket.emit("news-response", msg);
  // });

  // This is where the listener is for the client side handle
  // socket.on("new message", (msg) => {
  //   broadcast.emit will send the msg object back to client side and
  //   post to every instance expcept for the creator of the message
  //   socket.broadcast.emit("message", msg);
  // });
});

export { server, io, app };
