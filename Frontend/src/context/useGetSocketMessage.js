import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../stateManage/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, addMessage } = useConversation();

  useEffect(() => {
    if (!socket) {
      console.warn("No socket connection available");
      return;
    }

    const authUserRaw = localStorage.getItem("messenger");
    const authUser = authUserRaw ? JSON.parse(authUserRaw) : null;

    const handleReceiveMessage = (newMessage) => {
      if (!newMessage || !newMessage.senderId || !newMessage.conversationId) return;

      console.log("📥 Received via socket:", newMessage);
      console.log("🟡 Selected Conversation:", selectedConversation?._id);
      console.log("🟢 Incoming Message ConversationId:", newMessage?.conversationId);

      // Ignore self messages
      if (newMessage.senderId === authUser?.user?._id) return;

      // Only play sound if the message belongs to current open chat
      if (selectedConversation?._id?.toString() === newMessage.conversationId?.toString()) {
        try {
          const sound = new Audio("/sounds/noti.wav");
          sound.volume = 1;
          sound.currentTime = 0;
          sound.play().catch((err) => {
            console.warn("🔇 Autoplay blocked:", err);
          });
        } catch (err) {
          console.warn("Audio play error:", err);
        }


        addMessage(newMessage);
      }
    };

    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, selectedConversation, addMessage]);

  return null;
};

export default useGetSocketMessage;
