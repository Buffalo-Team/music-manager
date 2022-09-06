import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useLoginMutation } from 'app/api/usersApiSlice';
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/User/userSlice';
import Loader from 'components/Loader';

const Login = () => {
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { t } = useTranslation();

    const handleLogin = async () => {
        const response = await login({
            email,
            password,
        }).unwrap();
        dispatch(setUser(response.user));
    };

    return (
        <Box
            sx={{
                display: 'flex',
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
                    {t('LoginWelcome')}
                </Typography>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label={t('Email')}
                    sx={{
                        marginTop: (theme) => theme.spacing(2),
                        minWidth: (theme) => theme.spacing(25),
                    }}
                    disabled={isLoading}
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label={t('Password')}
                    type="password"
                    autoComplete="current-password"
                    sx={{
                        marginTop: (theme) => theme.spacing(2),
                        minWidth: (theme) => theme.spacing(25),
                    }}
                    disabled={isLoading}
                />
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                    disabled={isLoading}
                    color="primary"
                >
                    {isLoading ? <Loader /> : t('Login').toUpperCase()}
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;
