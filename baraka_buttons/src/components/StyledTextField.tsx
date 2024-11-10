import { TextField, TextFieldProps } from "@mui/material";

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

export default StyledTextField;