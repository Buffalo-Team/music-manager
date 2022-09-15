import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { useCreateFolderMutation } from 'app/api/filesApiSlice';
import CreateDirectoryModal from 'pages/Home/components/CreateDirectory/CreateDirectoryModal';
import {
    CreateFolderRequestData,
    File as ItemFile,
    ResponseStatus,
} from 'types';

interface Props {
    onCreateSuccess: () => void;
    onCreateError: () => void;
    targetFolder?: ItemFile;
}

const CreateDirectory = ({
    onCreateSuccess,
    onCreateError,
    targetFolder,
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const [createFolder, { isLoading, isSuccess }] = useCreateFolderMutation();

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
                onCreateSuccess?.();
            } else {
                onCreateError?.();
            }
        } catch (error) {
            onCreateError?.();
        }
    };

    return (
        <Box>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
            >
                {t('files.createDirectory')}
            </Button>
            <CreateDirectoryModal
                open={open}
                onClose={handleCloseModal}
                onCreate={handleCreate}
                isLoading={isLoading}
                targetFolder={targetFolder}
            />
        </Box>
    );
};

export default CreateDirectory;
