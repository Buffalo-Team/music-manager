import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import { SignUpData } from 'types';
import FormStaticConfig from './FormStaticConfig';

interface Props {
    onSubmit: (values: SignUpData) => void;
    isLoading: boolean;
}

const SignUp = ({ onSubmit, isLoading }: Props) => {
    const { t } = useTranslation();
    return (
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
                        />
                        <FormInputField
                            name="surname"
                            touched={touched.surname}
                            label={t('login.surname')}
                            fullWidth
                        />
                        <FormInputField
                            name="email"
                            touched={touched.email}
                            label={t('Email')}
                            fullWidth
                        />
                        <FormInputField
                            name="password"
                            touched={touched.password}
                            label={t('login.password')}
                            type="password"
                        />
                        <FormInputField
                            name="passwordConfirm"
                            touched={touched.passwordConfirm}
                            label={t('login.confirmPassword')}
                            type="password"
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isLoading || !isValid}
                        >
                            {isLoading ? <Loader /> : t('login.signUp').toUpperCase()}
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    );
};

export default SignUp;
