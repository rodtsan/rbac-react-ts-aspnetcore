import React, { useEffect, useState } from 'react';
import { useRequest } from '@common/hooks/useRequest';
import { getUrl } from '@src/common/APIs';
import { useLocation } from 'react-router-dom';
import { setPageTitle } from '@common/appSettings';
import Container from '@components/controls/Container';

interface ConfirmEmailProps {}

const ConfirmEmail: React.FunctionComponent<ConfirmEmailProps> = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId'),
        token = params.get('token');
    const queryParams = {
        userId,
        token: encodeURIComponent(token as string)
    };

    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<any>({});
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const { loading, onSubmit } = useRequest(url, {
        method: 'GET',
        params: queryParams,
        onDataReceive(res) {
            setIsConfirmed(true);
            console.log(res);
        },
        onError(err?) {
            setIsConfirmed(false);
            setError(err);
        },
        callOnUrlChange: true
    });

    useEffect(() => {
        setPageTitle('Confirm Your Email');
        const link = getUrl('profileBaseUrl', 'confirmEmail');
        setUrl(link);
    }, []);

    const handleClick = () => onSubmit({});

    return (
        <Container title="Confirm Email">
            <div className="mx-auto" style={{ maxWidth: 400, height: 400 }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {isConfirmed ? (
                            <div
                                style={{
                                    height: 200,
                                    transform: 'translate(50px, 50px)'
                                }}
                            >
                                <p></p>
                                <h4>Your email has been confirmed!</h4>
                                <p></p>
                                <p>You can now free sign in to our app.</p>
                            </div>
                        ) : (
                            <div>
                                <p>{url}</p>
                                <p>{JSON.stringify(error)}</p>
                            </div>
                        )}
                    </>
                )}

                <button onClick={handleClick}>Click Me</button>
            </div>
        </Container>
    );
};

export default ConfirmEmail;
