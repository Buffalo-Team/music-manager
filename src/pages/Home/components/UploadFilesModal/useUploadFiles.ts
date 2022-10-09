import { useEffect, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';
import { useUploadHandler } from 'pages/Home/components/Dropzone';
import useSnackbarMessages from '../FilesList/useSnackbarMessages';

interface Props {
    targetFolderId?: string;
}

const useUploadFiles = ({ targetFolderId }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [songs, setSongs] = useState<FileWithPath[]>([]);

    const { showUploadSuccessMessage, showUploadErrorMessage } =
        useSnackbarMessages();

    const onUploadSuccess = () => {
        showUploadSuccessMessage();
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

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setSongs([]);
    };

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess]);

    const handleSubmit = (songs: File[]) =>
        handleUpload({
            targetId: targetFolderId,
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

    return {
        songs,
        modalOpen,
        openModal,
        closeModal,
        handleSubmit,
        handleDelete,
        handleDrop,
        isLoading,
    };
};

export default useUploadFiles;
