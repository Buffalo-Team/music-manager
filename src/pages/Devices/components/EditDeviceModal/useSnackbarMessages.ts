import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const showEditDeviceSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('devices.deviceUpdated') }));
    };
    const showEditDeviceErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('devices.updatingDeviceFailed'),
                severity: 'error',
            })
        );
    };
    return {
        showEditDeviceSuccessMessage,
        showEditDeviceErrorMessage,
    };
};

export default useSnackbarMessages;
