import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialValues: {
        email: '',
        password: '',
    },
    initialErrors: {
        email: '',
        password: '',
    },
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
};

export default FormStaticConfig;
