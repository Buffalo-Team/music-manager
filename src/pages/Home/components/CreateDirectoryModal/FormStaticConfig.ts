import i18n from 'app/translations';
import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialValues: {
        name: i18n.t('files.newFolder'),
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
};

export default FormStaticConfig;
