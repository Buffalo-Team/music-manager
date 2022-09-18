import { FileRejection } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useUploadFilesMutation } from 'app/api/filesApiSlice';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import { ResponseStatus } from 'types';

interface Props {
    onUploadSuccess?: () => void;
    onUploadError?: () => void;
}

const useUploadHandler = ({ onUploadSuccess, onUploadError }: Props = {}) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [uploadFiles, requestState] = useUploadFilesMutation();

    const handleUpload = async ({
        targetId,
        songs,
    }: {
        targetId?: string;
        songs: File[];
    }) => {
        if (!songs?.length) {
            return;
        }
        const body = new FormData();
        body.append('isPrivate', 'true'); //TODO: change once the param handling is implemented
        songs.forEach((song) => body.append('songs', song));
        try {
            const response = await uploadFiles({ targetId, body }).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                onUploadSuccess?.();
            } else {
                onUploadError?.();
            }
        } catch (error) {
            onUploadError?.();
        }
    };

    const handleRejection = (files: FileRejection[]) => {
        if (!files.length) {
            return;
        }
        dispatch(
            openSnackbar({
                content: t('files.numberOfRejectedFiles', {
                    count: files.length,
                }),
                severity: 'warning',
            })
        );
    };

    return { handleUpload, handleRejection, requestState };
};

export default useUploadHandler;
