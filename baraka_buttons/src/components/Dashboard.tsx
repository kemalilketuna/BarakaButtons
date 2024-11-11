import { Box } from "@mui/material";
import AddRoomForm from "./AddRoomForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RoomController from "./RoomController";

interface Room {
    roomName: string;
    roomIp: string;
}

const Dashboard = () => {
    const room = useSelector((state: RootState) => state.dashboard.room) as Room | null;

    return (
        <Box sx={{ height: 'fit-content', width: '80vw', borderRadius: '10px', border: '1px solid #fff' }}>
            {room === null && <AddRoomForm />}
            {room !== null && <RoomController key={`${room.roomName}-${room.roomIp}`} room={room} />}
        </Box>
    );
}

export default Dashboard;