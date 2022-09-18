import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { Box, List } from '@mui/material';
import { useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import { File as ItemFile, ItemRowType, UpdateFileRequestData } from 'types';
import Dropzone, { useDropHandler } from '../Dropzone';
import CurrentLevel from './CurrentLevel';
import EmptyDirectory from './EmptyDirectory';
import filterFilesByParentId from './filterFilesByParentId';
import ItemRow from './ItemRow';
import useDeleteFile from './useDeleteFile';
import useUpdateFile from './useUpdateFile';

interface Props {
    onUploadSuccess: () => void;
    onUploadError: () => void;
    onDeleteSuccess: (item: ItemFile) => void;
    onDeleteError: (item: ItemFile) => void;
    onUpdateSuccess: (item: ItemFile) => void;
    onUpdateError: (item: ItemFile) => void;
    onFolderSelect: (item: ItemFile) => void;
    breadcrumbs: (ItemFile | undefined)[];
}

const FilesList = ({
    onUploadSuccess,
    onUploadError,
    onFolderSelect,
    onDeleteSuccess,
    onDeleteError,
    onUpdateSuccess,
    onUpdateError,
    breadcrumbs,
}: Props) => {
    const files = useAppSelector(({ files }) => files);
    const [currentLevelFiles, setCurrentLevelFiles] = useState<CurrentLevel>(
        {}
    );
    const {
        handleUpload,
        handleRejection,
        requestState: { isLoading },
    } = useDropHandler({
        onUploadSuccess,
        onUploadError,
    });

    const {
        handleDelete,
        requestState: { isLoading: isDeleting },
    } = useDeleteFile({ onDeleteSuccess, onDeleteError });

    const {
        handleUpdate,
        requestState: { isLoading: isUpdating },
    } = useUpdateFile({ onUpdateSuccess, onUpdateError });

    useEffect(() => {
        setCurrentLevelFiles(
            filterFilesByParentId(
                files,
                breadcrumbs[breadcrumbs.length - 1]?.id
            )
        );
    }, [files, breadcrumbs]);

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
        handleDelete(item);
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
                    onDrop={handleDrop(breadcrumbs[breadcrumbs.length - 1])}
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
