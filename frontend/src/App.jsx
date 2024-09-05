import { Routes, Route } from "react-router-dom";
import "./index.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./pages/Chat";
import { NavLink } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className='bg-blue-300 min-h-screen'>
      <nav className='main-nav bg-white p-5'>
        <ul className='flex gap-x-4'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/chat'>Chat</NavLink>
          </li>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
          <li>
            <NavLink to='/logout'>Logout</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={Profile} />
      </Routes>
    </div>
  );
}

export default App;
