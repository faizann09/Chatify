export default function Message({ message }) {
  // Validate message prop
  if (!message || typeof message !== "object") {
    console.warn("❌ Invalid message prop:", message);
    return null; // Return null to avoid rendering invalid data
  }

  const authUser = JSON.parse(localStorage.getItem("messenger"));

  // Handle both ObjectId and populated user objects
  const senderId = typeof message.senderId === "object" ? message.senderId._id : message.senderId;
  const isMe = senderId === authUser?.user?._id;
  const isBot = senderId === "grok-bot" || senderId === "000000000000000000000001";

  const chatAlign = isMe ? "chat-end" : "chat-start";
  const chatColor = isBot
    ? "bg-blue-500 text-white"
    : isMe
    ? "bg-blue-500 text-white"
    : "bg-gray-600 text-white";

  const createdAt = new Date(message.createdAt || Date.now());
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const content = message.message || message.content || "[No content]";

  return (
    <div className={`chat ${chatAlign} px-4`}>
      <div className="flex flex-col gap-1">
        <div
          className={`chat-bubble ${chatColor} rounded-2xl shadow-md px-4 py-2 max-w-fit whitespace-pre-line`}
        >
          {isBot && <div className="text-sm font-bold mb-1">🤖 Grok</div>}
          {content}
        </div>
        <div
          className={`text-xs text-gray-400 ${isMe ? "text-right" : "text-left"} px-1`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

