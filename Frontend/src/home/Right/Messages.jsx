import { useRef, useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext.jsx";
import useGetMessage from "../../context/useGetMessage.js";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
import useTypingIndicator from "../../context/useTypingIndicator.js";
import useConversation from "../../stateManage/useConversation.js";
import Message from "./Message.jsx";
import Loading from "../../component/loading.jsx";

export default function Messages() {
  const { loading } = useGetMessage();
  const { socket } = useSocketContext();
  const { allMessages, selectedConversation } = useConversation();
  const isTyping = useTypingIndicator();
  const lastMsgRef = useRef(null);

  const messages = allMessages[selectedConversation?._id] || [];

  useGetSocketMessage(); // set up socket listener

  // ✅ Scroll to last message after messages are rendered
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "auto" });
      }
    }, 100); // allow enough time for DOM to render

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        <>
          {messages.map((message, index) => (
            <div
              key={
                message._id?.toString() ||
                message.createdAt?.toString() ||
                index
              }
              ref={index === messages.length - 1 ? lastMsgRef : null}
            >
              <Message message={message} />
            </div>
          ))}

          {isTyping && (
            <div className="px-4 text-sm italic text-gray-400 mt-1">
              Typing...
            </div>
          )}
        </>
      ) : (
        <div style={{ minHeight: "calc(92vh - 8vh)" }}>
          <div className="flex items-center justify-center h-full mt-40">
            <div className="flex flex-col items-center text-center px-4">
              <div className="text-[5rem] mb-3 animate-bounce">👋</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Start a Conversation
              </h2>
              <p className="text-gray-500 text-base max-w-md">
                You haven’t sent any messages yet. Type something and say hello!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
