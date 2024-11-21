import { Box, Button, Typography } from "@mui/material";
import StyledTextField from "./StyledTextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ApiClient from "../api/apiClient";
import { toast } from "react-toastify";
import BulletInput from "./BulletKeyboard";

interface Room {
    roomName: string;
    roomIp: string;
}

interface PlayerData {
    name: string;
    surname: string;
    bullet: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.error.main,
    width: '100%',
    marginLeft: '15px',
    marginBottom: '8px',
}));

const getStoredValue = (roomName: string, key: string) => {
    return localStorage.getItem(`${roomName}_${key}`) || '';
};

const setStoredValue = (roomName: string, key: string, value: string) => {
    localStorage.setItem(`${roomName}_${key}`, value);
};

const StartGameWidget = ({ room }: { room: Room }) => {
    const [player1, setPlayer1] = useState<PlayerData>({
        name: getStoredValue(room.roomName, 'player1_name'),
        surname: getStoredValue(room.roomName, 'player1_surname'),
        bullet: 0
    });

    const [player2, setPlayer2] = useState<PlayerData>({
        name: getStoredValue(room.roomName, 'player2_name'),
        surname: getStoredValue(room.roomName, 'player2_surname'),
        bullet: 0
    });

    const startGameRequest = async (playerId: number) => {
        const playerData = playerId === 0 ? player1 : player2;
        if (playerData.bullet === 0) {
            toast.error('Player bullet cannot be 0');
            return;
        }
        try {
            await ApiClient.startGame(
                room.roomName,
                playerId,
                playerData.name,
                playerData.surname,
                playerData.bullet
            );
            toast.success('Game started successfully');
            setPlayer1(prev => ({ ...prev, bullet: 0 }));
            setPlayer2(prev => ({ ...prev, bullet: 0 }));
        } catch (error) {
            toast.error('Failed to start game');
        }
    };

    const startDuelloRequest = async () => {
        if (player1.bullet === 0 || player2.bullet === 0) {
            toast.error('No user can have 0 ammo in duel mode');
            return;
        }
        try {
            await ApiClient.startDuello(
                room.roomName,
                player1.name,
                player1.surname,
                player1.bullet,
                player2.name,
                player2.surname,
                player2.bullet
            );
            toast.success('Game started successfully');
            setPlayer1(prev => ({ ...prev, bullet: 0 }));
            setPlayer2(prev => ({ ...prev, bullet: 0 }));
        } catch (error) {
            toast.error('Failed to start game');
        }
    };

    const updatePlayerName = (playerId: number, key: string, value: string) => {
        if (playerId === 0) {
            setPlayer1(prev => ({ ...prev, [key]: value }));
            setStoredValue(room.roomName, `player1_${key}`, value);
        } else {
            setPlayer2(prev => ({ ...prev, [key]: value }));
            setStoredValue(room.roomName, `player2_${key}`, value);
        }
    };

    const updatePlayerSurname = (playerId: number, key: string, value: string) => {
        if (playerId === 0) {
            setPlayer1(prev => ({ ...prev, [key]: value }));
            setStoredValue(room.roomName, `player1_${key}`, value);
        } else {
            setPlayer2(prev => ({ ...prev, [key]: value }));
            setStoredValue(room.roomName, `player2_${key}`, value);
        }
    };

    const updatePlayerBullet = (playerId: number, key: string, value: string) => {
        if (playerId === 0) {
            setPlayer1(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
            setStoredValue(room.roomName, `player1_${key}`, value);
        } else {
            setPlayer2(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
            setStoredValue(room.roomName, `player2_${key}`, value);
        }
    };

    return (
        <Box display="flex" flexDirection="column" width="100%" gap="20px">
            <Box display="flex" flexDirection="row" width="100%" gap="20px" justifyContent="space-evenly">
                <StyledTextField label="Player1 Name" sx={{ width: '30%' }} value={player1.name} onChange={(e) => updatePlayerName(0, 'name', e.target.value)} />
                <StyledTextField label="Player1 Surname" sx={{ width: '30%' }} value={player1.surname} onChange={(e) => updatePlayerSurname(0, 'surname', e.target.value)} />
                <BulletInput
                    label="First Player Bullet"
                    value={player1.bullet}
                    onChange={(value) => updatePlayerBullet(0, 'bullet', value)}
                />
            </Box>
            <Box display="flex" flexDirection="row" width="100%" gap="20px" justifyContent="space-evenly">
                <StyledTextField label="Player2 Name" sx={{ width: '30%' }} value={player2.name} onChange={(e) => updatePlayerName(1, 'name', e.target.value)} />
                <StyledTextField label="Player2 Surname" sx={{ width: '30%' }} value={player2.surname} onChange={(e) => updatePlayerSurname(1, 'surname', e.target.value)} />
                <BulletInput
                    label="Second Player Bullet"
                    value={player2.bullet}
                    onChange={(value) => updatePlayerBullet(1, 'bullet', value)}
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
        try {
            await ApiClient.stopRoom(room.roomName, playerId);
            toast.success('Game stopped successfully');
        } catch (error) {
            toast.error('Failed to stop game');
        }
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
            <BulletInput
                label="Player1 Bullet"
                value={firstPlayerBullet}
                onChange={(value) => {
                    const newValue = Math.max(0, parseInt(value) || 0);
                    setFirstPlayerBullet(newValue);
                }}
            />
            <BulletInput
                label="Player2 Bullet"
                value={secondPlayerBullet}
                onChange={(value) => {
                    const newValue = Math.max(0, parseInt(value) || 0);
                    setSecondPlayerBullet(newValue);
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