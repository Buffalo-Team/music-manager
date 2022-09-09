import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography } from '@mui/material';
import { useLoginMutation, useSignUpMutation } from 'app/api/usersApiSlice';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/User/userSlice';
import ModesNavigation from 'pages/Login/components/ModesNavigation';
import SignUp from 'pages/Login/components/SignUp';
import { ResponseStatus, SignInData, SignUpData } from 'types';
import SignIn from './components/SignIn';
import PageMode from './PageMode';

const Login = () => {
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<PageMode>(PageMode.SIGN_IN);
    const [login, { isLoading: isSignInLoading }] = useLoginMutation();
    const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
    const { t } = useTranslation();

    const onSignInError = () => {
        dispatch(
            openSnackbar({
                content: t('login.signInFailed'),
                severity: 'error',
            })
        );
    };

    const onSignUpError = () => {
        dispatch(
            openSnackbar({
                content: t('login.signUpFailed'),
                severity: 'error',
            })
        );
    };

    const handleSignIn = async (
        data: SignInData,
        { resetForm }: FormikHelpers<SignInData>
    ) => {
        try {
            const response = await login(data).unwrap();
            if (response.status === ResponseStatus.SUCCESS) {
                dispatch(setUser(response.user));
            } else {
                onSignInError();
            }
        } catch (error) {
            onSignInError();
        } finally {
            resetForm();
        }
    };

    const handleSignUp = async (data: SignUpData) => {
        try {
            const response = await signUp(data).unwrap();
            if (response.status === ResponseStatus.SUCCESS) {
                dispatch(setUser(response.user));
            } else {
                onSignUpError();
            }
        } catch (error) {
            onSignUpError();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                background: (theme) => theme.palette.background.secondary,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: (theme) => theme.spacing(4),
                    paddingX: (theme) => theme.spacing(5),
                    borderRadius: '5px',
                    border: (theme) =>
                        `1px solid ${theme.palette.border.neutral}`,
                }}
            >
                <Typography
                    variant="regular"
                    sx={{ marginBottom: (theme) => theme.spacing(2) }}
                >
                    {t('login.welcome')}
                </Typography>
                {mode === PageMode.SIGN_IN && (
                    <SignIn
                        onSubmit={handleSignIn}
                        isLoading={isSignInLoading}
                    />
                )}
                {mode === PageMode.SIGN_UP && (
                    <SignUp
                        onSubmit={handleSignUp}
                        isLoading={isSignUpLoading}
                    />
                )}
            </Paper>
            <ModesNavigation
                mode={mode}
                onSignInClick={() => setMode(PageMode.SIGN_IN)}
                onSignUpClick={() => setMode(PageMode.SIGN_UP)}
            />
        </Box>
    );
};

export default Login;
