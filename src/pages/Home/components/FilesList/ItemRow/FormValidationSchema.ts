import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, i18n.t('files.validation.nameMinLength', { length: 3 }))
        .max(100, i18n.t('files.validation.nameMaxLength', { length: 100 }))
        .required(i18n.t('fieldRequired')),
});

export default FormValidationSchema;
