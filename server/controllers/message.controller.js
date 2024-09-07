import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [sender, receiver],
        messages: [],
      });

      await conversation.save();
    }

    const newMessage = new Message({
      sender,
      receiver,
      text,
      conversation: conversation._id,
    });

    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  //const { sender, receiver } = req.query;

  const { id: userToChatId } = req.params;
  const sender = req.user._id;
  const receiver = userToChatId;

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversations = async (req, res) => {
  const user = req.user._id;

  try {
    const conversations = await Conversation.find({ members: user }).populate(
      "messages"
    );

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
