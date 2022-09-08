import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialValues: {
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    },
    initialErrors: {
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    },
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
};

export default FormStaticConfig;
