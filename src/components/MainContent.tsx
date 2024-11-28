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
        <Box sx={{ padding: '5vw', paddingTop: '1vh', paddingBottom: '1vh', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            {/* Title */}
            <Box sx={{ position: 'absolute', top: '3vh', right: '2vw' }}>
                <MainIPField />
            </Box>
            <Typography fontSize="3rem">Baraka Buttons</Typography>

            {/* Room Buttons */}
            <RoomButtonGroup />

            {/* Dashboard */}
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '2vw' }}>
                <Dashboard />
            </Box>
        </Box >
    );
}

export default MainContent;