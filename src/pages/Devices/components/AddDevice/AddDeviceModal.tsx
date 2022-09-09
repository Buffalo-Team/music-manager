import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Button, InputAdornment } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import DeviceTypeSelection from 'pages/Devices/components/AddDevice/DeviceTypeSelection';
import FormStaticConfig from 'pages/Devices/components/AddDevice/FormStaticConfig';
import Values from './Values';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: Values) => void;
    isLoading?: boolean;
}

const AddDeviceModal = ({ open, onClose, onSubmit, isLoading }: Props) => {
    const { t } = useTranslation();
    return (
        <Modal open={open} onClose={onClose} title={t('devices.newDevice')}>
            <Formik<Values> {...FormStaticConfig} onSubmit={onSubmit}>
                {({
                    values,
                    touched,
                    handleSubmit,
                    setFieldValue,
                    isValid,
                }) => (
                    <Box
                        onSubmit={handleSubmit}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
                        <DeviceTypeSelection
                            value={values.type}
                            onSelect={(type) => setFieldValue('type', type)}
                        />
                        <FormInputField
                            name="name"
                            touched={touched.name}
                            placeholder={t('devices.name')}
                        />
                        <FormInputField
                            name="capacityMegabytes"
                            touched={touched.capacityMegabytes}
                            placeholder={t('devices.memorySize')}
                            type="number"
                            min="1"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {t('MB')}
                                    </InputAdornment>
                                ),
                            }}
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
                                t('devices.add').toUpperCase()
                            )}
                        </Button>
                    </Box>
                )}
            </Formik>
        </Modal>
    );
};

export default AddDeviceModal;
