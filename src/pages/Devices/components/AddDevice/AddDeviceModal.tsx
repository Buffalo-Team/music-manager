import React from 'react';
import { Formik } from 'formik';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, Button, InputAdornment } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import DeviceTypeSelection from 'pages/Devices/components/AddDevice/DeviceTypeSelection';
import FormStaticConfig from 'pages/Devices/components/AddDevice/FormStaticConfig';
import { AddDeviceRequestData } from 'types';

interface Props extends WithTranslation {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: AddDeviceRequestData) => void;
    isLoading?: boolean;
}

const AddDeviceModal = ({ open, onClose, onSubmit, isLoading, t }: Props) => (
    <Modal open={open} onClose={onClose} title={t('devices.newDevice')}>
        <Box sx={{ display: 'flex', flex: 1 }}>
            <Formik<AddDeviceRequestData>
                {...FormStaticConfig}
                onSubmit={onSubmit}
            >
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
                            sx={{ marginBottom: 1 }}
                        />
                        <FormInputField
                            name="capacityGigabytes"
                            touched={touched.capacityGigabytes}
                            placeholder={t('devices.memorySize')}
                            type="number"
                            min="1"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {t('GB')}
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginBottom: 1 }}
                            inputProps={{
                                step: 0.5,
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
        </Box>
    </Modal>
);

export default withTranslation()(AddDeviceModal);
