import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box, List } from '@mui/material';
import { useGetFilesByTargetIdQuery } from 'app/api/filesApiSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import {
    pause,
    play,
    setFiles,
} from 'components/MusicPlayer/store/musicPlayerSlice';
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
    onRefetch: (files: ItemFile[]) => void;
}

const FilesList = ({ onFolderSelect, targetFolder, onRefetch }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { openModal, closeModal } = useConfirmationModal();
    const files = useAppSelector(({ files }) => files);
    const { playing, current } = useAppSelector(
        ({ musicPlayer }) => musicPlayer
    );
    const [currentLevelFiles, setCurrentLevelFiles] = useState<CurrentLevel>(
        {}
    );
    const { data, isFetching: isFolderFetching } = useGetFilesByTargetIdQuery({
        targetId: targetFolder?.id,
    });

    useEffect(() => {
        onRefetch(data?.files || []);
    }, [data]);

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
    };

    const onDeleteSuccess = (item: ItemFile) => {
        showItemRemovalSuccessMessage(item);
        closeModal();
    };

    const onUpdateSuccess = (item: ItemFile) => {
        showItemUpdateSuccessMessage(item);
    };

    const {
        handleUpload,
        handleRejection,
        requestState: { isLoading: isUploading },
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

    useEffect(() => {
        dispatch(setFiles({ files: files.filter((f) => !f.isFolder) }));
    }, [files]);

    const handleFolderSelect = (item: ItemFile) => {
        setCurrentLevelFiles(filterFilesByParentId(files, item.id));
        onFolderSelect(item);
    };

    const handleFileClick = (item: ItemFile) => {
        if (playing && current?.id === item.id) {
            handlePauseClick();
        } else {
            handlePlayClick(item);
        }
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

    const handlePlayClick = (item: ItemFile) => {
        dispatch(
            play({
                files: currentLevelFiles.files,
                current: item,
                showPlayer: true,
            })
        );
    };

    const handlePauseClick = () => {
        dispatch(pause());
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
        !isFolderFetching &&
        !currentLevelFiles.folders?.length &&
        !currentLevelFiles.files?.length;

    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            {(isUploading || isDeleting || isUpdating || isFolderFetching) && (
                <Loader overlap />
            )}
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
                            onPlay={() => handlePlayClick(item)}
                            onPause={handlePauseClick}
                            onEdit={(values) => handleEdit({ item, values })}
                            isLoading={isUpdating}
                            onClick={() => handleFileClick(item)}
                        />
                    ))}
                </Dropzone>
            </List>
        </Box>
    );
};

export default FilesList;
