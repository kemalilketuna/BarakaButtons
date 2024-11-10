import { Box, Typography } from "@mui/material";
import Spacer from "./Spacer";
import AddRoomBox from "./AddRoomBox";
import RoomBox from "./RoomBox";
import Dashboard from "./Dashboard";
import MainIPField from "./MainIPField";

interface Room {
    name: string;
    ip: string;
}

const MainContent = () => {
    const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');

    return (
        <Box sx={{ padding: '5vw', paddingTop: '2vw', paddingBottom: '2vw', width: '100vw', height: '100vh' }}>

            {/* Title */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Typography fontSize="4vw">Baraka Buttons</Typography>
                <Box sx={{ paddingTop: '2vw' }}>
                    <MainIPField />
                </Box>
            </Box>

            <Spacer height="2vw" />

            {/* Room Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2vw' }}>
                <AddRoomBox />
                {rooms.map((room: Room) => (
                    <RoomBox key={room.name} room={room} />
                ))}
            </Box>

            <Spacer height="2vw" />

            {/* Dashboard */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Dashboard />
            </Box>
        </Box >
    );
}

export default MainContent;