import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const showDeviceRemovalSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('devices.deviceDeleted') }));
    };
    const showDeviceRemovalErrorMessage = () => {
        dispatch(openSnackbar({ content: t('devices.deviceDeleteFailed') }));
    };
    return {
        showDeviceRemovalSuccessMessage,
        showDeviceRemovalErrorMessage,
    };
};

export default useSnackbarMessages;
