import './App.css';

import Left from './home/Left/Left.jsx';
import Right from './home/Right/Right.jsx';
import Logout from './home/left1/Logout.jsx';

import Signup from './component/signup.jsx';
import Login from './component/login.jsx';

import { useAuth } from './context/AuthProvider.jsx';

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ChatLayout from './home/Layout/ChatLayout.jsx';

function App() {
  const { authUser } = useAuth();

  return (
    <>
      <Routes>

        {/* Website open karte hi LOGIN */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* LOGIN PAGE - authUser check MAT lagao */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP PAGE */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/chat"
          element={
            authUser ? (
              <ChatLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>

      <Toaster />
    </>
  );
}

export default App;