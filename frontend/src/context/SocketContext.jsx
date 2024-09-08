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
  const { messages, setMessages } = useState();
  const context = useUserContext();
  console.log("🚀 ~ SocketContextProvider ~ context:", context);

  if (context.isAuthenticated) {
    context.isAuthenticated = true;
  }

  const authUser = context.user;

  console.log("🚀 ~ SocketContextProvider ~ authUser:", authUser);

  //   router.route("/:id").get(protect, getMessages);
  // //router.route("/").post(protect, sendMessage);
  // router.post("/send/:id", protectRoute, sendMessage);
  console.log("🚀 ~ socket1:", socket);
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
      console.log("🚀 ~ socket.on ~ users:", users);
      setOnlineUsers(users);
    });

    socket.on("message", (newMessage) => {
      console.log("🚀 ~ socket.on ~ data:", newMessage);
      setMessages(newMessage);
    });

    return () => socket.close();
  }, [authUser, setMessages, setOnlineUsers, navigate]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, messages }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
