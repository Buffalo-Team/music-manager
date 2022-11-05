import { styled } from '@mui/material';

const Container = styled('div', {
    shouldForwardProp: (prop: string) => !['open', 'embedded'].includes(prop),
})<{ open: boolean; embedded?: boolean }>(({ theme, open, embedded }) => ({
    ...(!embedded && {
        position: 'absolute',
        left: 0,
        right: 0,
        pointerEvents: 'none',
    }),
    bottom: theme.spacing(3),
    display: open ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const WidgetRoot = styled('div', {
    shouldForwardProp: (prop: string) => !['embedded'].includes(prop),
})<{ embedded?: boolean }>(({ theme, embedded }) => ({
    width: '100%',
    ...(!embedded && {
        width: theme.spacing(50),
        boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.1)',
        background: theme.palette.background.primary,
        padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(
            2
        )} ${theme.spacing(2)}`,
        borderRadius: 5,
        pointerEvents: 'auto',
    }),
}));

const Controls = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
}));

const Styled = {
    Container,
    WidgetRoot,
    Controls,
};

export default Styled;
