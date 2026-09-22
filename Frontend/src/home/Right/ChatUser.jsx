import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useConversation from "../../stateManage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

// Styled green animated dot badge
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

// Not used here, but available for future if needed
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function ChatUser() {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    // ✅ Check if the selected user is online
    const isOnline = onlineUsers.includes(selectedConversation?._id);

    return (
        <div className='flex space-x-0 hover:bg-gray-600 duration-300 cursor-pointer bg-gray-900 h-[10vh]'>
            <div>
                <Stack direction="row" spacing={2} className="p-4 pl-7">
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant={isOnline ? "dot" : undefined}
                    >
                        <Avatar
                            alt={selectedConversation?.name || "User"}
                            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                            sx={{ width: 45, height: 45 }}
                        />
                    </StyledBadge>
                </Stack>
            </div>
            <div className='py-2 pt-3'>
                <h1 className="text-md font-semibold">
                    {selectedConversation?.name || "No user selected"}
                </h1>
                <span className='text-sm'>{isOnline ? "online" : "offline"}</span>
            </div>
        </div>
    );
}
