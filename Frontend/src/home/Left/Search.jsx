import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import useGetAllUsers from "../../context/userGetAllUsers.jsx";
import useConversation from "../../stateManage/useConversation.js";
import toast from 'react-hot-toast';

export default function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    const conversation = allUsers.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User Not Found");
    }
  };

  return (
    <div className="px-4 py-2 w-full">
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-700 text-white rounded-lg bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
        >
          <MagnifyingGlassIcon className="h-5 w-5 hover:text-gray-400" />
        </button>
      </form>
    </div>
  );
}
