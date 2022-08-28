import classNames from 'classnames';
import React, { ReactNode } from 'react';

export type AlertType =
    | 'alert-warning'
    | 'alert-danger'
    | 'alert-primary'
    | 'alert-success';

interface AlertProps {
    type?: AlertType;
    children: ReactNode;
}

const Alert: React.FunctionComponent<AlertProps> = ({ children, type }) => {
    return (
        <div
            className={classNames('alert alert-dismissible fade show', type)}
            role="alert"
        >
            <div>{children}</div>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

Alert.defaultProps = {
    type: 'alert-danger'
};

export default Alert;
