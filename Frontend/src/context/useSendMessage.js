import { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import { useSocketContext } from "./SocketContext";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { addMessage, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const sendMessages = async (messageObj) => {
    setLoading(true);

    try {
      const content =
        typeof messageObj === "string" ? messageObj : messageObj.content;

      // Grok replies are generated through the chatbot API, not Socket.IO.
      if (selectedConversation._id === "grok-bot") {
        const userMessage = {
          _id: Date.now(),
          senderId: "you",
          receiverId: "grok-bot",
          message: content,
          createdAt: new Date().toISOString(),
        };
        addMessage(userMessage);

        const botRes = await axios.post("/api/chatbot", { message: content });
        const botReply = botRes.data.reply;

        const botMessage = {
          _id: Date.now() + 1,
          senderId: "grok-bot",
          receiverId: "you",
          message: botReply,
          createdAt: new Date().toISOString(),
        };
        addMessage(botMessage);

        return;
      }

      // ✅ User-to-User message
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message: content }
      );

      const newMessage = res.data.newMessage;

      // ✅ Add message locally
      addMessage(newMessage);

      // ✅ Emit message via socket for receiver
      socket.emit("send-message", {
        ...newMessage, // contains _id, message, senderId, receiverId, conversationId, createdAt
      });
    } catch (error) {
      console.log(
        "❌ Error in sendMessages:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
