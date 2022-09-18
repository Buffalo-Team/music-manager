import { styled, Paper } from '@mui/material';

const PaperCard = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(1.8)} ${theme.spacing(2)} ${theme.spacing(
        1.8
    )} ${theme.spacing(2)}`,
    height: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    ...(active
        ? {
              border: `1px solid ${theme.palette.primary.main}`,
          }
        : {}),
}));

const Styled = {
    PaperCard,
};

export default Styled;
