import { FileRejection, FileWithPath } from 'react-dropzone';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import ParentDirectory from 'pages/Home/components/ParentDirectory';
import UploadFilesDropzone from 'pages/Home/components/UploadFilesModal/UploadFilesDropzone';
import { File as ItemFile } from 'types';
import Styled from './UploadFiles.styled';

interface Props extends WithTranslation {
    open: boolean;
    onClose: () => void;
    onUpload: (files: FileWithPath[]) => void;
    onDelete: (song: FileWithPath) => void;
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
    isLoading?: boolean;
    targetFolder?: ItemFile;
    songs: FileWithPath[];
}

const UploadFilesModal = ({
    open,
    onClose,
    onUpload,
    onDelete,
    onDrop,
    isLoading,
    targetFolder,
    songs,
    t,
}: Props) => (
    <Modal open={open} onClose={onClose} title={t('files.uploadFiles')}>
        <Styled.ModalContentContainer>
            <ParentDirectory targetFolder={targetFolder} />
            <UploadFilesDropzone
                songs={songs}
                onDrop={onDrop}
                onSongDelete={onDelete}
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
        </Styled.ModalContentContainer>
    </Modal>
);

export default withTranslation()(UploadFilesModal);
