import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const showDirectoryCreationSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('files.directoryCreated') }));
    };
    const showDirectoryCreationErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('files.creatingDirectoryFailed'),
                severity: 'error',
            })
        );
    };
    return {
        showDirectoryCreationErrorMessage,
        showDirectoryCreationSuccessMessage,
    };
};

export default useSnackbarMessages;
