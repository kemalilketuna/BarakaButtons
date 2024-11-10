import { StyledRoomContainer } from "./RoomBox";
import { Box, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { setValue } from "../redux/dashboardSlicer";

const AddRoomBox = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setValue("add"));
    }

    return (
        <StyledRoomContainer onClick={handleClick}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AddIcon style={{ fontSize: '45px' }} />
                <Typography fontSize="20px">Add Room</Typography>
            </Box>
        </StyledRoomContainer>
    );
}

export default AddRoomBox;