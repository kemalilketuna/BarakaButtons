import { Box, Typography } from "@mui/material";

interface Room {
    roomName: string;
    roomIp: string;
}

const RoomController = ({ room }: { room: Room }) => {
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Typography variant="h5">{room.roomName}</Typography>
        </Box>
    );
}

export default RoomController;