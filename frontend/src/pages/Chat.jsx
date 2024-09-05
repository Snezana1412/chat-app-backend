import { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch initial chat history or connect to a WebSocket for real-time updates
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // Add logic to send the message (e.g., via WebSocket or API)
      setMessages([...messages, { user: "Me", text: input }]);
      setInput("");
    }
  };

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <div className='flex-1 p-4 overflow-y-auto'>
        {messages.map((message, index) => (
          <div key={index} className='mb-2'>
            <span className='font-bold'>{message.user}: </span>
            {message.text}
          </div>
        ))}
      </div>
      <div className='p-4 flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 px-4 py-2 border rounded-l-md'
          placeholder='Type a message...'
        />
        <button
          onClick={sendMessage}
          className='bg-blue-500 text-white px-4 py-2 rounded-r-md'>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
