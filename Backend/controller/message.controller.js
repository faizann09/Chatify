import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";
import mongoose from "mongoose";

// Virtual assistant dummy ID
const DUMMY_BOT_ID = new mongoose.Types.ObjectId("000000000000000000000001");

// ✅ Send Message Controller
export const sendMessage = async (req, res) => {
  try {
    const { message, senderId: customSenderId } = req.body;
    const { id: receiverIdParam } = req.params;

    const senderId = customSenderId || req.user._id;

    const isBot = receiverIdParam === "grok-bot";
    const receiverId = isBot
      ? DUMMY_BOT_ID
      : mongoose.Types.ObjectId.isValid(receiverIdParam)
        ? new mongoose.Types.ObjectId(receiverIdParam)
        : null;

    if (!receiverId) {
      return res.status(400).json({ error: "Invalid receiver ID" });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      conversationId: conversation._id,
      message,
    });

    // Push message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Send to receiver via socket if online
    const receiverSocketId = getReceiverSocketId(receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-message", newMessage);
    }

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("❌ Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get Messages Controller
export const getMessage = async (req, res) => {
  try {
    const { id: chatUserParam } = req.params;
    const senderId = req.user._id;

    const isBot = chatUserParam === "grok-bot";
    const chatUser = isBot
      ? DUMMY_BOT_ID
      : mongoose.Types.ObjectId.isValid(chatUserParam)
        ? new mongoose.Types.ObjectId(chatUserParam)
        : null;

    if (!chatUser) {
      return res.status(400).json({ error: "Invalid chat user ID" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // No messages yet
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("❌ Error in getMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
