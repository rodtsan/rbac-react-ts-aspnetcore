import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { SizeType, IconType } from '@common/models/Types';

interface IconProps {
    id?: string;
    title?: string;
    type?: IconType;
    className?: string;
    size?: SizeType;
    style?: CSSProperties;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const Icon: React.FunctionComponent<IconProps> = React.forwardRef(
    (
        { id, title, type, style, size, className, onClick },
        ref: React.Ref<HTMLSpanElement>
    ) => {
        const iconStyle = {
            fontSize: size as string,
            ...style
        };
        const iconClassName = 'glyphicons'.combine(type as string);
        return (
            <span
                ref={ref}
                id={id}
                title={title}
                style={iconStyle}
                className={classNames('glyphicons', iconClassName, className)}
                onClick={onClick}
            />
        );
    }
);

Icon.defaultProps = {
    type: 'default',
    size: 'medium',
    style: {}
};

export default Icon;

export type { IconType };

export { IconProps };
