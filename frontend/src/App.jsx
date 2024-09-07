import "./index.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./pages/Chat";

import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className='main-section antialiased relative font-nunito text-sm font-normal'>
      <div className='relative'>
        <div className='main-container text-black dark:text-white-dark min-h-screen'>
          <Header />
          <Router>
            <AuthProvider>
              <Routes>
                <Route element={<PrivateRoute />}>
                  {" "}
                  <Route path='/chat' element={<Chat />} />
                  <Route path='/chat-page' element={<ChatPage />} />
                  <Route path='/profile' element={Profile} />
                </Route>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                  path='/verification/:vtoken/:uid'
                  element={<Verification />}
                />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
