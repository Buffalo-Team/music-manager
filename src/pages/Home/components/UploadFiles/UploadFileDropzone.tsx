import React, { Dispatch, SetStateAction } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';
import UploadFileDropzoneContent from 'pages/Home/components/UploadFiles/UploadFileDropzoneContent';
import Dropzone from '../Dropzone';

interface Props {
    songs: FileWithPath[];
    setSongs: Dispatch<SetStateAction<FileWithPath[]>>;
    onReject: (files: FileRejection[]) => void;
    onSongDelete: (song: FileWithPath) => void;
}

const UploadFileModal = ({
    songs,
    setSongs,
    onReject,
    onSongDelete,
}: Props) => {
    const handleOnDrop = (
        acceptedFiles: File[],
        fileRejections: FileRejection[]
    ) => {
        setSongs((prev) => {
            const filesToAdd = acceptedFiles.filter(
                (file) =>
                    !prev.some(
                        (i) => i.name === file.name && i.type === file.type
                    )
            );
            return [...prev, ...filesToAdd];
        });
        onReject(fileRejections);
    };

    return (
        <Dropzone
            noClick={false}
            onDrop={handleOnDrop}
            sxProvider={({ isDragActive }) => ({
                flex: 1,
                paddingX: 2,
                paddingTop: 2,
                paddingBottom: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: !songs.length ? 'center' : 'space-between',
                cursor: 'pointer',
                overflow: 'auto',
                ...(!isDragActive && {
                    background: (theme) => theme.palette.background.secondary,
                    boxShadow: (theme) =>
                        `0 0 0 1px ${theme.palette.border.neutral}`,
                }),
            })}
        >
            <UploadFileDropzoneContent
                songs={songs}
                onSongDelete={onSongDelete}
            />
        </Dropzone>
    );
};

export default UploadFileModal;
