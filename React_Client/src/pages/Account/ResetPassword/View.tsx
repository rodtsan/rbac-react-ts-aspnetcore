import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ResetPasswordPageProps } from '.';
import { ResetPasswordValidationSchema } from '@common/models/ValidationShemas';
import { setPageTitle } from '@common/appSettings';
/* Components */
import Container from '@components/Container';
import Spinner from '@components/Spinner';

interface ResetPasswordProps {
    password: string;
    confirmPassword: string;
}
const View: React.FunctionComponent<ResetPasswordPageProps> = ({
    loading,
    isPasswordReset,
}) => {
    const push = useNavigate()
    const params = new URLSearchParams(location.search);
    const hasParams = params.has('userId') && params.has('token')
    const userId = params.get('userId'),
        token = params.get('token');

    useEffect(() => {
        setPageTitle('Reset Password');
    }, []);

    useEffect(() => {
        if (isPasswordReset) {
            push('/login')
        }
        if (!hasParams) {
            push('/')
        }
    }, [isPasswordReset]);

    const formik = useFormik<ResetPasswordProps>({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validateOnBlur: true,
        validationSchema: ResetPasswordValidationSchema,
        onSubmit: (values) => {
            console.log({
                userId,
                token,
                ...values
            });
        }
    });

    return (
        <Container>
            <div className="mx-auto" style={{ maxWidth: 420 }}>
                <h1>Change your Password</h1>
                <p></p>
                <div className="py-2" />
                <Spinner loading={loading}>
                    <form onSubmit={formik.handleSubmit} className="form-horizontal">
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="form-control"
                                disabled={loading}
                                required
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="error text-danger">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="form-control"
                                disabled={loading}
                                required
                            />
                            {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword && (
                                    <p className="error text-danger">
                                        {formik.errors.confirmPassword}
                                    </p>
                                )}
                        </div>
                        <div className="form-group d-flex justify-content-end py-2">
                            <Link to="/login" className="btn btn-link text-dark">
                                Go to login
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

