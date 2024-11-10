import { useState } from "react"
import { Box, Typography, TextField, TextFieldProps, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";
import ApiClient from "../api/apiClient";
import { toast } from 'react-toastify';

interface Room {
    name: string;
    ip: string;
}

const StyledBox = styled(Box)({
    width: '120px',
    height: '120px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledClickableBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: '#0a0a0a',
        cursor: 'pointer',
        transform: 'scale(1.02)'
    },
    height: '100%',
    width: '100%',
    borderRadius: '10px',
});

const StyledFormBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    paddingBottom: '1rem',
    paddingTop: '1rem',
});

const StyledTextField = (props: TextFieldProps) => {
    return <TextField {...props} sx={{
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'primary.main', // Set border color to primary
            },
            '&:hover fieldset': {
                borderColor: 'primary.main', // Set border color on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: 'primary.main', // Set border color when focused
            },
        },
    }} />
}


const AddRoomBox = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [roomIP, setRoomIP] = useState('');

    const updateLocalStorage = (newRoom: Room) => {
        const existingRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
        const updatedRooms = [...existingRooms, newRoom];
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    };

    const toggleClicked = () => {
        setIsClicked(!isClicked);
    }

    const createRoom = async () => {
        if (roomName === '' || roomIP === '') {
            return;
        }

        try {
            await ApiClient.createRoom(roomName, roomIP);
            updateLocalStorage({ name: roomName, ip: roomIP });
            setIsClicked(false);
            setRoomName('');
            setRoomIP('');
            toast.success("Room created successfully");
        } catch (error) {
            toast.error("Error creating room: " + (error as Error).message);
        }

    }

    return (
        <StyledBox>
            {!isClicked ? (
                <StyledClickableBox onClick={toggleClicked}>
                    <AddIcon style={{ fontSize: '50px' }} />
                    <Typography fontSize="1.5vw">Add Room</Typography>
                </StyledClickableBox>
            ) : (
                <StyledFormBox>
                    <Typography variant="h4">Create Room</Typography>
                    <StyledTextField label="Enter room name" sx={{ width: '100%' }} value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    <StyledTextField
                        label="Enter room IP"
                        sx={{ width: '100%' }}
                        value={roomIP}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,3}$/.test(value)) {
                                setRoomIP(value);
                            }
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={createRoom}>Create Room</Button>
                </StyledFormBox>
            )}
        </StyledBox>
    )
}


export { AddRoomBox as AddRoomBox }