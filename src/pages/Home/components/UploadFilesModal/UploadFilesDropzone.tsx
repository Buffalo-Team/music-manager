import { FileRejection, FileWithPath } from 'react-dropzone';
import UploadFilesDropzoneContent from 'pages/Home/components/UploadFilesModal/UploadFilesDropzoneContent';
import Dropzone from '../Dropzone';

interface Props {
    songs: FileWithPath[];
    onSongDelete: (song: FileWithPath) => void;
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
}

const UploadFilesDropzone = ({ songs, onDrop, onSongDelete }: Props) => (
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
        <UploadFilesDropzoneContent songs={songs} onSongDelete={onSongDelete} />
    </Dropzone>
);

export default UploadFilesDropzone;
