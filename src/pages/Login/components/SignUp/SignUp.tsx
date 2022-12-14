import React from 'react';
import { Formik } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import { SignUpData } from 'types';
import FormStaticConfig from './FormStaticConfig';

interface Props extends WithTranslation {
    onSubmit: (values: SignUpData) => void;
    isLoading: boolean;
}

const SignUp = ({ onSubmit, isLoading, t }: Props) => (
    <Box sx={{ minWidth: (theme) => theme.spacing(30) }}>
        <Formik<SignUpData> {...FormStaticConfig} onSubmit={onSubmit}>
            {({ touched, handleSubmit, isValid }) => (
                <Box
                    onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        gap: 1,
                    }}
                >
                    <FormInputField
                        name="name"
                        touched={touched.name}
                        label={t('login.name')}
                        fullWidth
                        sx={{ marginBottom: 1 }}
                    />
                    <FormInputField
                        name="surname"
                        touched={touched.surname}
                        label={t('login.surname')}
                        fullWidth
                        sx={{ marginBottom: 1 }}
                    />
                    <FormInputField
                        name="email"
                        touched={touched.email}
                        label={t('Email')}
                        fullWidth
                        sx={{ marginBottom: 1 }}
                    />
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
                        {isLoading ? (
                            <Loader />
                        ) : (
                            t('login.signUp').toUpperCase()
                        )}
                    </Button>
                </Box>
            )}
        </Formik>
    </Box>
);

export default withTranslation()(SignUp);
