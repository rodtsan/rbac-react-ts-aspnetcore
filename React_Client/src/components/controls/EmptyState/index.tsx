import React, { ReactNode } from 'react';

interface EmptyStateProps {
    children?: ReactNode | string;
}

const EmptyState: React.FunctionComponent<EmptyStateProps> = ({ children }) => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <span className="d-inline-block">{children}</span>
        </div>
    );
};

EmptyState.defaultProps = {
    children: 'No data available!'
};

export default EmptyState;
