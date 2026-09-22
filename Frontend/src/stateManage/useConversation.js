import { create } from "zustand";

const useConversation = create((set, get) => ({
  selectedConversation: null,

  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation });

    const convoId = selectedConversation?._id?.toString(); // ✅ stringified
    if (convoId) {
      const storedMessages = get().allMessages[convoId] || [];
      set({ messages: storedMessages });
    } else {
      set({ messages: [] });
    }
  },

  allMessages: {},
  messages: [],

  setMessages: (messages) => {
    const convoId = get().selectedConversation?._id?.toString(); // ✅ stringified
    if (!convoId) return;

    if (!Array.isArray(messages)) {
      console.warn("⚠️ Invalid messages:", messages);
      messages = [];
    }

    set((state) => ({
      allMessages: { ...state.allMessages, [convoId]: messages },
      messages,
    }));
  },

  addMessage: (message) => {
    if (!message || typeof message !== "object") {
      console.warn("⚠️ Invalid message object:", message);
      return;
    }

    const convoId = get().selectedConversation?._id?.toString(); // ✅ stringified
    if (!convoId) {
      console.warn("⚠️ No selected conversation during addMessage");
      return;
    }

    const currentMessages = get().allMessages[convoId] || [];
    const updatedMessages = [...currentMessages, message];

    set((state) => ({
      allMessages: { ...state.allMessages, [convoId]: updatedMessages },
      messages: updatedMessages,
    }));

    console.log(`✅ Message added to convo ${convoId}:`, message);
  },
}));

export default useConversation;
