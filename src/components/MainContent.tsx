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
import { styled } from "@mui/material/styles";


interface Room {
    roomName: string;
    roomIp: string;
}

const MainContentBox = styled(Box)(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100vw',
    height: '100vh',
    padding: '5vw',
    paddingTop: '1vh',
    paddingBottom: '1vh',
}));

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
        <MainContentBox>
            {/* Title */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '1vh', marginBottom: '1vh' }}>
                <Typography fontSize="3rem" sx={{ marginTop: '-0.6rem' }}>Baraka Buttons</Typography>
                <MainIPField />
            </Box>
            {/* Room Buttons */}
            <RoomButtonGroup />

            {/* Dashboard */}
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '2vw' }}>
                <Dashboard />
            </Box>
        </MainContentBox>
    );
}

export default MainContent;