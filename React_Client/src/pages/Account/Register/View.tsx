import React, { useEffect } from 'react';
import some from 'lodash/some';
import { useNavigate } from 'react-router';
import { RegisterPageProps } from '.';
/* Components */
import Container from '@components/Container';
import RegisterForm, { RegisterProps } from './Form';
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
        <Container title="Register">
            <div className="mx-auto" style={{ maxWidth: 420 }}>
                <h2 className="d-block text-center">Register</h2>
                <div className="py-3" />
                {hasError && <Alert type="alert-danger">{error.message}</Alert>}
                <RegisterForm loading={loading} onSubmit={handleSubmit} />
                <div>{}</div>
            </div>
        </Container>
    );
};

export default View;
