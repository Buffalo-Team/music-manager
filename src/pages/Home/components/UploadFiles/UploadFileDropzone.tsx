import { FileRejection, FileWithPath } from 'react-dropzone';
import UploadFileDropzoneContent from 'pages/Home/components/UploadFiles/UploadFileDropzoneContent';
import Dropzone from '../Dropzone';

interface Props {
    songs: FileWithPath[];
    onSongDelete: (song: FileWithPath) => void;
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
}

const UploadFileDropzone = ({ songs, onDrop, onSongDelete }: Props) => (
    <Dropzone
        noClick={false}
        onDrop={onDrop}
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
        <UploadFileDropzoneContent songs={songs} onSongDelete={onSongDelete} />
    </Dropzone>
);

export default UploadFileDropzone;
