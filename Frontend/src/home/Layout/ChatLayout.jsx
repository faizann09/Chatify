// home/layout/ChatLayout.jsx

import Left from '../Left/Left.jsx';
import Right from '../Right/Right.jsx';
import Logout from '../left1/Logout.jsx';

export default function ChatLayout({ selectedUser, setSelectedUser }) {
  return (
    <div className="hidden md:flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="flex flex-col bg-black text-white w-[40%] min-w-[320px] max-w-[400px] h-full">
        {/* Main content (Scrollable) */}
        <div className="flex-grow overflow-y-auto">
          <Left onUserSelect={setSelectedUser} />
        </div>
        
        {/* Bottom Logout */}
        <div className="p-2">
          <Logout />
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 h-full">
        <Right selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
      </div>
    </div>
  );
}
