import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { ForgotPasswordPageProps } from '.';
import { ForgotPasswordValidationSchema } from '@src/common/models/ValidationShemas';
/* Components */
import Container from '@components/Container';
import Spinner from '@components/Spinner';

interface ForgotPasswordProps {
    email: string;
}
const View: React.FunctionComponent<ForgotPasswordPageProps> = ({
    loading,
}) => {
    const formik = useFormik<ForgotPasswordProps>({
        initialValues: {
            email: ''
        },
        validateOnBlur: true,
        validationSchema: ForgotPasswordValidationSchema,
        onSubmit: (values) => {}
    });

    return (
        <Container>
            <div className="mx-auto" style={{ maxWidth: 420 }}>
                <h1>Reset Password</h1>
                <p>We will send you an email to reset your password.</p>
                <div className="py-2" />
                <Spinner loading={loading}>
                    <form onSubmit={formik.handleSubmit} className="form-horizontal">
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
                                disabled={loading}
                                required
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="error text-danger">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="form-group d-flex justify-content-end py-2">
                            <Link to="/login" className="btn btn-link text-dark">
                                Back to login
                            </Link>
                        </div>
                        <div className="form-group py-3">
                            <button
                                className="btn btn-dark w-25"
                                type="submit"
                                disabled={loading}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </Spinner>
            </div>
        </Container>
    );
};

export default View;
