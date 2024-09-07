import { model, Schema } from "mongoose";

const conversationSchema = new Schema({
  members: [
    // array of user ids
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    // array of message ids
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
