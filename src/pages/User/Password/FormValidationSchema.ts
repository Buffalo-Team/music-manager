import * as Yup from 'yup';
import i18n from 'app/translations/i18n';

const FormValidationSchema = Yup.object().shape({
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
