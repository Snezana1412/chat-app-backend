import "./index.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./pages/Chat";

import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useUserContext } from "./context/AuthProvider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";

import {
  SocketContextProvider,
  useSocketContext,
} from "./context/SocketContext";
import Home from "./pages/home/Home";

function App() {
  const context = useSocketContext();
  console.log("🚀 ~ App ~ context:", context);
  //const isAuthenticated = false;
  // console.log("🚀 ~ App ~ isAuthenticated:", isAuthenticated);
  return (
    <Router>
      <AuthProvider>
        <SocketContextProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/verification/:vtoken/:uid'
              element={<Verification />}
            />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            {/* <Route
              path='/'
              element={isAuthenticated ? <ChatPage /> : <Login />}
            />
            <Route
              path='/chat-app'
              element={isAuthenticated ? <ChatPage /> : <Login />}
            /> */}
            <Route path='/chat-page' element={<ChatPage />} />

            <Route path='/profile' element={<Profile />} />
          </Routes>
          {/* <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/verification/:vtoken/:uid'
              element={<Verification />}
            />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route
              path='/'
              element={
                isAuthenticated ? <ChatPage /> : <Navigate to={"/login"} />
              }
            />
            <Route path='/chat' element={<Chat />} />
            <Route
              path='/profile'
              element={
                isAuthenticated ? <Profile /> : <Navigate to={"/login"} />
              }
            />
          </Routes> */}
          {/* <Routes>
            <Route element={<PrivateRoute />}>
              {" "}
              <Route path='/' element={<Home />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/chat-page' element={<ChatPage />} />
            </Route>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/verification/:vtoken/:uid'
              element={<Verification />}
            />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes> */}
        </SocketContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
