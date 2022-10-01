import { useContext } from 'react';
import { ConfirmationModalContext } from 'app/ConfirmationModalProvider';

const useConfirmationModal = () => {
    const { openModal, closeModal } = useContext(ConfirmationModalContext);

    return { openModal, closeModal };
};

export default useConfirmationModal;
