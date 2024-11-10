import { Box, Typography } from "@mui/material"
import { AddRoomBox } from "./components/AddRoomBox"
import { Spacer } from "./components/Spacer"
import { theme } from "./Theme"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import MainIPField from "./components/MainIPField"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoomBox from "./components/RoomBox"
import Dashboard from "./components/Dashboard"

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
                    <RoomBox room={room} />
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

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <MainContent />
                <CssBaseline />
            </ThemeProvider>
            <ToastContainer />
        </>
    )
}

export default App
