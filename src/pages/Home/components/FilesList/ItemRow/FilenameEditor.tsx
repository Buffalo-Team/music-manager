import React, { MouseEvent } from 'react';
import { InputAdornment, Typography } from '@mui/material';
import Styled from './ItemRow.styled';

interface Props {
    touched?: boolean;
    extension: string;
}

const FilenameEditor = ({ touched, extension }: Props) => (
    <Styled.FilenameEditorField
        name="name"
        touched={touched}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
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
