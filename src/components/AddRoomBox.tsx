import { StyledRoomContainer } from "./RoomBox";
import { Box, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { setRoom } from "../redux/dashboardSlicer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AddRoomBox = () => {
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.dashboard.room);

    const handleClick = () => {
        dispatch(setRoom(null));
    }

    return (
        <StyledRoomContainer
            onClick={handleClick}
            sx={{
                backgroundColor: room === null ? '#0a0a0a' : 'inherit'
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AddIcon style={{ fontSize: '45px' }} />
                <Typography fontSize="20px">Add Room</Typography>
            </Box>
        </StyledRoomContainer>
    );
}

export default AddRoomBox;