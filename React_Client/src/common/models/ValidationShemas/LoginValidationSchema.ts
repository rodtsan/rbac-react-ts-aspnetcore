import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('User Name is required'),
    password: Yup.string()
        .min(2, 'Password is too short')
        .required('Password is required')
});

export const ResetPasswordValidationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords does not match'
    )
});

export const ForgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required')
});
