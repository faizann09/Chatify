import Messages from './Messages.jsx';
import ChatUser from './ChatUser.jsx';
import Type from './Type.jsx';
import useConversation from '../../stateManage/useConversation.js';
import { useEffect } from 'react';
import Loading from '../../component/loading.jsx';
import { useAuth } from "../../context/AuthProvider.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js"; // ✅ IMPORT HERE

export default function Right({ onBack }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // ✅ Start socket listener regardless of selection
  useGetSocketMessage(); // ✅ CALL THE HOOK OUTSIDE RENDER CONDITION

  // Clear conversation on unmount
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-screen">
      {!selectedConversation ? (
        <Nochat />
      ) : (
        <div className="w-full bg-slate-950 text-white h-full flex flex-col">
          {/* Back Button for Mobile */}
          <div className="md:hidden px-4 py-3 border-b border-slate-800">
            <button
              onClick={onBack}
              className="text-blue-400 text-sm font-semibold"
            >
              ← Back
            </button>
          </div>

          <ChatUser />
          <div
            className="overflow-y-auto flex-1 py-2"
            style={{ maxHeight: "calc(100vh - 12vh)" }}
          >
            <Messages />
          </div>
          <Type />
        </div>
      )}
    </div>
  );
}

const Nochat = () => {
  const { authUser } = useAuth();

  return (
    <div className="h-screen w-full bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-6xl mb-6 animate-bounce">👋</div>
        <p className="text-2xl md:text-3xl font-semibold mb-2">
          Welcome, <span className="text-blue-400">{authUser?.user?.name}</span>
        </p>
        <p className="text-gray-400 text-base md:text-lg">
          Select a chat to start messaging!
        </p>
      </div>
    </div>
  );
};
