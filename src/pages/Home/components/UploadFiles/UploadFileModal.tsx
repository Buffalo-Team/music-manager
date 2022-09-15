import React, { Dispatch, SetStateAction } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import UploadFileDropzone from 'pages/Home/components/UploadFiles/UploadFileDropzone';
import { File as ItemFile } from 'types';

interface Props {
    open: boolean;
    onClose: () => void;
    onUpload: (files: FileWithPath[]) => void;
    onReject: (files: FileRejection[]) => void;
    isLoading?: boolean;
    targetFolder?: ItemFile;
    songs: FileWithPath[];
    setSongs: Dispatch<SetStateAction<FileWithPath[]>>;
}

const UploadFileModal = ({
    open,
    onClose,
    onUpload,
    onReject,
    isLoading,
    targetFolder,
    songs,
    setSongs,
}: Props) => {
    const { t } = useTranslation();

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setSongs([]);
    };

    const handleSongDelete = (song: FileWithPath) => {
        setSongs((prevSongs) => prevSongs.filter((i) => i.path !== song.path));
    };

    return (
        <Modal open={open} onClose={handleClose} title={t('files.uploadFiles')}>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    gap: 2,
                    height: 0,
                    [theme.breakpoints.down('md')]: {
                        minHeight: '60vh',
                    },
                    [theme.breakpoints.up('md')]: {
                        minHeight: '40vh',
                    },
                    [theme.breakpoints.up('lg')]: {
                        minHeight: '50vh',
                    },
                })}
            >
                <Typography variant="regular">
                    {t('files.directory', {
                        name: targetFolder
                            ? targetFolder.name
                            : t('files.rootDirectory'),
                    })}
                </Typography>
                <UploadFileDropzone
                    songs={songs}
                    setSongs={setSongs}
                    onReject={onReject}
                    onSongDelete={handleSongDelete}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isLoading || !songs.length}
                    sx={{ marginTop: 1 }}
                    onClick={() => onUpload(songs)}
                >
                    {isLoading ? <Loader /> : t('files.upload').toUpperCase()}
                </Button>
            </Box>
        </Modal>
    );
};

export default UploadFileModal;
