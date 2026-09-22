import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./route/user.route.js";
import messageRoute from "./route/message.route.js";
import grokbot from "./route/grokbot.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://chatify-dun-gamma.vercel.app"
  ],
  credentials: true,
}));
app.use(cookieParser());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/chatbot", grokbot);

// Production Handling
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const frontendPath = path.join(__dirname, "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start Server
server.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
});
