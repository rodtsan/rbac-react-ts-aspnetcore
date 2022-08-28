import React from 'react';
import Container from '@components/Container';

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
    return (
        <Container>
            <div className="container">
                <article>
                    <div className="text-center">
                        <h1 className="display-4">About</h1>
                        <p>
                            <a
                                href="https://docs.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-6.0"
                                target="_blank"
                            >
                                Overview of ASP.NET Core authentication.
                            </a>
                        </p>
                    </div>
                </article>
            </div>
        </Container>
    );
};

export default About;
