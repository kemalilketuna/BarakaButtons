import { TextField } from "@mui/material";
import { useState } from "react";

const MainIPField = () => {
    const [mainIP, setMainIP] = useState(localStorage.getItem('mainIP') || '');

    return <TextField label="Main IP" sx={{
        '& .MuiOutlinedInput-root': {
            height: '40px',
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
    }} value={mainIP}
        onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,3}$/.test(value)) {
                localStorage.setItem('mainIP', value);
                setMainIP(value);
            }
        }}
        type="number"
    />
}

export default MainIPField;