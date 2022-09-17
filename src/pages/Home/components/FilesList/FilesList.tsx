import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { Box, List } from '@mui/material';
import { useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import EmptyDirectory from 'pages/Home/components/FilesList/EmptyDirectory';
import { File as ItemFile, ItemRowType } from 'types';
import Dropzone, { useDropHandler } from '../Dropzone';
import CurrentLevel from './CurrentLevel';
import filterFilesByParentId from './filterFilesByParentId';
import ItemRow from './ItemRow';

interface Props {
    onUploadSuccess: () => void;
    onUploadError: () => void;
    onFolderSelect: (item: ItemFile) => void;
    breadcrumbs: (ItemFile | undefined)[];
}

const FilesList = ({
    onUploadSuccess,
    onUploadError,
    onFolderSelect,
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

    const isDirectoryEmpty =
        !currentLevelFiles.folders?.length && !currentLevelFiles.files?.length;

    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            {isLoading && <Loader overlap />}
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
                        />
                    ))}
                </Dropzone>
            </List>
        </Box>
    );
};

export default FilesList;
