import { DeviceType } from 'types';
import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialValues: {
        type: DeviceType.CAR,
        name: '',
        capacityMegabytes: '',
    },
    initialErrors: {
        name: '',
        capacityMegabytes: '',
    },
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
};

export default FormStaticConfig;
