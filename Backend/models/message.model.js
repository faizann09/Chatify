import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: { // ✅ Add this
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
      validate: [
        {
          validator: (value) => value.length > 0,
          message: "Message can't be empty",
        },
      ],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
