import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box, List, Typography } from '@mui/material';
import { useAppSelector } from 'app/store';
import GoUpRow from 'pages/Home/components/FilesList/GoUpRow';
import ItemRow from 'pages/Home/components/FilesList/ItemRow';
import { File as ItemFile, ItemRowType } from 'types';
import Dropzone, { useDropHandler } from '../Dropzone';
import CurrentLevel from './CurrentLevel';
import filterFilesByParentId from './filterFilesByParentId';

interface Props {
    onUploadSuccess: () => void;
    onUploadError: () => void;
    currentFolder?: ItemFile;
    setCurrentFolder: Dispatch<SetStateAction<ItemFile | undefined>>;
}

const FilesList = ({
    onUploadSuccess,
    onUploadError,
    currentFolder,
    setCurrentFolder,
}: Props) => {
    const { t } = useTranslation();
    const files = useAppSelector(({ files }) => files);
    const [previousFolder, setPreviousFolder] = useState<ItemFile>();
    const [currentLevelFiles, setCurrentLevelFiles] = useState<CurrentLevel>(
        {}
    );
    const { handleUpload, handleRejection } = useDropHandler({
        onUploadSuccess,
        onUploadError,
    });

    useEffect(() => {
        setCurrentLevelFiles(filterFilesByParentId(files, currentFolder?.id));
    }, [files]);

    const handleFolderSelect = (item: ItemFile) => {
        setCurrentLevelFiles(filterFilesByParentId(files, item.id));
        setCurrentFolder((prevFolder) => {
            setPreviousFolder(prevFolder);
            return item;
        });
    };

    const handleGoUp = () => {
        setCurrentLevelFiles(filterFilesByParentId(files, previousFolder?.id));
        setCurrentFolder(previousFolder);
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

    return (
        <Box sx={{ marginTop: 2, flex: 1, display: 'flex' }}>
            <List
                dense
                sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
                <GoUpRow
                    onGoUp={handleGoUp}
                    previousFolderId={previousFolder?.id}
                    currentFolderId={currentFolder?.id}
                />
                {!currentLevelFiles.folders?.length &&
                    !currentLevelFiles.files?.length && (
                        <Typography
                            variant="regular"
                            sx={{
                                color: (theme) => theme.palette.grey[100],
                                marginY: 2,
                            }}
                        >
                            {t('files.directoryIsEmpty')}
                        </Typography>
                    )}
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
                    onDrop={handleDrop(currentFolder)}
                    sxProvider={() => ({
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    })}
                >
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
