import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { ConfirmationModalContext } from 'app/ConfirmationModalProvider';
import Modal from 'components/Modal';
import { Props as ModalProps } from 'components/Modal/Modal';

const ConfirmationModal = ({
    ...rest
}: Omit<ModalProps, 'open' | 'children'>) => {
    const { open, message, onCancel, onConfirm, closeModal } = useContext(
        ConfirmationModalContext
    );
    const { t } = useTranslation();
    const handleCancel = () => {
        closeModal();
        onCancel?.();
    };
    return (
        <Modal open={open} onClose={handleCancel} {...rest}>
            <Typography
                variant="regular"
                sx={{
                    marginTop: 5,
                    marginBottom: 3,
                }}
            >
                {message}
            </Typography>
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                }}
            >
                <Button onClick={handleCancel}>{t('cancel')}</Button>
                <Button color="primary" variant="contained" onClick={onConfirm}>
                    {t('confirm')}
                </Button>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
