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
        dispatch(
            openSnackbar({
                content: t('devices.deviceDeleteFailed'),
                severity: 'error',
            })
        );
    };
    const showDeviceMarkingUpToDateSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('devices.deviceMarkedUpToDate') }));
    };
    const showDeviceMarkingUpToDateErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('devices.deviceMarkingUpToDateFailed'),
                severity: 'error',
            })
        );
    };
    const showDownloadErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('devices.downloadingMissingFilesFailed'),
                severity: 'error',
            })
        );
    };
    return {
        showDeviceRemovalSuccessMessage,
        showDeviceRemovalErrorMessage,
        showDeviceMarkingUpToDateSuccessMessage,
        showDeviceMarkingUpToDateErrorMessage,
        showDownloadErrorMessage,
    };
};

export default useSnackbarMessages;
