import User from "./User.jsx";
import userGetAllUsers from "../../context/userGetAllUsers";

export default function Users({ onUserSelect }) {
  const [allUsers, loading] = userGetAllUsers();

  // Grok is a virtual chat contact and is always displayed first.
  const botUser = {
    _id: "grok-bot",
    name: "🤖 Grok",
    email: "grok@x.ai",
  };

  return (
    <div className="py-1">
      {/* Always show bot user on top */}
      <User key="bot" user={botUser} onSelect={onUserSelect} />

      {/* Render real users */}
      {allUsers.map((user, index) => (
        <User key={index} user={user} onSelect={onUserSelect} />
      ))}
    </div>
  );
}


