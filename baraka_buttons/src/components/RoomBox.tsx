import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { setRoom } from "../redux/dashboardSlicer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Room {
    name: string;
    ip: string;
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

    const handleClick = () => {
        dispatch(setRoom(room));
    }

    return (
        <StyledRoomContainer
            onClick={handleClick}
            sx={{
                backgroundColor: selectedRoom === room ? '#0a0a0a' : 'inherit'
            }}
        >
            <Typography variant="h5">Room:</Typography>
            <Typography variant="h5">{room.name}</Typography>
            <Typography variant="h5">IP: {room.ip}</Typography>
        </StyledRoomContainer>
    );
}

export { StyledRoomContainer };
export default RoomBox;