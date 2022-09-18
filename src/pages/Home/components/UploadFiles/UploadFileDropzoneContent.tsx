import React from 'react';
import { FileWithPath } from 'react-dropzone';
import { withTranslation, WithTranslation } from 'react-i18next';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import SongsList from 'pages/Home/components/UploadFiles/SongsList';

interface Props extends WithTranslation {
    songs: FileWithPath[];
    onSongDelete: (song: FileWithPath) => void;
}

const UploadFileDropzoneContent = ({ songs, onSongDelete, t }: Props) => (
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

export default withTranslation()(UploadFileDropzoneContent);
