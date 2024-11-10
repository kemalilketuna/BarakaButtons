import { Box, Typography } from "@mui/material";

interface Room {
    name: string;
    ip: string;
}

const RoomController = ({ room }: { room: Room }) => {
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Typography variant="h5">{room.name}</Typography>
        </Box>
    );
}

export default RoomController;