import { useState, MouseEvent, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import MobileActions from 'pages/Home/components/Actions/MobileActions';
import UploadFilesModal from 'pages/Home/components/UploadFilesModal';
import useUploadFiles from 'pages/Home/components/UploadFilesModal/useUploadFiles';
import { File as ItemFile } from 'types';
import CreateDirectoryModal, {
    useCreateDirectory,
} from '../CreateDirectoryModal';

interface Props {
    targetFolder?: ItemFile;
    onRefetch: (files: ItemFile[]) => void;
}

const Actions = ({ targetFolder, onRefetch }: Props) => {
    const [speedDialOpen, setSpeedDialOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const createDirectoryActions = useCreateDirectory({
        targetFolderId: targetFolder?.id,
        onRefetch,
    });
    const uploadFilesActions = useUploadFiles({
        targetFolderId: targetFolder?.id,
        onRefetch,
    });

    const onActionClick =
        (handleAction: () => void) => (e: MouseEvent<HTMLDivElement>) => {
            handleAction();
            setSpeedDialOpen(false);
            e.stopPropagation();
        };

    const handleClose = (e: SyntheticEvent<{}>, reason: string) => {
        if (reason !== 'mouseLeave') {
            setSpeedDialOpen(false);
            e.stopPropagation();
        }
    };

    return (
        <>
            {isMobile ? (
                <MobileActions
                    open={speedDialOpen}
                    onClose={handleClose}
                    onSpeedDialClick={() => setSpeedDialOpen((prev) => !prev)}
                    onFolderClick={onActionClick(
                        createDirectoryActions.openModal
                    )}
                    onFileClick={onActionClick(uploadFilesActions.openModal)}
                />
            ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={createDirectoryActions.openModal}
                    >
                        {t('files.createDirectory')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={uploadFilesActions.openModal}
                    >
                        {t('files.upload')}
                    </Button>
                </Box>
            )}
            <CreateDirectoryModal
                title={t('files.createDirectory')}
                open={createDirectoryActions.modalOpen}
                onClose={createDirectoryActions.closeModal}
                onCreate={createDirectoryActions.handleCreate}
                isLoading={createDirectoryActions.isLoading}
                targetFolder={targetFolder}
            />
            <UploadFilesModal
                open={uploadFilesActions.modalOpen}
                onClose={uploadFilesActions.closeModal}
                onUpload={uploadFilesActions.handleSubmit}
                onDelete={uploadFilesActions.handleDelete}
                onDrop={uploadFilesActions.handleDrop}
                isLoading={uploadFilesActions.isLoading}
                targetFolder={targetFolder}
                songs={uploadFilesActions.songs}
            />
        </>
    );
};

export default Actions;
