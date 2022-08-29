import * as Yup from 'yup';

export const RegisterValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'At least 2 character in length')
        .matches(/^([a-z]+\s)*[a-z]+$/, 'Invalid name given')
        .required('Firstname is required'),
    lastName: Yup.string()
        .min(2, 'At least 2 character in length')
        .matches(/^([a-z]+\s)*[a-z]+$/, 'Invalid name given')
        .required('Lastname is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
        .min(8, 'At least 8 character in length')
        .matches(/^(?=.*[A-Z]).*$/, 'At least one uppercase letter')
        .matches(/^(?=.*[0-9]).*$/, 'At least one number')
        .matches(
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/,
            'At least one special character'
        )
        .required('Password is required')
});
