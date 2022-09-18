import { useEffect, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useGetAllFilesQuery } from 'app/api/filesApiSlice';
import UploadFileModal from 'pages/Home/components/UploadFiles/UploadFileModal';
import { File as ItemFile } from 'types';
import { useUploadHandler } from '../Dropzone';
import useSnackbarMessages from '../FilesList/useSnackbarMessages';

interface Props {
    targetFolder?: ItemFile;
}

const UploadFiles = ({ targetFolder }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [songs, setSongs] = useState<FileWithPath[]>([]);
    const { t } = useTranslation();
    const { refetch: refetchFiles } = useGetAllFilesQuery();
    const { showUploadSuccessMessage, showUploadErrorMessage } =
        useSnackbarMessages();

    const onUploadSuccess = () => {
        showUploadSuccessMessage();
        refetchFiles();
        setSongs([]);
    };

    const {
        handleUpload,
        handleRejection,
        requestState: { isLoading, isSuccess },
    } = useUploadHandler({
        onUploadSuccess,
        onUploadError: showUploadErrorMessage,
    });

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => {
        setOpen(false);
        setSongs([]);
    };

    useEffect(() => {
        if (isSuccess) {
            handleCloseModal();
        }
    }, [isSuccess]);

    const handleSubmit = (songs: File[]) =>
        handleUpload({
            targetId: targetFolder?.id,
            songs,
        });

    const handleDelete = (song: FileWithPath) => {
        setSongs((prevSongs) => prevSongs.filter((i) => i.path !== song.path));
    };

    const handleDrop = (
        acceptedFiles: File[],
        fileRejections: FileRejection[]
    ) => {
        setSongs((prev) => {
            const filesToAdd = acceptedFiles.filter(
                (file) =>
                    !prev.some(
                        (i) => i.name === file.name && i.type === file.type
                    )
            );
            return [...prev, ...filesToAdd];
        });
        handleRejection(fileRejections);
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
            >
                {t('files.upload')}
            </Button>
            <UploadFileModal
                open={open}
                onClose={handleCloseModal}
                onUpload={handleSubmit}
                onDelete={handleDelete}
                onDrop={handleDrop}
                isLoading={isLoading}
                targetFolder={targetFolder}
                songs={songs}
            />
        </>
    );
};

export default UploadFiles;
