import Search from "./Search";
import Users from "./Users";

export default function Left({ onUserSelect }) {
  return (
    <div className="bg-black text-white h-full flex flex-col">
      <div>
        <h1 className="font-bold text-3xl p-2 px-11">Chat</h1>
      </div>
      <Search />
      <hr />
      {/* User list should scroll independently */}
      <div className="flex-1 overflow-y-auto">
        <Users onUserSelect={onUserSelect} />
      </div>
    </div>
  );
}
