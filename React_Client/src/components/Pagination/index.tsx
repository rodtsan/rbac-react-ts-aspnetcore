import { DOTS, usePagination } from '@common/hooks/usePagination';
import classNames from 'classnames';
import React from 'react';

export interface PaginationProps {
    page: number;
    pageSize: number;
    siblingCount: number;
    recordCount: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({
    page,
    pageSize,
    siblingCount,
    recordCount,
    onPageChange
}) => {
    const pages = usePagination({
        page,
        pageSize,
        siblingCount,
        recordCount
    });

    const handlePage =
        (page: number) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onPageChange(page);
            event.preventDefault();
            event.stopPropagation();
        };

    const handlePrevious = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onPageChange(page - 1);
        event.preventDefault();
        event.stopPropagation();
    };

    const handleNext = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onPageChange(page + 1);
        event.preventDefault();
        event.stopPropagation();
    };

    const lastPage = pages[Math.max(0, pages.length - 1)];
    return (
        <nav aria-label="Page navigation">
            {pages.length > 1 && (
                <ul className="pagination">
                    <li className="page-item">
                        <a
                            className={classNames('page-link', {
                                disabled: page === 1
                            })}
                            href="#"
                            onClick={handlePrevious}
                        >
                            <div className="arrow left" title="Move Previous" />
                        </a>
                    </li>
                    {pages.map((pageNumber, key: number) => {
                        if (pageNumber === DOTS) {
                            return (
                                <li key={key} className="page-item dots">
                                    <a className="page-link dots">
                                        <span aria-hidden="true">&#8230;</span>
                                    </a>
                                </li>
                            );
                        }
                        return (
                            <li key={key} className="page-item">
                                <a
                                    className={classNames('page-link', {
                                        active: pageNumber === page
                                    })}
                                    href="#"
                                    onClick={handlePage(pageNumber as number)}
                                >
                                    {pageNumber}
                                </a>
                            </li>
                        );
                    })}
                    <li className="page-item">
                        <a
                            href="#"
                            onClick={handleNext}
                            className={classNames('page-link', {
                                disabled: lastPage === page
                            })}
                        >
                            <div className="arrow right" title="Move Next" />
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};


export default Pagination;
