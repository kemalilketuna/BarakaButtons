import { Box } from "@mui/material";
import AddRoomForm from "./AddRoomForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
    const value = useSelector((state: RootState) => state.dashboard.value);
    console.log(value);

    return (
        <Box sx={{ height: '55vh', width: '80vw', borderRadius: '10px', border: '1px solid #fff' }}>
            <AddRoomForm />
        </Box>
    );
}

export default Dashboard;