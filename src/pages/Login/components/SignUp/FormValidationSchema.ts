import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, i18n.t('login.validation.nameMinLength', { length: 3 }))
        .max(50, i18n.t('login.validation.nameMaxLength', { length: 50 }))
        .required(i18n.t('fieldRequired')),
    surname: Yup.string()
        .min(3, i18n.t('login.validation.surnameMinLength', { length: 3 }))
        .max(50, i18n.t('login.validation.surnameMaxLength', { length: 50 }))
        .required(i18n.t('fieldRequired')),
    email: Yup.string()
        .email(i18n.t('login.validation.emailMustBeValid'))
        .required(i18n.t('fieldRequired')),
    password: Yup.string()
        .min(8, i18n.t('login.validation.passwordMinLength', { length: 8 }))
        .required(i18n.t('fieldRequired')),
    passwordConfirm: Yup.string()
        .oneOf(
            [Yup.ref('password')],
            i18n.t('login.validation.passwordsMustMatch')
        )
        .required(i18n.t('fieldRequired')),
});

export default FormValidationSchema;
