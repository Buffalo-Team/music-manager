import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useLoginMutation, useSignUpMutation } from 'app/api/usersApiSlice';
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/User/userSlice';
import ModesNavigation from 'pages/Login/components/ModesNavigation';
import SignUp from 'pages/Login/components/SignUp';
import { ResponseStatus, SignInData, SignUpData } from 'types';
import SignIn from './components/SignIn';
import Styled from './Login.styled';
import PageMode from './PageMode';
import useSnackbarMessages from './useSnackbarMessages';

const Login = () => {
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<PageMode>(PageMode.SIGN_IN);
    const [login, { isLoading: isSignInLoading }] = useLoginMutation();
    const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
    const { t } = useTranslation();
    const { showSignInErrorMessage, showSignUpErrorMessage } =
        useSnackbarMessages();

    const handleSignIn = async (
        data: SignInData,
        { resetForm }: FormikHelpers<SignInData>
    ) => {
        try {
            const response = await login(data).unwrap();
            if (response.status === ResponseStatus.SUCCESS) {
                dispatch(setUser(response.user));
            } else {
                showSignInErrorMessage();
            }
        } catch (error) {
            showSignInErrorMessage();
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
                showSignUpErrorMessage();
            }
        } catch (error) {
            showSignUpErrorMessage();
        }
    };

    return (
        <Styled.LoginContainer>
            <Styled.PaperCard elevation={0}>
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
            </Styled.PaperCard>
            <ModesNavigation
                mode={mode}
                onSignInClick={() => setMode(PageMode.SIGN_IN)}
                onSignUpClick={() => setMode(PageMode.SIGN_UP)}
            />
        </Styled.LoginContainer>
    );
};

export default Login;
