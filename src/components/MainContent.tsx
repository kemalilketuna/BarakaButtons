import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
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
    return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2vw', paddingBottom: '2vw' }}>
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
    }, [dispatch]);

    return (
        <Box sx={{ padding: '5vw', paddingTop: '2vw', paddingBottom: '2vw', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {/* Title */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Typography fontSize="4vw">Baraka Buttons</Typography>
                <Box sx={{ paddingTop: '1vw', paddingBottom: '1vw' }}>
                    <MainIPField />
                </Box>
            </Box>
            <RoomButtonGroup />
            {/* Dashboard */}
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '2vw' }}>
                <Dashboard />
            </Box>
        </Box >
    );
}

export default MainContent;