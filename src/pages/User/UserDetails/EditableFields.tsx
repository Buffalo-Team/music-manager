import React, { ReactNode, useState } from 'react';
import { Formik, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Box, InputProps } from '@mui/material';
import FormInputField from 'components/FormInputField';
import IconButton from 'components/IconButton';
import useHover from 'hooks/useHover';

interface Props<T> {
    fields: {
        name: string;
        value?: string;
        InputProps?: InputProps;
    }[];
    loading: boolean;
    onUpdate: (data: T, onSuccess: () => void) => void;
    children: (value?: string) => ReactNode;
}

const EditableFields = <T extends FormikValues>({
    fields,
    onUpdate,
    loading,
    children,
}: Props<T>) => {
    const [ref, isHovering] = useHover<HTMLDivElement>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const { t } = useTranslation();

    const toggleEditMode = () => setEditMode((prev) => !prev);

    const handleSubmit = (data: T) => {
        if (editMode) {
            onUpdate(data, toggleEditMode);
        } else {
            toggleEditMode();
        }
    };

    const initialValues = fields.reduce(
        (result, { name, value }) => ({ ...result, [name]: value }),
        {} as T
    );
    const initialErrors = fields.reduce(
        (result, { name }) => ({ ...result, [name]: '' }),
        {} as T
    );
    const validationSchema = Yup.object().shape(
        fields.reduce(
            (result, { name }) => ({
                ...result,
                [name]: Yup.string().required(t('fieldRequired')),
            }),
            {}
        )
    );

    return (
        <Box ref={ref}>
            <Formik<T>
                initialValues={initialValues}
                initialErrors={initialErrors}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {({ touched, handleSubmit, isValid, resetForm }) => (
                    <Box
                        onSubmit={handleSubmit}
                        component="form"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: (theme) => theme.spacing(1),
                        }}
                    >
                        {fields.map(({ name, value, InputProps }) =>
                            !editMode ? (
                                children(value)
                            ) : (
                                <FormInputField
                                    key={name}
                                    name={name}
                                    touched={touched}
                                    variant="standard"
                                    InputProps={InputProps}
                                />
                            )
                        )}
                        {isHovering && !editMode && (
                            <IconButton onClick={toggleEditMode}>
                                <EditIcon
                                    sx={{
                                        height: (theme) => theme.spacing(1.6),
                                        width: (theme) => theme.spacing(1.6),
                                    }}
                                />
                            </IconButton>
                        )}
                        {editMode && (
                            <>
                                <IconButton
                                    type="submit"
                                    disabled={loading || !isValid}
                                >
                                    <CheckCircleIcon
                                        sx={{
                                            height: (theme) =>
                                                theme.spacing(1.6),
                                            width: (theme) =>
                                                theme.spacing(1.6),
                                        }}
                                    />
                                </IconButton>
                                <IconButton onClick={toggleEditMode}>
                                    <CancelIcon
                                        sx={{
                                            height: (theme) =>
                                                theme.spacing(1.6),
                                            width: (theme) =>
                                                theme.spacing(1.6),
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </Box>
                )}
            </Formik>
        </Box>
    );
};

export default EditableFields;
