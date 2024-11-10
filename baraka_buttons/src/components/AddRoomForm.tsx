import { useState } from "react";
import { Box, Typography, TextField, TextFieldProps, Button } from "@mui/material";
import ApiClient from "../api/apiClient"
import { toast } from "react-toastify";

interface Room {
    name: string;
    ip: string;
}

const StyledTextField = (props: TextFieldProps) => {
    const defaultSx = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'primary.main',
            },
            '&:hover fieldset': {
                borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
            },
        },
    };

    return <TextField {...props} sx={{ ...defaultSx, ...props.sx }} />
}

const AddRoomForm = () => {
    const [roomName, setRoomName] = useState('');
    const [roomIP, setRoomIP] = useState('');

    const updateLocalStorage = (newRoom: Room) => {
        const existingRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
        const updatedRooms = [...existingRooms, newRoom];
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    };

    const createRoom = async () => {
        if (roomName === '' || roomIP === '') {
            return;
        }

        try {
            await ApiClient.createRoom(roomName, roomIP);
            updateLocalStorage({ name: roomName, ip: roomIP });
            setRoomName('');
            setRoomIP('');
            toast.success("Room created successfully");
        } catch (error) {
            toast.error("Error creating room: " + (error as Error).message);
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '30px' }}>
            <Typography variant="h4">Create Room</Typography>
            <StyledTextField label="Enter room name" sx={{ width: '80%' }} value={roomName} onChange={(e) => setRoomName(e.target.value)} />
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