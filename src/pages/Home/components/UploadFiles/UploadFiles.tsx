import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import UploadFileModal from 'pages/Home/components/UploadFiles/UploadFileModal';
import { File as ItemFile } from 'types';
import { useDropHandler } from '../Dropzone';

interface Props {
    onUploadSuccess: () => void;
    onUploadError: () => void;
    targetFolder?: ItemFile;
    songs: FileWithPath[];
    setSongs: Dispatch<SetStateAction<FileWithPath[]>>;
}

const UploadFiles = ({
    onUploadSuccess,
    onUploadError,
    targetFolder,
    songs,
    setSongs,
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const {
        handleUpload,
        handleRejection,
        requestState: { isLoading, isSuccess },
    } = useDropHandler({
        onUploadSuccess,
        onUploadError,
    });

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

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

    return (
        <Box>
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
                onReject={handleRejection}
                isLoading={isLoading}
                targetFolder={targetFolder}
                songs={songs}
                setSongs={setSongs}
            />
        </Box>
    );
};

export default UploadFiles;
