import * as Yup from 'yup';

export const RegisterValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Firstname is too short')
        .required('Firstname is required'),
    lastName: Yup.string()
        .min(2, 'Lastname is too short')
        .required('Lastname is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password is too short')
        .required('Password is required')
});
