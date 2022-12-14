import { TFunction } from 'react-i18next';
import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = (t: TFunction) => ({
    initialValues: {
        name: t('files.newFolder'),
        isPrivate: true,
    },
    initialErrors: {
        name: '',
        isPrivate: '',
    },
    validateOnMount: true,
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
});

export default FormStaticConfig;
