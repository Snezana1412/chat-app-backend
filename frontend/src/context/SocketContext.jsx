import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";
import { useUserContext } from "./AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const SocketContext = createContext();

const url = "http://localhost:3000";

export const useSocketContext = () => {
  return useContext(SocketContext);
};

// export const socket1 = io(url, {
//   autoConnect: false,
// });

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const context = useUserContext();

  if (context.isAuthenticated) {
    context.isAuthenticated = true;
  }

  const authUser = context.user;

  //   router.route("/:id").get(protect, getMessages);
  // //router.route("/").post(protect, sendMessage);
  // router.post("/send/:id", protectRoute, sendMessage);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser || authUser === null) {
      // if (socket === "undefined") {
      //   socket.close();
      //   setSocket(null);
      // }
      navigate("/login");
      return;
    }

    const socket = io(`${url}`, {
      query: {
        userId: authUser._id,
      },
    });

    setSocket(socket);

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("message", (message) => {
      console.log("🚀 ~ socket.on ~ message:", message);
      setNewMessage(message);
    });

    socket.on("msg-recieve", (message) => {
      console.log("🚀 ~ socket.on ~ message", message);
      setNewMessage(message);
    });

    return () => {
      socket.close();
      socket.off("message");
    };
  }, [authUser, setNewMessage, setOnlineUsers, navigate]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, newMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
