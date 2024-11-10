import { Box } from "@mui/material";
import AddRoomForm from "./AddRoomForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RoomController from "./RoomController";

const Dashboard = () => {
    const room = useSelector((state: RootState) => state.dashboard.room);

    return (
        <Box sx={{ height: '55vh', width: '80vw', borderRadius: '10px', border: '1px solid #fff' }}>
            {room === null && <AddRoomForm />}
            {room !== null && <RoomController room={room} />}
        </Box>
    );
}

export default Dashboard;