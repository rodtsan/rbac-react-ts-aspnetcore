import React, { useEffect } from 'react';
import some from 'lodash/some';
import { useNavigate } from 'react-router';
import { setPageTitle } from '@common/appSettings';
import { RegisterPageProps } from '.';
/* Components */
import Container from '@components/Container';
import RegisterForm, { RegisterProps } from './components/RegisterForm';
import Alert from '@components/Alert';

const View: React.FunctionComponent<RegisterPageProps> = ({
    loading,
    register,
    setClear,
    error,
    isRegistered
}) => {
    const push = useNavigate();

    useEffect(() => {
        setPageTitle('Register');
        return () => {
            setClear();
        };
    }, []);

    useEffect(() => {
        if (isRegistered) {
            push('/login');
        }
    }, [isRegistered]);

    const handleSubmit = (values: RegisterProps) => {
        register(values);
    };
    const hasError = some(error);
    return (
        <Container>
            <div className="mx-auto" style={{ maxWidth: 500 }}>
                <h1>Register</h1>
                <div className="py-3" />
                {hasError && <Alert type="alert-danger">{error.message}</Alert>}
                <RegisterForm loading={loading} onSubmit={handleSubmit} />
                <div>{}</div>
            </div>
        </Container>
    );
};

export default View;
