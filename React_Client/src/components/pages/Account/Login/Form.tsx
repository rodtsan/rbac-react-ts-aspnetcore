import React from 'react';
import { useFormik } from 'formik';
import { LoginValidationSchema } from '@common/models/ValidationShemas';
/* Components */
import Spinner from '@components/controls/Spinner';
import { Link } from 'react-router-dom';
import { Login } from '@common/models/Interfaces';

interface LoginProps extends Login {}

interface LoginFormProps {
    loading?: boolean;
    onSubmit: (values: LoginProps) => void;
}

const Form: React.FunctionComponent<LoginFormProps> = ({ loading, onSubmit }) => {
    const formik = useFormik<LoginProps>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidationSchema,
        validateOnBlur: true,
        onSubmit
    });
    return (
        <Spinner loading={loading}>
            <form onSubmit={formik.handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        User Name
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
                <div className="form-group">
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                        disabled={loading}
                        required
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="error text-danger">{formik.errors.password}</p>
                    )}
                </div>
                <div className="form-group d-flex justify-content-end py-3">
                    <Link to="/reset-password" className="btn btn-link text-dark">
                        Forgot your password?
                    </Link>
                </div>
                <div className="form-group py-2">
                    <button className="btn btn-dark w-25" type="submit" disabled={loading}>
                        Submit
                    </button>
                </div>
                <div className="form-group py-2">
                    <Link to="/register" className="btn btn-link text-dark">
                        Create an account
                    </Link>
                </div>
                <div className='form-group py-2'>
                     <code>
                         Test Account: sage_wieser@cox.net / Admin12345!
                     </code>
                </div>
            </form>
        </Spinner>
    );
};

export { LoginProps };

export default Form;
