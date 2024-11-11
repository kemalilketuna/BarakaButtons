import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ApiClient from "../api/apiClient"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setRooms } from "../redux/dashboardSlicer";
import StyledTextField from "./StyledTextField";

const AddRoomForm = () => {
    const [roomName, setRoomName] = useState('');
    const [roomIP, setRoomIP] = useState('');
    const dispatch = useDispatch();

    const createRoom = async () => {
        if (roomName === '' || roomIP === '') {
            return;
        }

        try {
            await ApiClient.createRoom(roomName, roomIP);
            setRoomName('');
            setRoomIP('');
            toast.success("Room created successfully");
            dispatch(setRooms(await ApiClient.getRooms()));
        } catch (error) {
            toast.error("Error creating room: " + (error as Error).message);
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '30px' }}>
            <Typography variant="h4">Create Room</Typography>
            <StyledTextField label="Enter room name" sx={{ width: '80%' }} value={roomName}
                onChange={(e) => {
                    const value = e.target.value;
                    if ((/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ]+$/.test(value) && value.length <= 8) || value === '') {
                        setRoomName(value);
                    }
                }} />
            <StyledTextField label="Enter room IP" sx={{ width: '80%' }} value={roomIP}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,3}$/.test(value)) {
                        setRoomIP(value);
                    }
                }} />
            <Button variant="contained" color="primary" onClick={createRoom} size="large" sx={{ width: '80%' }}>Create Room</Button>
        </Box>
    );
}

export default AddRoomForm;