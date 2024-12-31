import ApiClient from "../api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Room {
    roomName: string;
    roomIp: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.error.main,
}));

const BulletStatics = () => {
    const room = useSelector((state: RootState) => state.dashboard.room) as Room | null;

    const getBulletCount = async (room: Room): Promise<number[]> => {
        try {
            const bulletCount = await ApiClient.getRoomStatus(room?.roomName);
            return bulletCount || [0, 0];
        } catch (error) {
            console.error('Error fetching bullet count:', error);
            return [0, 0];
        }
    }

    const [bulletCount, setBulletCount] = useState<number[]>([0, 0]);

    useEffect(() => {
        if (room) {
            const fetchBulletCount = async () => {
                const count = await getBulletCount(room);
                setBulletCount(count);
            };
            fetchBulletCount();
            const interval = setInterval(fetchBulletCount, 5000);
            return () => clearInterval(interval);
        }
    }, [room]);

    return (
        <Box sx={{ width: '80vw', border: '1px solid #fff', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Box>
                <StyledTypography textAlign="center">Player 1</StyledTypography>
                <Typography variant="h6" textAlign="center">{bulletCount[0]}</Typography>
            </Box>
            <Box>
                <StyledTypography textAlign="center">Player 2</StyledTypography>
                <Typography variant="h6" textAlign="center">{bulletCount[1]}</Typography>
            </Box>
        </Box>
    )
}

export default BulletStatics;