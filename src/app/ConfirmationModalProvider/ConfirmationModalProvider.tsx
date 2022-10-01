import React, { ReactNode, useState } from 'react';
import ConfirmationModal from 'components/ConfirmationModal';

interface ConfirmationModalStateType {
    open: boolean;
    message?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
}

type ContextType = ConfirmationModalStateType & {
    openModal: (data: Omit<ConfirmationModalStateType, 'open'>) => void;
    closeModal: () => void;
};

export const ConfirmationModalContext = React.createContext<ContextType>(
    {} as ContextType
);

interface Props {
    children: ReactNode;
}

const ConfirmationModalProvider = ({ children }: Props) => {
    const [state, setState] = useState<ConfirmationModalStateType>({
        open: false,
    });

    const value = {
        ...state,
        closeModal: () => setState({ open: false }),
        openModal: (data: Omit<ConfirmationModalStateType, 'open'>) =>
            setState({ ...data, open: true }),
    };

    return (
        <ConfirmationModalContext.Provider value={value}>
            {children}
            <ConfirmationModal />
        </ConfirmationModalContext.Provider>
    );
};

export default ConfirmationModalProvider;
