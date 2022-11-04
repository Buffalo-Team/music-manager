import { styled } from '@mui/material';

const Divider = styled('hr')(({ theme }) => ({
    margin: `${theme.spacing(2)} 0`,
    width: '100%',
    height: '1px',
    background: theme.palette.border.neutral,
    border: 0,
}));

const Styled = {
    Divider,
};

export default Styled;
