import React, { ReactNode } from 'react';

interface FooterProps {
    children?: ReactNode;
}

const Footer: React.FunctionComponent<FooterProps> = ({ children }) => {
    return <div className="rs-layout-footer">{children}</div>;
};

export default Footer;
