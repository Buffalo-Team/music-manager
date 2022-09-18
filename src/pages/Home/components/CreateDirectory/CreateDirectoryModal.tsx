import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { CreateFolderRequestData, File as ItemFile } from 'types';
import FormStaticConfig from './FormStaticConfig';

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (values: CreateFolderRequestData) => void;
    isLoading?: boolean;
    targetFolder?: ItemFile;
}

const UploadFileModal = ({
    open,
    onClose,
    onCreate,
    isLoading,
    targetFolder,
}: Props) => {
    const { t } = useTranslation();

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title={t('files.createDirectory')}
        >
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Typography variant="regular">
                    {t('files.parentDirectory', {
                        name: targetFolder
                            ? targetFolder.name
                            : t('files.rootDirectory'),
                    })}
                </Typography>
                <Formik<CreateFolderRequestData>
                    {...FormStaticConfig}
                    onSubmit={onCreate}
                >
                    {({ touched, handleSubmit, isValid }) => (
                        <Box
                            onSubmit={handleSubmit}
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                marginTop: 2,
                            }}
                        >
                            <FormInputField
                                name="name"
                                touched={touched.name}
                                placeholder={t('files.name')}
                                sx={{ marginBottom: 1 }}
                            />
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={isLoading || !isValid}
                                sx={{ marginTop: 1 }}
                            >
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    t('files.create').toUpperCase()
                                )}
                            </Button>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default UploadFileModal;
