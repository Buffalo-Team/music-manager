import FormValidationSchema from 'pages/Devices/components/AddDevice/FormValidationSchema';
import { DeviceType } from 'types';

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
