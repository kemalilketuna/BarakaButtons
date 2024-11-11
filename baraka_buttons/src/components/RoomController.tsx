import { Box, Button, Typography } from "@mui/material";
import StyledTextField from "./StyledTextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ApiClient from "../api/apiClient";
import { toast } from "react-toastify";

interface Room {
    roomName: string;
    roomIp: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.error.main,
    width: '100%',
    marginLeft: '15px',
    marginBottom: '8px',
}));


const StartGameWidget = ({ room }: { room: Room }) => {
    const [firstPlayerBullet, setFirstPlayerBullet] = useState(0);
    const [secondPlayerBullet, setSecondPlayerBullet] = useState(0);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');
    const [firstPlayerSurname, setFirstPlayerSurname] = useState('');
    const [secondPlayerSurname, setSecondPlayerSurname] = useState('');

    const startGameRequest = async (playerId: number) => {
        try {
            if (playerId === 0) {
                await ApiClient.startGame(room.roomName, playerId, firstPlayerName, firstPlayerSurname, firstPlayerBullet);
            } else {
                await ApiClient.startGame(room.roomName, playerId, secondPlayerName, secondPlayerSurname, secondPlayerBullet);
            }
            toast.success('Game started successfully');
            setFirstPlayerBullet(0);
            setSecondPlayerBullet(0);
        } catch (error) {
            toast.error('Failed to start game');
        }
    }

    const startDuelloRequest = async () => {
        try {
            await ApiClient.startDuello(room.roomName, firstPlayerName, firstPlayerSurname, firstPlayerBullet, secondPlayerName, secondPlayerSurname, secondPlayerBullet);
            toast.success('Game started successfully');
            setFirstPlayerBullet(0);
            setSecondPlayerBullet(0);
        } catch (error) {
            toast.error('Failed to start game');
        }
    }

    return (
        <Box display="flex" flexDirection="column" width="100%" gap="20px">
            <Box display="flex" flexDirection="row" width="100%" gap="20px" justifyContent="space-evenly">
                <StyledTextField label="Player1 Name" sx={{ width: '30%' }} value={firstPlayerName} onChange={(e) => setFirstPlayerName(e.target.value)} />
                <StyledTextField label="Player1 Surname" sx={{ width: '30%' }} value={firstPlayerSurname} onChange={(e) => setFirstPlayerSurname(e.target.value)} />
                <StyledTextField
                    label="First Player Bullet"
                    type="number"
                    sx={{ width: '30%' }}
                    value={firstPlayerBullet}
                    onChange={(e) => {
                        const value = Math.max(0, parseInt(e.target.value) || 0);
                        setFirstPlayerBullet(value);
                    }}
                />
            </Box>
            <Box display="flex" flexDirection="row" width="100%" gap="20px" justifyContent="space-evenly">
                <StyledTextField label="Player2 Name" sx={{ width: '30%' }} value={secondPlayerName} onChange={(e) => setSecondPlayerName(e.target.value)} />
                <StyledTextField label="Player2 Surname" sx={{ width: '30%' }} value={secondPlayerSurname} onChange={(e) => setSecondPlayerSurname(e.target.value)} />
                <StyledTextField
                    label="Second Player Bullet"
                    type="number"
                    sx={{ width: '30%' }}
                    value={secondPlayerBullet}
                    onChange={(e) => {
                        const value = Math.max(0, parseInt(e.target.value) || 0);
                        setSecondPlayerBullet(value);
                    }}
                />
            </Box>
            <Box display="flex" flexDirection="row" width="100%" gap="20px" justifyContent="space-evenly">
                <Button variant="contained" sx={{ width: '30%' }} color="primary" onClick={() => startGameRequest(0)}>Start Player1</Button>
                <Button variant="contained" sx={{ width: '30%' }} color="primary" onClick={() => startGameRequest(1)}>Start Player2</Button>
                <Button variant="contained" sx={{ width: '30%' }} color="primary" onClick={startDuelloRequest}>Start Duello</Button>
            </Box>
        </Box>
    );
}


const StopGameWidget = ({ room }: { room: Room }) => {
    const stopGameRequest = async (playerId: number) => {
        await ApiClient.stopRoom(room.roomName, playerId);
        toast.success('Game stopped successfully');
    }
    return (
        <Box display="flex" flexDirection="row" width="100%" gap="20px" paddingBottom="10px" justifyContent="space-evenly">
            <Button variant="contained" color="primary" sx={{ width: '40%' }} onClick={() => stopGameRequest(0)}>Stop Player1</Button>
            <Button variant="contained" color="primary" sx={{ width: '40%' }} onClick={() => stopGameRequest(1)}>Stop Player2</Button>
        </Box>
    );
}

const IncreaseBulletWidget = ({ room }: { room: Room }) => {
    const [firstPlayerBullet, setFirstPlayerBullet] = useState(0);
    const [secondPlayerBullet, setSecondPlayerBullet] = useState(0);

    const increaseBulletRequest = async () => {
        try {
            await ApiClient.increaseBullet(room.roomName, firstPlayerBullet, secondPlayerBullet);
            toast.success('Bullet increased successfully');
            setFirstPlayerBullet(0);
            setSecondPlayerBullet(0);
        } catch (error) {
            toast.error('Failed to increase bullet');
        }
    }

    return (
        <Box display="flex" flexDirection="row" width="100%" gap="20px" justifyContent="space-evenly">
            <StyledTextField
                label="Player1 Bullet"
                type="number"
                sx={{ width: '30%' }}
                value={firstPlayerBullet}
                onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    setFirstPlayerBullet(value);
                }}
            />
            <StyledTextField
                label="Player2 Bullet"
                type="number"
                sx={{ width: '30%' }}
                value={secondPlayerBullet}
                onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    setSecondPlayerBullet(value);
                }}
            />
            <Button variant="contained" color="primary" sx={{ width: '30%' }} onClick={increaseBulletRequest}>Increase Bullet</Button>
        </Box>
    );
}

const RoomController = ({ room }: { room: Room }) => {
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', width: '100%', padding: '10px' }}>
            <StyledTypography variant="h5">Start Game</StyledTypography>
            <StartGameWidget room={room} />
            <StyledTypography variant="h5">Stop Game</StyledTypography>
            <StopGameWidget room={room} />
            <StyledTypography variant="h5">Increase Bullet</StyledTypography>
            <IncreaseBulletWidget room={room} />
        </Box>
    );
}

export default RoomController;