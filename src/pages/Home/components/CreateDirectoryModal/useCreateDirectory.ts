import { useEffect, useState } from 'react';
import {
    useCreateFolderMutation,
    useGetAllFilesQuery,
} from 'app/api/filesApiSlice';
import useSnackbarMessages from 'pages/Home/components/CreateDirectoryModal/useSnackbarMessages';
import { CreateFolderRequestData, ResponseStatus } from 'types';

interface Props {
    targetFolderId?: string;
}

const useCreateDirectory = ({ targetFolderId }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [createFolder, { isLoading, isSuccess }] = useCreateFolderMutation();
    const { refetch: refetchFiles } = useGetAllFilesQuery();
    const {
        showDirectoryCreationSuccessMessage,
        showDirectoryCreationErrorMessage,
    } = useSnackbarMessages();

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess]);

    const handleCreate = async ({
        name,
        isPrivate,
    }: CreateFolderRequestData) => {
        try {
            const response = await createFolder({
                targetId: targetFolderId,
                name,
                isPrivate,
            }).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showDirectoryCreationSuccessMessage();
                refetchFiles();
            } else {
                showDirectoryCreationErrorMessage();
            }
        } catch (error) {
            showDirectoryCreationErrorMessage();
        }
    };

    return {
        modalOpen,
        handleCreate,
        isLoading,
        openModal,
        closeModal,
    };
};

export default useCreateDirectory;
