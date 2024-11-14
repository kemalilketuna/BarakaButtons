import { TextFieldProps } from "@mui/material";
import StyledTextField from "./StyledTextField";

interface BulletInputProps extends Omit<TextFieldProps, 'onChange'> {
    label: string;
    value: number;
    onChange: (value: string) => void;
}

const BulletInput = ({ label, value, onChange, ...props }: BulletInputProps) => (
    <StyledTextField
        label={label}
        type="number"
        sx={{ width: '30%' }}
        value={value}
        onChange={(e) => {
            const newValue = Math.min(1500, Math.max(0, parseInt(e.target.value) || 0));
            onChange(newValue.toString());
        }}
        {...props}
    />
);

export default BulletInput;