import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

export interface SpinnerProps {
    children?: ReactNode;
    color?: string;
    type?: LoadingType;
    loading?: boolean;
    style?: CSSProperties;
}

const Spinner: React.FunctionComponent<SpinnerProps> = ({
    type = 'spokes',
    color = '#0000FF',
    loading = true,
    style,
    children
}) => {
    return (
        <div className={classNames('rs-spinner', { fade: loading })} style={style}>
            {loading && (
                <ReactLoading
                    className="spinner-icon"
                    type={type}
                    color={color}
                    height={35}
                    width={35}
                />
            )}
            {children}
        </div>
    );
};

export default Spinner;
