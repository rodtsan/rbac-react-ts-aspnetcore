import React, { ReactNode } from 'react';

interface ContentProps {
    children: ReactNode;
}

const Content: React.FunctionComponent<ContentProps> = ({ children }) => {
    return <div className="rs-layout-content">{children}</div>;
};

export default Content;
