import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        console.log("JWT Token:", token);

        const response = await axios.get("/api/user/getUserProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setAllUsers(response.data.filteredUsers);
      } catch (error) {
        console.log("Error in useGetAllUsers:", error.message || error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}
