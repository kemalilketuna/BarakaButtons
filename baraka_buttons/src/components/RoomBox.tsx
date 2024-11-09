import { Box, Typography } from "@mui/material";

interface Room {
    name: string;
    ip: string;
}


const RoomBox = ({ room }: { room: Room }) => {
    return (
        <Box sx={{ width: '300px', height: '300px', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h2">{room.name}</Typography>
                <Typography variant="h2">{room.ip}</Typography>
            </Box>
        </Box>
    );
}

export default RoomBox;