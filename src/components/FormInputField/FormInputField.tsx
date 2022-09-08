import React from 'react';
import {
    Field,
    ErrorMessage as FormikErrorMessage,
    FieldAttributes,
    FieldProps,
} from 'formik';
import { Box, TextField } from '@mui/material';
import ErrorMessage from './ErrorMessage';

const FormInputField = ({
    name,
    touched,
    inputProps,
    ...rest
}: FieldAttributes<any>) => (
    <Box sx={{ marginBottom: 1 }}>
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <TextField
                    inputProps={{ ...field, ...inputProps }}
                    sx={{ display: 'flex', flex: 1 }}
                    error={touched && !!meta.error}
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
