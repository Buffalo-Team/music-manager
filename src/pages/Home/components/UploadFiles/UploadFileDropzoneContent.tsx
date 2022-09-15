import React from 'react';
import { FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import SongsList from 'pages/Home/components/UploadFiles/SongsList';

interface Props {
    songs: FileWithPath[];
    onSongDelete: (song: FileWithPath) => void;
}

const UploadFileDropzoneContent = ({ songs, onSongDelete }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            {!songs.length && (
                <>
                    <CloudUploadIcon />
                    <Typography variant="small" sx={{ marginTop: 1 }}>
                        {t('files.dropFilesHereOrClickToUpload')}
                    </Typography>
                </>
            )}
            {!!songs.length && (
                <>
                    <SongsList songs={songs} onDelete={onSongDelete} />
                    <Typography
                        variant="small"
                        sx={{
                            marginTop: 3,
                            color: (theme) => theme.palette.grey[100],
                        }}
                    >
                        {t('files.dropMoreFilesHereOrClickToUpload')}
                    </Typography>
                </>
            )}
        </>
    );
};

export default UploadFileDropzoneContent;
