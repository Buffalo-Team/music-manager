import { DeviceType } from 'types';
import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialValues: {
        type: DeviceType.CAR,
        name: '',
        capacityGigabytes: '',
    },
    initialErrors: {
        name: '',
        capacityGigabytes: '',
    },
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
};

export default FormStaticConfig;
