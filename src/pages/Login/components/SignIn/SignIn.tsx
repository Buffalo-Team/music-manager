import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import { SignInData } from 'types';
import FormStaticConfig from './FormStaticConfig';

interface Props extends WithTranslation {
    onSubmit: (values: SignInData, helpers: FormikHelpers<SignInData>) => void;
    isLoading: boolean;
}

const SignIn = ({ onSubmit, isLoading, t }: Props) => (
    <Box sx={{ minWidth: (theme) => theme.spacing(30) }}>
        <Formik<SignInData> {...FormStaticConfig} onSubmit={onSubmit}>
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
                        id="email"
                        name="email"
                        touched={touched.email}
                        label={t('login.email')}
                        fullWidth
                        sx={{ marginBottom: 1 }}
                    />
                    <FormInputField
                        id="password"
                        name="password"
                        touched={touched.password}
                        label={t('login.password')}
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
                            t('login.signIn').toUpperCase()
                        )}
                    </Button>
                    <Typography
                        variant="small"
                        sx={{
                            textAlign: 'right',
                            color: (theme) => theme.palette.grey[100],
                        }}
                    >
                        {t('login.forgotPassword')}
                    </Typography>
                </Box>
            )}
        </Formik>
    </Box>
);

export default withTranslation()(SignIn);
