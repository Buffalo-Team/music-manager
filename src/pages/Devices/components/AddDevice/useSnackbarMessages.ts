import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const showAddDeviceSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('devices.newDeviceAdded') }));
    };
    const showAddDeviceErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('devices.addingDeviceFailed'),
                severity: 'error',
            })
        );
    };
    return {
        showAddDeviceSuccessMessage,
        showAddDeviceErrorMessage,
    };
};

export default useSnackbarMessages;
