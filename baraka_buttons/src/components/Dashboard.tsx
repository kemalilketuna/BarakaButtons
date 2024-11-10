import { Box } from "@mui/material";
import AddRoomForm from "./AddRoomForm";

const Dashboard = () => {
    return (
        <Box sx={{ height: '55vh', width: '80vw', borderRadius: '10px', border: '1px solid #fff' }}>
            <AddRoomForm />
        </Box>
    );
}

export default Dashboard;