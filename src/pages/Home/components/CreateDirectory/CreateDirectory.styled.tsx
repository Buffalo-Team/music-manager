import { styled } from '@mui/material';

const ModalContentContainer = styled('div')(() => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
}));

const Form = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 2,
}));

const Styled = {
    ModalContentContainer,
    Form,
};

export default Styled;
