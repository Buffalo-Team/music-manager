import { styled } from '@mui/material';
import FormInputField from 'components/FormInputField';

const RowContentWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    flex: 2,
}));

const FormContent = styled('form')(() => ({
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
}));

const ItemActionsContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
}));

const FilenameEditorField = styled(FormInputField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        paddingBottom: theme.spacing(0.4),
        paddingTop: theme.spacing(0.4),
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: theme.spacing(1.4),
    },
    minWidth: '60%',
}));

const Styled = {
    RowContentWrapper,
    FormContent,
    ItemActionsContainer,
    FilenameEditorField,
};

export default Styled;
