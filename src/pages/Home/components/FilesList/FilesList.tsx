import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box, List } from '@mui/material';
import { useGetAllFilesQuery } from 'app/api/filesApiSlice';
import { useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import useConfirmationModal from 'hooks/useConfirmationModal';
import { File as ItemFile, ItemRowType, UpdateFileRequestData } from 'types';
import Dropzone, { useUploadHandler } from '../Dropzone';
import CurrentLevel from './CurrentLevel';
import EmptyDirectory from './EmptyDirectory';
import filterFilesByParentId from './filterFilesByParentId';
import ItemRow from './ItemRow';
import useDeleteFile from './useDeleteFile';
import useSnackbarMessages from './useSnackbarMessages';
import useUpdateFile from './useUpdateFile';

interface Props {
    onFolderSelect: (item: ItemFile) => void;
    targetFolder?: ItemFile;
}

const FilesList = ({ onFolderSelect, targetFolder }: Props) => {
    const { t } = useTranslation();
    const { openModal, closeModal } = useConfirmationModal();
    const files = useAppSelector(({ files }) => files);
    const [currentLevelFiles, setCurrentLevelFiles] = useState<CurrentLevel>(
        {}
    );
    const { refetch: refetchFiles } = useGetAllFilesQuery();
    const {
        showItemUpdateErrorMessage,
        showItemUpdateSuccessMessage,
        showItemRemovalErrorMessage,
        showItemRemovalSuccessMessage,
        showUploadErrorMessage,
        showUploadSuccessMessage,
    } = useSnackbarMessages();

    const onUploadSuccess = () => {
        showUploadSuccessMessage();
        refetchFiles();
    };

    const onDeleteSuccess = (item: ItemFile) => {
        showItemRemovalSuccessMessage(item);
        refetchFiles();
        closeModal();
    };

    const onUpdateSuccess = (item: ItemFile) => {
        showItemUpdateSuccessMessage(item);
        refetchFiles();
    };

    const {
        handleUpload,
        handleRejection,
        requestState: { isLoading },
    } = useUploadHandler({
        onUploadSuccess,
        onUploadError: showUploadErrorMessage,
    });

    const {
        handleDelete,
        requestState: { isLoading: isDeleting },
    } = useDeleteFile({
        onDeleteSuccess,
        onDeleteError: showItemRemovalErrorMessage,
    });

    const {
        handleUpdate,
        requestState: { isLoading: isUpdating },
    } = useUpdateFile({
        onUpdateSuccess,
        onUpdateError: showItemUpdateErrorMessage,
    });

    useEffect(() => {
        setCurrentLevelFiles(filterFilesByParentId(files, targetFolder?.id));
    }, [files, targetFolder]);

    const handleFolderSelect = (item: ItemFile) => {
        setCurrentLevelFiles(filterFilesByParentId(files, item.id));
        onFolderSelect(item);
    };

    const handleDrop =
        (targetFolder?: ItemFile) =>
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            handleUpload({
                targetId: targetFolder?.id,
                songs: acceptedFiles,
            });
            handleRejection(fileRejections);
        };

    const handleDeleteClick = (item: ItemFile) => {
        openModal({
            message: t('areYouSure'),
            onConfirm: () => handleDelete(item),
        });
    };

    const handleEdit = ({
        item,
        values,
    }: {
        item: ItemFile;
        values: UpdateFileRequestData;
    }) => {
        handleUpdate({ item, values });
    };

    const isDirectoryEmpty =
        !currentLevelFiles.folders?.length && !currentLevelFiles.files?.length;

    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            {(isLoading || isDeleting || isUpdating) && <Loader overlap />}
            <List
                dense
                sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
                {currentLevelFiles.folders?.map((item) => (
                    <Dropzone key={item.id} onDrop={handleDrop(item)}>
                        <ItemRow
                            type={ItemRowType.FOLDER}
                            item={item}
                            onClick={() => handleFolderSelect(item)}
                            onDelete={() => handleDeleteClick(item)}
                            onEdit={(values) => handleEdit({ item, values })}
                            isLoading={isUpdating}
                        />
                    </Dropzone>
                ))}
                <Dropzone
                    onDrop={handleDrop(targetFolder)}
                    sxProvider={() => ({
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    })}
                >
                    {isDirectoryEmpty && <EmptyDirectory />}
                    {currentLevelFiles.files?.map((item) => (
                        <ItemRow
                            key={item.id}
                            type={ItemRowType.FILE}
                            item={item}
                            onDelete={() => handleDeleteClick(item)}
                            onEdit={(values) => handleEdit({ item, values })}
                            isLoading={isUpdating}
                        />
                    ))}
                </Dropzone>
            </List>
        </Box>
    );
};

export default FilesList;
