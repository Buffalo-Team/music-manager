import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, i18n.t('UserNameMinLength', { length: 3 }))
        .max(50, i18n.t('UserNameMaxLength', { length: 50 }))
        .required(i18n.t('FieldRequired')),
    surname: Yup.string()
        .min(3, i18n.t('SurnameMinLength', { length: 3 }))
        .max(50, i18n.t('SurnameMaxLength', { length: 50 }))
        .required(i18n.t('FieldRequired')),
    email: Yup.string()
        .email(i18n.t('EmailMustBeValid'))
        .required(i18n.t('FieldRequired')),
    password: Yup.string()
        .min(8, i18n.t('PasswordMinLength', { length: 8 }))
        .required(i18n.t('FieldRequired')),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], i18n.t('PasswordsMustMatch'))
        .min(8, i18n.t('PasswordMinLength', { length: 8 }))
        .required(i18n.t('FieldRequired')),
});

export default FormValidationSchema;
