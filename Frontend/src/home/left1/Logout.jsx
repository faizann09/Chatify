// home/left1/Logout.jsx
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import toast from "react-hot-toast";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      toast.success("Logout Successful");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-black border-t border-gray-700 p-3 flex justify-start">
      <button onClick={handleLogout} title="Logout">
        <LogoutIcon className="h-7 w-7 hover:text-gray-400 duration-300 text-white" />
      </button>
    </div>
  );
}
