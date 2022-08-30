import React, { useEffect } from 'react';
import some from 'lodash/some';
import { LoginPageProps } from '.';
/* Components */
import Container from '@components/controls/Container';
import LoginForm, { LoginProps } from './Form';
import Alert from '@src/components/controls/Alert';

const View: React.FunctionComponent<LoginPageProps> = ({
    loading,
    error,
    isLoggedIn,
    userLogin,
    setClear
}) => {
    useEffect(() => {
        return () => {
            setClear();
        };
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/';
        }
    }, [isLoggedIn]);

    const handleSubmit = (values: LoginProps) => {
        userLogin(values);
    };
    const hasError = some(error);
    return (
        <Container title="Login">
            <div className="mx-auto" style={{ maxWidth: 340 }}>
                <h2 className="d-block text-center">Login</h2>
                <div className="py-3" />
                {hasError && <Alert type="alert-danger">{error.message}</Alert>}
                <LoginForm loading={loading} onSubmit={handleSubmit} />
            </div>
        </Container>
    );
};

export default View;
