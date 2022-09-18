import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import {
    useCreateFolderMutation,
    useGetAllFilesQuery,
} from 'app/api/filesApiSlice';
import {
    CreateFolderRequestData,
    File as ItemFile,
    ResponseStatus,
} from 'types';
import CreateDirectoryModal from './CreateDirectoryModal';
import useSnackbarMessages from './useSnackbarMessages';

interface Props {
    targetFolder?: ItemFile;
}

const CreateDirectory = ({ targetFolder }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const [createFolder, { isLoading, isSuccess }] = useCreateFolderMutation();
    const { refetch: refetchFiles } = useGetAllFilesQuery();
    const {
        showDirectoryCreationSuccessMessage,
        showDirectoryCreationErrorMessage,
    } = useSnackbarMessages();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    useEffect(() => {
        if (isSuccess) {
            handleCloseModal();
        }
    }, [isSuccess]);

    const handleCreate = async ({
        name,
        isPrivate,
    }: CreateFolderRequestData) => {
        try {
            const response = await createFolder({
                targetId: targetFolder?.id,
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

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
            >
                {t('files.createDirectory')}
            </Button>
            <CreateDirectoryModal
                title={t('files.createDirectory')}
                open={open}
                onClose={handleCloseModal}
                onCreate={handleCreate}
                isLoading={isLoading}
                targetFolder={targetFolder}
            />
        </>
    );
};

export default CreateDirectory;
