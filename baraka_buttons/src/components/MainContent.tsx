import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Spacer from "./Spacer";
import AddRoomBox from "./AddRoomBox";
import RoomBox from "./RoomBox";
import Dashboard from "./Dashboard";
import MainIPField from "./MainIPField";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import ApiClient from "../api/apiClient";
import { setRooms } from "../redux/dashboardSlicer";
import { useDispatch } from "react-redux";

interface Room {
    roomName: string;
    roomIp: string;
}

const RoomButtonGroup = () => {
    const rooms = useSelector((state: RootState) => state.dashboard.rooms);
    return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2vw', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <AddRoomBox />
        {rooms.map((room: Room) => (
            <RoomBox key={room.roomName} room={room} />
        ))}
    </Box>
}

const MainContent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getRooms = async () => {
            const rooms = await ApiClient.getRooms();
            dispatch(setRooms(rooms));
        }
        getRooms();
    }, []);

    return (
        <Box sx={{ padding: '5vw', paddingTop: '2vw', paddingBottom: '2vw', width: '100vw', height: '100vh' }}>

            {/* Title */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Typography fontSize="4vw">Baraka Buttons</Typography>
                <Box sx={{ paddingTop: '2vw' }}>
                    <MainIPField />
                </Box>
            </Box>
            <RoomButtonGroup />
            <Spacer height="2vw" />

            {/* Dashboard */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Dashboard />
            </Box>
        </Box >
    );
}

export default MainContent;