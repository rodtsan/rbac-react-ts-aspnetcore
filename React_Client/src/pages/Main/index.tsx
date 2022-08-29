import React from 'react';
import Container from '@components/Container';

interface MainProps {}

const Main: React.FunctionComponent<MainProps> = () => {
    return (
        <Container title="Home">
            <div className="container">
                <article>
                    <div className="text-center">
                        <h1 className="display-4">Welcome</h1>
                        <p>
                            Learn about{' '}
                            <a href="https://docs.microsoft.com/aspnet/core">
                                building Web apps with ASP.NET Core
                            </a>
                            .
                        </p>
                    </div>
                </article>
            </div>
        </Container>
    );
};

export default Main;
