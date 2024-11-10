import { StyledRoomContainer } from "./RoomBox";
import { Box, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


const AddRoomBox = () => {
    return (
        <StyledRoomContainer>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AddIcon style={{ fontSize: '45px' }} />
                <Typography fontSize="20px">Add Room</Typography>
            </Box>
        </StyledRoomContainer>
    );
}

export default AddRoomBox;