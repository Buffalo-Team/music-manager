import { styled } from '@mui/material';

const ActionPanelContentContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
}));

const ActionPanelContentTopWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(2.5),
}));

const ActionPanelContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        minWidth: '70vw',
    },
    [theme.breakpoints.up('sm')]: {
        minWidth: '40vw',
    },
    [theme.breakpoints.up('md')]: {
        minWidth: '20vw',
    },
    padding: `${theme.spacing(3.5)}`,
    flex: 1,
}));

const ActionPanelContentBottomActionsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(2.5),
}));

const Styled = {
    ActionPanelContentContainer,
    ActionPanelContentTopWrapper,
    ActionPanelContentBottomActionsWrapper,
    ActionPanelContainer,
};

export default Styled;
