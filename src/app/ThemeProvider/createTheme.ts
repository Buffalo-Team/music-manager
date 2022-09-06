import { PaletteMode } from '@mui/material';
import { createTheme as createThemeMUI } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';
import { dark, light, ThemeType } from './modes';

declare module '@mui/material/styles' {
    interface PaletteOptions extends Partial<ThemeType> {}
    interface Palette extends ThemeType {}
    interface TypeBackground {
        primary: string;
        secondary: string;
    }
    interface TypeText {
        contrastText: string;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        small: true;
        regular: true;
        medium: true;
        large: true;
    }
}

const makeThemeBasics = (mode: PaletteMode) =>
    createThemeMUI({
        spacing: 10,
        palette: {
            mode,
            ...(mode === 'light' ? light : dark),
        },
    });

const makeThemeTypography = (theme: Theme) =>
    createThemeMUI(theme, {
        typography: {
            small: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(1.2),
            },
            regular: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(1.4),
            },
            medium: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(1.6),
            },
            large: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(2),
            },
        },
    });

const createTheme = (mode: PaletteMode = 'dark') => {
    const theme = makeThemeTypography(makeThemeBasics(mode));
    return createThemeMUI(theme, {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        minWidth: theme.spacing(15),
                    },
                },
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    root: {
                        display: 'flex',
                        justifyContent: 'space-between',
                    },
                    grouped: {
                        '&:not(:last-of-type)': {
                            borderRadius: '50%',
                        },
                        '&:not(:first-of-type)': {
                            borderRadius: '50%',
                        },
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        border: 0,
                        '&.Mui-selected': {
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                                background: theme.palette.primary.main,
                            },
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    elevation0: {
                        border: `1px solid ${theme.palette.border.neutral}`,
                    },
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        height: '14px',
                        borderRadius: '5px',
                    },
                },
            },
        },
    });
};

export default createTheme;
