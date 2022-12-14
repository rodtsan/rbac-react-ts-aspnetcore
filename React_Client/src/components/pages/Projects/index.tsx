import React from 'react';
import Container from '@components/controls/Container';

interface ProjectsProps {}

const Projects: React.FunctionComponent<ProjectsProps> = () => {
    return (
        <Container title="Projects">
            <div className="container">
                <article>
                    <div className="text-center">
                        <h1 className="display-4">Projects</h1>
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

export default Projects;
