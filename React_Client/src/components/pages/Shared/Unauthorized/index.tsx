import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@components/controls/Container';

interface UnauthorizedProps {}

const Unauthorized: React.FunctionComponent<UnauthorizedProps> = () => {
    const [counter, setCounter] = useState<number>(5);
    const push = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            setCounter(prev => prev - 1);
            if (counter < 1) {
                clearTimeout(timeout);
                push('/');
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [counter]);
    return (
        <Container title="">
            <div className="box-outer">
                <div className="box-inner text-center">
                    <h2>You are not authorized to view this page.</h2>
                    <div className="py-2" />
                    <p>
                        Please,{' '}
                        <Link to="/" className="link link-secondary">
                            Click here
                        </Link>{' '}
                        to go back to Main Page.
                    </p>
                    <div className="py-2" />
                    <p>You will automatically redirect after {counter} seconds...</p>
                </div>
            </div>
        </Container>
    );
};

export default Unauthorized;
