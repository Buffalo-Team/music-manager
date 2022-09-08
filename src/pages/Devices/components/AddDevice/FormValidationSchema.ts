import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    type: Yup.string().required('Required'),
    name: Yup.string()
        .min(3, i18n.t('devices.validation.nameMinLength', { length: 3 }))
        .max(50, i18n.t('devices.validation.nameMaxLength', { length: 50 }))
        .required(i18n.t('fieldRequired')),
    capacityMegabytes: Yup.number()
        .min(1, i18n.t('devices.validation.sizeMin'))
        .required(i18n.t('fieldRequired')),
});

export default FormValidationSchema;
