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
};

export default FormStaticConfig;
