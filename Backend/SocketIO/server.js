import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());

// Setup socket server with CORS
const io = new Server(server, {
  cors: {
    origin: "https://chatify1-e482.onrender.com", // ✅ No trailing slash
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Global in-memory store: userId -> socketId
const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

// ✅ Socket logic
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("✅ User connected:", userId, "Socket:", socket.id);

  // Save user socket
  if (userId) {
    users[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(users)); // broadcast online users
  }

  // ✅ Typing event
  socket.on("typing", ({ receiverId }) => {
    const receiverSocketId = users[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderId: userId });
    }
  });

  // ✅ Message received from sender and forwarded to receiver
  socket.on("send-message", ({ message, receiverId }) => {
    const receiverSocketId = users[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-message", message);
    }
  });

  // ✅ Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
    if (userId) {
      delete users[userId];
    }
    io.emit("getOnlineUsers", Object.keys(users)); // update online users
  });
});

export { app, io, server };
