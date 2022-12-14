import React from 'react';
import {
    Field,
    ErrorMessage as FormikErrorMessage,
    FieldAttributes,
    FieldProps,
} from 'formik';
import { Box, SxProps, TextField, Theme } from '@mui/material';
import ErrorMessage from './ErrorMessage';

interface Props {
    sx: SxProps<Theme>;
}

const FormInputField = ({
    name,
    touched,
    inputProps,
    sx,
    className,
    ...rest
}: FieldAttributes<any> & Props) => (
    <Box sx={sx} className={className}>
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <TextField
                    inputProps={{ ...field, ...inputProps }}
                    sx={{ display: 'flex', flex: 1 }}
                    error={touched && !!meta.error}
                    value={meta.value}
                    {...rest}
                />
            )}
        </Field>
        {touched && (
            <FormikErrorMessage
                name={name}
                component={(props) => <ErrorMessage {...props} />}
            />
        )}
    </Box>
);

export default FormInputField;
