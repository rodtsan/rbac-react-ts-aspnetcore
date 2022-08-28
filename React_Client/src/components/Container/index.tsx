import React, { ReactNode } from 'react';

interface ContainerProps {
    title?: string;
    children: ReactNode;
}

const Container: React.FunctionComponent<ContainerProps> = ({ title, children }) => {
    return (
        <div className="container-fluid py-5 mx-auto" style={{ maxWidth: 1920 }}>
            <div className="row">
                <div className="col-12 px-4">{children}</div>
            </div>
        </div>
    );
};

export default Container;
