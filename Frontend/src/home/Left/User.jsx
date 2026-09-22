import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useConversation from '../../stateManage/useConversation';
import { useSocketContext } from "../../context/SocketContext.jsx";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function User({ user, onSelect }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleClick = () => {
    setSelectedConversation(user);
    if (onSelect) onSelect(user);
  };

  return (
    <div
      className={`flex items-center px-5 py-4 cursor-pointer transition-colors duration-300 rounded-md 
        ${isSelected ? "bg-slate-700" : "hover:bg-slate-600"}`}
      onClick={handleClick}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant={isOnline ? "dot" : undefined}
      >
        <Avatar
          alt={user.name}
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          sx={{ width: 56, height: 56 }}
        />
      </StyledBadge>

      <div className="ml-4 overflow-hidden">
        <h1 className="text-base md:text-lg font-semibold text-white truncate">{user.name}</h1>
        <p className="text-sm text-gray-300 truncate">{user.email}</p>
      </div>
    </div>
  );
}

