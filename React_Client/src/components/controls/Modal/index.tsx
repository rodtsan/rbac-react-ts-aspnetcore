import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
    className?: string;
    title?: ReactNode | string;
    children: ReactNode;
    okText?: string;
    cancelText?: string;
    visible?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
    onOk?: React.MouseEventHandler<HTMLButtonElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal: React.FunctionComponent<ModalProps> = ({
    className,
    title,
    okText,
    cancelText,
    children,
    visible,
    disabled,
    style,
    onOk,
    onCancel
}) => {
    const cssStyles = {
        ...style,
        display: visible ? 'block' : 'none'
    };
    return (
        <div
            className={classNames('modal', className, { show: visible })}
            style={cssStyles}
            tabIndex={-1}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onCancel}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onCancel}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onOk}
                            disabled={disabled}
                        >
                            {okText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    title: 'Untitled',
    okText: 'Submit',
    cancelText: 'Cancel'
};

export default Modal;
