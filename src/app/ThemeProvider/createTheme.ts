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
            fontFamily: 'InterRegular',
            fontSize: theme.spacing(1.4),
        },
    });

const createTheme = (mode: PaletteMode = 'dark') => {
    const theme = makeThemeTypography(makeThemeBasics(mode));
    return createThemeMUI(theme, {
        components: {},
    });
};

export default createTheme;
