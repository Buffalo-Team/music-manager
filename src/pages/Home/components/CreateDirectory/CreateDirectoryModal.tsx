import React from 'react';
import Modal from 'components/Modal';
import CreateDirectoryForm from 'pages/Home/components/CreateDirectory/CreateDirectoryForm';
import { CreateFolderRequestData, File as ItemFile } from 'types';
import ParentDirectory from '../ParentDirectory';
import Styled from './CreateDirectory.styled';

interface Props {
    title: string;
    open: boolean;
    onClose: () => void;
    onCreate: (values: CreateFolderRequestData) => void;
    isLoading?: boolean;
    targetFolder?: ItemFile;
}

const UploadFileModal = ({
    title,
    open,
    onClose,
    onCreate,
    isLoading,
    targetFolder,
}: Props) => (
    <Modal open={open} onClose={onClose} title={title}>
        <Styled.ModalContentContainer>
            <ParentDirectory targetFolder={targetFolder} />
            <CreateDirectoryForm onSubmit={onCreate} isLoading={isLoading} />
        </Styled.ModalContentContainer>
    </Modal>
);

export default UploadFileModal;
