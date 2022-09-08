import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email must be valid')
        .required(i18n.t('FieldRequired')),
    password: Yup.string().required(i18n.t('FieldRequired')),
});

export default FormValidationSchema;
