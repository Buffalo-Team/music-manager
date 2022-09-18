import { useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useGetAllFilesQuery } from 'app/api/filesApiSlice';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import Loader from 'components/Loader';
import { File as ItemFile, ResponseStatus } from 'types';
import CreateDirectory from './components/CreateDirectory/CreateDirectory';
import FilesList from './components/FilesList';
import Breadcrumbs from './components/FilesList/Breadcrumbs';
import UploadFiles from './components/UploadFiles';
import { setFiles } from './store/filesSlice';

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
    const [songs, setSongs] = useState<FileWithPath[]>([]);
    const [breadcrumbs, setBreadcrumbs] = useState<(ItemFile | undefined)[]>([
        undefined,
    ]);

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

    const handleDeleteSuccess = (item: ItemFile) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.directoryDeleted')
                    : t('files.fileDeleted'),
            })
        );
        refetchFiles();
    };

    const handleDeleteError = (item: ItemFile) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.deletingDirectoryFailed')
                    : t('files.deletingFileFailed'),
                severity: 'error',
            })
        );
    };

    const handleUpdateSuccess = (item: ItemFile) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.directoryUpdated')
                    : t('files.fileUpdated'),
            })
        );
        refetchFiles();
    };

    const handleUpdateError = (item: ItemFile) => {
        dispatch(
            openSnackbar({
                content: item.isFolder
                    ? t('files.updatingDirectoryFailed')
                    : t('files.updatingFileFailed'),
                severity: 'error',
            })
        );
    };

    const handleBreadcrumbClick = (index: number) => {
        setBreadcrumbs((prev) => prev.slice(0, index + 1));
    };

    const handleFolderSelect = (item: ItemFile) => {
        setBreadcrumbs((prev) => [...prev, item]);
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
                    targetFolder={breadcrumbs[breadcrumbs.length - 1]}
                />
                <UploadFiles
                    onUploadSuccess={handleUpload}
                    onUploadError={handleUploadError}
                    targetFolder={breadcrumbs[breadcrumbs.length - 1]}
                    songs={songs}
                    setSongs={setSongs}
                />
            </Box>
            {isLoading && <Loader />}
            {isSuccess && (
                <>
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                    />
                    <FilesList
                        onUploadSuccess={handleUpload}
                        onUploadError={handleUploadError}
                        onFolderSelect={handleFolderSelect}
                        onDeleteSuccess={handleDeleteSuccess}
                        onDeleteError={handleDeleteError}
                        onUpdateSuccess={handleUpdateSuccess}
                        onUpdateError={handleUpdateError}
                        breadcrumbs={breadcrumbs}
                    />
                </>
            )}
        </Box>
    );
};

export default Home;
