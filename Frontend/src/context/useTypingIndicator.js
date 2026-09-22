import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/useConversation.js";

const useTypingIndicator = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!socket || !selectedConversation?._id) return;

    const handleTyping = ({ senderId }) => {
      if (senderId === selectedConversation._id) {
        setIsTyping(true);

       
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    };

    const handleStopTyping = ({ senderId }) => {
      if (senderId === selectedConversation._id) {
        setIsTyping(false);
        clearTimeout(typingTimeoutRef.current);
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stop typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop typing", handleStopTyping);
      clearTimeout(typingTimeoutRef.current);
    };
  }, [socket, selectedConversation]);

  return isTyping;
};

export default useTypingIndicator;
