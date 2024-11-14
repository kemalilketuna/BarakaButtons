import { Box } from "@mui/material";
import AddRoomForm from "./AddRoomForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RoomController from "./RoomController";
import BulletStatics from "./BulletStatics";

interface Room {
    roomName: string;
    roomIp: string;
}

const Dashboard = () => {
    const room = useSelector((state: RootState) => state.dashboard.room) as Room | null;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="20px">
            <Box sx={{ height: '55vh', minHeight: '390px', width: '80vw', borderRadius: '10px', border: '1px solid #fff' }}>
                {room === null && <AddRoomForm />}
                {room !== null && <RoomController key={`${room.roomName}-${room.roomIp}`} room={room} />}
            </Box>
            {room !== null && <BulletStatics />}
        </Box>
    );
}

export default Dashboard;