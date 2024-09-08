import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your backend API URL

// Get all conversations for the current user
export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_URL}/conversations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

// Get messages for a specific conversation
export const getMessages = async (receiverId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Send a new message
export const sendMessage = async (sender, receiver, text) => {
  try {
    const response = await axios({
      method: "POST",
      url: `http://localhost:3000/api/messages`,
      data: { sender, receiver, text },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
