import React, { MouseEvent } from 'react';
import { InputAdornment, Theme, Typography } from '@mui/material';
import FormInputField from 'components/FormInputField';

interface Props {
    touched?: boolean;
    extension: string;
}

const FilenameEditor = ({ touched, extension }: Props) => (
    <FormInputField
        name="name"
        touched={touched}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        }}
        sx={{
            '& .MuiInputBase-input': {
                paddingY: 0.4,
                paddingX: 0,
                fontSize: (theme: Theme) => theme.spacing(1.4),
            },
            minWidth: '60%',
        }}
        variant="standard"
        InputProps={{
            endAdornment: !extension ? undefined : (
                <InputAdornment position="end">
                    <Typography variant="regular">{extension}</Typography>
                </InputAdornment>
            ),
        }}
    />
);

export default FilenameEditor;
