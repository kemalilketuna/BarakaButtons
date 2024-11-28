import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { setRoom, deleteRoom } from "../redux/dashboardSlicer";
import { RootState } from "../redux/store";
import React from 'react';
import ApiClient from "../api/apiClient";
import { toast } from "react-toastify";

interface Room {
    roomName: string;
    roomIp: string;
}

const StyledRoomContainer = styled(Box)({
    width: '120px',
    height: '120px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: '10px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: '#0a0a0a',
        cursor: 'pointer',
        transform: 'scale(1.02)',
        border: 'none'
    }
});

const RoomBox = ({ room }: { room: Room }) => {
    const dispatch = useDispatch();
    const selectedRoom = useSelector((state: RootState) => state.dashboard.room);
    const lastPartOfIp = room.roomIp.split('.')[3];
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        dispatch(setRoom(room));
    }

    const handleMouseDown = () => {
        timerRef.current = setTimeout(() => {
            ApiClient.deleteRoom(room.roomName);
            toast.success('Room deleted');
            dispatch(deleteRoom(room));
        }, 3000);
    };

    const handleTouchStart = handleMouseDown;

    const handleMouseUp = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleTouchEnd = handleMouseUp;

    return (
        <StyledRoomContainer
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            sx={{
                backgroundColor: selectedRoom === room ? '#0a0a0a' : 'inherit'
            }}
        >
            <Typography variant="h5" sx={{ userSelect: 'none' }}>Room:</Typography>
            <Typography variant="h5" sx={{ userSelect: 'none' }}>{room.roomName}</Typography>
            <Typography variant="h5" sx={{ userSelect: 'none' }}>IP: {lastPartOfIp}</Typography>
        </StyledRoomContainer>
    );
}

export { StyledRoomContainer };
export default RoomBox;