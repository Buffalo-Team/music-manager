import * as Yup from 'yup';
import i18n from 'app/translations';

const FormValidationSchema = Yup.object().shape({
    type: Yup.string().required('Required'),
    name: Yup.string()
        .min(3, i18n.t('NameMinLength'))
        .max(50, i18n.t('NameMaxLength'))
        .required(i18n.t('FieldRequired')),
    capacityMegabytes: Yup.number()
        .min(1, i18n.t('SizeMin'))
        .required(i18n.t('FieldRequired')),
});

export default FormValidationSchema;
