import { ReactNode } from 'react';
import {
    DropzoneOptions,
    DropzoneState,
    FileRejection,
    useDropzone,
} from 'react-dropzone';
import { Box, SxProps, Theme } from '@mui/material';

interface Props {
    children?: ReactNode;
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
    sxProvider?: (state: DropzoneState) => SxProps<Theme>;
}

const Dropzone = ({
    children,
    sxProvider,
    ...dropzoneOptions
}: Props & DropzoneOptions) => {
    const state = useDropzone({
        accept: {
            'audio/mpeg': ['.mp3'],
        },
        noClick: true,
        ...dropzoneOptions,
    });
    const { getRootProps, getInputProps, isDragActive } = state;
    const sx = sxProvider?.(state);

    return (
        <Box
            {...getRootProps({
                sx: [
                    {
                        ...(isDragActive && {
                            borderRadius: '2px',
                            boxShadow: (theme: Theme) =>
                                `0 0 0 2px ${theme.palette.primary.main}`,
                            background: (theme: Theme) =>
                                theme.palette.background.accent,
                        }),
                        boxSizing: 'border-box',
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ],
            })}
        >
            <input {...getInputProps()} />
            {children}
        </Box>
    );
};

export default Dropzone;
