import React from 'react';
import { Formik } from 'formik';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import FormInputField from 'components/FormInputField';
import Loader from 'components/Loader';
import { CreateFolderRequestData } from 'types';
import Styled from './CreateDirectory.styled';
import FormStaticConfig from './FormStaticConfig';

interface Props extends WithTranslation {
    onSubmit: (values: CreateFolderRequestData) => void;
    isLoading?: boolean;
}

const CreateDirectoryForm = ({ onSubmit, isLoading, t }: Props) => (
    <Formik<CreateFolderRequestData> {...FormStaticConfig} onSubmit={onSubmit}>
        {({ touched, handleSubmit, isValid }) => (
            <Styled.Form onSubmit={handleSubmit}>
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
                    {isLoading ? <Loader /> : t('files.create').toUpperCase()}
                </Button>
            </Styled.Form>
        )}
    </Formik>
);

export default withTranslation()(CreateDirectoryForm);
