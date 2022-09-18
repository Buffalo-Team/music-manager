import FormValidationSchema from './FormValidationSchema';

const FormStaticConfig = {
    initialErrors: {
        name: '',
        isPrivate: '',
    },
    validateOnMount: true,
    validationSchema: FormValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
};

export default FormStaticConfig;
