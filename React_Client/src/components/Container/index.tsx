import { setPageTitle } from '@src/common/appSettings';
import React, { ReactNode, useEffect } from 'react';

interface ContainerProps {
    title?: string;
    children: ReactNode;
}

const Container: React.FunctionComponent<ContainerProps> = ({ title, children }) => {
    useEffect(() => {
        setPageTitle(title);
    }, []);
    return (
        <div className="container-fluid py-5 mx-auto" style={{ maxWidth: 1920 }}>
            {children}
        </div>
    );
};

Container.defaultProps = {
    title: ''
};

export default Container;
