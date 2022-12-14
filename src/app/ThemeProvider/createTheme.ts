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
        accent: string;
    }
    interface TypeText {
        contrastText: string;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        small: true;
        regular: true;
        regularBold: true;
        medium: true;
        large: true;
        largeBold: true;
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
                color: theme.palette.text.primary,
            },
            regular: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(1.4),
                color: theme.palette.text.primary,
            },
            regularBold: {
                fontFamily: 'InterSemiBold',
                fontSize: theme.spacing(1.4),
                color: theme.palette.text.primary,
            },
            medium: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(1.6),
                color: theme.palette.text.primary,
            },
            large: {
                fontFamily: 'InterRegular',
                fontSize: theme.spacing(2),
                color: theme.palette.text.primary,
            },
            largeBold: {
                fontFamily: 'InterSemiBold',
                fontSize: theme.spacing(2),
                color: theme.palette.text.primary,
            },
        },
    });

const createTheme = (mode: PaletteMode = 'dark') => {
    const theme = makeThemeTypography(makeThemeBasics(mode));
    return createThemeMUI(theme, {
        components: {
            MuiTypography: {
                styleOverrides: {
                    regular: {
                        lineHeight: theme.spacing(1.4),
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        minWidth: theme.spacing(15),
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
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        background: theme.palette.background.primary,
                        minWidth: theme.spacing(20),
                    },
                    action: {
                        paddingTop: '2px',
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        padding: 0,
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: theme.spacing(3.5),
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        paddingLeft: 0,
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        paddingLeft: 0,
                    },
                },
            },
            MuiBreadcrumbs: {
                styleOverrides: {
                    li: {
                        color: theme.palette.grey[200],
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        fontFamily: 'InterRegular',
                    },
                },
            },
        },
    });
};

export default createTheme;
