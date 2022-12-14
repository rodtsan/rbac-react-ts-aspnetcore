import React from 'react';
import { useFormik } from 'formik';
import { Register } from '@common/models/Interfaces';
import { RegisterValidationSchema } from '@common/models/ValidationShemas';
/* Components */
import Spinner from '@components/controls/Spinner';
import { Link } from 'react-router-dom';

export interface RegisterProps extends Register {
    companyName?: string;
}

export interface RegisterFormProps {
    loading?: boolean;
    onSubmit: (values: RegisterProps) => void;
}

const Form: React.FunctionComponent<RegisterFormProps> = ({ loading, onSubmit }) => {
    const formik = useFormik<RegisterProps>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            companyName: ''
        },
        validationSchema: RegisterValidationSchema,
        validateOnBlur: true,
        onSubmit
    });
    return (
        <Spinner loading={loading}>
            <form onSubmit={formik.handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                        required
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <p className="error text-danger">{formik.errors.firstName}</p>
                    )}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                        required
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <p className="error text-danger">{formik.errors.lastName}</p>
                    )}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="companyName">
                        Company Name (Optional)
                    </label>
                    <input
                        id="companyName"
                        name="companyName"
                        value={formik.values.companyName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                        required
                    />
                    {formik.touched.companyName && formik.errors.companyName && (
                        <p className="error text-danger">{formik.errors.companyName}</p>
                    )}
                </div>
                <div className="py-10">{}</div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                        required
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="error text-danger">{formik.errors.email}</p>
                    )}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                        required
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="error text-danger">{formik.errors.password}</p>
                    )}
                </div>
                <div className="form-group pt-5 text-center">
                    <button className="btn btn-dark w-25" type="submit">
                        Register
                    </button>
                </div>
                <div className="form-group d-flex justify-content-end py-2">
                    <Link to="/login" className="btn btn-link text-dark">
                        Go to login
                    </Link>
                </div>
            </form>
        </Spinner>
    );
};

export default Form;
