import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialValues: {
        password: '',
        passwordConfirm: '',
    },
    initialErrors: {
        password: '',
        passwordConfirm: '',
    },
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
};

export default FormStaticConfig;
