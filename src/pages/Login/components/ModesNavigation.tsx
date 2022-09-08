import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import PageMode from '../PageMode';

interface Props {
    mode: PageMode;
    onSignInClick: () => void;
    onSignUpClick: () => void;
}

const ModesNavigation = ({ mode, onSignInClick, onSignUpClick }: Props) => {
    const { t } = useTranslation();
    const isSignIn = mode === PageMode.SIGN_IN;
    return (
        <Typography
            variant="small"
            sx={{
                color: (theme) => theme.palette.text.secondary,
                marginTop: 1,
            }}
        >
            <Trans
                t={t}
                i18nKey={isSignIn ? 'login.dontHaveAccount' : 'login.alreadyHaveAccount'}
                components={[
                    <Box
                        component="span"
                        key={0}
                        onClick={isSignIn ? onSignUpClick : onSignInClick}
                        sx={{
                            color: (theme) => theme.palette.primary.main,
                            fontWeight: 700,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    />,
                ]}
            />
        </Typography>
    );
};

export default ModesNavigation;
