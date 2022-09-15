import { useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useGetAllFilesQuery } from 'app/api/filesApiSlice';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import Loader from 'components/Loader';
import CreateDirectory from 'pages/Home/components/CreateDirectory/CreateDirectory';
import FilesList from 'pages/Home/components/FilesList';
import UploadFiles from 'pages/Home/components/UploadFiles';
import { setFiles } from 'pages/Home/store/filesSlice';
import { ResponseStatus, File as ItemFile } from 'types';

const Home = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const {
        data: filesResponse,
        isFetching,
        isLoading,
        isSuccess,
        refetch: refetchFiles,
    } = useGetAllFilesQuery();
    const [currentFolder, setCurrentFolder] = useState<ItemFile>();
    const [songs, setSongs] = useState<FileWithPath[]>([]);

    useEffect(() => {
        if (
            isSuccess &&
            !isFetching &&
            filesResponse?.status === ResponseStatus.SUCCESS
        ) {
            dispatch(setFiles(filesResponse?.files || []));
        }
    }, [filesResponse, isFetching, isSuccess]);

    const handleUpload = () => {
        dispatch(openSnackbar({ content: t('files.filesUploaded') }));
        refetchFiles();
        setSongs([]);
    };

    const handleUploadError = () => {
        dispatch(
            openSnackbar({
                content: t('files.uploadingFilesFailed'),
                severity: 'error',
            })
        );
    };

    const handleCreate = () => {
        dispatch(openSnackbar({ content: t('files.directoryCreated') }));
        refetchFiles();
    };

    const handleCreateError = () => {
        dispatch(
            openSnackbar({
                content: t('files.creatingDirectoryFailed'),
                severity: 'error',
            })
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: (theme) => theme.spacing(2),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                }}
            >
                <CreateDirectory
                    onCreateSuccess={handleCreate}
                    onCreateError={handleCreateError}
                    targetFolder={currentFolder}
                />
                <UploadFiles
                    onUploadSuccess={handleUpload}
                    onUploadError={handleUploadError}
                    targetFolder={currentFolder}
                    songs={songs}
                    setSongs={setSongs}
                />
            </Box>
            {isLoading && <Loader />}
            <FilesList
                onUploadSuccess={handleUpload}
                onUploadError={handleUploadError}
                currentFolder={currentFolder}
                setCurrentFolder={setCurrentFolder}
            />
        </Box>
    );
};

export default Home;
