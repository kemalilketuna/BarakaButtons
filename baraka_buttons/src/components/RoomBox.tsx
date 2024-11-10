import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

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
    return (
        <StyledRoomContainer>
            <Typography variant="h5">Room:</Typography>
            <Typography variant="h5">{room.name}</Typography>
            <Typography variant="h5">IP: {room.ip}</Typography>
        </StyledRoomContainer>
    );
}

export { StyledRoomContainer };
export default RoomBox;