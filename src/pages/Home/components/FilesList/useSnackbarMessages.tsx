import { useTranslation } from 'react-i18next';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import { File } from 'types';

const useSnackbarMessages = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const showUploadSuccessMessage = () => {
        dispatch(openSnackbar({ content: t('files.filesUploaded') }));
    };
    const showUploadErrorMessage = () => {
        dispatch(
            openSnackbar({
                content: t('files.uploadingFilesFailed'),
                severity: 'error',
            })
        );
    };
    const showItemRemovalSuccessMessage = (item: File) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.directoryDeleted')
                    : t('files.fileDeleted'),
            })
        );
    };
    const showItemRemovalErrorMessage = (item: File) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.deletingDirectoryFailed')
                    : t('files.deletingFileFailed'),
                severity: 'error',
            })
        );
    };
    const showItemUpdateSuccessMessage = (item: File) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.directoryUpdated')
                    : t('files.fileUpdated'),
            })
        );
    };
    const showItemUpdateErrorMessage = (item: File) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.updatingDirectoryFailed')
                    : t('files.updatingFileFailed'),
                severity: 'error',
            })
        );
    };
    return {
        showItemUpdateErrorMessage,
        showItemUpdateSuccessMessage,
        showItemRemovalErrorMessage,
        showItemRemovalSuccessMessage,
        showUploadErrorMessage,
        showUploadSuccessMessage,
    };
};

export default useSnackbarMessages;
