import * as Yup from 'yup';

export const ProfileValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'At least 2 character in length')
        .matches(/^([a-z]+\s)*[a-z]+$/, 'Invalid name given')
        .required('Firstname is required'),
    lastName: Yup.string()
        .min(2, 'At least 2 character in length')
        .matches(/^([a-z]+\s)*[a-z]+$/, 'Invalid name given')
        .required('Lastname is required')
});
