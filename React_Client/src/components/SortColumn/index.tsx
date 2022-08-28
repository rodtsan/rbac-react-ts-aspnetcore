import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface SortColumnProps {
    sortKey: string;
    sortValue?: string;
    onSort?: (sortKey: string) => void;
    children?: ReactNode;
}

const SortColumn: React.FunctionComponent<SortColumnProps> = ({
    sortKey,
    sortValue,
    children,
    onSort
}) => {
    let key = sortKey.toLowerCase();
    const sort = sortValue as string;
    const arrowUp = String(key).concat('_asc');
    const arrowDown = String(key).concat('_desc');
    const handleSort =
        (key: string) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            if (onSort) onSort(key);
            event.preventDefault();
        };
    return (
        <div className="rs-table-column">
            <span className="table-column-text">{children}</span>
            <span className="table-column-sort">
                <span className="tsc-grid">
                    <span
                        title="Asc"
                        className={classNames('tsc-arrow material-icons dp48', {
                            disabled: arrowUp === sort
                        })}
                        onClick={handleSort(arrowUp)}
                        role="button"
                    >
                        arrow_drop_up
                    </span>
                    <span
                        title="Desc"
                        className={classNames('tsc-arrow material-icons dp48', {
                            disabled: arrowDown === sort
                        })}
                        onClick={handleSort(arrowDown)}
                        role="button"
                    >
                        arrow_drop_down
                    </span>
                </span>
            </span>
        </div>
    );
};

export default SortColumn;
