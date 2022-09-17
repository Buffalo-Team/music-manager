import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, i18n.t('files.validation.nameMinLength', { length: 3 }))
        .max(50, i18n.t('files.validation.nameMaxLength', { length: 50 }))
        .required(i18n.t('fieldRequired')),
});

export default FormValidationSchema;
