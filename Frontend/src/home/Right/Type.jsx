import { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../stateManage/useConversation.js";

export default function Type() {
  const [message, setMessage] = useState("");
  const stopTypingTimeoutRef = useRef(null);
  const lastTypingTimeRef = useRef(0);
  const TYPING_INTERVAL = 1500;

  const { loading, sendMessages } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  if (!selectedConversation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    console.log("📤 Sending message to:", selectedConversation._id);

    // Bot Command
    if (trimmed.startsWith("/bot")) {
      const userMsg = trimmed.replace("/bot", "").trim();

      try {
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg }),
        });

        const data = await res.json();
        if (data.reply) {
          alert("🤖 Bot: " + data.reply);
        } else {
          alert("❌ Bot did not reply.");
        }
      } catch (error) {
        console.error("❌ Bot Error:", error);
        alert("Bot failed to respond.");
      }
    } else {
      await sendMessages(trimmed);
      console.log("✅ Message sent successfully");
    }

    setMessage("");
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);

    const now = Date.now();
    const convoId = selectedConversation?._id?.toString();

    if (
      socket &&
      convoId &&
      now - lastTypingTimeRef.current > TYPING_INTERVAL
    ) {
      socket.emit("typing", {
        receiverId: convoId, // ✅ Ensure it's string
      });
      lastTypingTimeRef.current = now;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-3 h-[10vh] items-center bg-gray-900 px-4">
        <input
          type="text"
          value={message}
          onChange={handleTyping}
          placeholder="Type here"
          className="flex-1 py-2 px-4 rounded-xl text-white bg-slate-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
        />
        <button
          type="submit"
          className="text-3xl p-2 rounded-full hover:bg-blue-500 transition-all duration-200"
          disabled={loading}
        >
          <IoSend className="text-white" />
        </button>
      </div>
    </form>
  );
}
