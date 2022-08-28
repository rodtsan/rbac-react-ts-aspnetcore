import * as Yup from 'yup';

export const ProfileValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Firstname is too short')
        .required('Firstname is required'),
    lastName: Yup.string()
        .min(2, 'Lastname is too short')
        .required('Lastname is required')
});
