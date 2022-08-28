import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@components/Container';

interface SessionExpiredProps {}

const SessionExpired: React.FunctionComponent<SessionExpiredProps> = () => {
    const [counter, setCounter] = useState<number>(5);
    const push = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            setCounter(prev => prev - 1);
            if (counter < 1) {
                clearTimeout(timeout);
                push('/login');
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [counter]);
    return (
        <Container title="">
            <div className="box-outer">
                <div className="box-inner text-center">
                    <h2>Your session has expired</h2>
                    <div className="py-2" />
                    <p>
                        Please,{' '}
                        <Link to="/login" className="link link-secondary">
                            Click here
                        </Link>{' '}
                        to go back to Login Page.
                    </p>
                    <div className="py-2" />
                    <p>You will automatically redirect after {counter} seconds...</p>
                </div>
            </div>
        </Container>
    );
};

export default SessionExpired;
