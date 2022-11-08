import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const showUpdateSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('settings.updateSuccess') }));
    };
    const showUpdateErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('settings.updateFailed'),
                severity: 'error',
            })
        );
    };
    return {
        showUpdateSuccessMessage,
        showUpdateErrorMessage,
    };
};

export default useSnackbarMessages;
