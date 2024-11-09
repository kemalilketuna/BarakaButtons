import { useState } from "react"
import { Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
    width: '250px',
    height: '250px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const AddRoomBox = () => {
    return (
        <StyledBox>
            <AddIcon />
        </StyledBox>
    )
}


export { AddRoomBox }