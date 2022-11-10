import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useUpdateUserMutation } from 'app/api/usersApiSlice';
import { useAppSelector } from 'app/store';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader/Loader';
import FormStaticConfig from 'pages/User/Password/FormStaticConfig';
import useSnackbarMessages from 'pages/User/useSnackbarMessages';
import { ResponseStatus } from 'types';

interface PasswordData {
    password: string;
    passwordConfirm: string;
}

const Password = () => {
    const { t } = useTranslation();
    const user = useAppSelector(({ user: { user } }) => user);
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const { showUpdateSuccessMessage, showUpdateErrorMessage } =
        useSnackbarMessages();

    const handleSubmit = async (values: PasswordData) => {
        const data = {
            id: user?.id || '',
            ...values,
        };
        try {
            const response = await updateUser(data).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showUpdateSuccessMessage();
            } else {
                showUpdateErrorMessage();
            }
        } catch (error) {
            showUpdateErrorMessage();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography variant="largeBold" sx={{ marginBottom: 3 }}>
                {t('settings.password.label')}
            </Typography>
            <Formik<PasswordData> {...FormStaticConfig} onSubmit={handleSubmit}>
                {({ touched, handleSubmit, isValid }) => (
                    <Box
                        onSubmit={handleSubmit}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
                        <FormInputField
                            name="password"
                            touched={touched.password}
                            label={t('login.password')}
                            type="password"
                            sx={{ marginBottom: 1 }}
                        />
                        <FormInputField
                            name="passwordConfirm"
                            touched={touched.passwordConfirm}
                            label={t('login.confirmPassword')}
                            type="password"
                            sx={{ marginBottom: 1 }}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isLoading || !isValid}
                        >
                            {isLoading ? <Loader /> : t('save').toUpperCase()}
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    );
};

export default Password;
