import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    PaletteMode,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store';
import { setTheme } from 'app/ThemeProvider/themeSlice';

const Theme = () => {
    const dispatch = useAppDispatch();
    const { mode, supportedModes } = useAppSelector(({ theme }) => theme);
    const { t } = useTranslation();
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: PaletteMode
    ) => {
        dispatch(setTheme(newMode));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography variant="largeBold" sx={{ marginBottom: 3 }}>
                {t('settings.theme.label')}
            </Typography>
            <ToggleButtonGroup
                color="primary"
                value={mode}
                exclusive
                onChange={handleChange}
                sx={{
                    border: (theme) =>
                        `1px solid ${theme.palette.border.neutral}`,
                    height: (theme) => theme.spacing(5.6),
                }}
            >
                {supportedModes.map((i) => (
                    <ToggleButton key={i} value={i} sx={{ flex: 1 }}>
                        <Typography
                            variant="regularBold"
                            sx={{
                                ...(mode === i && {
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                }),
                            }}
                        >
                            {t(`settings.theme.names.${i}`)}
                        </Typography>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

export default Theme;
