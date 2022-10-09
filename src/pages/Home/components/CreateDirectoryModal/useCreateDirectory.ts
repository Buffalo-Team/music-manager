import { useEffect, useState } from 'react';
import {
    useCreateFolderMutation,
    useGetFilesByTargetIdQuery,
} from 'app/api/filesApiSlice';
import useSnackbarMessages from 'pages/Home/components/CreateDirectoryModal/useSnackbarMessages';
import {
    CreateFolderRequestData,
    File as ItemFile,
    ResponseStatus,
} from 'types';

interface Props {
    targetFolderId?: string;
    onRefetch: (files: ItemFile[]) => void;
}

const useCreateDirectory = ({ targetFolderId, onRefetch }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [createFolder, { isLoading, isSuccess }] = useCreateFolderMutation();
    const { data } = useGetFilesByTargetIdQuery({
        targetId: targetFolderId,
    });

    useEffect(() => {
        onRefetch(data?.files || []);
    }, [data]);

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
