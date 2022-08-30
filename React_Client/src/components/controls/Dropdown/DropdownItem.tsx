import React, { ReactNode } from 'react'

export interface DropdownItemProps {
    className?: string;
    value: string;
    children: ReactNode;
    onClick?: (value: string) => void;
}

const DropdownItem: React.FunctionComponent<DropdownItemProps> = ({
    className,
    value,
    children,
    onClick
}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClick) onClick(value);
        event.preventDefault();
    };
    return (
        <li className={className}>
            <a className="dropdown-item" href="#" onClick={handleClick}>
                {children}
            </a>
        </li>
    );
};

export type DropdownItemType = React.ReactElement<DropdownItemProps>;

export default DropdownItem;